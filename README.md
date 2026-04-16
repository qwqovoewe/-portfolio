# 王睿轩 | Portfolio

个人作品集网站，基于 Astro + Tailwind CSS 构建，部署于 GitHub Pages。

**线上地址：** https://qwqovoewe.github.io/-portfolio

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Astro](https://astro.build) | v6 | 静态站点框架 |
| [Tailwind CSS](https://tailwindcss.com) | v4 | 样式 |
| [Atropos](https://atroposjs.com) | v2 | 3D 视差悬停效果 |
| TypeScript | — | 类型安全 |

---

## 功能

- **Hero**：全屏落地页，文字粒子背景（Canvas），鼠标/小猫互动波纹，Atropos 3D 倾斜
- **项目经历**：项目卡片支持 3D 视差，点击进入详情页（含截图画廊）
- **成长历程**：时间线展示关键里程碑
- **文章**：外链文章列表，支持多平台标记
- **关于我**：简介、技术栈（可点击弹窗查看详情）、荣誉奖项、联系方式
- 深色 / 亮色主题切换，滚动进度条，跟手光晕

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev        # http://localhost:4321/-portfolio

# 构建
npm run build

# 本地预览构建产物
npm run preview
```

> 需要 Node.js >= 22.12.0

---

## 内容配置

所有个人信息、项目、文章、技术栈均集中在一个文件：

```
src/data/content.ts
```

### 修改个人信息

编辑 `profile` 对象：姓名、简介、教育背景、联系方式、荣誉奖项。

### 新增项目

在 `projects` 数组里追加：

```ts
{
  slug: "my-project",          // URL 路径
  name: "项目名称",
  type: "独立项目",             // 或 "实习项目"
  company: "公司 / 组织",
  period: "2025.01 - 2025.06",
  role: "独立开发",
  description: "一句话描述",
  overview: "详细概述",
  highlights: ["亮点1", "亮点2"],
  techStack: ["Java", "Redis"],
  screenshots: [],             // 见下方截图说明
}
```

### 添加项目截图

截图放在 `public/screenshots/{slug}/` 目录下，命名规范：

```
01-overview.png      # 总览
02-dashboard.png     # 仪表盘
03-detail.png        # 详情
```

然后在对应项目的 `screenshots` 数组里填入：

```ts
screenshots: [
  { src: "/screenshots/my-project/01-overview.png", caption: "总览" },
]
```

### 新增文章

在 `articles` 数组里追加：

```ts
{
  label: "写给xxx的",
  title: "文章标题",
  platform: "飞书文档",        // 飞书文档 / 掘金 / 微信公众号 等
  url: "https://...",
  date: "2026.04",
  description: "文章简介",
  tags: ["标签1", "标签2"],
}
```

---

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

配置文件：`.github/workflows/`（若无，参考 Astro 官方 [GitHub Pages 部署文档](https://docs.astro.build/en/guides/deploy/github/)）

`astro.config.mjs` 中的 `base` 与 `site` 需与仓库名保持一致：

```js
site: 'https://qwqovoewe.github.io',
base: '/-portfolio',
```

---

## 目录结构

```
src/
├── components/
│   ├── Oneko.astro        # 跟随鼠标的像素猫
│   └── RippleText.astro   # Canvas 文字粒子 + 波纹
├── data/
│   └── content.ts         # 所有内容配置（改这里）
├── layouts/
│   └── Layout.astro       # 全局布局、导航、主题
└── pages/
    ├── index.astro         # 主页
    ├── projects.astro      # 项目列表
    ├── projects/[slug].astro  # 项目详情
    ├── blog/index.astro    # 文章列表
    ├── timeline.astro      # 时间线
    └── about.astro         # 关于
public/
└── screenshots/            # 项目截图（按 slug 分目录）
```
