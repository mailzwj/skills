# 仓库说明

## 提示词生成
* `ace-caption-creator`：ACE-Step音乐生成大模型的“Caption”提示词生成技能
* `wanvideo-prompt-creator`: 万相视频生成大模型的视频画面提示词生成技能
* `ltx-prompt-designer`: LTX视频生成提示词设计技能

## 微信公众号
* `md2wechat`: 将 Markdown 文件或文本转换为微信公众号编辑器兼容的 HTML。当用户需要发布微信公众号文章、将 Markdown 转为公众号格式、制作公众号排版时使用。支持 6 种主题风格，所有样式内联，可直接粘贴到微信公众平台编辑器。
```bash
# 完整选项
npx tsx index.ts article.md output.html \
  --theme simple-blue \
  --title "我的文章" \
  --author "作者名" \
  --cover "https://example.com/cover.jpg" \
  --wrap

# 在Claude Code中使用技能
/md2wechat 把xxx.md转换为html，使用warm-orange风格
```
* `auto-wechatmp`: 微信公众号文章自动发布技能，支持将 HTML 文件或 HTML 格式的内容发布到微信公众号，当用户需要发布公众号文章时调用，触发词：发布文章，发布公众号，写公众号，微信公众号。
```bash
# Windows PowerShell
$env:WECHATMP_APPID="你的 AppID"
$env:WECHATMP_APPSECRET="你的 AppSecret"

# macOS / Linux
export WECHATMP_APPID="你的 AppID"
export WECHATMP_APPSECRET="你的 AppSecret"

# 从 HTML 文件发布
npx tsx src/auto-wechatmp.ts publish \
  --title "文章标题" \
  --author "作者名" \
  --file "./article.html" \
  --cover "https://example.com/cover.jpg"

# 在Claude Code中使用技能
/auto-wechatmp 将xxx.html发布到微信公众号，作者：abc，封面使用：E:/test/cover.jpg
```
