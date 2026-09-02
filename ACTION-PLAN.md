# ChatGPT Guanwang SEO Action Plan

Plan date: 2026-08-08

## Completed Today

1. **Quick win: add `llms.txt`** — Added a concise AI-readable index with the independent-site disclosure, official domains, main pillar and key topic hubs.
2. **Quick win: repair sitemap freshness** — VitePress now reads `updated`/`date` frontmatter and emits `lastmod`; final local sitemap is 155/155 complete.
3. **Quick win: normalize robots** — `robots.txt` now declares only the canonical XML sitemap.
4. **Quick win: remove invalid SearchAction** — Removed the homepage JSON-LD action that targeted the nonexistent `/search` route.
5. **Quick win: improve breadcrumbs** — Article JSON-LD now includes its section between home and article.
6. **Quick win: repair internal links** — Fixed four `/official/index` links to `/official/`.
7. **Quick win: improve hub metadata** — Updated official, guides, domestic and safety hub titles, descriptions, H1s and freshness dates.
8. **Maintenance: security header** — Added `X-Frame-Options: SAMEORIGIN` to `vercel.json`; verify it after deployment.

## Next Execution Order

1. Deploy only after explicit publication approval, then verify the custom domain, `/llms.txt`, `/robots.txt`, `/sitemap.xml`, `/sitemap`, homepage, `/official/entry`, `/latest` and the three latest articles.
2. Submit or refresh the XML sitemap in Bing Webmaster Tools and Google Search Console.
3. Use Bing Webmaster query/impression data to assign one primary intent per official-entry article.
4. Consolidate or refresh overlapping pages based on impressions, clicks and canonical/indexing signals; do not mass-delete stable URLs without evidence.
5. Run PageSpeed/CrUX from a completing network and address measured mobile LCP, INP or CLS issues.
6. Review Cloudflare AI crawler/content-signal policy if AI citation visibility is a business objective.

## Acceptance Gates

- Build passes with `npm run docs:build`.
- Every indexable content page has one H1, one self-canonical, unique title and unique meta description.
- XML sitemap contains only canonical indexable URLs and has a valid `lastmod` for each content URL.
- Production checks return 200 for the key routes and the new `llms.txt`.
- No article calls a third-party service official; product recommendations remain contextual and non-sitewide.

## Open Unknowns

- Actual Bing ranking/query data and Search Console indexing state.
- Field Core Web Vitals and real-user performance.
- Whether the current large official-entry cluster is causing query cannibalization.
