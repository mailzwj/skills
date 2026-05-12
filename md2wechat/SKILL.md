---
name: md2wechat
description: 将 Markdown 文件或文本转换为微信公众号编辑器兼容的 HTML。当用户需要发布微信公众号文章、将 Markdown 转为公众号格式、制作公众号排版时使用。支持 14 种主题风格，代码语法高亮，所有样式内联，可直接粘贴到微信公众平台编辑器。
type: tool
user-invocable: true
metadata:
  {
    "openclaw": {
      "emoji": "📱",
      "primaryEnv": null
    }
  }
---

# MD2WeChat - Markdown 转微信公众号 HTML

## 功能概述

将 Markdown 内容转换为微信公众号编辑器兼容的 HTML。微信公众号编辑器会过滤外部 CSS 和 JavaScript，因此所有样式均为内联样式，可直接粘贴使用。

- ✅ `marked` 解析 Markdown（支持 GFM）
- ✅ `highlight.js` 代码语法高亮（class → 内联 style）
- ✅ 14 种主题，覆盖品牌、科技、中国风、赛博朋克等风格
- ✅ 支持标题、段落、粗体、斜体、删除线、链接、图片
- ✅ 支持代码块、行内代码、表格、引用、有序/无序列表、分割线
- ✅ 支持任务列表（checkbox）、HTML 直通
- ✅ 可选文章头部（标题、作者、封面图）和尾部

## 使用方式

### CLI 命令行

```bash
# 基本转换（输出到 stdout）
npx tsx index.ts article.md

# 指定主题和输出文件
npx tsx index.ts article.md output.html --theme tech-purple

# 完整选项
npx tsx index.ts article.md output.html \
  --theme chinese-red \
  --title "我的文章" \
  --author "作者名" \
  --cover "https://example.com/cover.jpg" \
  --wrap

# 列出所有主题
npx tsx index.ts --list-themes
```

### 作为模块

```typescript
import {
  markdownToWechatHtml,
  THEMES,          // Record<string, ThemeConfig>
  THEME_NAMES,     // string[]
  THEME_LABELS,    // Record<string, string>
  WechatRenderer,  // 自定义 marked 渲染器
} from './md2wechat';
import type { ThemeConfig, WechatOptions } from './md2wechat';

const { html, theme } = await markdownToWechatHtml(markdownContent, {
  theme: 'wechat-green',    // 主题名，默认 "wechat-green"
  title: '文章标题',          // 可选，默认取 md 中第一个 h1
  author: '作者名',           // 可选
  coverImage: 'https://...',  // 可选，封面图 URL
  wrapDocument: false,        // 默认 false，true 时包裹完整 HTML 文档
});
```

## 主题一览

| 主题 key | 名称 | 主色 | 代码块 |
|----------|------|------|--------|
| `wechat-green` | 经典绿 | `#07c160` | 暗色 |
| `simple-blue` | 简约蓝 | `#2563eb` | 暗色 |
| `tech-purple` | 科技紫 | `#7c3aed` | 暗色 |
| `warm-orange` | 文艺橙 | `#f97316` | 暗色 |
| `minimal-bw` | 极简黑白 | `#000000` | 亮色 |
| `fresh-gradient` | 清新渐变 | `#06b6d4` | 暗色 |
| `chinese-red` | 中国红 | `#F25C54` | 亮色 |
| `chinese-style` | 中国风 | `#8b1e22` | 亮色 |
| `byte-flavor` | 字节 | `#1677ff` | 亮色 |
| `sunset` | 日落 | `#d78a54` | 亮色 |
| `apple-style` | 苹果 | `#007aff` | 亮色 |
| `cyberpunk` | 赛博 | `#8b5cf6` | 亮色 |
| `sporty` | 运动风 | `#00A968` | 亮色 |
| `warm-earth` | 暖土 | `#c86442` | 亮色 |

## 转换流程

1. 读取 Markdown 内容，可选提取第一个 h1 作为文章标题
2. 根据主题名查找 `ThemeConfig`（`templates.ts` 中定义）
3. 创建 `WechatRenderer` 实例，传入 `marked.parse()` 解析
4. 渲染器将每种 AST token 转为带内联 `style` 属性的 HTML：
   - **h1** — 左侧主色竖线装饰
   - **h2** — 带背景色块
   - **h3~h6** — 辅色文字
   - **代码块** — `highlight.js` 语法高亮后逐行 `<code>` 标签
   - **行内代码** — 主题色文字 + 浅色背景
   - **表格** — 表头着色 + 奇偶行交替色
   - **引用** — 左侧主色边框 + 浅色背景
   - **链接** — 主色文字 + 下划线
   - **图片** — 居中、圆角、最大宽度自适应
5. 拼接文章头部（封面、标题、作者）和尾部（分割线 + 生成标识）

## 技术要点

### 为什么用内联样式

微信公众号编辑器会做以下过滤：
- 移除 `<style>` 标签
- 移除 `class` 属性
- 移除 JavaScript
- 限制可用 HTML 标签

因此每个标签必须通过 `style` 属性携带样式。

### 代码语法高亮

`highlight.ts` 包含两套完整的颜色映射表（亮色/暗色），覆盖约 40 种 highlight.js class：

- **亮色（light）**：基于 GitHub 亮色主题，用于 `darkCode: false` 的主题
- **暗色（dark）**：基于 GitHub 暗色主题，用于 `darkCode: true` 的主题

流程：`highlight.js 高亮` → `替换 class 为内联 style` → `按行拆分 <code>` → `空格替换为 &nbsp;` → `还原转义实体（&#39;/&#x27; → '，&quot;/&#x22; → "）`

### 代码块格式

每行独立 `<code>` 标签（微信编辑器会在单个 `<code>` 内折叠换行）。空行用零宽空格（`&#8203;`）保底，空格/tab 替换为 `&nbsp;`。

```html
<section style="margin: 14px 0; overflow-x: auto; background-color: #fafafa;
                border-radius: 6px; padding: 14px 16px;" data-lang="javascript">
  <code style="font-size: 13px; display: block; white-space: pre; ...">
    <span style="color:#d73a49">function</span>&nbsp;<span style="color:#6f42c1">hello</span>()&nbsp;{...}
  </code>
</section>
```

### 图片处理

微信公众号要求图片上传到其服务器。转换后保留原始 URL，发布前需在公众号编辑器中重新上传，或使用 `auto-wechatmp` 技能自动上传替换。

## 文件结构

```
md2wechat/
├── SKILL.md              # 技能定义
├── package.json          # marked + highlight.js
├── index.ts              # 主入口：markdownToWechatHtml() + CLI
├── renderer.ts           # WechatRenderer（marked 自定义渲染器）
├── templates.ts          # ThemeConfig 接口 + 14 套主题配色
├── highlight.ts          # highlight.js → 内联样式转换
└── convert-spaced.mjs    # 便捷脚本（可修改路径后直接转换）
```

## 相关技能

- `auto-wechatmp` — 微信公众号文章自动发布（上传图片 + 发布 HTML 到公众号）
