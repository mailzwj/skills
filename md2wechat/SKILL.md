---
name: md2wechat
description: 将 Markdown 文件或文本转换为微信公众号编辑器兼容的 HTML。当用户需要发布微信公众号文章、将 Markdown 转为公众号格式、制作公众号排版时使用。支持 6 种主题风格，所有样式内联，可直接粘贴到微信公众平台编辑器。
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

将 Markdown 内容转换为微信公众号编辑器兼容的 HTML。微信公众号编辑器会过滤外部 CSS 和 JavaScript，因此本技能所有样式均为内联样式，可直接粘贴使用。

- ✅ 使用 `marked` 解析 Markdown
- ✅ 6 种精美主题可选
- ✅ 完全内联样式，兼容公众号编辑器
- ✅ 支持代码块、表格、引用等复杂排版
- ✅ 支持文章封面、作者信息

## 使用方式

### 作为模块

```typescript
import { markdownToWechatHtml, THEMES } from './md2wechat';

const { html } = await markdownToWechatHtml(markdownContent, {
  theme: 'wechat-green',   // 主题名
  title: '文章标题',         // 可选，默认取 md 中的 h1
  author: '作者名',          // 可选
  coverImage: 'https://...', // 可选，封面图 URL
  wrapDocument: false,       // 是否包裹完整 HTML 文档
});
```

### 命令行

```bash
# 基本转换
md2wechat article.md

# 指定主题和输出文件
md2wechat article.md output.html --theme tech-purple

# 完整选项
md2wechat article.md output.html \
  --theme simple-blue \
  --title "我的文章" \
  --author "作者名" \
  --cover "https://example.com/cover.jpg" \
  --wrap

# 查看所有主题
md2wechat --list-themes
```

## 主题一览

| 主题 key | 名称 | 主色 | 风格 |
|----------|------|------|------|
| `wechat-green` | 经典绿 | `#07c160` | 微信公众号品牌风格 |
| `simple-blue` | 简约蓝 | `#2563eb` | 清新科技风 |
| `tech-purple` | 科技紫 | `#7c3aed` | 现代 AI 风格 |
| `warm-orange` | 文艺橙 | `#f97316` | 温暖治愈风 |
| `minimal-bw` | 极简黑白 | `#000000` | 高级极简感 |
| `fresh-gradient` | 清新渐变 | `#06b6d4` | 活力渐变风 |

## 转换流程

1. 读取 Markdown 内容
2. 配置 `marked` 解析器，注入 `WechatRenderer`（自定义渲染器）
3. `WechatRenderer` 将每个 Markdown 元素转换为带内联样式的 HTML 标签：
   - 标题 → `<h1>` ~ `<h6>` + 内联样式
   - 段落 → `<p style="...">`
   - 粗体 → `<span style="font-weight: bold">`
   - 代码块 → `<section><pre><code><span leaf="">...</span></code></pre></section>`
   - 表格 → `<table>` + 内联样式
   - 引用 → `<blockquote style="...">`
   - 列表 → `<ul>/<ol>` + 内联样式
   - 链接 → `<a style="color: ...">`
   - 分割线 → `<hr style="...">`
4. 可选：添加文章头部（标题、作者、封面）和尾部

## 技术要点

### 为什么用内联样式

微信公众号编辑器会做以下过滤：
- 移除所有 `<style>` 标签内容
- 移除 `class` 属性
- 移除 JavaScript
- 限制可用的 HTML 标签

因此，唯一可靠的方式是在每个标签上使用 `style` 属性写内联样式。

### 代码块格式

代码块使用微信公众号编辑器能识别的格式：
```html
<section>
  <pre class="code-snippet code-snippet_nowrap" data-lang="javascript">
    <code><span leaf="">行1代码</span></code>
    <code><span leaf="">行2代码</span></code>
  </pre>
</section>
```

### 图片处理注意

微信公众号要求图片上传到其服务器。转换后的 HTML 会保留原始图片 URL，但发布前需要：
1. 在公众号编辑器中将图片重新上传
2. 或使用 `wechatmp-publish` 技能自动上传替换

## 文件结构

```
md2wechat/
├── SKILL.md         # 技能定义（本文件）
├── package.json     # 依赖配置
├── index.ts         # 主入口：转换逻辑 + CLI
├── renderer.ts      # 自定义 marked 渲染器（内联样式）
└── templates.ts     # 6 套主题配色配置
```

## 相关技能

- `md2html` - 通用 Markdown 转 HTML（含外部 CSS 样式表）
- `wechatmp-publish` - 微信公众号文章发布（直接发布到公众号）
