/**
 * 微信公众号文章主题配置
 *
 * 每个主题定义一套颜色与样式参数，渲染器将按主题输出内联样式 HTML。
 * 微信公众号编辑器不支持 <style> 块，所有样式均在渲染时内联写入标签。
 */

export interface ThemeConfig {
  name: string;
  label: string;
  /** 主色，用于标题装饰线、链接等 */
  primaryColor: string;
  /** 辅色，用于三级标题等 */
  secondaryColor: string;
  /** 正文字色 */
  textColor: string;
  /** 浅色文本（引用、注释） */
  mutedColor: string;
  /** 代码块背景 */
  codeBg: string;
  /** 代码块文字 */
  codeTextColor: string;
  /** 行内代码背景 */
  inlineCodeBg: string;
  /** 行内代码文字 */
  inlineCodeTextColor: string;
  /** 引用块背景 */
  blockquoteBg: string;
  /** 引用块左边框颜色 */
  blockquoteBorder: string;
  /** 表格表头背景 */
  tableHeaderBg: string;
  /** 表格奇数行背景 */
  tableOddBg: string;
  /** 表格边框色 */
  tableBorder: string;
  /** 分割线颜色 */
  hrColor: string;
  /** 一级标题字号 */
  h1Size: string;
  /** 正文字号 */
  bodySize: string;
  /** 代码块是否暗色主题 */
  darkCode: boolean;
}

// ==================== 主题定义 ====================

export const THEMES: Record<string, ThemeConfig> = {
  // ---- 经典绿（微信公众号品牌色）----
  "wechat-green": {
    name: "wechat-green",
    label: "经典绿",
    primaryColor: "#07c160",
    secondaryColor: "#576b95",
    textColor: "#333333",
    mutedColor: "#666666",
    codeBg: "#1e1e1e",
    codeTextColor: "#d4d4d4",
    inlineCodeBg: "#f0f0f0",
    inlineCodeTextColor: "#c7254e",
    blockquoteBg: "#f8f8f8",
    blockquoteBorder: "#07c160",
    tableHeaderBg: "#f0f0f0",
    tableOddBg: "#fafafa",
    tableBorder: "#e0e0e0",
    hrColor: "#ebebeb",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: true,
  },

  // ---- 简约蓝 ----
  "simple-blue": {
    name: "simple-blue",
    label: "简约蓝",
    primaryColor: "#2563eb",
    secondaryColor: "#64748b",
    textColor: "#1e293b",
    mutedColor: "#64748b",
    codeBg: "#1e293b",
    codeTextColor: "#e2e8f0",
    inlineCodeBg: "#f1f5f9",
    inlineCodeTextColor: "#2563eb",
    blockquoteBg: "#f8fafc",
    blockquoteBorder: "#2563eb",
    tableHeaderBg: "#2563eb",
    tableOddBg: "#f8fafc",
    tableBorder: "#e2e8f0",
    hrColor: "#cbd5e1",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: true,
  },

  // ---- 科技紫 ----
  "tech-purple": {
    name: "tech-purple",
    label: "科技紫",
    primaryColor: "#7c3aed",
    secondaryColor: "#a855f7",
    textColor: "#1f2937",
    mutedColor: "#6b7280",
    codeBg: "#1e1e2e",
    codeTextColor: "#cdd6f4",
    inlineCodeBg: "#f3f0ff",
    inlineCodeTextColor: "#7c3aed",
    blockquoteBg: "#faf5ff",
    blockquoteBorder: "#7c3aed",
    tableHeaderBg: "#7c3aed",
    tableOddBg: "#faf5ff",
    tableBorder: "#e9d5ff",
    hrColor: "#c4b5fd",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: true,
  },

  // ---- 文艺橙 ----
  "warm-orange": {
    name: "warm-orange",
    label: "文艺橙",
    primaryColor: "#f97316",
    secondaryColor: "#ea580c",
    textColor: "#4a4a4a",
    mutedColor: "#78716c",
    codeBg: "#292524",
    codeTextColor: "#f5f5f4",
    inlineCodeBg: "#fff7ed",
    inlineCodeTextColor: "#c2410c",
    blockquoteBg: "#fff7ed",
    blockquoteBorder: "#f97316",
    tableHeaderBg: "#fff7ed",
    tableOddBg: "#fffbeb",
    tableBorder: "#fed7aa",
    hrColor: "#fdba74",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: true,
  },

  // ---- 极简黑白 ----
  "minimal-bw": {
    name: "minimal-bw",
    label: "极简黑白",
    primaryColor: "#000000",
    secondaryColor: "#333333",
    textColor: "#000000",
    mutedColor: "#555555",
    codeBg: "#f5f5f5",
    codeTextColor: "#333333",
    inlineCodeBg: "#f5f5f5",
    inlineCodeTextColor: "#000000",
    blockquoteBg: "#ffffff",
    blockquoteBorder: "#000000",
    tableHeaderBg: "#f5f5f5",
    tableOddBg: "#fafafa",
    tableBorder: "#e5e5e5",
    hrColor: "#000000",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 清新渐变 ----
  "fresh-gradient": {
    name: "fresh-gradient",
    label: "清新渐变",
    primaryColor: "#06b6d4",
    secondaryColor: "#3b82f6",
    textColor: "#374151",
    mutedColor: "#6b7280",
    codeBg: "#0f172a",
    codeTextColor: "#e2e8f0",
    inlineCodeBg: "#ecfeff",
    inlineCodeTextColor: "#0e7490",
    blockquoteBg: "#ecfeff",
    blockquoteBorder: "#06b6d4",
    tableHeaderBg: "#06b6d4",
    tableOddBg: "#f0f9ff",
    tableBorder: "#cffafe",
    hrColor: "#67e8f9",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: true,
  },
};

/** 主题名称列表 */
export const THEME_NAMES = Object.keys(THEMES);

/** 主题名称 → 显示标签 映射 */
export const THEME_LABELS: Record<string, string> = {};
for (const [key, theme] of Object.entries(THEMES)) {
  THEME_LABELS[key] = theme.label;
}
