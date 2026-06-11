# AGENTS.md — 高阶个人简历网站

## 项目概览

一个高阶个人简历网站，使用 Bootstrap 5.3 + 原生 HTML/CSS/JS 实现，具备响应式、暗色模式、Grid布局、组件化等高级特性。
设计风格：专业简约，领英蓝 #0a66c2 + 活力橙 #e67e22，圆角卡片，轻盈阴影。

## 技术栈

- **模板**：Coze native-static（纯静态文件，Python http.server 提供服务）
- **后端**：无（纯静态文件，表单为前端模拟）
- **前端**：HTML5 + CSS3 + JavaScript ES6
- **UI 框架**：Bootstrap 5.3.3（CDN 引入）+ Bootstrap Icons 1.11.3
- **字体**：Inter + Noto Sans SC（fonts.googleapis.cn）
- **服务**：`python -m http.server ${DEPLOY_RUN_PORT}`（5000 端口）
- **包管理**：无 npm 依赖（CDN 加载）

## 目录结构

```
/workspace/projects/
├── index.html              # 单页应用入口（含全部 9 个模块）
├── styles/
│   └── main.css            # 自定义样式（暗色模式、动画、响应式、打印）
├── scripts/
│   └── main.js             # 交互逻辑（打字机、数字滚动、筛选、表单）
├── DESIGN.md               # 设计规范（配色、字体、布局、响应式）
├── AGENTS.md               # 本文件
├── .coze                   # 启动配置（python http.server）
└── .gitignore
```

## 启动与开发

### 本地开发
1. 在 IDE 中打开 `/workspace/projects/` 目录
2. 运行 HTTP 服务器：
   ```bash
   cd /workspace/projects
   python -m http.server 5000
   # 浏览器访问 http://localhost:5000
   ```

### 沙箱预览
- 沙箱启动后 `python -m http.server 5000` 已在后台运行
- 访问 `${COZE_PROJECT_DOMAIN_DEFAULT}`

### 生产构建
本项目无构建步骤，`index.html` 即为生产产物。直接部署即可。

## 核心功能模块（index.html 中的 section）

| 模块 | 位置 | 关键文件/类 | 技术亮点 |
|------|------|------------|----------|
| 1. 导航栏 | `<nav class="navbar-custom">` | `scripts/main.js` → `initNavbarScroll()` | 滚动变色、平滑滚动、活跃高亮 |
| 2. Hero 头像区 | `<section class="hero-section">` | `initTypingEffect()` + `initCountUp()` | 打字机效果、统计数字滚动 |
| 3. 时间线经历 | `<section class="experience-section">` | CSS Grid + 伪元素 `::before` | 左右交替、响应式折叠 |
| 4. 技能进度条 | `<section class="skills-section">` | CSS 自定义进度条 + `initSkillBars()` | 宽度动画、软技能标签 |
| 5. 作品卡片 | `<section class="projects-section">` | `initProjectFilter()` | 筛选功能、悬停遮罩 |
| 6. 联系表单 | `<section class="contact-section">` | `initContactForm()` | 前端验证、模拟提交 |
| 7. 页脚 | `<footer class="site-footer">` | 纯展示 | 版权信息 |
| 8. 暗色切换 | `.theme-toggle` | `initTheme()` | localStorage 持久化 |
| 9. 返回顶部 | `#backToTop` | `initBackToTop()` | 滚动显示、平滑返回 |

## 设计语言

详见 `DESIGN.md`。**核心规则**：
- 主色：领英蓝 `#0a66c2` + 活力橙 `#e67e22`
- 字体：标题 Inter，正文 Noto Sans SC
- 卡片：圆角 1rem，轻盈阴影，悬停上移
- 动效：打字机效果、数字滚动、进度条动画、入场淡入

## 高阶特性清单

| 类别 | 技术 | 实现位置 |
|------|------|----------|
| CSS3 | Grid 布局 | 时间线左右交替 |
| CSS3 | Flex 布局 | 导航栏、技能标签、社交链接 |
| CSS3 | 过渡动画 | 卡片悬停、进度条、主题切换 |
| CSS3 | 伪元素 | 时间线连接线、徽章 |
| CSS3 | 媒体查询 | 响应式布局（手机/平板/电脑） |
| CSS3 | CSS 变量 | 暗色主题自定义（`:root` + `[data-bs-theme="dark"]`） |
| CSS3 | 打印样式 | `@media print` 隐藏导航、简化背景 |
| JS | DOM 操作 | 暗色切换、导航高亮 |
| JS | 事件监听 | 滚动监听、表单提交、筛选点击 |
| JS | IntersectionObserver | 入场动画、数字滚动触发 |
| JS | localStorage | 主题偏好持久化 |
| JS | requestAnimationFrame | 数字滚动动画 |
| Bootstrap | Navbar、Card、Form | 整体结构 |
| Bootstrap Icons | 图标库 | 社交、技能、导航 |

## 响应式断点

| 设备 | 断点 | 时间线 | 作品列数 |
|------|------|--------|----------|
| 手机 | <768px | 单列堆叠（移除左右交替） | 1 列 |
| 平板 | 768-991px | 单列 | 2 列 |
| 电脑 | ≥992px | 左右交替 | 3 列 |

## 常见问题

### 主题不切换
- 检查 localStorage 是否有 `theme` 键
- 手动清除：`localStorage.removeItem('theme')`

### 打字机不工作
- 检查 `#typingText` 元素是否存在
- 检查 `TYPING_TEXTS` 数组是否定义

### 作品筛选失效
- 检查 `.filter-btn` 和 `.project-item` 的 `data-filter` / `data-category` 属性

### 打印样式异常
- 使用 Chrome/Edge 打印预览
- 检查 `@media print` 规则是否生效

## 部署上线

推荐平台：
- **GitHub Pages**：仓库 Settings → Pages → 选择 main 分支根目录
- **Vercel**：推 GitHub → vercel.com 导入 → 自动部署
- **Netlify**：拖拽上传或 Git 集成

## 知识点覆盖（期末考点）

| 知识点 | 项目体现 |
|--------|----------|
| HTML5 语义化 | `<nav>`, `<section>`, `<footer>` |
| CSS3 选择器 | 类选择器、属性选择器、伪元素 |
| CSS3 盒子模型 | padding、margin、border、box-sizing |
| CSS3 Flex | `.hero-actions`, `.soft-skills-grid` |
| CSS3 Grid | `.social-links-grid` |
| CSS3 过渡 | `transition` 属性 |
| CSS3 动画 | `@keyframes` 定义 |
| CSS3 伪元素 | `.timeline::before` |
| CSS3 媒体查询 | `@media (max-width: ...)` |
| CSS3 变量 | `:root { --primary-color: ... }` |
| Bootstrap 栅格 | `.col-12 .col-md-6 .col-lg-4` |
| Bootstrap Navbar | `.navbar-expand-lg` |
| Bootstrap Card | `.project-card` |
| Bootstrap Form | `.form-floating` |
| Bootstrap Icons | `<i class="bi bi-*">` |
| JS DOM | `document.querySelector` |
| JS 事件 | `addEventListener` |
| JS localStorage | `setItem`, `getItem` |
| JS 定时器 | `setTimeout`, `requestAnimationFrame` |
| Git 版本控制 | `git add`, `commit`, `push` |