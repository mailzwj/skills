# MD2WeChat

将 Markdown 转换为微信公众号编辑器兼容的 HTML。所有样式均为内联样式，可直接粘贴到微信公众平台编辑器使用。

## 特性

- 基于 `marked` 解析 Markdown，支持 GFM 语法
- **14 种精美主题**，覆盖中国风、品牌、科技、文艺、极简、赛博朋克等风格
- 基于 `highlight.js` 的代码语法高亮，class 自动转为内联 style
- 全部内联样式，兼容微信公众号的严格过滤规则
- 支持代码块、表格、引用、任务列表等复杂排版
- 支持文章封面图、作者信息等元数据
- 可作为 CLI 工具或 TypeScript 模块使用

## 安装

```bash
cd md2wechat
npm install
```

依赖：`marked` (^14.1.3)、`highlight.js`，运行时需要 `tsx`。

## CLI 使用

```bash
# 基本转换（输出到终端）
npx tsx index.ts article.md

# 指定主题和输出文件
npx tsx index.ts article.md output.html --theme tech-purple

# 完整选项
npx tsx index.ts article.md output.html \
  --theme simple-blue \
  --title "我的文章" \
  --author "作者名" \
  --cover "https://example.com/cover.jpg" \
  --wrap

# 查看所有主题
npx tsx index.ts --list-themes
```

| 选项 | 说明 |
|------|------|
| `--theme <名称>` | 主题样式（默认 `wechat-green`） |
| `--title <标题>` | 文章标题（默认使用 Markdown 中的 h1） |
| `--author <作者>` | 文章作者 |
| `--cover <URL>` | 封面图片 URL |
| `--wrap` | 包裹完整 HTML 文档（`<!DOCTYPE>` ~ `</html>`） |
| `--list-themes` | 列出所有可用主题 |

## 模块使用

```typescript
import { markdownToWechatHtml, THEMES } from "./md2wechat";

const { html } = await markdownToWechatHtml(markdownContent, {
  theme: "wechat-green",   // 主题名
  title: "文章标题",         // 可选，默认取 md 中的 h1
  author: "作者名",          // 可选
  coverImage: "https://...", // 可选，封面图 URL
  wrapDocument: false,       // 是否包裹完整 HTML 文档
});
```

## 主题一览

### 原始 6 主题

| 主题 key | 名称 | 主色 | 风格 |
|----------|------|------|------|
| `wechat-green` | 经典绿 | `#07c160` | 微信公众号品牌风格 |
| `simple-blue` | 简约蓝 | `#2563eb` | 清新科技风 |
| `tech-purple` | 科技紫 | `#7c3aed` | 现代 AI 风格 |
| `warm-orange` | 文艺橙 | `#f97316` | 温暖治愈风 |
| `minimal-bw` | 极简黑白 | `#000000` | 高级极简感 |
| `fresh-gradient` | 清新渐变 | `#06b6d4` | 活力渐变风 |

### 新增 8 主题

| 主题 key | 名称 | 主色 | 风格 |
|----------|------|------|------|
| `chinese-red` | 中国红 | `#F25C54` | 朱红热烈 |
| `chinese-style` | 中国风 | `#8b1e22` | 宣纸楷书、古典雅致 |
| `byte-flavor` | 字节 | `#1677ff` | 字节跳动设计语言 |
| `sunset` | 日落 | `#d78a54` | 日落暖棕、衬线文艺 |
| `apple-style` | 苹果 | `#007aff` | Apple 极简风格 |
| `cyberpunk` | 赛博 | `#8b5cf6` | 赛博朋克霓虹渐变 |
| `sporty` | 运动风 | `#00A968` | 活力运动/户外 |
| `warm-earth` | 暖土 | `#c86442` | 陶土温暖、默认通用 |

## 代码语法高亮

MD2WeChat 集成了 `highlight.js`，自动对代码块进行语法高亮。高亮颜色（class → 内联 style 映射）基于 GitHub 主题：

- **亮色代码块**（`darkCode: false`）：GitHub 亮色主题颜色
- **暗色代码块**（`darkCode: true`）：GitHub 暗色主题颜色

微信公众号不支持 `<link>` 和 `class` 属性，因此高亮结果中的所有 `class="hljs-*"` 均已在转换时替换为 `style="..."` 内联属性。

支持的编程语言：highlight.js 内建的全部语言（JavaScript、TypeScript、Python、Bash、Rust 等）。

## 为什么用内联样式

微信公众号编辑器会对粘贴的 HTML 做以下过滤：

- 移除所有 `<style>` 标签
- 移除 `class` 属性
- 移除 JavaScript
- 限制可用的 HTML 标签

因此唯一可靠的方式是在每个标签上使用 `style` 属性写入内联样式。

## 图片说明

微信公众号要求图片上传到其服务器。转换后的 HTML 会保留原始图片 URL，发布前需要：

1. 在公众号编辑器中手动将图片重新上传
2. 或使用 `auto-wechatmp` 技能自动上传替换

## 文件结构

```
md2wechat/
├── SKILL.md         # 技能定义
├── README.md        # 本文件
├── package.json     # 依赖配置
├── index.ts         # 主入口：转换逻辑 + CLI
├── renderer.ts      # 自定义 marked 渲染器（内联样式生成）
├── templates.ts     # 14 套主题配色配置
├── highlight.ts     # 代码语法高亮（highlight.js → 内联 style）
└── templates/       # 8 套主题 HTML 模板参考
```

## 相关技能

- `auto-wechatmp` — 微信公众号文章自动发布（直接发布到公众号）
