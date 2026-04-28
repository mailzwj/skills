---
name: auto-wechatmp
description: 微信公众号文章自动发布技能，支持将 HTML 文件或 HTML 格式的内容发布到微信公众号，当用户需要发布公众号文章时调用，触发词：发布文章，发布公众号，写公众号，微信公众号。
type: tool
user-invocable: true
metadata:
  emoji: "📮"
  requires:
    env: ["WECHATMP_APPID", "WECHATMP_APPSECRET"]
---

# Auto-WeChatMP - 微信公众号文章自动发布

## 功能概述

一键将 HTML 内容发布到微信公众号。整合了 HTML 转换、封面上传、草稿创建和群发发布的全流程。

- ✅ 支持 HTML 文件路径直接发布
- ✅ 支持 HTML 文本内容直接发布
- ✅ 支持 Markdown 文件自动转换为 HTML 后发布
- ✅ 支持指定文章作者
- ✅ 支持指定文章封面（本地路径或远程 URL）
- ✅ 缺少参数时通过交互式问答补全
- ✅ 完整的发布流程：转换 → 上传封面 → 创建草稿 → 发布

## 前置要求

1. **已认证的公众号**（服务号或已认证订阅号）
2. 环境变量配置：

```bash
# Windows PowerShell
$env:WECHATMP_APPID="你的 AppID"
$env:WECHATMP_APPSECRET="你的 AppSecret"

# macOS/Linux
export WECHATMP_APPID="你的 AppID"
export WECHATMP_APPSECRET="你的 AppSecret"
```

3. 依赖安装：

```bash
cd auto-wechatmp && npm install
```

## 交互式发布流程

当用户调用本技能时，按以下流程执行：

### 第 1 步：解析用户输入

从用户消息中提取以下参数：
- **内容来源**：HTML 文件路径、Markdown 文件路径、或直接的 HTML/文本内容
- **文章标题** (`title`)：如果用户未提供，标记为缺失
- **文章作者** (`author`)：如果用户未提供，标记为缺失（默认可用 "遇见AI"）
- **封面图片** (`cover`)：如果用户未提供，标记为缺失（封面是可选的）

### 第 2 步：交互式补全缺失参数

如果任何参数缺失，使用 `AskUserQuestion` 工具向用户询问：

**标题问题**（如果缺失）：
- header: "文章标题"
- question: "请输入文章标题："
- 提供 Other 选项让用户自由输入

**作者问题**（如果缺失）：
- header: "作者名称"
- question: "请输入文章作者名称："
- options: ["遇见AI (默认)", "Other"]
- 如果用户选择默认值，使用 "遇见AI"

**封面问题**（如果缺失）：
- header: "封面图片"
- question: "是否需要设置文章封面？"
- options: ["跳过（无封面）", "输入封面图片URL或路径"]

### 第 3 步：内容准备

**情况 A - 用户提供了 Markdown 文件 (.md)**：
1. 使用 `md2wechat` 技能将 Markdown 转换为微信公众号兼容的 HTML
2. 调用方式：通过 Bash 运行 `npx tsx md2wechat/index.ts <文件路径> --wrap`

**情况 B - 用户提供了 HTML 文件 (.html)**：
1. 直接读取文件内容作为 HTML

**情况 C - 用户直接输入了 HTML 或文本内容**：
1. 如果是纯文本/简单格式，使用 `md2wechat` 技能包装为 HTML
2. 如果已是 HTML 格式，直接使用

### 第 4 步：执行发布

调用发布脚本 `auto-wechatmp/src/auto-wechatmp.ts`：

```bash
npx tsx auto-wechatmp/src/auto-wechatmp.ts publish \
  --title "文章标题" \
  --author "作者名" \
  --content "<html内容>" \
  --cover "封面图URL或路径(可选)"
```

或者使用文件输入：

```bash
npx tsx auto-wechatmp/src/auto-wechatmp.ts publish \
  --title "文章标题" \
  --author "作者名" \
  --file "/path/to/article.html" \
  --cover "封面图URL或路径(可选)"
```

### 第 5 步：报告结果

向用户报告发布结果：
- ✅ 发布成功：显示 media_id、article_id、msg_id
- ❌ 发布失败：显示详细错误信息，帮助用户排查

## 发布脚本命令参考

### 一键发布（推荐）

```bash
npx tsx auto-wechatmp/src/auto-wechatmp.ts publish \
  --title "标题" \
  --author "作者" \
  --file "/path/to/content.html" \
  --cover "https://example.com/cover.jpg"
```

### 仅创建草稿（不发布）

```bash
npx tsx auto-wechatmp/src/auto-wechatmp.ts draft \
  --title "标题" \
  --author "作者" \
  --file "/path/to/content.html"
```

### 上传封面图片

```bash
npx tsx auto-wechatmp/src/auto-wechatmp.ts upload-cover \
  --cover "https://example.com/cover.jpg"
```

返回 `thumb_media_id` 供后续使用。

### 查询草稿列表

```bash
npx tsx auto-wechatmp/src/auto-wechatmp.ts list-drafts
```

### 删除草稿

```bash
npx tsx auto-wechatmp/src/auto-wechatmp.ts delete-draft --media-id "xxx" --article-id "xxx"
```

## 参数说明

| 参数 | 必需 | 说明 |
|------|------|------|
| `--title` | 是 | 文章标题，不超过 64 字 |
| `--author` | 否 | 文章作者，默认 "遇见AI" |
| `--file` | 二选一 | HTML 或 Markdown 文件路径 |
| `--content` | 二选一 | HTML 内容字符串 |
| `--cover` | 否 | 封面图片 URL 或本地路径 |
| `--digest` | 否 | 文章摘要，不超过 54 字，默认截取标题 |

## 注意事项

1. **每日群发次数限制**：订阅号每天 1 次，服务号每月 4 次
2. **封面图片格式**：支持 jpg/png/gif，微信会自动转换
3. **HTML 内容要求**：必须是微信公众号支持的 HTML 标签，样式必须内联
4. **作者名限制**：不超过 8 个字
5. **标题限制**：不超过 64 个字

## 完整示例

### 示例 1：从 HTML 文件发布

```
用户：/auto-wechatmp 发布文章
AI：请问文章标题是什么？
用户：2024 AI 技术趋势总结
AI：请问作者名称？
用户：TechObserver
AI：请提供 HTML 文件路径
用户：/path/to/article.html
AI：[执行发布...] ✅ 文章发布成功！
```

### 示例 2：一键发布（提供全部参数）

```
用户：/auto-wechatmp publish --title "AI 周报" --author "AI编辑" --file "./weekly.md" --cover "https://example.com/cover.jpg"
AI：[检测到所有参数完整，直接执行发布...] ✅ 文章发布成功！
```

### 示例 3：从 Markdown 自动转换发布

```
用户：帮我把这篇 markdown 发到公众号
AI：好的，我需要以下信息：
   - 文章标题？
   - 作者名称？
   - 封面图片？（可选）
用户：[回答各问题]
AI：[转换 Markdown → HTML → 发布] ✅ 文章发布成功！
```

## 相关技能

- `wechatmp-publish` - 微信公众号文章发布（底层 API 工具）
- `md2wechat` - Markdown 转微信公众号 HTML 格式
- `md2html` - 通用 Markdown 转 HTML
