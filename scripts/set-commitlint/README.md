# 自动设置 commitlint 规范提交脚本

规范提交这些应该是脚手架的事情，目前个人使用场景就是官方脚手架 + 手动配置。 虽然每次安装 commitlint 把这一套走通很简单，但是重复且枯燥，此脚本希望直接运行下就什么都不用去管了

# 使用方法

1. 将 `scripts/set-commitlint` 文件夹放置项目根目录
2. 在 `package.json` 中增加一行 `script`，如下：

```
"set-commitlint": "node scripts/set-commitlint/index.js",
```

3. 执行命令 `npm run set-commitlint`
