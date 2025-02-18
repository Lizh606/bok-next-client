const config = {
  writerOpts: {
    transform: (commit, context) => {
      // 处理常规的 conventional commit
      const issues = []

      if (typeof commit.hash === "string") {
        commit.shortHash = commit.hash.substring(0, 7)
      }

      // 解析 conventional commit 格式
      const COMMIT_PATTERN = /^(\w+)(?:\(([\w\$\.\-\* ]*)\))?(!)?:\s(.*)$/
      const match = commit.header.match(COMMIT_PATTERN)
      if (match) {
        const [, type, scope, breaking, subject] = match

        // 处理 BREAKING CHANGE
        if (
          breaking ||
          (commit.body && commit.body.includes("BREAKING CHANGE"))
        ) {
          commit.notes.push({
            title: "BREAKING CHANGES",
            text: subject
          })
        }

        return {
          type: type,
          scope: scope,
          subject: subject,
          issues: issues
        }
      }

      // 处理合并提交
      const mrMatch = commit.header.match(/Merge branch|Merge pull request/)
      if (mrMatch) {
        return {
          type: "chore",
          subject: commit.header,
          issues: issues
        }
      }

      return commit
    },
    groupBy: "type",
    commitGroupsSort: [
      "feat",
      "fix",
      "perf",
      "refactor",
      "chore",
      "docs",
      "style",
      "test",
      "ci",
      "build",
      "revert"
    ],
    noteGroupsSort: ["BREAKING CHANGE"]
  }
}

module.exports = config
