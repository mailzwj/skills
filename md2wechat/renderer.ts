/**
 * 微信公众号原生格式渲染器
 *
 * 将 markdown AST token 转换为微信公众号编辑器兼容的 HTML。
 * 微信公众号编辑器会过滤外部 CSS，因此所有样式必须内联。
 */

import { Renderer } from "marked";
import type { ThemeConfig } from "./templates.ts";
import { THEMES } from "./templates.ts";

export class WechatRenderer extends Renderer {
  private theme: ThemeConfig;
  private _listDepth = 0;

  constructor(theme?: ThemeConfig | string) {
    super();
    if (typeof theme === "string") {
      this.theme = THEMES[theme] || THEMES["wechat-green"];
    } else if (theme) {
      this.theme = theme;
    } else {
      this.theme = THEMES["wechat-green"];
    }
  }

  // 便捷属性
  private get c() { return this.theme; }
  private get fs() { return this.theme.bodySize; }

  // ==================== 块级元素 ====================

  heading(token: any): string {
    const { depth, text, tokens } = token;
    const content = tokens
      ? this.renderInlineTokens(tokens)
      : this._escapeInlineFormatting(text);
    const fontSize: Record<number, string> = {
      1: this.c.h1Size,
      2: "19px",
      3: "17px",
      4: "16px",
      5: "15px",
      6: "14px",
    };
    const margin: Record<number, string> = {
      1: "24px 0 16px",
      2: "20px 0 12px",
      3: "16px 0 10px",
      4: "14px 0 8px",
      5: "12px 0 6px",
      6: "10px 0 4px",
    };
    const size = fontSize[depth] || "16px";
    const mg = margin[depth] || "16px 0 10px";

    if (depth === 1) {
      return `<h1 style="font-size: ${size}; font-weight: bold; margin: ${mg}; line-height: 1.6em; padding-left: 12px; border-left: 4px solid ${this.c.primaryColor};">${content}</h1>`;
    }
    if (depth === 2) {
      return `<h2 style="font-size: ${size}; font-weight: bold; margin: ${mg}; line-height: 1.6em; padding: 6px 10px; background-color: ${this.c.blockquoteBg}; border-radius: 3px;">${content}</h2>`;
    }
    return `<h${depth} style="font-size: ${size}; font-weight: bold; margin: ${mg}; line-height: 1.6em; color: ${this.c.secondaryColor};">${content}</h${depth}>`;
  }

  paragraph(token: any): string {
    const { text, tokens } = token;
    const content = tokens
      ? this.renderInlineTokens(tokens)
      : this._escapeInlineFormatting(text);
    return `<p style="font-size: ${this.fs}; line-height: 1.75em; margin: 10px 0; color: ${this.c.textColor};">${content}</p>`;
  }

  // ==================== 列表 ====================

  list(token: any): string {
    const { ordered, items } = token;
    const tag = ordered ? "ol" : "ul";
    const listStyle = ordered ? "list-style-type: decimal" : "list-style-type: disc";
    this._listDepth++;
    const depthClass = `list-paddingleft-${this._listDepth}`;
    const itemsHtml = items
      .map((item: any) => this.listitem(item))
      .join("");
    this._listDepth--;
    return `<${tag} style="${listStyle}" class="${depthClass}">${itemsHtml}</${tag}>`;
  }

  listitem(token: any): string {
    const { text, tokens } = token;
    const parts: string[] = [];

    if (tokens && tokens.length > 0) {
      // Separate paragraph-like tokens (which go into <p><span leaf="">) from block tokens
      const inlineTokens: any[] = [];
      for (const t of tokens) {
        if (t.type === "paragraph" || t.type === "text") {
          inlineTokens.push(t);
        } else if (t.type === "list") {
          parts.push(this.list(t));
        } else if (t.type === "code") {
          parts.push(this.code(t));
        } else if (t.type === "blockquote") {
          parts.push(this.blockquote(t));
        } else if (t.type === "heading") {
          parts.push(this.heading(t));
        } else if (t.type === "html") {
          parts.push(this.html(t));
        } else {
          // Unknown type, try inline rendering
          const inner = this.renderInlineToken(t);
          parts.push(`<span leaf="">${inner}</span>`);
        }
      }

      if (inlineTokens.length > 0) {
        const spans = inlineTokens
          .map((t: any) => this._renderListItemInlineContent(t))
          .join("");
        parts.unshift(
          `<p style="line-height: 1.6em;"><span leaf="">${spans}</span></p>`
        );
      }
    } else {
      // Fallback: raw text without parsed tokens
      const escaped = this._escapeInlineFormatting(text || "");
      parts.push(
        `<p style="line-height: 1.6em;"><span leaf=""><span textstyle="" style="font-size: ${this.fs};">${escaped}</span></span></p>`
      );
    }

    return `<li>${parts.join("")}</li>`;
  }

  // ==================== 引用 ====================

  blockquote(token: any): string {
    const { text, tokens } = token;
    let content = "";
    if (tokens && tokens.length > 0) {
      content = tokens
        .map((t: any) => {
          if (t.type === "paragraph") {
            return t.tokens
              ? this.renderInlineTokens(t.tokens)
              : this._escapeInlineFormatting(t.text || "");
          }
          return this._escapeInlineFormatting(t.text || "");
        })
        .join("<br />");
    } else {
      content = this._escapeInlineFormatting(text);
    }
    return `<blockquote style="margin: 12px 0; padding: 10px 15px; border-left: 3px solid ${this.c.blockquoteBorder}; background-color: ${this.c.blockquoteBg}; color: ${this.c.mutedColor}; font-size: ${this.fs}; line-height: 1.75em;">${content}</blockquote>`;
  }

  // ==================== 代码 ====================

  code(token: any): string {
    const lang = token.lang || "text";
    const code = token.escape ? this.escape(token.text) : token.text;
    const lines = code.split("\n");
    const codeLines = lines
      .map(
        (line: string) =>
          `<code style="font-size: 13px; font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace; display: block; line-height: 1.6;"><span leaf="">${line || "&nbsp;"}</span></code>`
      )
      .join("\n");

    return `<section style="margin: 14px 0; overflow-x: auto;">
<pre class="code-snippet code-snippet_nowrap" data-lang="${lang}" style="margin: 0; white-space: pre; color: #1f2937;">
${codeLines}
</pre>
</section>`;
  }

  codespan(token: any): string {
    return `<code style="font-size: 14px; font-family: 'SF Mono', Monaco, Consolas, monospace; background-color: ${this.c.inlineCodeBg}; padding: 2px 6px; border-radius: 3px; color: ${this.c.inlineCodeTextColor};">${token.text}</code>`;
  }

  // ==================== 表格 ====================

  table(token: any): string {
    const { header, rows } = token;
    let html =
      '<table style="width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 14px;">';

    if (header && header.length > 0) {
      html += "<thead>";
      html += "<tr>";
      header.forEach((cell: any) => {
        const content = this._formatCellContent(cell);
        html += `<th style="padding: 10px 8px; background-color: ${this.c.tableHeaderBg}; border: 1px solid ${this.c.tableBorder}; text-align: left; font-weight: bold; font-size: 14px; color: ${this.c.textColor};">${content}</th>`;
      });
      html += "</tr>";
      html += "</thead>";
    }

    html += "<tbody>";
    rows.forEach((row: any[], rowIdx: number) => {
      const bg =
        rowIdx % 2 === 0 ? "transparent" : this.c.tableOddBg;
      html += "<tr>";
      row.forEach((cell: any) => {
        const content = this._formatCellContent(cell);
        html += `<td style="padding: 8px; border: 1px solid ${this.c.tableBorder}; font-size: 14px; color: ${this.c.textColor}; background-color: ${bg};">${content}</td>`;
      });
      html += "</tr>";
    });
    html += "</tbody>";
    html += "</table>";

    return html;
  }

  // ==================== 分割线 ====================

  hr(): string {
    return `<hr style="margin: 16px 0; border: 0; border-top: 1px solid ${this.c.hrColor};" />`;
  }

  // ==================== 内联元素 ====================

  strong(token: any): string {
    const { text, tokens } = token;
    const content = tokens
      ? this.renderInlineTokens(tokens)
      : this._escapeInlineFormatting(text);
    return `<strong style="font-size: ${this.fs}; color: ${this.c.textColor};">${content}</strong>`;
  }

  em(token: any): string {
    const { text, tokens } = token;
    const content = tokens
      ? this.renderInlineTokens(tokens)
      : this._escapeInlineFormatting(text);
    return `<span style="font-style: italic; font-size: ${this.fs}; color: ${this.c.mutedColor};">${content}</span>`;
  }

  del(token: any): string {
    const { text, tokens } = token;
    const content = tokens
      ? this.renderInlineTokens(tokens)
      : this._escapeInlineFormatting(text);
    return `<span style="text-decoration: line-through; color: #999999; font-size: ${this.fs};">${content}</span>`;
  }

  link(token: any): string {
    const { href, title, text, tokens } = token;
    const content = tokens
      ? this.renderInlineTokens(tokens)
      : this._escapeInlineFormatting(text);
    const titleAttr = title ? ` title="${this.escapeAttr(title)}"` : "";
    return `<a href="${href}"${titleAttr} style="color: ${this.c.primaryColor}; text-decoration: none; border-bottom: 1px solid ${this.c.primaryColor}; font-size: ${this.fs};">${content}</a>`;
  }

  image(token: any): string {
    const { href, text, title } = token;
    const alt = text || "";
    const titleAttr = title ? ` title="${this.escapeAttr(title)}"` : "";
    return `<img src="${href}" alt="${this.escapeAttr(alt)}"${titleAttr} style="max-width: 100%; height: auto; display: block; margin: 14px auto; border-radius: 6px;" />`;
  }

  // ==================== 其他 ====================

  text(token: any): string {
    return `<span leaf="">${this._escapeInlineFormatting(token.text || "")}</span>`;
  }

  html(token: any): string {
    return token.text;
  }

  br(): string {
    return "<br />";
  }

  checkbox(token: any): string {
    const checked = token.checked ? " checked" : "";
    return `<input type="checkbox" disabled${checked} style="margin-right: 6px;" />`;
  }

  // ==================== 公开辅助方法 ====================

  renderInlineTokens(tokens: any[]): string {
    if (!tokens || tokens.length === 0) return "";
    return tokens.map((t) => this.renderInlineToken(t)).join("");
  }

  renderInlineToken(token: any): string {
    switch (token.type) {
      case "text":
        return this.text(token);
      case "strong":
        return this.strong(token);
      case "em":
        return this.em(token);
      case "del":
        return this.del(token);
      case "codespan":
        return this.codespan(token);
      case "link":
        return this.link(token);
      case "image":
        return this.image(token);
      case "br":
        return this.br();
      case "html":
        return this.html(token);
      default:
        return this._escapeInlineFormatting(token.text || token.raw || "");
    }
  }

  renderTokens(tokens: any[]): string {
    if (!tokens || tokens.length === 0) return "";
    return tokens
      .map((token) => {
        switch (token.type) {
          case "heading":
            return this.heading(token);
          case "paragraph":
            return this.paragraph(token);
          case "list":
            return this.list(token);
          case "blockquote":
            return this.blockquote(token);
          case "code":
            return this.code(token);
          case "table":
            return this.table(token);
          case "hr":
            return this.hr();
          case "html":
            return this.html(token);
          case "space":
            return "";
          default:
            return "";
        }
      })
      .join("\n");
  }

  // ==================== 私有辅助方法 ====================

  /** 渲染列表项中 paragraph/text 类型 token 的内联内容，返回 textstyle span 序列 */
  private _renderListItemInlineContent(t: any): string {
    if (t.tokens && t.tokens.length > 0) {
      return t.tokens.map((inline: any) => this._renderListItemInline(inline)).join("");
    }
    return this._textstyleSpan("", this._escapeInlineFormatting(t.text || ""));
  }

  /** 将单个内联 token 渲染为 <span textstyle="" style="..."> 格式 */
  private _renderListItemInline(t: any): string {
    if (t.type === "strong") {
      const raw = t.tokens
        ? t.tokens.map((st: any) => st.text || "").join("")
        : t.text || "";
      return this._textstyleSpan("font-weight: bold", this._escapeInlineFormatting(raw));
    }
    if (t.type === "em") {
      const raw = t.tokens
        ? t.tokens.map((st: any) => st.text || "").join("")
        : t.text || "";
      return this._textstyleSpan("font-style: italic", this._escapeInlineFormatting(raw));
    }
    if (t.type === "del") {
      const raw = t.tokens
        ? t.tokens.map((st: any) => st.text || "").join("")
        : t.text || "";
      return this._textstyleSpan("text-decoration: line-through", this._escapeInlineFormatting(raw));
    }
    if (t.type === "text") {
      return this._textstyleSpan("", this._escapeInlineFormatting(t.text || ""));
    }
    if (t.type === "codespan") {
      return this._textstyleSpan(
        `font-family: 'SF Mono', Monaco, Consolas, monospace; background-color: ${this.c.inlineCodeBg}; color: ${this.c.inlineCodeTextColor}`,
        this._escapeInlineFormatting(t.text || "")
      );
    }
    if (t.type === "link") {
      const href = t.href || "";
      const raw = t.tokens
        ? t.tokens.map((st: any) => st.text || "").join("")
        : t.text || "";
      return `<a href="${href}" style="color: ${this.c.primaryColor}; text-decoration: none; border-bottom: 1px solid ${this.c.primaryColor}; font-size: ${this.fs};">${this._escapeInlineFormatting(raw)}</a>`;
    }
    if (t.type === "br") {
      return "<br />";
    }
    if (t.type === "image") {
      return this.image(t);
    }
    // fallback
    return this.renderInlineToken(t);
  }

  /** 生成 <span textstyle="" style="font-size: Xpx; extraStyle">content</span> */
  private _textstyleSpan(extraStyle: string, content: string): string {
    const styleParts = [`font-size: ${this.fs}`];
    if (extraStyle) styleParts.push(extraStyle);
    return `<span textstyle="" style="${styleParts.join("; ")};">${content}</span>`;
  }

  private _formatCellContent(cell: any): string {
    if (cell.tokens && cell.tokens.length > 0) {
      return this.renderInlineTokens(cell.tokens);
    }
    return this._escapeInlineFormatting(cell.text || "");
  }

  private _escapeInlineFormatting(text: string): string {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(
        /\*\*(.+?)\*\*/g,
        `<strong style="font-size: ${this.fs}; color: ${this.c.textColor};">$1</strong>`
      )
      .replace(
        /`([^`]+)`/g,
        `<code style="font-size: 13px; font-family: monospace; background-color: ${this.c.inlineCodeBg}; padding: 1px 5px; border-radius: 3px; color: ${this.c.inlineCodeTextColor};">$1</code>`
      );
  }

  escape(html: string): string {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  escapeAttr(html: string): string {
    return this.escape(html)
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}

export default WechatRenderer;
