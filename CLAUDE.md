@AGENTS.md

# Curki.AI marketing site

Next.js 16 App Router + TypeScript, statically generated (every page ships full HTML). Tailwind v4. `motion` (Framer Motion): import `* as m from "motion/react-m"`; features (`domMax`) are lazy-loaded by `components/ui/MotionProvider.tsx`. lucide-react icons. Australian English (en-AU).

## Motion rules
- Interactive components live in `components/interactive/`; all are shown on `/components-preview` (noindex) with a reduced-motion toggle. Add new ones there too.
- Animate only transform and opacity (the accordion's grid-row height transition is the one exception).
- Tokens: CSS `--dur-*` / `--ease-*` in `app/globals.css`, JS mirror in `lib/motion.ts`. Don't hard-code durations.
- Reduced motion: use `useShouldReduceMotion()` in handlers/effects and the `reduced:` Tailwind variant or `[data-motion="reduce"]` CSS. Never branch initial render on it (hydration).
- Hidden, flipped, collapsed and inactive-tab content must be in the server HTML.
- Cursor effects (tilt, spotlight, magnetic, parallax) check `pointerType === "mouse"`. Moving layers use `glass-flat` (no backdrop blur).
- Never animate the H1 from opacity 0 (LCP). No autoplay video, GIFs or GSAP unless a scroll sequence truly needs it.

Design spec: @design/DESIGN.md
Source of truth for all copy: `curki-audience-deep-dive.md`.
All associate copy lives in `data/associates.ts`; site-wide copy in `data/site.ts`. Never hard-code copy in components.

## Content rules (hard)
- 5 associates: Oliver (finance), Zoe (documentation), Alex (HR onboarding), Will (rostering), James (compliance).
- Only James makes regulatory compliance claims. Oliver's "audit-ready" is financial only. Zoe, Will and Alex are automation only; Alex handles workforce credentials, never "compliance".
- Numbers must come from the source file. Module figures are allowed; modelled/sample figures must be labelled as illustrative.
- No pricing language anywhere. No free trial mentions.
- Don't invent associates, features, testimonials, client names, connector lists or certifications. Use a `TODO:` comment instead.
- Theme must match www.curki.ai (tokens in `app/globals.css`).

## SEO (every page)
One H1. Metadata via `lib/seo.ts` `buildMetadata` (title ≤60, description ≤155, canonical, OG, en_AU). JSON-LD: Organization (layout), WebSite (home), SoftwareApplication + BreadcrumbList + FAQPage (associate pages). `app/sitemap.ts`, `app/robots.ts`. Real `<a>` links between associates. Code-generated OG images.

## Next.js 16 notes
- `params` is a Promise in pages, `generateMetadata` and `opengraph-image`. Use `PageProps<'/route'>`.
- `next/image`: `priority` is deprecated; use `preload` or `fetchPriority="high"` for the LCP image.

## Gemini (rlabs MCP)
- `@rlabs-inc/gemini-mcp` is used ONLY for image generation/editing, and ONLY when a prompt explicitly asks. Image calls: `imageSize: "2K"`, `thinkingLevel: "low"`.
- OG images, icons, mock UI panels, gradients and orbs are built in code.

## Token discipline
- Read only the files needed for the task. Don't read `.next` or lockfiles; read `node_modules/next/dist/docs` only for the guide you need.
- Targeted edits. Run `npm run build` once at the end of each phase.
