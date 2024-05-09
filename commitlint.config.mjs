const config = {
  parserPreset: "conventional-changelog-conventionalcommits",
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "version"
      ]
    ]
  },
  prompt: {
    questions: {
      type: {
        description: "请选择提交类型",
        enum: {
          feat: {
            description: "新特性",
            title: "Features",
            emoji: "✨"
          },
          fix: {
            description: "热修复",
            title: "Bug Fixes",
            emoji: "🐛"
          },
          docs: {
            description: "文档更新",
            title: "Documentation",
            emoji: "📚"
          },
          style: {
            description: "代码格式化、缺失分号等不影响代码逻辑的修改",
            title: "Styles",
            emoji: "💎"
          },
          refactor: {
            description: "代码重构，既不修复错误也不添加功能",
            title: "Code Refactoring",
            emoji: "📦"
          },
          perf: {
            description: "性能优化",
            title: "Performance Improvements",
            emoji: "🚀"
          },
          test: {
            description: "添加缺失的测试，或更正现有的测试",
            title: "Tests",
            emoji: "🚨"
          },
          build: {
            description: "影响构建系统或外部依赖的更改",
            title: "Builds",
            emoji: "🛠"
          },
          ci: {
            description: "对CI配置文件和脚本的更改",
            title: "Continuous Integrations",
            emoji: "⚙️"
          },
          chore: {
            description: "其他不修改源代码的更改",
            title: "Chores",
            emoji: "♻️"
          },
          revert: {
            description: "回滚到以前的提交",
            title: "Reverts",
            emoji: "🗑"
          },
          version: {
            description: "版本发布",
            title: "Version",
            emoji: "🔖"
          }
        }
      },
      scope: {
        description: "本次提交的影响范围（可选）"
      },
      subject: {
        description: "简短描述本次提交的内容"
      },
      body: {
        description: "详细描述本次提交的内容（可选）"
      },
      isBreaking: {
        description: "是否有破坏性变更?"
      },
      breakingBody: {
        description: "破坏性变更的详细描述. 请在下面输入更多信息"
      },
      breaking: {
        description: "列出所有破坏性变更"
      },
      isIssueAffected: {
        description: "本次提交是否影响了某个问题?"
      },
      issuesBody: {
        description: "如果问题已关闭，请提供更多信息. 请在下面输入更多信息"
      },
      issues: {
        description: '列出本次提交所影响的问题（例如："fix #123"）'
      }
    }
  }
}
export default config
