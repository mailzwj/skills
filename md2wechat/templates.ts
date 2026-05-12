/**
 * 微信公众号文章主题配置
 *
 * 每个主题定义一套颜色与样式参数，渲染器将按主题输出内联样式 HTML。
 * 微信公众号编辑器不支持 <style> 块，所有样式均在渲染时内联写入标签。
 *
 * 主题数量：14 个（6 个原始 + 8 个新增）
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
  // ==================== 原始 6 个主题 ====================

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

  // ==================== 新增 8 个主题（提取自 templates/ HTML 模板）====================

  // ---- 中国红 ----
  "chinese-red": {
    name: "chinese-red",
    label: "中国红",
    primaryColor: "#F25C54",
    secondaryColor: "#d94a4a",
    textColor: "#2c2c2c",
    mutedColor: "#555555",
    codeBg: "#fafafa",
    codeTextColor: "#333333",
    inlineCodeBg: "#fdf0f0",
    inlineCodeTextColor: "#c0392b",
    blockquoteBg: "#fef9f8",
    blockquoteBorder: "#F25C54",
    tableHeaderBg: "#fef5f5",
    tableOddBg: "#fffafa",
    tableBorder: "#f5c0c0",
    hrColor: "#f5b0b0",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 中国风 ----
  "chinese-style": {
    name: "chinese-style",
    label: "中国风",
    primaryColor: "#8b1e22",
    secondaryColor: "#6b181a",
    textColor: "#333333",
    mutedColor: "#666666",
    codeBg: "#faf8f5",
    codeTextColor: "#302826",
    inlineCodeBg: "#f2ebe0",
    inlineCodeTextColor: "#8b1e22",
    blockquoteBg: "#fdf8f5",
    blockquoteBorder: "#8b1e22",
    tableHeaderBg: "#f5efe4",
    tableOddBg: "#faf7f2",
    tableBorder: "#d4c5b0",
    hrColor: "#c4a080",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 字节 ----
  "byte-flavor": {
    name: "byte-flavor",
    label: "字节",
    primaryColor: "#1677ff",
    secondaryColor: "#05d4cd",
    textColor: "#1d2129",
    mutedColor: "#4e5969",
    codeBg: "#f7f8fa",
    codeTextColor: "#1d2129",
    inlineCodeBg: "#e8f0ff",
    inlineCodeTextColor: "#1677ff",
    blockquoteBg: "#f2f3f5",
    blockquoteBorder: "#05d4cd",
    tableHeaderBg: "#1677ff",
    tableOddBg: "#f7f8fa",
    tableBorder: "#e5e6eb",
    hrColor: "#c9cdd4",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 日落 ----
  "sunset": {
    name: "sunset",
    label: "日落",
    primaryColor: "#d78a54",
    secondaryColor: "#a45a33",
    textColor: "#3d2c1e",
    mutedColor: "#6a4c38",
    codeBg: "#f5e6d0",
    codeTextColor: "#c0582a",
    inlineCodeBg: "#f5e6d0",
    inlineCodeTextColor: "#c0582a",
    blockquoteBg: "#f9ecd9",
    blockquoteBorder: "#d78a54",
    tableHeaderBg: "#f5e6d0",
    tableOddBg: "#faf3e8",
    tableBorder: "#e8d5b8",
    hrColor: "#d78a54",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 苹果 ----
  "apple-style": {
    name: "apple-style",
    label: "苹果",
    primaryColor: "#007aff",
    secondaryColor: "#5856d6",
    textColor: "#1d1d1f",
    mutedColor: "#333333",
    codeBg: "#fbfbfd",
    codeTextColor: "#111827",
    inlineCodeBg: "#ecebf8",
    inlineCodeTextColor: "#4f46cf",
    blockquoteBg: "#fafafa",
    blockquoteBorder: "#007aff",
    tableHeaderBg: "#f5f5f7",
    tableOddBg: "#fafafa",
    tableBorder: "#e5e5ea",
    hrColor: "#d2d2d7",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 赛博 ----
  "cyberpunk": {
    name: "cyberpunk",
    label: "赛博",
    primaryColor: "#8b5cf6",
    secondaryColor: "#f472b6",
    textColor: "#1d1d1f",
    mutedColor: "#333333",
    codeBg: "#fbfbfd",
    codeTextColor: "#17172a",
    inlineCodeBg: "#ede8f8",
    inlineCodeTextColor: "#8b5cf6",
    blockquoteBg: "#fdf5fb",
    blockquoteBorder: "#8b5cf6",
    tableHeaderBg: "#f5f0fc",
    tableOddBg: "#faf7fe",
    tableBorder: "#e0d4f8",
    hrColor: "#c4b5fd",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 运动风 ----
  "sporty": {
    name: "sporty",
    label: "运动风",
    primaryColor: "#00A968",
    secondaryColor: "#FF6600",
    textColor: "#2c2c2c",
    mutedColor: "#3c3c3e",
    codeBg: "#ffffff",
    codeTextColor: "#1f2937",
    inlineCodeBg: "#e6f5ee",
    inlineCodeTextColor: "#008a56",
    blockquoteBg: "#f8f8f8",
    blockquoteBorder: "#00A968",
    tableHeaderBg: "#e6f5ee",
    tableOddBg: "#f5fbf8",
    tableBorder: "#c8e6d4",
    hrColor: "#a0d8c0",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },

  // ---- 暖土 ----
  "warm-earth": {
    name: "warm-earth",
    label: "暖土",
    primaryColor: "#c86442",
    secondaryColor: "#9f452c",
    textColor: "#222222",
    mutedColor: "#3f3f3f",
    codeBg: "#fafaf9",
    codeTextColor: "#3b342f",
    inlineCodeBg: "#f5ede8",
    inlineCodeTextColor: "#9f452c",
    blockquoteBg: "#f7f7f7",
    blockquoteBorder: "#c86442",
    tableHeaderBg: "#f5ede8",
    tableOddBg: "#faf8f5",
    tableBorder: "#e0d5cc",
    hrColor: "#d0c0b0",
    h1Size: "22px",
    bodySize: "15px",
    darkCode: false,
  },
};

/** 主题名称列表 */
export const THEME_NAMES = Object.keys(THEMES);

/** 主题名称 → 显示标签 映射 */
export const THEME_LABELS: Record<string, string> = {};
for (const [key, theme] of Object.entries(THEMES)) {
  THEME_LABELS[key] = theme.label;
}
