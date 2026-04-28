# 📮 Auto-WeChatMP

微信公众号文章自动发布工具，整合 HTML 内容准备、封面上传、草稿创建和群发发布的全流程。

## 功能特性

- **一键发布** —— 从 HTML/Markdown 文件到公众号发布，一条命令完成
- **Markdown 自动转换** —— Markdown 文件自动转为微信公众号兼容 HTML
- **封面支持** —— 支持本地图片或远程 URL 作为文章封面
- **交互式补全** —— 缺少标题、作者等参数时通过问答补全
- **草稿管理** —— 支持仅创建草稿、查询草稿列表、删除草稿

## 快速开始

### 1. 前置要求

- **已认证的微信公众号**（服务号或已认证订阅号）
- **Node.js** >= 18

### 2. 环境变量

```bash
# Windows PowerShell
$env:WECHATMP_APPID="你的 AppID"
$env:WECHATMP_APPSECRET="你的 AppSecret"

# macOS / Linux
export WECHATMP_APPID="你的 AppID"
export WECHATMP_APPSECRET="你的 AppSecret"
```

### 3. 安装依赖

```bash
cd auto-wechatmp
npm install
```

### 4. 发布文章

```bash
# 从 HTML 文件发布
npx tsx src/auto-wechatmp.ts publish \
  --title "文章标题" \
  --author "作者名" \
  --file "./article.html" \
  --cover "https://example.com/cover.jpg"

# 从 Markdown 文件发布
npx tsx src/auto-wechatmp.ts publish \
  --title "AI 周报" \
  --author "AI编辑" \
  --file "./weekly.md"
```

## 命令参考

| 命令 | 说明 |
|------|------|
| `publish` | 一键发布文章（上传封面 → 创建草稿 → 发布） |
| `draft` | 仅创建草稿，不发布 |
| `upload-cover` | 上传封面图片，返回 `thumb_media_id` |
| `list-drafts` | 查询草稿列表 |
| `delete-draft` | 删除指定草稿 |
| `help` | 显示帮助信息 |

## 参数说明

| 参数 | 必需 | 说明 |
|------|------|------|
| `--title` | 是 | 文章标题，不超过 64 字 |
| `--author` | 否 | 文章作者，默认 "遇见AI"（不超过 8 字） |
| `--file` | 二选一 | HTML 或 Markdown 文件路径 |
| `--content` | 二选一 | HTML 内容字符串 |
| `--cover` | 否 | 封面图片 URL 或本地路径（支持 jpg/png/gif） |
| `--digest` | 否 | 文章摘要，不超过 54 字，默认截取标题 |

## 发布流程

```
用户输入 → 解析参数 → 交互补全缺失项 → 内容准备（MD 自动转 HTML）
→ 上传封面 → 创建草稿 → 发布 → 返回结果
```

## 限制说明

- **群发次数**：订阅号每天 1 次，服务号每月 4 次
- **封面格式**：支持 jpg/png/gif，微信会自动转换
- **HTML 要求**：必须使用微信公众号支持的标签，样式需内联
- **标题**：不超过 64 字
- **作者**：不超过 8 字

## 作为技能使用

本工具同时是一个 Claude Code 技能。在 Claude Code 中可以通过以下方式触发：

- `/auto-wechatmp 发布文章`
- 直接说"发布公众号"、"写公众号"等触发词

技能会自动引导交互式流程，无需手动拼接命令行参数。

## 技术栈

- **Runtime**: Node.js + TypeScript（通过 `tsx` 运行）
- **HTTP 客户端**: `undici`
- **图片处理**: `sharp`（封面转 JPEG）
- **微信 API**: 公众号草稿 + 自由发布接口

## 项目结构

```
auto-wechatmp/
├── SKILL.md              # 技能定义文件
├── README.md             # 本文件
├── package.json
├── package-lock.json
└── src/
    └── auto-wechatmp.ts  # 主程序入口
```

## License

ISC
