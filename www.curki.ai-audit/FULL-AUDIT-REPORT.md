# SEO audit: www.curki.ai (Next.js rebuild)

Audited 2026-09-18 with the claude-seo `seo-audit` checklist against the local production build
(`next build && next start`). 7 indexable pages plus `/components-preview` and the 404 page, both noindex.
Business type: B2B SaaS (AI agents for Australian care and workforce providers).

**Health score: 75 before fixes, about 83 after.** Performance is estimated from source and HTML
weight, not measured. Run PageSpeed/CrUX once the site is deployed.

| Category (weight) | Before | After | Notes |
|---|---|---|---|
| Technical (22%) | 65 | 90 | Canonical host fixed, security headers added |
| Content (23%) | 72 | 72 | Strong associate pages; thin hub page and few E-E-A-T signals |
| On-page (20%) | 90 | 90 | Titles ≤60, descriptions ≤155, one H1, clean heading hierarchy |
| Schema (10%) | 75 | 82 | `sameAs` added; SoftwareApplication can't earn rich results without `offers` |
| Performance (10%) | ~75 | ~75 | SSG, preloaded LCP images, AVIF. Home HTML is 272 KB |
| AI search readiness (10%) | 65 | 80 | `llms.txt` added; AI crawlers allowed |
| Images (5%) | 90 | 90 | Every `<img>` has alt text (decorative ones are empty); AVIF/WebP |

## Fixed in this pass

1. **Critical: every canonical pointed at a redirect.** `site.url` was `https://curki.ai`, which
   301-redirects to `https://www.curki.ai`. Canonicals, `og:url`, sitemap `<loc>`s and JSON-LD `@id`s
   all pointed at the redirecting host. Changed to `https://www.curki.ai` in `data/site.ts`.
2. **Sitemap `lastmod` was the build time**, so every page claimed to change on every deploy. It now
   uses `site.contentUpdated`. Bump that date when copy changes.
3. **robots.txt**: removed the Yandex-only `Host:` directive, which pointed at the wrong host.
4. **Organization `sameAs`**: added the LinkedIn, Facebook, Instagram and YouTube profiles linked from
   the live www.curki.ai (entity/Knowledge Graph signal).
5. **`/llms.txt`**: generated statically from `data/associates.ts` and `data/site.ts`. It covers
   associates, capabilities, "won't do" boundaries and FAQs, so AI answers get the compliance scoping right.
6. **Security headers**: HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and
   `Permissions-Policy`. `X-Powered-By` is removed.

## Action plan (remaining)

### High
- **Associates hub `/associates` is thin (547 words)** compared with 1,500–1,900 on the other pages. Add a
  comparison table (which associate solves which problem) and a short FAQ from `curki-audience-deep-dive.md`,
  then add FAQPage schema to it.
- **E-E-A-T / trust**: there's no About page, named team or leadership, case study or customer evidence.
  Add an About page (founders, Sydney, security posture) and link it from the footer. Case studies need
  real sourced material. Per the content rules, nothing can be invented.
- **Organization details**: add contact email, ABN and street address to `site` (the TODO in `data/site.ts`)
  so the Organization schema gets `email`, `address` and `contactPoint`.

### Medium
- **Content hubs for search demand**: consider guides that target the associate keywords (e.g. SCHADS
  payroll errors, NDIS unreported incidents, SIRS reporting) and link into the associate pages.
- **Home HTML weight (272 KB)** is mostly the inlined RSC payload. Check it in PageSpeed after deploy
  and trim client components where possible.
- **Post-deploy**: submit `https://www.curki.ai/sitemap.xml` in Google Search Console and Bing Webmaster.
  Confirm the apex→www 301 keeps working on the new host.

### Low
- `meta keywords` on associate pages is ignored by Google. It's harmless, so leave it or remove it.
- Content-Security-Policy: add one with nonces or hashes for the inline pre-paint script and JSON-LD.
- SoftwareApplication rich results need `offers` and ratings. That conflicts with the no-pricing rule, so
  the schema stays as an entity signal only.
