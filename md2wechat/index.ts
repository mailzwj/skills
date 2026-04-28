/**
 * MD2WeChat - Markdown 转微信公众号 HTML
 *
 * 将 Markdown 内容转换为微信公众号编辑器兼容的 HTML 格式。
 * 所有样式均为内联样式，可直接粘贴到微信公众号编辑器中。
 */

import { marked } from "marked";
import { WechatRenderer } from "./renderer.ts";
import { THEMES, THEME_NAMES, THEME_LABELS } from "./templates.ts";
import type { ThemeConfig } from "./templates.ts";

// ==================== 类型定义 ====================

export interface WechatOptions {
  /** 主题名称，默认 "wechat-green" */
  theme?: string;
  /** 文章标题（可覆盖 markdown 中的 h1） */
  title?: string;
  /** 是否包裹完整 HTML 文档，默认 false（纯片段可直接粘贴） */
  wrapDocument?: boolean;
  /** 文章作者 */
  author?: string;
  /** 封面图片 URL */
  coverImage?: string;
}

export interface ConvertResult {
  /** 转换后的 HTML */
  html: string;
  /** 使用的主题名称 */
  theme: string;
}

// ==================== 核心函数 ====================

/**
 * 将 Markdown 转换为微信公众号兼容的 HTML
 */
export async function markdownToWechatHtml(
  markdown: string,
  options: WechatOptions = {}
): Promise<ConvertResult> {
  const {
    theme = "wechat-green",
    title,
    wrapDocument = false,
    author,
    coverImage,
  } = options;

  // 解析主题配置
  const themeConfig: ThemeConfig =
    THEMES[theme] || THEMES["wechat-green"];

  // 配置 marked + 自定义渲染器
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: false,
  });

  // 提取标题（若未手动指定，则取第一个 h1）
  let articleTitle = title || "";
  let bodyMarkdown = markdown;

  if (!articleTitle) {
    const h1Match = markdown.match(/^#\s+(.+)$/m);
    if (h1Match) {
      articleTitle = h1Match[1].trim();
      // 移除 md 中的标题行，避免重复
      bodyMarkdown = markdown.replace(/^#\s+.+$/m, "").trim();
    }
  }

  // 转换 Markdown（renderer 直接传给 parse，避免 marked.use 枚举自定义属性）
  const renderer = new WechatRenderer(themeConfig);
  const bodyHtml = (marked.parse(bodyMarkdown, { renderer }) as string).trim();

  // 构建最终 HTML
  let html = "";

  if (wrapDocument) {
    html += '<!DOCTYPE html>\n';
    html += '<html lang="zh-CN">\n';
    html += '<head>\n';
    html += '  <meta charset="UTF-8">\n';
    html += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    if (articleTitle) {
      html += `  <title>${articleTitle}</title>\n`;
    }
    html += '</head>\n';
    html += '<body style="margin: 0; padding: 12px; font-family: -apple-system, BlinkMacSystemFont, \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', sans-serif;">\n';
  }

  // 文章头部
  html += _buildArticleHeader(articleTitle, author, coverImage, themeConfig);

  // 文章正文
  html += bodyHtml;

  // 文章尾部
  html += _buildArticleFooter(themeConfig);

  if (wrapDocument) {
    html += '\n</body>\n';
    html += '</html>';
  }

  return { html, theme };
}

// ==================== 文章头部 ====================

function _buildArticleHeader(
  title: string,
  author?: string,
  coverImage?: string,
  theme?: ThemeConfig
): string {
  const parts: string[] = [];

  // 封面图
  if (coverImage) {
    parts.push(
      `<p style="text-align: center; margin: 0 0 10px 0;">
  <img src="${coverImage}" alt="封面" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>`
    );
  }

  // 标题
  if (title) {
    parts.push(
      `<h1 style="font-size: 22px; font-weight: bold; line-height: 1.5em; margin: 16px 0 10px 0; padding-left: 12px; border-left: 4px solid ${theme?.primaryColor || '#07c160'}; color: ${theme?.textColor || '#333333'};">${title}</h1>`
    );
  }

  // 作者
  if (author) {
    parts.push(
      `<p style="font-size: 14px; color: #999999; margin: 0 0 20px 0; text-align: left;">作者：${author}</p>`
    );
  }

  return parts.join("\n") + (parts.length > 0 ? "\n" : "");
}

// ==================== 文章尾部 ====================

function _buildArticleFooter(theme?: ThemeConfig): string {
  const color = theme?.mutedColor || "#999999";
  return `
<hr style="margin: 24px 0 12px 0; border: 0; border-top: 1px solid ${theme?.hrColor || '#ebebeb'};" />
<p style="font-size: 13px; color: ${color}; text-align: center; margin: 10px 0;">
  由 MD2WeChat 生成
</p>`;
}

// ==================== CLI 接口 ====================

async function main() {
  const args = process.argv.slice(2);

  const helpText = `
📱 MD2WeChat - Markdown 转微信公众号 HTML

用法:
  md2wechat <输入文件.md> [输出文件.html] [选项]

选项:
  --theme <名称>       主题样式（默认 wechat-green）
  --title <标题>       文章标题（默认使用 md 中的 h1）
  --author <作者>      文章作者
  --cover <图片URL>    封面图片
  --wrap               包裹完整 HTML 文档
  --list-themes        列出所有可用主题

可用主题:
${THEME_NAMES.map((k) => `  ${k.padEnd(18)} ${THEME_LABELS[k]}`).join("\n")}

示例:
  md2wechat article.md
  md2wechat article.md output.html --theme tech-purple
  md2wechat article.md output.html --title "我的文章" --author "作者名"
  md2wechat --list-themes
`;

  // --list-themes 不需要输入文件
  if (args.includes("--list-themes") || args.includes("-l")) {
    console.log("📱 可用主题：\n");
    for (const [key, t] of Object.entries(THEMES)) {
      console.log(`  ${key.padEnd(18)} ${t.label}`);
      console.log(`    主色: ${t.primaryColor}  |  ${t.darkCode ? "暗色代码块" : "亮色代码块"}`);
    }
    process.exit(0);
  }

  const inputPath = args[0];
  if (!inputPath || inputPath.startsWith("--")) {
    console.log(helpText);
    process.exit(inputPath ? 0 : 1);
  }

  const outputPath = args[1] && !args[1].startsWith("--") ? args[1] : "";

  // 解析选项
  const themeIdx = args.indexOf("--theme");
  const titleIdx = args.indexOf("--title");
  const authorIdx = args.indexOf("--author");
  const coverIdx = args.indexOf("--cover");
  const wrapFlag = args.includes("--wrap");

  const theme = themeIdx >= 0 ? args[themeIdx + 1] : "wechat-green";
  const title = titleIdx >= 0 ? args[titleIdx + 1] : undefined;
  const author = authorIdx >= 0 ? args[authorIdx + 1] : undefined;
  const coverImage = coverIdx >= 0 ? args[coverIdx + 1] : undefined;

  try {
    const fs = await import("fs");

    // 读取 Markdown
    console.log("📖 读取文件:", inputPath);
    const markdown = fs.readFileSync(inputPath, "utf-8");
    console.log("✅ 读取成功，共", markdown.length, "字符");

    // 转换
    const currentTheme = THEMES[theme] || THEMES["wechat-green"];
    console.log(`🎨 使用主题: ${currentTheme.label} (${theme})`);
    console.log("🔄 转换为微信公众号 HTML ...");

    const result = await markdownToWechatHtml(markdown, {
      theme,
      title,
      author,
      coverImage,
      wrapDocument: wrapFlag,
    });

    // 输出
    if (outputPath) {
      fs.writeFileSync(outputPath, result.html, "utf-8");
      console.log(`✅ HTML 已保存到: ${outputPath}`);
    } else {
      console.log("\n--- 转换结果 ---\n");
      console.log(result.html);
    }
  } catch (error) {
    console.error(
      "❌ 错误:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

// ==================== 导出 ====================

export {
  THEMES,
  THEME_NAMES,
  THEME_LABELS,
  WechatRenderer,
};

export type { ThemeConfig };

// CLI 入口
const isMainModule =
  process.argv[1]?.endsWith("index.ts") ||
  process.argv[1]?.endsWith("index.js");
if (isMainModule) {
  main();
}
