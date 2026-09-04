import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type HeadConfig } from 'vitepress'

const siteUrl = 'https://chatgpt-guanwang.com'
const siteName = 'ChatGPT 官网入口识别指南'
const siteDescription =
  '面向中文用户的 ChatGPT 官网入口、OpenAI 官方网址、网页登录、App 下载和仿冒站风险识别指南。'
const defaultImage = '/images/safe-access-guide.png'
const docsRoot = join(process.cwd(), 'docs')
const officialSourceDomains = [
  'chatgpt.com',
  'openai.com',
  'help.openai.com',
  'status.openai.com',
  'platform.openai.com',
  'developers.openai.com'
]

const sectionNames: Record<string, string> = {
  official: '官方入口',
  guides: '使用教程',
  safety: '安全识别',
  domestic: '国内方案'
}

const navItems = [
  { text: '首页', link: '/' },
  { text: '官方入口', link: '/official/' },
  { text: '使用教程', link: '/guides/' },
  { text: '安全识别', link: '/safety/' },
  { text: '国内方案', link: '/domestic/' },
  { text: '隐私声明', link: '/privacy' },
  { text: '常见问题', link: '/#常见问题' }
]

const officialSidebar = [
  {
    text: '官方入口',
    items: [
      { text: 'ChatGPT官网怎么收藏才安全？官方地址核验、书签设置与假站防范清单【2026年8月】', link: '/official/bookmark-safe-entry' },
      { text: "ChatGPT官网入口地址是什么？chatgpt.com、OpenAI官网与国内使用完整指南【2026年7月】", link: "/official/chatgpt-guanwang-rukou-china-tutorial-2026" },
      { text: "ChatGPT官网与中文版对比：国内访问、注册登录、GPT5.5和GPT-image-2完整教程【2026年7月】", link: "/official/chatgpt-guanwang-vs-chinese-gpt55-image2-2026" },
      { text: "ChatGPT 官网怎么进：官方地址核对、国内访问方案与 GPT/Claude/Grok/Gemini 选择【2026年7月更新】", link: "/official/chatgpt-guanwang-access-guide-2026" },
      { text: "ChatGPT官网入口与App下载指南：国内打不开、登录失败和中文版备用方案【2026年7月更新】", link: "/official/chatgpt-guanwang-entry-app-download-2026" },
      { text: "ChatGPT官网入口打不开怎么办？国内ChatGPT中文版入口与多模型使用教程（GPT-5.5、Claude、Grok、Gemini）【2026年7月更新】", link: "/official/chatgpt-guanwang-rukou-dabukai-2026" },
      { text: "ChatGPT官网入口：国内ChatGPT中文版使用教程（支持GPT-5.5、GPT-image-2）【2026年7月更新】", link: "/official/chatgpt-guanwang-rukou-zhongwenban-jiaocheng-2026" },
      { text: "ChatGPT官网与中文版使用指南：国内可用镜像、注册教程与GPT-5.5说明【2026年7月更新】", link: "/official/chatgpt-guanwang-zhongwenban-2026" },
      { text: "ChatGPT官网入口、网页版和中文版怎么选？2026国内访问完整指南", link: "/official/chatgpt-guanwang-rukou-webpage-chinese-china-access-2026" },
      { text: 'ChatGPT官方网址入口（官网网址登录入口）｜中文版与国内使用指南', link: '/official/entry' },
      { text: 'ChatGPT 官网入口与国内使用指南：官方地址、网页版、App 下载和国内方案', link: '/official/official-entry-domestic-guide' },
      { text: 'ChatGPT 官方网址是哪个', link: '/official/url' },
      { text: 'ChatGPT 官网入口在哪里', link: '/official/where-is-chatgpt-official' },
      { text: 'ChatGPT 中文官网入口是真的吗', link: '/official/chinese-official-entry' },
      { text: 'OpenAI ChatGPT 中文版使用指南：官网入口、模型选择与国内访问方法', link: '/official/openai-chatgpt-chinese-guide' },
      { text: 'ChatGPT 中文入口与官方地址核对指南', link: '/official/chatgpt-zh-cn-entry' },
      { text: 'chatgpt.com 和 openai.com 有什么区别', link: '/official/chatgpt-com-vs-openai-com' },
      { text: 'ChatGPT 官方登录页怎么辨别', link: '/official/official-login-page' }
    ]
  }
]

const guidesSidebar = [
  {
    text: '使用教程',
    items: [
      { text: 'ChatGPT语音对话怎么用：手机App、网页版、中文设置与隐私提醒【2026年8月】', link: '/guides/chatgpt-voice-conversation-mobile-web-chinese-guide-20260808' },
      { text: 'ChatGPT联网搜索怎么用：网页版搜索、引用来源与信息核验指南【2026年8月】', link: '/guides/chatgpt-web-search-citations-current-information-guide-20260808' },
      { text: 'ChatGPT提示词怎么写：中文办公、写作、翻译和总结模板【2026年8月】', link: '/guides/chatgpt-prompt-writing-chinese-office-translation-summary-20260805' },
      { text: 'ChatGPT网页版使用教程（2026国内完整指南）：官网入口与登录步骤', link: '/guides/chatgpt-web-login-entry-mobile-desktop-no-download-20260714' },
      { text: 'ChatGPT在线使用入口：网页版免下载、手机电脑和国内备用方案【2026年8月】', link: '/guides/chatgpt-online-use-web-mobile-desktop-domestic-backup-20260803' },
      { text: 'ChatGPT官网入口网页版：chatgpt.com登录地址、中文界面与真假入口核验【2026年8月】', link: '/guides/chatgpt-web-version-chinese' },
      { text: 'ChatGPT网页版登录和下载怎么选：官网入口、App安装与国内备用方案', link: '/guides/chatgpt-web-login-download-guide-2026-07' },
      { text: 'GPT Image 2国内怎么用：图片生成、隐私风险和GPTCat工作流', link: '/guides/gpt-image-2-domestic-image-workflow-gptcat-2026-07' },
      { text: 'ChatGPT登录入口在哪里？官网登录地址、验证码收不到与账号异常排查【2026年8月】', link: '/guides/login' },
      { text: 'ChatGPT 官网入口及国内使用教程：官方地址、登录入口、网页版和 App 下载', link: '/guides/official-login-web-app' },
      { text: 'ChatGPT 使用入口整理：官网、登录入口、网页版、App 下载与国内可用方案', link: '/guides/access-roundup-official-web-app-domestic' },
      { text: 'ChatGPT 网页版入口和使用方法', link: '/guides/web' },
      { text: 'ChatGPT App 下载与真假 App 识别', link: '/guides/app' },
      { text: 'ChatGPT 打不开怎么办', link: '/guides/cannot-open' },
      { text: 'ChatGPT 怎么使用：新手从打开官网到开始提问', link: '/guides/beginner-guide' },
      { text: 'ChatGPT 登录失败怎么办', link: '/guides/login-failed' },
      { text: 'ChatGPT 下载与安装教程', link: '/guides/download-install' },
      { text: 'ChatGPT Windows 官方下载入口与安装避坑指南', link: '/guides/windows-official-download' },
      { text: 'ChatGPT 桌面版安装教程：Windows 与 macOS 下载前核对', link: '/guides/desktop-install-windows-macos' },
      { text: 'ChatGPT 下载全平台指南：网页版、Windows、iOS 和 Android', link: '/guides/chatgpt-download-all-platforms' },
      { text: 'ChatGPT Windows 桌面版安装与真假识别', link: '/guides/windows-desktop' },
      { text: 'ChatGPT 安卓版下载安全吗', link: '/guides/android-download-safety' },
      { text: 'ChatGPT 注册账号与邮箱验证指南', link: '/guides/register-email' },
      { text: 'ChatGPT 提示词入门：中文用户怎么问更清楚', link: '/guides/prompt-basics' }
    ]
  }
]

const safetySidebar = [
  {
    text: '安全识别',
    items: [
      { text: 'ChatGPT官网付款页面怎么辨别？Plus订阅、退款与第三方代充风险核对【2026年8月】', link: '/safety/chatgpt-plus-payment-page-third-party-recharge-risk-20260825' },
      { text: 'ChatGPT官网浏览器自动填充安全吗？保存密码、Cookie与共享设备保护【2026年8月】', link: '/safety/chatgpt-browser-password-autofill-cookie-safety-20260825' },
      { text: 'ChatGPT官网邮件和验证码怎么核验？登录通知、钓鱼链接与账号恢复安全清单【2026年8月】', link: '/safety/chatgpt-official-email-verification-phishing-notice-20260825' },
      { text: 'ChatGPT记忆功能怎么关闭和删除：个性化设置、聊天记录与隐私指南【2026年8月】', link: '/safety/chatgpt-memory-manage-delete-privacy-guide-20260808' },
      { text: 'ChatGPT上传文件安全吗：文档、图片、表格和隐私数据检查清单【2026年8月】', link: '/safety/chatgpt-upload-files-privacy-data-security-checklist-20260805' },
      { text: 'ChatGPT API Key国内使用安全吗：中转站、镜像工具和账号风险', link: '/safety/chatgpt-api-key-domestic-use-risk-2026-07' },
      { text: 'ChatGPT 仿冒网站识别清单', link: '/safety/fake-site-checklist' },
      { text: 'ChatGPT 官网和中文版镜像有什么区别', link: '/safety/official-vs-mirror' },
      { text: 'ChatGPT 镜像网站能不能用', link: '/safety/mirror-risk' },
      { text: 'ChatGPT 中文版镜像网站汇总怎么看', link: '/safety/mirror-site-list-how-to-read' },
      { text: 'Bing 搜索 ChatGPT 官网结果怎么判断真假', link: '/safety/bing-search-result-check' },
      { text: 'ChatGPT 下载站和安装包风险提醒', link: '/safety/download-site-risk' },
      { text: 'ChatGPT 假 App 常见套路', link: '/safety/fake-app-risk' },
      { text: 'ChatGPT 账号密码和验证码安全指南', link: '/safety/account-password-safety' },
      { text: 'ChatGPT 钓鱼链接怎么识别', link: '/safety/phishing-link-check' },
      { text: 'ChatGPT 中文版网站风险判断', link: '/safety/chinese-version-risk' }
    ]
  }
]

const domesticSidebar = [
  {
    text: '国内方案',
    items: [
      { text: 'ChatGPT国内用户使用指南：官网、中文版镜像与多模型工具怎么选【2026年8月】', link: '/domestic/chatgpt-china-user-guide-official-mirror-multimodel-20260803' },
      { text: 'ChatGPT中文版：官网中文使用、国内入口与镜像网站指南', link: '/domestic/chinese-version-free-use' },
      { text: 'ChatGPT国内使用入口怎么选：官网、网页版、中文版和国内可用方案', link: '/domestic/chatgpt-domestic-use-entry-product-guide-2026-07' },
      { text: 'Codex国内怎么用：官网安装、代码权限和ZeoGPT备用方案', link: '/domestic/codex-domestic-use-install-zeogpt-2026-07' },
      { text: '国内如何使用 ChatGPT', link: '/domestic/use' },
      { text: '国内使用 ChatGPT 的几种方案', link: '/domestic/domestic-access-plan' },
      { text: 'ChatGPT 国内怎么使用：官网、镜像与国内可用方案完整指南', link: '/domestic/domestic-mirror-complete-plan' },
      { text: 'ChatGPT 官网无法访问时的国内备选方案', link: '/domestic/no-official-access-alternatives' },
      { text: '国内用户怎么选择 GPT、Claude、Gemini、DeepSeek 等模型', link: '/domestic/model-choice' },
      { text: '国内开发者如何使用 ChatGPT/Codex 类工具', link: '/domestic/coding-ai-tools' }
    ]
  }
]

function pagePath(page: string) {
  const path = page
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
  return path === '' ? '/' : `/${path.replace(/^\/+/, '')}`
}

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString()
}

function jsonLd(data: Record<string, unknown>): HeadConfig {
  return ['script', { type: 'application/ld+json' }, JSON.stringify(data)]
}

function sourceFileForPath(path: string) {
  const pathname = new URL(path, siteUrl).pathname
  const cleanPath = pathname.replace(/^\/+|\/+$/gu, '')
  const relative = cleanPath
    ? pathname.endsWith('/')
      ? `${cleanPath}/index.md`
      : `${cleanPath}.md`
    : 'index.md'
  return join(docsRoot, relative)
}

function sourceDateForPath(path: string) {
  const file = sourceFileForPath(path)
  if (!existsSync(file)) return undefined
  const source = readFileSync(file, 'utf8').replace(/^\uFEFF/u, '')
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/u)?.[1] || ''
  const updated = frontmatter.match(/^updated:\s*([^\r\n#]+)/mu)?.[1]
  const published = frontmatter.match(/^date:\s*([^\r\n#]+)/mu)?.[1]
  const date = (updated || published || '').trim().replace(/^['"]|['"]$/g, '')
  return /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined
}

function sidebarByPrefix(
  groups: Array<{ text: string; items: Array<{ link: string; text: string }> }>,
  prefix: string,
  fallbackText: string,
) {
  const matched = groups.find((group) => group.items.some((item) => item.link.startsWith(prefix)))
  if (matched) return [matched]
  const fallback = groups.find((group) => group.text === fallbackText)
  return fallback ? [fallback] : []
}

// AUTO-GENERATED ARTICLE SIDEBAR START
const articleSidebar = [
  {
    "text": "官方入口",
    "collapsed": false,
    "items": [
      {
        "text": "ChatGPT官网怎么收藏才安全？官方地址核验、书签设置与假站防范清单【2026年8月】",
        "link": "/official/bookmark-safe-entry"
      },
      {
        "text": "ChatGPT官网登录入口：官方登录地址、国内访问与注册登录失败排查【2026年8月】",
        "link": "/official/chatgpt-official-login-entry-china-access-guide-2026"
      },
      {
        "text": "ChatGPT官网入口在哪里：官方网址、登录入口与国内访问核验【2026年8月】",
        "link": "/official/chatgpt-official-entry-domestic-use-tutorial-cn-login-20260714"
      },
      {
        "text": "ChatGPT官网入口在哪里：官方网址、登录入口与真假网站核验【2026年8月更新】",
        "link": "/official/where-is-chatgpt-official"
      },
      {
        "text": "ChatGPT官网入口：官方网址、登录入口与中文版安全核验【2026年8月更新】",
        "link": "/official/entry"
      },
      {
        "text": "ChatGPT官网：共享链接怎么查看、停止共享与保护聊天隐私【2026年7月】",
        "link": "/official/chatgpt-shared-links-view-stop-sharing-privacy-20260730"
      },
      {
        "text": "ChatGPT官网：聊天记录不见了怎么办？账号、历史记录与归档排查【2026年7月】",
        "link": "/official/chatgpt-chat-history-missing-account-archive-troubleshoot-20260730"
      },
      {
        "text": "ChatGPT官网：账号被停用或被锁怎么办？申诉、验证与恢复步骤【2026年7月】",
        "link": "/official/chatgpt-account-deactivated-locked-appeal-recovery-20260730"
      },
      {
        "text": "ChatGPT官网登录：忘记密码与账号恢复教程，邮箱、Google和Apple登录排查【2026年7月】",
        "link": "/official/chatgpt-forgot-password-account-recovery-login-method-20260730"
      },
      {
        "text": "ChatGPT官网打不开怎么办？chatgpt.com、Access Denied与登录页面排查【2026年7月更新】",
        "link": "/official/chatgpt-official-cannot-open-access-denied-login-troubleshoot-20260724"
      },
      {
        "text": "ChatGPT官网入口：搜索结果、官方网址与假登录页面辨别教程【2026年7月更新】",
        "link": "/official/chatgpt-official-entry-search-result-url-fake-login-check-20260724"
      },
      {
        "text": "ChatGPT官网入口：网页版登录地址、中文版界面与官方网址核对【2026年7月更新】",
        "link": "/official/chatgpt-official-web-login-address-chinese-check-20260723"
      },
      {
        "text": "ChatGPT官网入口：国内打开ChatGPT中文版与网页版完整教程【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-2026"
      },
      {
        "text": "ChatGPT官网入口地址是什么？chatgpt.com、OpenAI官网与国内使用完整指南【2026年7月】",
        "link": "/official/chatgpt-guanwang-rukou-china-tutorial-2026"
      },
      {
        "text": "ChatGPT官网（chatgpt.com）怎么进？官网入口、网页版登录与地址核对【2026年7月】",
        "link": "/official/chatgpt-com-official-entry-web-login-address-check-20260713"
      },
      {
        "text": "ChatGPT 官网与中文版使用终极指南（支持 GPT-5、GPT-4o｜国内可用镜像与注册教程）【2026年7月权威更新】",
        "link": "/official/chatgpt-official-chinese-ultimate-guide-gpt5-gpt4o-mirror-register-20260711"
      },
      {
        "text": "ChatGPT官网：GPT-5.6正式上线，中文版入口、网页版使用和Sol/Terra/Luna区别【2026年7月最新】",
        "link": "/official/chatgpt-official-gpt56-launch-chinese-web-sol-terra-luna-20260711"
      },
      {
        "text": "ChatGPT官网入口怎么辨别：OpenAI官方地址、中文版与镜像网站安全核对【2026年7月】",
        "link": "/official/openai-chatgpt-chinese-guide-gpt5-o3-models-2026"
      },
      {
        "text": "GPT-5.6官网入口在哪：ChatGPT、Codex与API分别怎么进【2026年7月】",
        "link": "/official/gpt56-official-entry-chatgpt-codex-api-20260711"
      },
      {
        "text": "GPT-5.6什么时候出：发布日期、官网入口与正式版真假核对【2026年7月最新】",
        "link": "/official/gpt56-release-date-official-entry-verification-20260711"
      },
      {
        "text": "ChatGPT官网：ChatGPT中文版入口、网页版镜像网站和GPT-image-2使用指南【2026年7月更新】",
        "link": "/official/chatgpt-official-chinese-entry-web-mirror-gpt-image-2-guide-20260710-1"
      },
      {
        "text": "ChatGPT官网：GPT-5.6发布后国内ChatGPT中文版入口、网页版和镜像网站使用指南【2026年7月更新】",
        "link": "/official/chatgpt-official-gpt56-chinese-web-mirror-domestic-guide-20260710"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版、网页版镜像网站和GPT-5.6使用指南【2026年7月更新】",
        "link": "/official/chatgpt-official-entry-domestic-chinese-web-mirror-gpt56-guide-20260710-2"
      },
      {
        "text": "ChatGPT官网：国内中文版入口、网页版镜像网站和GPT5.5登录方法【2026年7月更新】",
        "link": "/official/chatgpt-official-chinese-entry-web-mirror-gpt55-login-method-20260709-3"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版、网页版镜像网站和GPT-image-2使用指南【2026年7月更新】",
        "link": "/official/chatgpt-official-entry-chinese-web-mirror-gpt-image-2-guide-20260709-4"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版网页版、镜像网站和GPT-image-2登录指南【2026年7月更新】",
        "link": "/official/chatgpt-official-entry-chinese-web-mirror-gpt-image-2-login-20260709"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版网页版、镜像网站和GPT5.5登录教程【2026年7月更新】",
        "link": "/official/chatgpt-official-entry-chinese-web-mirror-gpt55-login-20260709-2"
      },
      {
        "text": "ChatGPT官网：国内ChatGPT中文版入口、网页版镜像网站和账号登录教程【2026年7月更新】",
        "link": "/official/chatgpt-official-chinese-entry-web-mirror-login-20260708"
      },
      {
        "text": "ChatGPT官网：国内ChatGPT中文版入口、网页版镜像网站和注册登录教程【2026年7月更新】",
        "link": "/official/chatgpt-official-website-china-guide-2026-20260708-1"
      },
      {
        "text": "ChatGPT官网打不开怎么办：ChatGPT中文版入口、国内网页版镜像和账号登录教程【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-dabukai-zhongwenban-2026"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版登录、网页版镜像和GPT-image-2使用指南【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-zhongwenban-gpt-image-2-2026"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版网页版、镜像网站和GPT5.5使用教程【2026年7月更新】",
        "link": "/official/chatgpt-official-entry-china-gpt55-2026"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版网页版、镜像网站与GPT5.5使用教程【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-2026-20260708-1"
      },
      {
        "text": "ChatGPT官网：国内ChatGPT中文版入口、网页版镜像与注册登录教程【2026年7月更新】",
        "link": "/official/chatgpt-official-website-china-guide-2026"
      },
      {
        "text": "ChatGPT官网：ChatGPT中文版国内使用教程（支持GPT5.5、GPT-image-2，无需翻墙）【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-zhongwen-guonei-jiaocheng-2026"
      },
      {
        "text": "ChatGPT官网打不开怎么办：国内访问入口、中文版网页版与镜像网站排查教程【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-dabukai-zenmeban-2026"
      },
      {
        "text": "ChatGPT官网入口：国内访问ChatGPT中文版、网页版镜像与账号注册教程【2026年7月更新】",
        "link": "/official/chatgpt-official-entry-china-guide-2026"
      },
      {
        "text": "ChatGPT官网入口在哪里？国内打开ChatGPT中文版与网页版的安全指南【2026年7月更新】",
        "link": "/official/chatgpt-official-entrance-china-guide-2026"
      },
      {
        "text": "ChatGPT官网注册入口怎么找？国内账号登录、邮箱验证与中文版备用方案【2026年7月】",
        "link": "/official/chatgpt-official-website-register-entry-2026"
      },
      {
        "text": "ChatGPT 官网入口：国内访问官网地址、网页版登录和中文版使用教程【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-guonei-fangwen-2026"
      },
      {
        "text": "ChatGPT官网入口：国内访问官网地址、中文版入口和登录失败解决办法【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-guonei-denglu-shibai-2026"
      },
      {
        "text": "ChatGPT官网入口登录教程：国内访问、官方地址核对、中文版和网页版完整说明【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-login-tutorial-2026"
      },
      {
        "text": "ChatGPT官网入口登录失败怎么办？国内访问、验证码和中文版入口排查【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-login-failed-2026"
      },
      {
        "text": "ChatGPT官网入口与中文版网页版使用指南：国内访问、登录、安全识别教程（2026年7月）",
        "link": "/official/chatgpt-official-entry-chinese-web-guide-2026"
      },
      {
        "text": "ChatGPT官网入口与中文版网页版使用指南：国内访问、真假识别与 GPT-image-2 场景（2026年7月）",
        "link": "/official/chatgpt-official-entry-chinese-web-version-gpt-image-2-2026"
      },
      {
        "text": "ChatGPT官网打不开怎么办：国内ChatGPT中文版入口、网页版使用与登录失败排查【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-cant-open-login-failed-2026"
      },
      {
        "text": "ChatGPT官网入口打不开怎么办：国内访问、登录失败与中文版替代方案【2026年7月更新】",
        "link": "/official/chatgpt-official-website-cannot-open-2026"
      },
      {
        "text": "ChatGPT 官网怎么进：官方地址核对、国内访问方案与 GPT/Claude/Grok/Gemini 选择【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-access-guide-2026"
      },
      {
        "text": "ChatGPT官网入口、网页版和中文版怎么选？2026国内访问完整指南",
        "link": "/official/chatgpt-guanwang-rukou-webpage-chinese-china-access-2026"
      },
      {
        "text": "ChatGPT官网入口：国内ChatGPT中文版使用教程（支持GPT-5.5、GPT-image-2）【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-zhongwenban-jiaocheng-2026"
      },
      {
        "text": "ChatGPT官网入口打不开怎么办？国内ChatGPT中文版入口与多模型使用教程（GPT-5.5、Claude、Grok、Gemini）【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-rukou-dabukai-2026"
      },
      {
        "text": "ChatGPT官网入口与App下载指南：国内打不开、登录失败和中文版备用方案【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-entry-app-download-2026"
      },
      {
        "text": "ChatGPT官网与中文版对比：国内访问、注册登录、GPT5.5和GPT-image-2完整教程【2026年7月】",
        "link": "/official/chatgpt-guanwang-vs-chinese-gpt55-image2-2026"
      },
      {
        "text": "ChatGPT官网与中文版使用指南：国内可用镜像、注册教程与GPT-5.5说明【2026年7月更新】",
        "link": "/official/chatgpt-guanwang-zhongwenban-2026"
      },
      {
        "text": "ChatGPT 官网入口与国内使用指南：官方地址、网页版、App 下载和国内方案",
        "link": "/official/official-entry-domestic-guide"
      },
      {
        "text": "ChatGPT 官方登录页怎么辨别",
        "link": "/official/official-login-page"
      },
      {
        "text": "ChatGPT 中文官网入口是真的吗",
        "link": "/official/chinese-official-entry"
      },
      {
        "text": "ChatGPT 中文入口与官方地址核对指南",
        "link": "/official/chatgpt-zh-cn-entry"
      },
      {
        "text": "chatgpt.com 和 openai.com 有什么区别",
        "link": "/official/chatgpt-com-vs-openai-com"
      },
      {
        "text": "OpenAI ChatGPT 中文版使用指南：官网入口、模型选择与国内访问方法",
        "link": "/official/openai-chatgpt-chinese-guide"
      },
      {
        "text": "ChatGPT 官方网址是哪个",
        "link": "/official/url"
      }
    ]
  },
  {
    "text": "使用教程",
    "collapsed": false,
    "items": [
      {
        "text": "GPT-6 Astra发布了？官网信息、ARC-AGI-3成绩、编程能力与使用指南【2026年9月】",
        "link": "/guides/gpt-6-astra-release-capabilities-benchmark-guide-20260904"
      },
      {
        "text": "ChatGPT免费版和Plus有什么区别？功能、额度、图片生成与适合人群对比【2026年9月】",
        "link": "/guides/chatgpt-free-vs-plus-deep-research-report-citations-20260903"
      },
      {
        "text": "ChatGPT图片生成功能怎么用？中文提示词、图片编辑与版权注意事项【2026年9月】",
        "link": "/guides/chatgpt-image-generation-editing-prompts-copyright-20260902"
      },
      {
        "text": "ChatGPT登录入口在哪里？官网登录地址、验证码收不到与账号异常排查【2026年8月】",
        "link": "/guides/login"
      },
      {
        "text": "ChatGPT官网入口网页版：chatgpt.com登录地址、中文界面与真假入口核验【2026年8月】",
        "link": "/guides/chatgpt-web-version-chinese"
      },
      {
        "text": "ChatGPT联网搜索怎么用：网页版搜索、引用来源与信息核验指南【2026年8月】",
        "link": "/guides/chatgpt-web-search-citations-current-information-guide-20260808"
      },
      {
        "text": "ChatGPT网页版使用教程（2026国内完整指南）：官网入口与登录步骤",
        "link": "/guides/chatgpt-web-login-entry-mobile-desktop-no-download-20260714"
      },
      {
        "text": "ChatGPT语音对话怎么用：手机App、网页版、中文设置与隐私提醒【2026年8月】",
        "link": "/guides/chatgpt-voice-conversation-mobile-web-chinese-guide-20260808"
      },
      {
        "text": "ChatGPT提示词怎么写：中文办公、写作、翻译和总结模板【2026年8月】",
        "link": "/guides/chatgpt-prompt-writing-chinese-office-translation-summary-20260805"
      },
      {
        "text": "ChatGPT在线使用入口：网页版免下载、手机电脑和国内备用方案【2026年8月】",
        "link": "/guides/chatgpt-online-use-web-mobile-desktop-domestic-backup-20260803"
      },
      {
        "text": "ChatGPT 网页版入口速查：官网地址与完整使用教程导航",
        "link": "/guides/web"
      },
      {
        "text": "ChatGPT网页版登录和下载怎么选：官网入口、App安装与国内备用方案",
        "link": "/guides/chatgpt-web-login-download-guide-2026-07"
      },
      {
        "text": "GPT Image 2国内怎么用：图片生成、隐私风险和GPTCat工作流",
        "link": "/guides/gpt-image-2-domestic-image-workflow-gptcat-2026-07"
      },
      {
        "text": "ChatGPT 官网入口及国内使用教程：官方地址、登录入口、网页版和 App 下载",
        "link": "/guides/official-login-web-app"
      },
      {
        "text": "ChatGPT 使用入口整理：官网、登录入口、网页版、App 下载与国内可用方案",
        "link": "/guides/access-roundup-official-web-app-domestic"
      },
      {
        "text": "ChatGPT 安卓版下载安全吗",
        "link": "/guides/android-download-safety"
      },
      {
        "text": "ChatGPT 登录失败怎么办",
        "link": "/guides/login-failed"
      },
      {
        "text": "ChatGPT 提示词入门：中文用户怎么问更清楚",
        "link": "/guides/prompt-basics"
      },
      {
        "text": "ChatGPT 下载全平台指南：网页版、Windows、iOS 和 Android",
        "link": "/guides/chatgpt-download-all-platforms"
      },
      {
        "text": "ChatGPT 下载与安装教程",
        "link": "/guides/download-install"
      },
      {
        "text": "ChatGPT 怎么使用：新手从打开官网到开始提问",
        "link": "/guides/beginner-guide"
      },
      {
        "text": "ChatGPT 注册账号与邮箱验证指南",
        "link": "/guides/register-email"
      },
      {
        "text": "ChatGPT 桌面版安装教程：Windows 与 macOS 下载前核对",
        "link": "/guides/desktop-install-windows-macos"
      },
      {
        "text": "ChatGPT Windows 官方下载入口与安装避坑指南",
        "link": "/guides/windows-official-download"
      },
      {
        "text": "ChatGPT Windows 桌面版安装与真假识别",
        "link": "/guides/windows-desktop"
      },
      {
        "text": "ChatGPT 打不开怎么办",
        "link": "/guides/cannot-open"
      },
      {
        "text": "ChatGPT App 下载与真假 App 识别",
        "link": "/guides/app"
      }
    ]
  },
  {
    "text": "安全识别",
    "collapsed": false,
    "items": [
      {
        "text": "ChatGPT官网二维码登录安全吗？扫码授权、浏览器会话与假登录页识别【2026年8月】",
        "link": "/safety/chatgpt-official-qr-login-scan-authorize-safety-20260826"
      },
      {
        "text": "ChatGPT官网服务状态怎么看？登录、消息、图片与网络故障分辨清单【2026年8月】",
        "link": "/safety/chatgpt-official-status-login-image-network-troubleshoot-20260826"
      },
      {
        "text": "ChatGPT官网提示陌生登录怎么办？设备会话、密码重置与账号安全核验【2026年8月】",
        "link": "/safety/chatgpt-official-unrecognized-login-device-session-security-20260826"
      },
      {
        "text": "ChatGPT官网付款页面怎么辨别？Plus订阅、退款与第三方代充风险核对【2026年8月】",
        "link": "/safety/chatgpt-plus-payment-page-third-party-recharge-risk-20260825"
      },
      {
        "text": "ChatGPT官网浏览器自动填充安全吗？保存密码、Cookie与共享设备保护【2026年8月】",
        "link": "/safety/chatgpt-browser-password-autofill-cookie-safety-20260825"
      },
      {
        "text": "ChatGPT官网邮件和验证码怎么核验？登录通知、钓鱼链接与账号恢复安全清单【2026年8月】",
        "link": "/safety/chatgpt-official-email-verification-phishing-notice-20260825"
      },
      {
        "text": "Codex下载：官方安装包、桌面App与CLI下载入口，第三方破解版风险核对【2026年8月】",
        "link": "/safety/codex-download-safe-official-cli-install-code-security-2026-07"
      },
      {
        "text": "ChatGPT记忆功能怎么关闭和删除：个性化设置、聊天记录与隐私指南【2026年8月】",
        "link": "/safety/chatgpt-memory-manage-delete-privacy-guide-20260808"
      },
      {
        "text": "ChatGPT镜像网站怎么选？登录、隐私、付款与真假检查【2026年8月】",
        "link": "/safety/chatgpt-mirror-site-risk-check-2026"
      },
      {
        "text": "ChatGPT上传文件安全吗：文档、图片、表格和隐私数据检查清单【2026年8月】",
        "link": "/safety/chatgpt-upload-files-privacy-data-security-checklist-20260805"
      },
      {
        "text": "ChatGPT官网入口网页版：登录页面循环跳转、Cookie与账号方式排查【2026年7月】",
        "link": "/safety/chatgpt-official-web-login-loop-cookie-account-method-troubleshoot-20260721"
      },
      {
        "text": "ChatGPT官网临时聊天怎么用？聊天记录、数据设置与隐私检查指南【2026年7月】",
        "link": "/safety/chatgpt-official-temporary-chat-history-data-controls-privacy-guide-20260720"
      },
      {
        "text": "ChatGPT官网登录安全吗？官方网址、浏览器提示与账号信息核验清单【2026年7月】",
        "link": "/safety/chatgpt-official-login-security-url-browser-account-checklist-20260719"
      },
      {
        "text": "ChatGPT官网入口网页版怎么辨别？chatgpt.com、OpenAI官网与搜索结果核验清单【2026年7月】",
        "link": "/safety/chatgpt-official-web-entry-search-result-checklist-20260719"
      },
      {
        "text": "ChatGPT官网与OpenAI官网有什么区别？登录页、下载页与开发者平台怎么选【2026年7月】",
        "link": "/safety/chatgpt-official-openai-site-login-download-platform-difference-20260719"
      },
      {
        "text": "ChatGPT 退出登录后还安全吗？共享电脑、浏览器 Cookie 与会话清理检查清单【2026年7月】",
        "link": "/safety/chatgpt-logout-shared-computer-cookie-session-checklist-20260716"
      },
      {
        "text": "ChatGPT中文版入口和ChatGPT官网有什么区别",
        "link": "/safety/chatgpt-chinese-entry-vs-official-website-difference-20260714"
      },
      {
        "text": "ChatGPT官网（chatgpt.com）：聊天记录怎么导出和删除？隐私设置指南【2026年7月】",
        "link": "/safety/chatgpt-chat-history-export-delete-privacy-20260713"
      },
      {
        "text": "ChatGPT API Key国内使用安全吗：中转站、镜像工具和账号风险",
        "link": "/safety/chatgpt-api-key-domestic-use-risk-2026-07"
      },
      {
        "text": "ChatGPT Plus代充安全吗：国内购买、充值、共享账号、退款和GPTBuys避坑",
        "link": "/safety/chatgpt-plus-recharge-safe-domestic-buy-shared-refund-gptbuys-2026-07-02"
      },
      {
        "text": "ChatGPT官网真假识别：官方入口、镜像网站、共享账号和隐私风险",
        "link": "/safety/chatgpt-official-fake-site-mirror-shared-account-privacy-risk-2026-07-02"
      },
      {
        "text": "ChatGPT镜像网站安全吗：网页版、中文版、账号登录、支付和数据安全",
        "link": "/safety/chatgpt-mirror-safe-web-chinese-login-payment-data-2026-07-02"
      },
      {
        "text": "ChatGPT下载安全吗：官网App、电脑版、网页版、假安装包和账号风险",
        "link": "/safety/chatgpt-download-safe-official-app-desktop-web-fake-installer-risk-2026-07-02"
      },
      {
        "text": "Codex下载安全吗：官网入口、CLI安装、代码权限、国内镜像和ZeoGPT方案",
        "link": "/safety/codex-download-safe-official-cli-code-permission-china-zeogpt-2026-07-02"
      },
      {
        "text": "GPT Image 2免费入口安全吗：官网、镜像、API Key、图片隐私和版权风险",
        "link": "/safety/gpt-image-2-free-entry-safe-official-mirror-api-key-image-privacy-2026-07-02"
      },
      {
        "text": "ChatGPT共享账号和Plus代充安全吗：官网、充值、退款和账号风险",
        "link": "/safety/chatgpt-shared-account-plus-recharge-gptbuys-refund-risk-2026-07"
      },
      {
        "text": "ChatGPT共享账号能买吗：Plus代充、GPTBuys、镜像站和账号风险（2026）",
        "link": "/safety/chatgpt-shared-account-plus-recharge-mirror-risk-2026"
      },
      {
        "text": "ChatGPT官网真假识别：官方网址、登录入口、镜像网站和账号安全",
        "link": "/safety/chatgpt-official-fake-site-login-mirror-account-security-2026-07"
      },
      {
        "text": "ChatGPT官网真假识别：官方网址、镜像站、假App和账号安全（2026）",
        "link": "/safety/chatgpt-official-fake-site-mirror-app-account-security-2026"
      },
      {
        "text": "ChatGPT国内直连入口靠谱吗：镜像站安全、隐私风险和付费避坑（2026）",
        "link": "/safety/chatgpt-domestic-direct-entry-reliable-mirror-privacy-payment-2026"
      },
      {
        "text": "ChatGPT镜像网站安全吗：官网入口、网页版、中文版和隐私风险",
        "link": "/safety/chatgpt-mirror-site-safe-official-web-chinese-privacy-2026-07"
      },
      {
        "text": "ChatGPT下载安全吗：官网App、电脑版、网页版和假安装包识别",
        "link": "/safety/chatgpt-download-safe-official-app-desktop-web-fake-package-2026-07"
      },
      {
        "text": "GPT Image 2免费入口安全吗：官网、镜像、API Key和图片隐私风险",
        "link": "/safety/gpt-image-2-free-entry-safe-official-api-privacy-2026-07"
      },
      {
        "text": "ChatGPT打不开怎么办2026：官网访问失败、网页版报错、国内可用方案汇总",
        "link": "/safety/chatgpt-cannot-open-web-error-domestic-solutions-2026-06"
      },
      {
        "text": "ChatGPT镜像网站安全吗？免费入口、免登录、账号风险和正版区别完整指南",
        "link": "/safety/chatgpt-mirror-free-no-login-official-difference-2026-06"
      },
      {
        "text": "Bing搜索ChatGPT官网结果怎么判断真假？2026搜索页核验指南",
        "link": "/safety/chatgpt-bing-search-official-result-check-2026"
      },
      {
        "text": "ChatGPT 官方网址是哪个？2026 国内用户避坑与真假入口核验",
        "link": "/safety/chatgpt-official-url-real-fake-check-2026-06"
      },
      {
        "text": "ChatGPT 国内怎么使用？（官网 + 镜像完整方案）",
        "link": "/safety/chatgpt-china-official-mirror-complete-solution-2026-06"
      },
      {
        "text": "ChatGPT 中文版免费入口靠谱吗？镜像网站、网页登录和账号安全指南",
        "link": "/safety/chatgpt-chinese-free-entry-mirror-safety-2026-06"
      },
      {
        "text": "ChatGPT官网打不开怎么办？2026网页版访问、登录失败和网络排查",
        "link": "/safety/chatgpt-official-entry-cannot-open-2026"
      },
      {
        "text": "ChatGPT官网和中文版有什么区别？2026官方服务、镜像站和风险说明",
        "link": "/safety/chatgpt-official-website-vs-chinese-version-2026"
      },
      {
        "text": "ChatGPT官网入口和GPT官网怎么辨别？2026登录地址与官方域名核验",
        "link": "/safety/chatgpt-official-url-login-entry-2026"
      },
      {
        "text": "ChatGPT国内访问选官网还是工具站？2026安全边界说明",
        "link": "/safety/chatgpt-domestic-access-official-or-tools-2026"
      },
      {
        "text": "ChatGPT镜像站安全吗2026：中文版入口、账号登录、隐私风险和付费避坑清单",
        "link": "/safety/chatgpt-mirror-site-safe-login-privacy-payment-2026-06"
      },
      {
        "text": "ChatGPT网页登录安全检查2026：输入账号前先看这10项",
        "link": "/safety/chatgpt-web-login-safety-check-2026"
      },
      {
        "text": "ChatGPT应用程序和App官方下载怎么找？2026手机电脑端真伪核验",
        "link": "/safety/chatgpt-app-download-official-check-2026"
      },
      {
        "text": "ChatGPT账号登录、密码和验证码安全指南2026",
        "link": "/safety/chatgpt-account-login-password-code-safety-2026"
      },
      {
        "text": "ChatGPT中文版免费入口靠谱吗？镜像网站、网页登录和账号安全指南2026",
        "link": "/safety/chatgpt-chinese-free-mirror-login-account-safety-2026-06"
      },
      {
        "text": "ChatGPT中文镜像域名安全吗？2026识别仿冒站和钓鱼页",
        "link": "/safety/chatgpt-chinese-mirror-domain-safety-2026"
      },
      {
        "text": "Codex 中文版靠谱吗？国内镜像、安装包、账号登录和安全风险说明",
        "link": "/safety/codex-chinese-version-install-package-safety-2026-06"
      },
      {
        "text": "GPT-Image-2 免费使用靠谱吗？中文官网、镜像站、API Key 和隐私风险说明",
        "link": "/safety/gpt-image-2-free-mirror-api-key-safety-2026-06"
      },
      {
        "text": "Bing 搜索 ChatGPT 官网结果怎么判断真假",
        "link": "/safety/bing-search-result-check"
      },
      {
        "text": "ChatGPT 钓鱼链接怎么识别",
        "link": "/safety/phishing-link-check"
      },
      {
        "text": "ChatGPT 假 App 常见套路",
        "link": "/safety/fake-app-risk"
      },
      {
        "text": "ChatGPT 镜像网站能不能用",
        "link": "/safety/mirror-risk"
      },
      {
        "text": "ChatGPT 下载站和安装包风险提醒",
        "link": "/safety/download-site-risk"
      },
      {
        "text": "ChatGPT 账号密码和验证码安全指南",
        "link": "/safety/account-password-safety"
      },
      {
        "text": "ChatGPT 中文版镜像网站汇总怎么看",
        "link": "/safety/mirror-site-list-how-to-read"
      },
      {
        "text": "ChatGPT 中文版网站风险判断",
        "link": "/safety/chinese-version-risk"
      },
      {
        "text": "ChatGPT 仿冒网站识别清单",
        "link": "/safety/fake-site-checklist"
      },
      {
        "text": "ChatGPT 官网和中文版镜像有什么区别",
        "link": "/safety/official-vs-mirror"
      }
    ]
  },
  {
    "text": "国内方案",
    "collapsed": false,
    "items": [
      {
        "text": "ChatGPT中文版：官网中文使用、国内入口与镜像网站指南",
        "link": "/domestic/chinese-version-free-use"
      },
      {
        "text": "ChatGPT国内用户使用指南：官网、中文版镜像与多模型工具怎么选【2026年8月】",
        "link": "/domestic/chatgpt-china-user-guide-official-mirror-multimodel-20260803"
      },
      {
        "text": "ChatGPT国内如何使用：官网打不开时的网页版和第三方方案",
        "link": "/domestic/chatgpt-china-use-official-cannot-open-web-third-party-20260714"
      },
      {
        "text": "ChatGPT国内使用入口怎么选：官网、网页版、中文版和国内可用方案",
        "link": "/domestic/chatgpt-domestic-use-entry-product-guide-2026-07"
      },
      {
        "text": "Codex国内怎么用：官网安装、代码权限和ZeoGPT备用方案",
        "link": "/domestic/codex-domestic-use-install-zeogpt-2026-07"
      },
      {
        "text": "国内开发者如何使用 ChatGPT/Codex 类工具",
        "link": "/domestic/coding-ai-tools"
      },
      {
        "text": "国内如何使用 ChatGPT",
        "link": "/domestic/use"
      },
      {
        "text": "国内使用 ChatGPT 的几种方案",
        "link": "/domestic/domestic-access-plan"
      },
      {
        "text": "国内用户怎么选择 GPT、Claude、Gemini、DeepSeek 等模型",
        "link": "/domestic/model-choice"
      },
      {
        "text": "ChatGPT 官网无法访问时的国内备选方案",
        "link": "/domestic/no-official-access-alternatives"
      },
      {
        "text": "ChatGPT 国内怎么使用：官网、镜像与国内可用方案完整指南",
        "link": "/domestic/domestic-mirror-complete-plan"
      }
    ]
  }
]
// AUTO-GENERATED ARTICLE SIDEBAR END

export default defineConfig({
  lang: 'zh-CN',
  title: siteName,
  titleTemplate: false,
  description: siteDescription,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'msvalidate.01', content: '283F4ED132291BB65C882E27214A15B8' }],
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:image:width', content: '1672' }],
    ['meta', { property: 'og:image:height', content: '941' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    nav: navItems,
    sidebar: {
      '/official/': sidebarByPrefix(articleSidebar, '/official/', '官方入口'),
      '/guides/': sidebarByPrefix(articleSidebar, '/guides/', '使用教程'),
      '/safety/': sidebarByPrefix(articleSidebar, '/safety/', '安全识别'),
      '/domestic/': sidebarByPrefix(articleSidebar, '/domestic/', '国内方案')
    },
    outline: {
      level: [2, 3],
      label: '本文目录'
    },
    search: {
      provider: 'local'
    },
    editLink: undefined,
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  },
  transformHead({ page, pageData, title, description }) {
    const path = pagePath(page)
    const url = absoluteUrl(path)
    const frontmatter = pageData.frontmatter
    const pageTitle = String(frontmatter.title || title)
    const image = absoluteUrl(String(frontmatter.image || defaultImage))
    const isArticle = page !== 'index.md'
    const published = String(frontmatter.date || '2026-06-21')
    const modified = String(frontmatter.updated || frontmatter.date || '2026-06-21')
    const citations = Array.isArray(frontmatter.sources)
      ? frontmatter.sources.filter((source: unknown) => {
          if (typeof source !== 'string') return false
          try {
            const sourceUrl = new URL(source)
            return sourceUrl.protocol === 'https:' && officialSourceDomains.some(
              (domain) => sourceUrl.hostname === domain || sourceUrl.hostname.endsWith(`.${domain}`)
            )
          } catch {
            return false
          }
        })
      : []

    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }]
    ]

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: absoluteUrl('/')
      }
    ]

    if (isArticle) {
      const section = path.split('/').filter(Boolean)[0]
      const sectionPath = section ? `/${section}/` : '/'
      const sectionName = section ? sectionNames[section] : undefined
      if (sectionName && path !== sectionPath) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: sectionName,
          item: absoluteUrl(sectionPath)
        })
      }
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: sectionName && path !== sectionPath ? 3 : 2,
        name: pageTitle,
        item: url
      })
      head.push(
        ['meta', { property: 'article:published_time', content: published }],
        ['meta', { property: 'article:modified_time', content: modified }],
        jsonLd({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: pageTitle,
          description,
          image: [image],
          inLanguage: 'zh-CN',
          datePublished: published,
          dateModified: modified,
          mainEntityOfPage: url,
          author: {
            '@type': 'Organization',
            name: 'chatgpt-guanwang.com 编辑'
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
            url: siteUrl,
            logo: {
              '@type': 'ImageObject',
              url: absoluteUrl('/favicon.svg')
            }
          },
          about: ['ChatGPT 官网', 'ChatGPT 登录入口', 'OpenAI 官网', '仿冒网站识别'],
          ...(citations.length > 0 ? { citation: citations } : {})
        })
      )
    } else {
      head.push(
        jsonLd({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          url: siteUrl,
          description,
          inLanguage: 'zh-CN'
        })
      )
    }

    head.push(
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      })
    )

    return head
  },
  sitemap: {
    hostname: siteUrl,
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        lastmod: item.lastmod || sourceDateForPath(item.url)
      }))
    }
  }
})
