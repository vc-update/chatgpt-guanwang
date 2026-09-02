import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(root, 'docs')
const configPath = join(docsDir, '.vitepress', 'config.mts')
const publicDir = join(docsDir, 'public')
const distDir = join(docsDir, '.vitepress', 'dist')
const siteUrl = 'https://chatgpt-guanwang.com'
const sections = [
  { key: 'official', name: '官方入口' },
  { key: 'guides', name: '使用教程' },
  { key: 'safety', name: '安全识别' },
  { key: 'domestic', name: '国内方案' },
]

function unquote(value = '') {
  const trimmed = value.trim()
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseFrontmatter(source) {
  const clean = source.replace(/^\uFEFF/, '')
  const match = clean.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const result = {}
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (item) result[item[1]] = unquote(item[2])
  }
  return result
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(path))
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(path)
  }
  return files
}

function routeFor(file) {
  let route = relative(docsDir, file).replace(/\\/g, '/').replace(/\.md$/i, '')
  route = route.replace(/\/index$/i, '/')
  if (!route.startsWith('/')) route = `/${route}`
  return route.length > 1 ? route.replace(/\/+$/, '') : route
}

function escapeMarkdown(value = '') {
  return value.replaceAll('|', '\\|').replace(/\s+/g, ' ').trim()
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

async function articleMeta() {
  const groups = []
  for (const section of sections) {
    const sectionDir = join(docsDir, section.key)
    const articles = []
    for (const file of await walk(sectionDir)) {
        if (/[\\/]index\.md$/i.test(file)) continue
      const source = await readFile(file, 'utf8')
      const frontmatter = parseFrontmatter(source)
      const title = frontmatter.title || source.match(/^#\s+(.+)$/m)?.[1]?.trim()
      if (!title) continue
      articles.push({
        route: routeFor(file),
        title,
        description: frontmatter.description || `${section.name}相关的中文操作说明与安全核验。`,
        date: String(frontmatter.updated || frontmatter.date || '').slice(0, 10),
        section: section.name,
      })
    }
    articles.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'))
    groups.push({ ...section, articles })
  }
  return groups
}

async function syncSourceDiscovery() {
  const groups = await articleMeta()
  const all = groups.flatMap((group) => group.articles)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'))
  const latestDate = all.find((article) => article.date)?.date || '2026-06-29'

  const sidebar = groups.map((group) => ({
    text: group.name,
    collapsed: false,
    items: group.articles.map((article) => ({ text: article.title, link: article.route })),
  }))

  const config = await readFile(configPath, 'utf8')
  const sidebarMarkers = /\/\/ AUTO-GENERATED ARTICLE SIDEBAR START[\s\S]*?\/\/ AUTO-GENERATED ARTICLE SIDEBAR END/
  if (!sidebarMarkers.test(config)) throw new Error('Sidebar generation markers were not found')
  const nextConfig = config.replace(
    sidebarMarkers,
    `// AUTO-GENERATED ARTICLE SIDEBAR START\nconst articleSidebar = ${JSON.stringify(sidebar, null, 2)}\n// AUTO-GENERATED ARTICLE SIDEBAR END`,
  )
  if (nextConfig !== config) await writeFile(configPath, nextConfig, 'utf8')

  const latestRows = all.map((article) =>
    `| ${article.date || '未标注'} | [${escapeMarkdown(article.title)}](${article.route}) | ${article.section} |`,
  )
  const latest = `---
title: "最新更新：ChatGPT 官网入口与安全识别文章"
description: "按文章真实更新时间倒序整理 ChatGPT 官网入口、网页版登录、App 下载、账号与付款安全、镜像站风险和国内访问文章。"
date: 2026-06-29
updated: ${latestDate}
outline: deep
---

# 最新更新：ChatGPT 官网入口与安全识别文章

本页按公开文章 frontmatter 中的 \`updated\` 或 \`date\` 自动倒序生成。更新时间表示本站内容修订时间；账号、套餐、模型、额度和地区可用性仍应以对应官方页面的当前说明为准。

| 更新时间 | 文章 | 栏目 |
| :--- | :--- | :--- |
${latestRows.join('\n')}
`
  await writeFile(join(docsDir, 'latest', 'index.md'), latest, 'utf8')

  const llmsSections = groups.map((group) => [
    `## ${group.name}`,
    '',
    ...group.articles.slice(0, 15).map((article) =>
      `- [${article.title}](${siteUrl}${article.route}): ${article.description}`,
    ),
  ].join('\n')).join('\n\n')
  const llms = `# ChatGPT 官网入口识别指南

> 本站是 chatgpt-guanwang.com 的非官方独立指南，不属于 OpenAI 或 ChatGPT 官方网站。官方信息请以 https://chatgpt.com/、https://openai.com/ 和 https://help.openai.com/ 为准。

## Site identity

- [首页](${siteUrl}/): 站点定位、核心栏目和常见问题。
- [最新更新](${siteUrl}/latest): 按文章真实更新时间排列的内容清单。
- [隐私声明](${siteUrl}/privacy): 静态教程站的数据与第三方链接说明。
- [XML Sitemap](${siteUrl}/sitemap.xml): 规范页面发现入口。

${llmsSections}

## Editorial boundary

- 第三方中文平台、镜像站和聚合服务必须与 OpenAI 官方入口明确区分。
- 不应向陌生页面提交密码、验证码、Cookie、API Key、付款信息或敏感文件。
- 模型、套餐、额度、价格和地区可用性可能变化，应回到对应官方或服务页面复核。
`
  await mkdir(publicDir, { recursive: true })
  await writeFile(join(publicDir, 'llms.txt'), llms, 'utf8')

  console.log(`Synced ${all.length} articles into sidebar, latest and llms.txt.`)
}

async function syncPostBuild() {
  const sitemapPath = join(distDir, 'sitemap.xml')
  if (!existsSync(sitemapPath)) throw new Error('Missing docs/.vitepress/dist/sitemap.xml; build first')
  const sitemap = await readFile(sitemapPath, 'utf8')
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  const sitemapText = `${urls.join('\n')}\n`
  const sitemapHtml = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${siteUrl}/sitemap">
  <title>ChatGPT官网入口识别指南站点地图</title>
</head>
<body>
  <main>
    <h1>ChatGPT官网入口识别指南站点地图</h1>
    <p>共 ${urls.length} 个 canonical 页面。正式 XML Sitemap：<a href="${siteUrl}/sitemap.xml">${siteUrl}/sitemap.xml</a></p>
    <ul>
${urls.map((url) => `      <li><a href="${escapeHtml(url)}">${escapeHtml(url)}</a></li>`).join('\n')}
    </ul>
  </main>
</body>
</html>
`

  for (const dir of [publicDir, distDir]) {
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'sitemap.txt'), sitemapText, 'utf8')
    await writeFile(join(dir, 'sitemap.html'), sitemapHtml, 'utf8')
  }
  const llms = await readFile(join(publicDir, 'llms.txt'), 'utf8')
  await writeFile(join(distDir, 'llms.txt'), llms, 'utf8')
  console.log(`Synced helper sitemaps with ${urls.length} canonical URLs.`)
}

if (process.argv.includes('--post-build')) await syncPostBuild()
else await syncSourceDiscovery()
