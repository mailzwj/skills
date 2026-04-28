/**
 * Auto-WeChatMP - 微信公众号文章自动发布工具
 *
 * 整合 HTML 内容准备、封面上传、草稿创建和发布的全流程。
 * 基于 wechatmp-publish 的微信 API 实现。
 */

import { fetch } from 'undici';
import * as fs from 'fs';
import * as path from 'path';

// ==================== 从 wechatmp-publish 复用核心函数 ====================

const WECHATMP_APPID = process.env.WECHATMP_APPID || '';
const WECHATMP_APPSECRET = process.env.WECHATMP_APPSECRET || '';
const API_BASE_URL = 'https://api.weixin.qq.com';

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

interface Article {
  title: string;
  content: string;
  author?: string;
  digest?: string;
  thumb_media_id?: string;
  show_cover_pic?: number;
}

interface PublishResult {
  media_id: string;
  article_id: string;
  msg_id: number;
  thumb_media_id?: string;
}

// ==================== Token 管理 ====================

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt - 5 * 60 * 1000) {
    return cachedToken;
  }

  const url = `${API_BASE_URL}/cgi-bin/token?grant_type=client_credential&appid=${WECHATMP_APPID}&secret=${WECHATMP_APPSECRET}`;

  const response = await fetch(url, { method: 'GET' });
  const data = (await response.json()) as { access_token: string; expires_in: number; errcode?: number; errmsg?: string };

  if (data.errcode) {
    throw new Error(`获取 Access Token 失败：${data.errmsg} (错误码：${data.errcode})`);
  }

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 10) * 1000;

  return cachedToken;
}

// ==================== 封面上传 ====================

async function uploadCover(imageUrl: string): Promise<{ media_id: string; url: string }> {
  const token = await getToken();
  const apiUrl = `${API_BASE_URL}/cgi-bin/material/add_material?type=image&access_token=${token}`;

  let filePath: string;
  let tempFile = false;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    const response = await fetch(imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    tempFile = true;
    filePath = path.join(process.cwd(), 'temp-cover-upload.jpg');
    fs.writeFileSync(filePath, buffer);
  } else {
    filePath = imageUrl;
  }

  try {
    const imageBuffer = fs.readFileSync(filePath);

    // 使用 sharp 转换为 JPEG（微信只支持 jpg）
    let jpegBuffer: Buffer;
    try {
      const { default: sharp } = await import('sharp');
      jpegBuffer = await sharp(imageBuffer).jpeg({ quality: 85 }).toBuffer();
    } catch {
      jpegBuffer = imageBuffer;
    }

    const fileName = 'cover.jpg';
    const mimeType = 'image/jpeg';
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

    const CRLF = Buffer.from('\r\n');
    const parts = [
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from(`Content-Disposition: form-data; name="media"; filename="${fileName}"\r\n`),
      Buffer.from(`Content-Type: ${mimeType}\r\n`),
      CRLF,
      jpegBuffer,
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ];
    const body = Buffer.concat(parts);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body: Buffer.from(body, 'binary'),
    });

    const data = (await response.json()) as { errcode: number; errmsg: string; media_id: string; url: string };

    if (data.errcode) {
      throw new Error(`上传封面失败：${data.errmsg} (错误码：${data.errcode})`);
    }

    return { media_id: data.media_id, url: data.url };
  } finally {
    if (tempFile && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

// ==================== 草稿管理 ====================

async function createDraft(articles: Article[]): Promise<{ media_id: string; article_id: string }> {
  if (articles.length < 1 || articles.length > 8) {
    throw new Error('图文数量必须在 1-8 篇之间');
  }

  const token = await getToken();
  const url = `${API_BASE_URL}/cgi-bin/draft/add?access_token=${token}`;

  const payload = {
    articles: articles.map((article) => ({
      title: article.title,
      author: article.author || '遇见AI',
      digest: article.digest || article.title.substring(0, 54),
      content: article.content,
      content_source_url: '',
      show_cover_pic: article.show_cover_pic ?? 1,
      ...(article.thumb_media_id ? { thumb_media_id: article.thumb_media_id } : {}),
    })),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { errcode: number; errmsg: string; media_id: string; article_id: string };

  if (data.errcode) {
    throw new Error(`创建草稿失败：${data.errmsg} (错误码：${data.errcode})`);
  }

  return { media_id: data.media_id, article_id: data.article_id };
}

async function publishDraft(mediaId: string): Promise<number> {
  const token = await getToken();
  const url = `${API_BASE_URL}/cgi-bin/freepublish/submit?access_token=${token}`;

  const payload = {
    media_id: mediaId,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { errcode: number; errmsg: string; msg_id?: number; publish_id?: number };

  if (data.errcode) {
    throw new Error(`发布失败：${data.errmsg} (错误码：${data.errcode})`);
  }

  return data.publish_id || data.msg_id || 0;
}

async function deleteDraft(mediaId: string, articleId: string): Promise<void> {
  const token = await getToken();
  const url = `${API_BASE_URL}/cgi-bin/draft/del?access_token=${token}`;

  const payload = { media_id: mediaId, article_id: articleId };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { errcode: number; errmsg: string };

  if (data.errcode && data.errcode !== 0) {
    throw new Error(`删除草稿失败：${data.errmsg} (错误码：${data.errcode})`);
  }
}

async function listDrafts(offset: number = 0, count: number = 20) {
  const token = await getToken();
  const url = `${API_BASE_URL}/cgi-bin/draft/batch_get?access_token=${token}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, count }),
  });

  const data = await response.json();
  if ((data as any).errcode && (data as any).errcode !== 0) {
    throw new Error(`查询草稿失败：${(data as any).errmsg} (错误码：${(data as any).errcode})`);
  }

  return data;
}

// ==================== 一键发布 ====================

async function publishArticle(params: {
  title: string;
  content: string;
  author: string;
  cover?: string;
  digest?: string;
}): Promise<PublishResult> {
  const { title, content, author, cover, digest } = params;

  // 1. 上传封面图
  let thumbMediaId: string | undefined;
  if (cover) {
    console.log('📷 上传封面图片...');
    const result = await uploadCover(cover);
    thumbMediaId = result.media_id;
    console.log(`✅ 封面上传成功 (media_id: ${thumbMediaId})`);
  }

  // 2. 创建草稿
  console.log('📝 创建草稿...');
  const draft = await createDraft([
    {
      title,
      content,
      author,
      digest: digest || title.substring(0, 54),
      thumb_media_id: thumbMediaId,
      show_cover_pic: thumbMediaId ? 1 : 0,
    },
  ]);
  console.log(`✅ 草稿创建成功 (media_id: ${draft.media_id}, article_id: ${draft.article_id})`);

  // 3. 发布草稿
  console.log('🚀 发布文章...');
  const publishId = await publishDraft(draft.media_id);
  console.log(`✅ 文章发布成功 (publish_id: ${publishId})`);

  return {
    media_id: draft.media_id,
    article_id: draft.article_id,
    msg_id: publishId,
    thumb_media_id: thumbMediaId,
  };
}

// ==================== Markdown 转 HTML ====================

async function markdownToHtml(markdown: string): Promise<string> {
  try {
    const md2wechat = await import('../../md2wechat/index.ts');
    const result = await md2wechat.markdownToWechatHtml(markdown, {
      theme: 'wechat-green',
      wrapDocument: false,
    });
    return result.html;
  } catch {
    // 简易后备转换
    console.warn('⚠️  md2wechat 未找到，使用简易 Markdown 转换');
    return simpleMarkdownToHtml(markdown);
  }
}

function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([\s\S]+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/!\[([\s\S]*?)\]\((https?:\/\/[^\s]+?)\)/g, '<img src="$2" alt="$1" />')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  return `<p>${html}</p>`;
}

// ==================== 工具函数 ====================

function readHtmlContent(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`文件不存在：${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

function extractTitleFromHtml(html: string): string {
  const h1Match = html.match(/<h1[^>]*>(.+?)<\/h1>/i);
  return h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
}

// ==================== 参数解析 ====================

function parseArgs(args: string[]): Record<string, string> {
  const parsed: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].replace(/^--/, '');
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
      parsed[key] = value;
      if (value !== 'true') i++;
    } else if (args[i].startsWith('-')) {
      const key = args[i].replace(/^-/, '');
      const value = args[i + 1] && !args[i + 1].startsWith('-') ? args[i + 1] : 'true';
      parsed[key] = value;
      if (value !== 'true') i++;
    } else {
      positional.push(args[i]);
    }
  }

  parsed._positional = positional.join(' ');
  return parsed;
}

function showHelp() {
  console.log(`
📮 Auto-WeChatMP - 微信公众号文章自动发布

用法:
  npx tsx auto-wechatmp/src/auto-wechatmp.ts <命令> [选项]

命令:
  publish       一键发布文章（创建草稿 + 发布）
  draft         仅创建草稿（不发布）
  upload-cover  上传封面图片
  list-drafts   查询草稿列表
  delete-draft  删除草稿

选项:
  --title <标题>       文章标题（必需）
  --author <作者>      文章作者（默认 "遇见AI"）
  --file <路径>        HTML 或 Markdown 文件路径
  --content <HTML>     HTML 内容字符串
  --cover <路径/URL>   封面图片路径或 URL
  --digest <摘要>      文章摘要

示例:
  # 从 HTML 文件发布
  npx tsx auto-wechatmp/src/auto-wechatmp.ts publish \\
    --title "我的文章" --author "遇见AI" \\
    --file "./article.html" \\
    --cover "https://example.com/cover.jpg"

  # 从 Markdown 文件发布
  npx tsx auto-wechatmp/src/auto-wechatmp.ts publish \\
    --title "AI 周报" --author "AI编辑" \\
    --file "./weekly.md"

  # 上传封面图片
  npx tsx auto-wechatmp/src/auto-wechatmp.ts upload-cover \\
    --cover "https://example.com/cover.jpg"

  # 查询草稿列表
  npx tsx auto-wechatmp/src/auto-wechatmp.ts list-drafts
`);
}

// ==================== 主流程 ====================

async function handlePublish(args: string[], publishAfterDraft: boolean = true): Promise<void> {
  const params = parseArgs(args);

  const title = params.title || '';
  const author = params.author || '遇见AI';
  const filePath = params.file || '';
  const content = params.content || '';
  const cover = params.cover || '';
  const digest = params.digest || '';

  // 验证必要参数
  if (!title) {
    throw new Error('缺少文章标题 (--title)，可通过交互式问答提供');
  }

  // 获取 HTML 内容
  let htmlContent: string;

  if (filePath) {
    if (filePath.endsWith('.md')) {
      console.log('📖 读取 Markdown 文件并转换为 HTML...');
      const mdContent = fs.readFileSync(filePath, 'utf-8');
      htmlContent = await markdownToHtml(mdContent);
      console.log('✅ Markdown 转换完成');
    } else {
      console.log('📖 读取 HTML 文件...');
      htmlContent = readHtmlContent(filePath);
    }
    console.log(`   文件: ${filePath} (${htmlContent.length} 字符)`);
  } else if (content) {
    htmlContent = content;
    console.log(`📄 使用提供的 HTML 内容 (${htmlContent.length} 字符)`);
  } else {
    throw new Error('请提供 HTML 内容 (--file 或 --content)，可通过交互式问答提供');
  }

  if (publishAfterDraft) {
    // 一键发布
    const result = await publishArticle({
      title,
      content: htmlContent,
      author,
      cover,
      digest,
    });

    console.log('\n📊 发布结果:');
    console.log(JSON.stringify({
      success: true,
      title,
      author,
      media_id: result.media_id,
      article_id: result.article_id,
      msg_id: result.msg_id,
      thumb_media_id: result.thumb_media_id || '(无封面)',
    }, null, 2));
  } else {
    // 仅创建草稿
    let thumbMediaId: string | undefined;
    if (cover) {
      console.log('📷 上传封面图片...');
      thumbMediaId = (await uploadCover(cover)).media_id;
      console.log(`✅ 封面上传成功 (media_id: ${thumbMediaId})`);
    }

    console.log('📝 创建草稿...');
    const draft = await createDraft([
      {
        title,
        content: htmlContent,
        author,
        digest: digest || title.substring(0, 54),
        thumb_media_id: thumbMediaId,
        show_cover_pic: thumbMediaId ? 1 : 0,
      },
    ]);

    console.log('\n📊 草稿创建结果:');
    console.log(JSON.stringify({
      success: true,
      title,
      author,
      media_id: draft.media_id,
      article_id: draft.article_id,
      thumb_media_id: thumbMediaId || '(无封面)',
      note: '草稿已创建，可通过微信公众号后台或 publish 命令发布',
    }, null, 2));
  }
}

async function handleUploadCover(args: string[]): Promise<void> {
  const params = parseArgs(args);
  const cover = params.cover || '';

  if (!cover) {
    throw new Error('请提供封面图片路径或 URL (--cover)');
  }

  console.log('📷 上传封面图片...');
  const result = await uploadCover(cover);

  console.log('\n📊 上传结果:');
  console.log(JSON.stringify({
    success: true,
    media_id: result.media_id,
    url: result.url,
    note: '发布文章时使用此 media_id 作为 thumb_media_id',
  }, null, 2));
}

async function handleListDrafts(args: string[]): Promise<void> {
  const params = parseArgs(args);
  const count = parseInt(params.count || '20');

  console.log('📋 查询草稿列表...');
  const result = await listDrafts(0, count);

  console.log('\n📊 草稿列表:');
  console.log(JSON.stringify(result, null, 2));
}

async function handleDeleteDraft(args: string[]): Promise<void> {
  const params = parseArgs(args);
  const mediaId = params['media-id'] || '';
  const articleId = params['article-id'] || '';

  if (!mediaId || !articleId) {
    throw new Error('请提供 --media-id 和 --article-id');
  }

  console.log('🗑️  删除草稿...');
  await deleteDraft(mediaId, articleId);
  console.log('✅ 草稿删除成功');
}

// ==================== CLI 入口 ====================

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // help 命令不需要环境变量
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    process.exit(command ? 0 : 1);
  }

  // 其他命令需要环境变量
  if (!WECHATMP_APPID || !WECHATMP_APPSECRET) {
    console.error('❌ 错误：请设置 WECHATMP_APPID 和 WECHATMP_APPSECRET 环境变量');
    console.error('   export WECHATMP_APPID="wx..."');
    console.error('   export WECHATMP_APPSECRET="..."');
    process.exit(1);
  }

  console.log('📮 Auto-WeChatMP - 微信公众号文章自动发布');
  console.log(`AppID: ${WECHATMP_APPID.substring(0, 8)}...`);
  console.log(`执行命令: ${command}\n`);

  try {
    const cmdArgs = args.slice(1);

    switch (command) {
      case 'publish':
        await handlePublish(cmdArgs, true);
        break;
      case 'draft':
        await handlePublish(cmdArgs, false);
        break;
      case 'upload-cover':
        await handleUploadCover(cmdArgs);
        break;
      case 'list-drafts':
        await handleListDrafts(cmdArgs);
        break;
      case 'delete-draft':
        await handleDeleteDraft(cmdArgs);
        break;
      default:
        console.error(`❌ 未知命令: ${command}`);
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ 错误:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// ==================== 导出 ====================

export {
  publishArticle,
  createDraft,
  publishDraft,
  deleteDraft,
  listDrafts,
  uploadCover,
  markdownToHtml,
  readHtmlContent,
  extractTitleFromHtml,
  getToken,
};

export type { Article, PublishResult };

// CLI 入口
const isMainModule =
  process.argv[1]?.endsWith('auto-wechatmp.ts') ||
  process.argv[1]?.endsWith('auto-wechatmp.js');
if (isMainModule) {
  main();
}
