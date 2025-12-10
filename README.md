# XiaoHang个人博客

## 项目简介

这是一个基于现代Web技术栈开发的个人博客系统，采用前后端分离架构。本项目不仅是一个博客平台，更是一次技术实践和学习的过程。

## 项目目标

1. **技术实践**

   - 深入学习 Next.js新特性
   - 实践前后端分离架构
   - 提升全栈开发能力

2. **内容平台**
   - 构建个人知识管理系统
   - 沉淀技术博文
   - 分享学习心得

## 核心功能

- 📝 文章管理：发布、编辑、删除
- 🏷️ 分类管理：多维度文章归类
- 🔍 搜索功能：全文检索
- 📊 文章归纳：个人文章时间线
- 🎨 主题切换：明暗模式支持

## 技术架构

### 前端（博客）

- **框架**: Next.js
- **UI组件**: NextUI
- **样式方案**: TailwindCSS
- **状态管理**: Jotai
- **编辑器**: Cursor

### 管理后台

- **框架**: Vue 3
- **构建工具**: Vite
- **状态管理**: Pinia
- **UI组件**: Element Plus

### 服务端

- **框架**: Nest.js
- **语言**: TypeScript
- **ORM**: TypeORM
- **数据库**: MySQL

## 在线预览

- 博客前台：[https://www.wanyue.me](https://www.wanyue.me)
- 博客运维：[https://wanyue.me/admin](https://wanyue.me/admin)
- Api文档：[https://wanyue.me/api/api-doc](https://wanyue.me/api/api-doc)

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 开发计划

### 近期计划

- [ ] SEO全文搜索
- [ ] 用户认证系统（OAuth 集成）
- [x] 评论互动功能

### 长期规划

- [ ] 性能优化
- [ ] SEO完善
- [ ] 国际化支持

## 版本发布流程

### 前置条件
- 已安装 pnpm (`npm install -g pnpm`)
- 有仓库推送权限，工作区干净

### 发布分支策略
- 发布在 release 分支（如 `release/vX.Y.Z`），避免未完成的提交影响发布。
- 发布后将 release 分支合并回 `main`（或 cherry-pick 发布提交），让版本号/CHANGELOG 回流主干。

### 发布步骤
1) 准备发布分支
```bash
git checkout main
git pull origin main
git checkout -b release/vX.Y.Z
pnpm install
```

2) 执行发布
```bash
pnpm release
```
- 选择版本类型（patch/minor/major/custom）
- 确认版本号

3) 自动化步骤
- 更新 `package.json` 版本号
- 生成/更新 `CHANGELOG.md`
- 提交变更并创建标签（`v版本号-YYYYMMDD`）
- 推送代码和标签

4) 合并回主干
```bash
git checkout main
git pull origin main
git merge --no-ff release/vX.Y.Z   # 或 cherry-pick 发布提交
git push origin main
```

5) 清理 release 分支
```bash
git branch -d release/vX.Y.Z
git push origin --delete release/vX.Y.Z  # 若已推送
```

### 注意事项

1. 发布前请确保所有代码已经完成测试
2. 可以使用 `--dry` 参数进行试运行：
   ```bash
   pnpm release --dry
   ```
3. 如果发布过程中出现错误，系统会自动回滚版本号

### 回滚方法

如果发布后发现问题需要回滚：

1. 删除本地标签：

   ```bash
   git tag -d <标签名>
   ```

2. 删除远程标签：

   ```bash
   git push origin --delete <标签名>
   ```

3. 重置版本号：
   - 手动修改 package.json 中的版本号
   - 或重新运行 release 命令选择正确的版本

### 常见问题

1. 如果提示权限错误，请检查 GitHub 账号权限设置
2. 如果 CHANGELOG 生成失败，请确保 commit 信息格式符合规范
3. 如果标签推送失败，可能是网络问题，请重试推送命令

## 贡献指南

欢迎提交 Issue 或 Pull Request 来帮助改进项目。
