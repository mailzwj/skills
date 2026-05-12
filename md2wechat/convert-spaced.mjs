// Convert MD to HTML, handling spaces in filenames
import { readFileSync, writeFileSync } from 'fs';

const mdPath = 'F:/Workspace/ai_playground/articles/Wan2.x LoRA训练本地实战-0.md';
const htmlPath = 'F:/Workspace/ai_playground/articles/Wan2.x LoRA训练本地实战-0.html';

const { markdownToWechatHtml } = await import('./index.ts');

const md = readFileSync(mdPath, 'utf-8');
console.log(`📖 读取文件: ${md.length} 字符`);

const { html } = await markdownToWechatHtml(md, {
  theme: 'warm-orange',
  title: 'Wan2.x LoRA训练本地实战',
});

writeFileSync(htmlPath, html, 'utf-8');
console.log(`✅ HTML 已保存: ${html.length} 字符`);
