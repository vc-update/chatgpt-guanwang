# ChatGPT Guanwang SEO Audit

Audit date: 2026-08-08

Scope: Full-site technical, on-page, structured data, discovery, and AI-search readiness audit for `https://chatgpt-guanwang.com` and the local VitePress source.

## Audit Summary

The site is crawlable and the main public routes returned HTTP 200 during the audit. The local VitePress build completed successfully after the fixes below. The strongest remaining ranking risk is content architecture: the repository contains many overlapping official-entry and Chinese-version articles, so future growth should refresh/consolidate by intent instead of producing more generic doorway-like pages.

Directional rating: **Good foundation, needs improvement**. This is not a ranking or traffic score; Bing Webmaster/Search Console data was not available in this audit.

Positive signals:

- The homepage has a clear H1, direct entry cards, a visible non-official disclosure, and links to the main pillar and topic hubs.
- The main sampled routes returned HTTP 200 and use self-referencing HTTPS canonicals.
- The generated site contains 155 content HTML routes, each checked with one H1 and one canonical.
- Title tags and meta descriptions were unique across the 155 checked pages.
- XML sitemap contains 155 URLs and, after the fix, 155 `lastmod` values.

## Findings

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Crawlability | Pass | Confirmed | Main routes, robots and XML sitemap are accessible. | Production checks returned 200 for `/`, `/official/entry`, `/latest`, `/robots.txt` and `/sitemap.xml`. | Keep checking the formal domain after every deployment. |
| Sitemap | Warning | Confirmed | XML sitemap previously omitted `lastmod`. | Pre-fix generated sitemap had 155 URLs and 0 `lastmod` nodes. | Added a VitePress sitemap transform that reads `updated` or `date` from source frontmatter. Final build: 155/155 URLs with `lastmod`. |
| AI discovery | Warning | Confirmed | `llms.txt` was missing on production. | `https://chatgpt-guanwang.com/llms.txt` returned 404. | Added `docs/public/llms.txt` with the non-official boundary and curated canonical entry pages. Local build serves it at HTTP 200. |
| Robots | Warning | Confirmed | robots declared text and HTML helper files as `Sitemap:` directives. | Production robots listed `sitemap.xml`, `sitemap.txt` and `sitemap.html`. | Keep only the XML sitemap declaration. Text/HTML indexes remain ordinary linked resources. Cloudflare also injects AI crawler rules; those are external to this repo. |
| Structured data | Warning | Confirmed | Homepage `SearchAction` pointed to a nonexistent `/search` route. | `/search` and `/search?q=test` returned 404. | Removed the unsupported `SearchAction`; local search remains a client-side VitePress UI rather than a server search URL. |
| Structured data | Warning | Confirmed | Article BreadcrumbList had no category level. | Pre-fix sampled article JSON-LD was Home → Article. | Added Home → section → Article for section content pages. |
| Structured data | Info | Confirmed | FAQPage JSON-LD is present but commercial-site rich-result eligibility is restricted. | Sampled homepage and articles contain FAQPage JSON-LD; the agentic SEO schema reference marks it restricted to government/health authority sites. | Preserve it because it was an explicit project requirement, but do not promise FAQ rich results. Reassess if the project requirement changes. |
| Security | Warning | Confirmed | `X-Frame-Options` was missing from production headers. | Security-header script reported HSTS, nosniff, Referrer-Policy and Permissions-Policy present, but X-Frame-Options absent. | Added `X-Frame-Options: SAMEORIGIN` in `vercel.json`. Production verification is pending deployment. CSP remains a separate hardening task because the VitePress asset policy needs careful testing. |
| Internal links | Warning | Confirmed | Four recent articles linked to `/official/index`, which is not a generated clean route. | Local link scan found four broken targets in the July 30 account/history articles. | Replaced those links with `/official/`. Final local link scan found 0 broken internal targets. |
| Information architecture | Warning | Likely | Official-entry intent is overrepresented by many near-duplicate pages. | The official sidebar contains a large cluster of titles repeating official entry, Chinese version, mirror and model phrases. No Search Console cannibalization report was available. | Keep `/official/entry` as the pillar. Map each future page to a distinct intent, and refresh/redirect/noindex only after page-level performance and query evidence is reviewed. |
| On-page metadata | Warning | Confirmed | Several older pages and hubs have very short titles or descriptions. | Local scan found 6 short titles and 54 descriptions under the audit tool's 60-character quick-check threshold; 66 titles were longer than 40 characters. | Newly refreshed hub metadata now includes intent. Review legacy pages in batches; do not mass-rewrite stable URLs without query evidence. |
| Performance | Unknown | Hypothesis | Mobile Core Web Vitals were not measured in this run. | Bounded PageSpeed attempt timed out after 124 seconds. | Run PageSpeed Insights/CrUX from a network that completes the API request, then optimize only measured LCP/INP/CLS issues. |
| AI crawler policy | Info | Confirmed | Several AI crawlers are explicitly blocked by Cloudflare-managed robots rules. | Production robots included blocks for GPTBot, ClaudeBot, Google-Extended and others. | Treat as a policy decision. If AI citations are a goal, review the Cloudflare content-signal and crawler policy before changing it. |

## Verification Results

- `npm run docs:build`: passed.
- Generated HTML: 157 files including 155 content routes, 404, and HTML sitemap.
- Content pages: 155/155 with one H1 and one canonical.
- Duplicate title groups: 0; duplicate description groups: 0 in the generated-page scan.
- XML sitemap: 155 URLs, 155 `lastmod` elements.
- `llms.txt`: generated and locally served.
- Internal-link scan: 0 broken targets after the `/official/` fix.
- Local preview on port 5193: sampled homepage, pillar, latest three pages, latest hub, privacy, robots, sitemap, llms and HTML sitemap all returned HTTP 200.
- Production before this work: key sampled pages and XML sitemap returned HTTP 200; production `llms.txt` returned 404. The new fixes have not been deployed in this task.

## Environment Limitations

- No Bing Webmaster Tools, Search Console, analytics, backlink, or ranking data was available, so this report does not claim rankings, traffic changes, or penalties.
- The PageSpeed attempt timed out; Core Web Vitals remain unconfirmed.
- Cloudflare-managed robots additions are visible online but are not controlled by the checked-in `docs/public/robots.txt` file.
