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

### 版本号说明 (SemVer)

我们使用语义化版本控制（[SemVer](https://semver.org/lang/zh-CN/)）进行版本管理。版本号格式：`主版本号.次版本号.修订号`，例如：`1.2.3`

- **主版本号(Major)**：当进行不兼容的 API 修改时，如：

  - 删除或重命名已存在的API
  - 修改现有功能的行为方式
  - 重大重构或架构调整

  ```bash
  npm run release:major # 1.2.3 -> 2.0.0
  ```

- **次版本号(Minor)**：当添加向下兼容的新功能时，如：

  - 新增功能模块
  - 新增API但保持向下兼容
  - 标记某些功能为弃用

  ```bash
  npm run release:minor # 1.2.3 -> 1.3.0
  ```

- **修订号(Patch)**：当进行向下兼容的问题修复时，如：
  - Bug修复
  - 性能优化
  - 文档更新
  ```bash
  npm run release:patch # 1.2.3 -> 1.2.4
  ```

### 发布步骤

1. **创建发布分支**

```bash
# 从最新的main分支创建发布分支
git checkout -b release/v0.1.0
```

2. **在发布分支上进行版本升级**

```bash
# 确保代码已提交
git status
git add .
npm run commit

# 执行版本升级
npm run release:minor  # 或 major/patch
```

3. **测试验证**

- 确保所有测试通过
- 验证 CHANGELOG.md 内容
- 确认版本号更新正确
- 本地测试功能完整性

4. **合并到 main**

```bash
# 切回 main 分支
git checkout main
git pull origin main

# 合并发布分支
git merge release/v0.1.0 --no-ff
git push origin main --follow-tags

# 可选：删除发布分支
git branch -d release/v0.1.0
git push origin :release/v0.1.0
```

5. **发布后检查**

- 确认 main 分支的 tag 已正确推送
- 验证 CHANGELOG.md 已更新到远程
- 检查 package.json 版本号

### 开发阶段版本（0.x.x）

当项目处于初始开发阶段时，版本号以 0 开头：

- **0.x.x**: 表示项目处于开发阶段，API 不稳定
- **0.x.0**: 表示功能性更新
- **0.0.x**: 表示 bug 修复

```bash
# 开发阶段功能更新
pnpm run release:minor # 0.1.0 -> 0.2.0

# 开发阶段问题修复
npm run release:patch # 0.1.0 -> 0.1.1
```

### 预发布版本

对于需要测试的版本，可以使用预发布标识：

```bash
# 生成 beta 预发布版本
pnpm run release -- --prerelease beta # 1.2.3 -> 1.2.4-beta.0

# 生成 rc (Release Candidate) 版本
pnpm run release -- --prerelease rc # 1.2.3 -> 1.2.4-rc.0
```

### 版本回退

如果发布出现问题需要回退：

```bash
# 1. 修改版本号
pnpm version 0.1.0 -f --no-git-tag-version

# 2. 删除错误的 tag
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0

# 3. 重置 CHANGELOG
rm CHANGELOG.md
npx standard-version --release-as 0.1.0 --skip.tag

# 4. 提交更改
git add .
git commit -m "chore: 回退到版本 0.1.0"
git push -f
```

## 贡献指南

欢迎提交 Issue 或 Pull Request 来帮助改进项目。
