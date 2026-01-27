# .agent/AESTHETIC_CONSTITUTION.md - 全局审美宪法

## 第一章：视觉语义与调性 (Visual Identity)

1.1 **核心基调**：**科技沉浸与复古呼吸 (Cyber-Organic Mix)** - 项目结合了高精度的科技感组件 (HeroUI) 与富有生命力的有机细节（如纸张纹理背景、手写感字体 LXG）。- _视觉要求_：所有新增 UI 必须保持高透明度 (`backdrop-blur`) 与细腻的动效反馈。

1.2 **调色体系 (Palette)** - **Primary (Highlight)**: `#61B9AF` (Light) | `pink` (Dark) —— 代表核心交互与引动。- **Accent (Gloria)**: `#8A2BE2` (Light) | `#BD33A4` (Dark) —— 代表情感注入与品牌点缀。- **Background**: 强制带有 `opacity: 0.04` 的 PNG 噪声纹理，模拟纸张颗粒感。

1.3 **排版规范 (Typography)** - 标题优先使用 **LXGWWenKaiMonoScreen**（如有），展现人文日志感。- 交互元素使用标准的 Sans-serif，确保功能清晰。

## 第二章：交互动效律法 (Motion & Interaction)

2.1 **全局缓动曲线 (Easing)** - 线性载入：`linear` - 物理回弹：`cubic-bezier(0.25, 0.1, 0.25, 1.0)` (Snow Fall) - 默认响应：`ease-in-out` (Sway, Breathe)

2.2 **时间阶梯 (Duration)** - 微交互 (Hover/Tab)：`200ms - 300ms` - 页面级入场：`2s` (Slide-up) - 背景环境 (Atmosphere)：`10s - 20s` (Snow/Spin)

## 第三章：国际化 (i18n) 与工程规范

3.1 **地缘化契约** - 严禁在 `.tsx` 中出现硬编码中文字符。- 命名空间采用小驼峰 (header) 或下划线 (daily_logs)，保持字典结构深度。

3.2 **组件拓扑** - 优先基于 **HeroUI** 进行变体扩展。- 新增样式必须映射至 `tailwind.config.ts` 中的 `theme.extend`。

---

> [!IMPORTANT] > **宪法效力**：本文件是项目视觉一致性的最高准则。`/new-page`, `/refactor-ui` 及 `/code-review` 工作流将强制对标本文件执行。
