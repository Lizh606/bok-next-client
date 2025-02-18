const config = {
  writerOpts: {
    mainTemplate: `# Changelog\n\n{{> header}}\n\n{{#each commitGroups}}\n{{#if title}}\n### {{title}}\n\n{{/if}}\n{{#each commits}}\n{{> commit root=@root}}\n{{/each}}\n{{/each}}\n\n{{> footer}}`,
    headerTemplate: `# [{{version}}]({{compareUrlFormat}}) ({{date}})\n`,
    transform: (commit, context) => {
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
    noteGroupsSort: ["BREAKING CHANGE"],
    commitUrlFormat:
      "https://github.com/Lizh606/bok-next-client/commit/{{hash}}",
    compareUrlFormat:
      "https://github.com/Lizh606/bok-next-client/compare/{{previousTag}}...{{currentTag}}"
  }
}

module.exports = config
