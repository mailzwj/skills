/**
 * 代码语法高亮模块
 *
 * 使用 highlight.js 进行语法高亮，将生成的 class 属性转换为内联 style，
 * 兼容微信公众号编辑器的严格过滤规则（不支持 style 块、class、link）。
 *
 * 支持亮色和暗色两套高亮主题：
 * - "light"：基于 GitHub 亮色主题，适合浅色代码块背景
 * - "dark"：基于 GitHub 暗色主题，适合深色代码块背景
 */

import hljs from "highlight.js";

export type HighlightTheme = "light" | "dark";

// ==================== GitHub 亮色主题颜色映射 ====================

const HLJS_LIGHT_MAP: Record<string, string> = {
  "hljs-comment": "color:#6a737d;font-style:italic",
  "hljs-keyword": "color:#d73a49",
  "hljs-string": "color:#032f62",
  "hljs-number": "color:#005cc5",
  "hljs-literal": "color:#005cc5",
  "hljs-type": "color:#005cc5",
  "hljs-built_in": "color:#005cc5",
  "hljs-attr": "color:#005cc5",
  "hljs-function": "color:#6f42c1",
  "hljs-title": "color:#6f42c1",
  "hljs-title.function_": "color:#6f42c1",
  "hljs-title.class_": "color:#6f42c1",
  "hljs-title.class_.inherited__": "color:#6f42c1",
  "hljs-selector-class": "color:#6f42c1",
  "hljs-selector-tag": "color:#22863a",
  "hljs-selector-id": "color:#6f42c1",
  "hljs-selector-pseudo": "color:#6f42c1",
  "hljs-selector-attr": "color:#6f42c1",
  "hljs-subst": "color:#24292e",
  "hljs-meta": "color:#032f62",
  "hljs-meta-keyword": "color:#d73a49",
  "hljs-meta-string": "color:#032f62",
  "hljs-variable": "color:#e36209",
  "hljs-variable.language_": "color:#d73a49",
  "hljs-variable.constant_": "color:#005cc5",
  "hljs-params": "color:#24292e",
  "hljs-property": "color:#005cc5",
  "hljs-symbol": "color:#005cc5",
  "hljs-tag": "color:#22863a",
  "hljs-name": "color:#22863a",
  "hljs-doctag": "color:#d73a49",
  "hljs-template-variable": "color:#005cc5",
  "hljs-template-tag": "color:#22863a",
  "hljs-addition": "color:#22863a;background-color:#f0fff4",
  "hljs-deletion": "color:#d73a49;background-color:#ffeef0",
  "hljs-emphasis": "font-style:italic",
  "hljs-strong": "font-weight:bold",
  "hljs-link": "color:#032f62;text-decoration:underline",
  "hljs-link_label": "color:#005cc5",
  "hljs-link_reference": "color:#005cc5",
  "hljs-section": "color:#005cc5;font-weight:bold",
  "hljs-bullet": "color:#005cc5",
  "hljs-quote": "color:#6a737d",
  "hljs-regexp": "color:#032f62",
  "hljs-operator": "color:#d73a49",
  "hljs-punctuation": "color:#24292e",
  "hljs-attribute": "color:#005cc5",
  "hljs-formula": "color:#24292e",
  "hljs-code": "color:#24292e",
  "hljs-char.escape_": "color:#032f62",
};

// ==================== GitHub 暗色主题颜色映射 ====================

const HLJS_DARK_MAP: Record<string, string> = {
  "hljs-comment": "color:#8b949e;font-style:italic",
  "hljs-keyword": "color:#ff7b72",
  "hljs-string": "color:#a5d6ff",
  "hljs-number": "color:#79c0ff",
  "hljs-literal": "color:#79c0ff",
  "hljs-type": "color:#79c0ff",
  "hljs-built_in": "color:#79c0ff",
  "hljs-attr": "color:#79c0ff",
  "hljs-function": "color:#d2a8ff",
  "hljs-title": "color:#d2a8ff",
  "hljs-title.function_": "color:#d2a8ff",
  "hljs-title.class_": "color:#d2a8ff",
  "hljs-title.class_.inherited__": "color:#d2a8ff",
  "hljs-selector-class": "color:#d2a8ff",
  "hljs-selector-tag": "color:#7ee787",
  "hljs-selector-id": "color:#d2a8ff",
  "hljs-selector-pseudo": "color:#d2a8ff",
  "hljs-selector-attr": "color:#d2a8ff",
  "hljs-subst": "color:#c9d1d9",
  "hljs-meta": "color:#a5d6ff",
  "hljs-meta-keyword": "color:#ff7b72",
  "hljs-meta-string": "color:#a5d6ff",
  "hljs-variable": "color:#ffa657",
  "hljs-variable.language_": "color:#ff7b72",
  "hljs-variable.constant_": "color:#79c0ff",
  "hljs-params": "color:#c9d1d9",
  "hljs-property": "color:#79c0ff",
  "hljs-symbol": "color:#79c0ff",
  "hljs-tag": "color:#7ee787",
  "hljs-name": "color:#7ee787",
  "hljs-doctag": "color:#ff7b72",
  "hljs-template-variable": "color:#79c0ff",
  "hljs-template-tag": "color:#7ee787",
  "hljs-addition": "color:#aff5b4;background-color:#033a16",
  "hljs-deletion": "color:#ffdcd7;background-color:#67060c",
  "hljs-emphasis": "font-style:italic",
  "hljs-strong": "font-weight:bold",
  "hljs-link": "color:#a5d6ff;text-decoration:underline",
  "hljs-link_label": "color:#79c0ff",
  "hljs-link_reference": "color:#79c0ff",
  "hljs-section": "color:#79c0ff;font-weight:bold",
  "hljs-bullet": "color:#79c0ff",
  "hljs-quote": "color:#8b949e",
  "hljs-regexp": "color:#a5d6ff",
  "hljs-operator": "color:#ff7b72",
  "hljs-punctuation": "color:#c9d1d9",
  "hljs-attribute": "color:#79c0ff",
  "hljs-formula": "color:#c9d1d9",
  "hljs-code": "color:#c9d1d9",
  "hljs-char.escape_": "color:#a5d6ff",
};

// ==================== 核心函数 ====================

/**
 * 使用 highlight.js 对代码进行语法高亮，返回内联样式 HTML
 *
 * @param code 原始代码文本
 * @param lang 编程语言标识（如 "javascript", "python"），为空时自动检测
 * @param theme 高亮主题："light"（浅色背景）或 "dark"（深色背景），默认 "light"
 * @returns 内联样式高亮的 HTML 片段（不含外层 pre/code 标签）
 */
export function highlightCode(
  code: string,
  lang?: string,
  theme: HighlightTheme = "light"
): string {
  const normalizedLang = lang?.toLowerCase() || "";

  let result: hljs.HighlightResult;
  try {
    if (normalizedLang && hljs.getLanguage(normalizedLang)) {
      result = hljs.highlight(code, { language: normalizedLang });
    } else {
      result = hljs.highlightAuto(code);
    }
  } catch {
    return escapeHtml(code);
  }

  return replaceClassesWithInlineStyles(result.value, theme);
}

// ==================== 内部辅助 ====================

/**
 * 将 HTML 字符串中的 hljs class 替换为内联 style
 */
function replaceClassesWithInlineStyles(
  html: string,
  theme: HighlightTheme
): string {
  const styleMap = theme === "dark" ? HLJS_DARK_MAP : HLJS_LIGHT_MAP;

  return html.replace(/<span class="([^"]*)">/g, (_match, classes: string) => {
    const classList = classes.split(/\s+/);
    const styles: string[] = [];

    for (const cls of classList) {
      const mapped = styleMap[cls];
      if (mapped) {
        styles.push(mapped);
      }
    }

    if (styles.length > 0) {
      return `<span style="${styles.join(";")}">`;
    }
    return "<span>";
  });
}

/**
 * HTML 实体转义（高亮失败时的回退）
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
