import { exec } from "node:child_process"
import fs from "node:fs"
import path, { dirname } from "node:path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

function getPackageJson() {
  const content = fs.readFileSync("package.json", "utf-8")
  const packageJson = JSON.parse(content)
  return packageJson
}
function isModuleExist(moduleName) {
  const root = process.cwd()
  const modulesPath = path.resolve(root, "node_modules", moduleName)
  const packageJson = getPackageJson()
  if (packageJson.dependencies && packageJson.dependencies[moduleName]) {
    return fs.existsSync(modulesPath)
  }
  if (packageJson.devDependencies && packageJson.devDependencies[moduleName]) {
    return fs.existsSync(modulesPath)
  }
  return false
}

function getNodePackageTool() {
  const yarnLock = "yarn.lock"
  const packageLock = "package-lock.json"
  const pnpmLock = "pnpm-lock.yaml"
  const root = process.cwd()
  if (fs.existsSync(path.resolve(root, yarnLock))) {
    return "yarn"
  } else if (fs.existsSync(path.resolve(root, packageLock))) {
    return "npm"
  } else if (fs.existsSync(path.resolve(root, pnpmLock))) {
    return "pnpm"
  } else {
    return ""
  }
}

function installModule(moduleName, packageTool) {
  let command = ""
  switch (packageTool) {
    case "yarn":
      command = `yarn add ${moduleName} -D`
      break
    case "npm":
      command = `npm install ${moduleName} -D`
      break
    case "pnpm":
      command = `pnpm add ${moduleName} -D`
      break
    default:
      command = `npm install ${moduleName} -D`
      break
  }
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      if (stdout) {
        resolve(stdout)
      }
    })
  })
}

async function isNodeVersionValid(packageTool) {
  const NODE_VERSION = ">=v18"
  const curNodeVersion = process.version
  const moduleName = "semver"
  try {
    if (!isModuleExist(moduleName)) {
      await installModule(moduleName, packageTool)
    }
    const semver = await import(moduleName)
    return semver.satisfies(curNodeVersion, NODE_VERSION)
  } catch (error) {
    console.log(error)
  }
}

function xRun(xName, command) {
  const executeMap = {
    yarn: `npx ${command}`,
    npm: `npx ${command}`,
    pnpm: `pnpm dlx ${command}`
  }
  return executeMap[xName]
}

function setHuskyConfig(packageTool) {
  const initHuskyCommand = xRun(packageTool, "husky init")
  exec(initHuskyCommand, (error) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    const content = `"npx --no -- commitlint --edit \\$1"`
    exec(`echo ${content}` + `> .husky/commit-msg`)
    fs.rmSync(".husky/pre-commit", { force: true })
  })
}

function setCommitlintConfig() {
  const writeStream = fs.createWriteStream("commitlint.config.js")
  const templatePath = path.resolve(__dirname, "template.mjs")
  fs.createReadStream(templatePath).pipe(writeStream)
}

async function setPackageJson() {
  const packageJson = getPackageJson()
  packageJson.scripts = {
    ...packageJson.scripts,
    commit: "cz"
  }
  packageJson.config = {
    ...(packageJson.config || {}),
    commitizen: {
      path: "@commitlint/cz-commitlint"
    }
  }
  await fs.promises.writeFile(
    "package.json",
    JSON.stringify(packageJson, null, 2)
  )
}

async function main() {
  const packageTool = getNodePackageTool()
  const isVersionValid = await isNodeVersionValid(packageTool)
  if (!isVersionValid) {
    console.error("Node 版本过低，请升级至 v18 以上")
    process.exit(1)
  }
  const needInstallModules = [
    "@commitlint/cli",
    "@commitlint/config-conventional",
    "@commitlint/cz-commitlint",
    "commitizen",
    "husky"
  ].filter((moduleName) => !isModuleExist(moduleName))

  for (let moduleName of needInstallModules) {
    await installModule(moduleName, packageTool)
  }
  setHuskyConfig(packageTool)
  setCommitlintConfig()
  setPackageJson()
}
main()
