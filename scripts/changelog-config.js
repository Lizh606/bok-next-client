const config = {
  writerOpts: {
    transform: (commit, context) => {
      // 从 MR 描述中提取信息
      const mrMatch = commit.header.match(/Merge branch '(.+)' into 'main'/)
      if (mrMatch) {
        const mrDescription = commit.body
        // 解析 MR 描述中的变更信息
        return {
          type: getMRType(mrDescription),
          subject: getMRTitle(mrDescription),
          mr: getMRNumber(commit.header)
        }
      }
      return null // 忽略非 MR 提交
    },
    groupBy: "type",
    commitGroupsSort: ["feat", "fix", "perf", "refactor"],
    commitsSort: ["mr"],
    noteGroupsSort: ["BREAKING CHANGE"]
  }
}

// 辅助函数：从 MR 标题中提取类型
function getMRType(description) {
  const typeMatch = description.match(
    /^(feat|fix|perf|refactor|chore|docs|style|test|ci|build|revert):/i
  )
  return typeMatch ? typeMatch[1] : "other"
}

// 辅助函数：从 MR 标题中提取描述
function getMRTitle(description) {
  const titleMatch = description.match(
    /^(?:feat|fix|perf|refactor|chore|docs|style|test|ci|build|revert):\s*(.+)/i
  )
  return titleMatch ? titleMatch[1].trim() : description.trim()
}

// 辅助函数：从合并提交信息中提取 MR 编号
function getMRNumber(header) {
  const mrNumberMatch = header.match(/See merge request .+!(\d+)/)
  return mrNumberMatch ? mrNumberMatch[1] : ""
}

module.exports = config
