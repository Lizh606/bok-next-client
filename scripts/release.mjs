import chalk from "chalk"
import dayjs from "dayjs"
import enquirer from "enquirer"
import { execa } from "execa"
import minimist from "minimist"
import fs from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"
import semver from "semver"

const { prompt } = enquirer
const currentVersion = createRequire(import.meta.url)("../package.json").version
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const args = minimist(process.argv.slice(2))
const preId = args.preid || semver.prerelease(currentVersion)?.[0]
const isDryRun = args.dry

const versionIncrements = [
  "patch",
  "minor",
  "major",
  ...(preId ? ["prepatch", "preminor", "premajor", "prerelease"] : [])
]

const inc = (i) => semver.inc(currentVersion, i, preId)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "inherit", ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(" ")}`), opts)
const runIfNotDry = isDryRun ? dryRun : run
const step = (msg) => console.log(chalk.cyan(msg))

async function main() {
  let targetVersion = args._[0]
  if (!targetVersion) {
    // @ts-ignore
    const { release } = await prompt({
      type: "select",
      name: "release",
      message: "Select release type",
      choices: versionIncrements
        .map((i) => `${i} (${inc(i)})`)
        .concat(["custom"])
    })

    if (release === "custom") {
      const result = await prompt({
        type: "input",
        name: "version",
        message: "Input custom version",
        initial: currentVersion
      })
      // @ts-ignore
      targetVersion = result.version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }
  // @ts-ignore
  const { yes } = await prompt({
    type: "confirm",
    name: "yes",
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) {
    return
  }

  step("\nUpdating version...")
  updateVersions(targetVersion)

  step("\nGenerating changelog...")
  await run(`yarn`, ["run", "changelog"])

  const { stdout } = await run("git", ["diff"], { stdio: "pipe" })
  if (stdout) {
    step("\nCommitting changes...")
    await runIfNotDry("git", ["add", "-A"])
    await runIfNotDry("git", [
      "commit",
      "-m",
      `version: 升版本到 v${targetVersion}`
    ])
  } else {
    console.log("No changes to commit.")
  }

  step("\nPushing to GitHub...")
  const tagName = `v${targetVersion}-${dayjs(new Date()).format("YYYYMMDD")}`
  await runIfNotDry("git", ["tag", `${tagName}`])
  await runIfNotDry("git", ["push", "origin", `${tagName}`, "--follow-tags"]) // 同时推送代码和标签

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`)
  }
}

function updateVersions(version) {
  const pkgRoot = path.resolve(__dirname, "..")
  const pkgPath = path.resolve(pkgRoot, "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")
}

main().catch((err) => {
  updateVersions(currentVersion)
  console.error(err)
})
