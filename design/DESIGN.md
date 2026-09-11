# Curki.AI design system

Premium, calm, credible glassmorphism for senior decision-makers in regulated Australian care and workforce sectors. Colours match www.curki.ai.

**Concept: evidence you can trace.** Every associate shows its sources. The site echoes this with fine hairline "ledger" rules, monospaced record-style labels and glass panels that read like source-linked findings.

## Colour tokens (`app/globals.css` → `@theme`)

| Token | Hex | Source on curki.ai | Use |
|---|---|---|---|
| `brand` | #6548FF | primary violet | Decorative accents, large display text |
| `brand-deep` | #5B36E1 | gradient start | Buttons, links, small brand text (AA) |
| `brand-soft` | #9B80FF | gradient end | Decoration only; eyebrow text on dark |
| `brand-night` | #311081 | deep violet | Shadows, dark accents |
| `ink` | #1C1629 | heading colour | Headings |
| `ink-soft` | #251E36 | dark text | Nav, emphasis |
| `body` | #3C3B42 | body text | Paragraphs |
| `muted` | #5E6282 | darkened from #6F7392 | Secondary text (AA on glass) |
| `teal` | #20BA9E | accent | Dots, icons, success marks (not text) |
| `teal-ink` | #0B7A67 | darkened teal | Teal text (AA) |
| `lavender` | #F0F0FF | section tint | Hover fills, tinted panels |
| `lilac` | #F6F1FC | wash | Top of page gradient |
| `mist` | #EBEAF6 | borders | Dividers |
| `page` | #F9FAFB | page background | Body background |
| `night` | #0D0C16 | dark sections | CTA band |

Brand gradient for decoration: `#5B36E1 → #9B80FF`. For gradient **text**, use `.text-gradient` (#5B36E1 → #7B61FF), which keeps ≥3:1 for large text.

## Contrast (WCAG 2.2 AA)

Computed with the WCAG relative-luminance formula. Worst-case light glass = white at 60% over the atmosphere orb, rgb(241 236 254). The hero panel sits over a stronger orb: rgb(233 227 255). The CTA band's violet orb centre is rgb(61 45 150).

| Pair | Ratio | Result |
|---|---|---|
| `ink` on worst-case glass | 15.19:1 | Pass |
| `body` on worst-case glass | 9.58:1 | Pass |
| `muted` #5E6282 on worst-case glass | 5.12:1 | Pass |
| `muted` on hero glass | 4.77:1 | Pass |
| `muted` on `page` | 5.67:1 | Pass |
| curki.ai #6F7392 on `page` | 4.42:1 | Fails small text, so `muted` is darkened |
| `brand-deep` on worst-case glass | 5.94:1 | Pass |
| `brand-deep` on hero glass | 5.52:1 | Pass |
| `brand` #6548FF on worst-case glass | 4.63:1 | Pass (prefer `brand-deep` for small text) |
| White on `brand-deep` (buttons) | 6.86:1 | Pass |
| White on #9B80FF | 3.03:1 | Never put body text on it |
| `teal-ink` on white | 5.26:1 | Pass |
| `teal-ink` on worst-case glass | 4.55:1 | Pass (tightest pair) |
| `teal` #20BA9E on white | 2.45:1 | Decorative only (dots, icons) |
| Gradient end #7B61FF on `page` | 4.02:1 | Large display text only |
| Eyebrow on dark #C9BCFF on CTA orb | 6.02:1 | Pass |
| White 80% on CTA orb | 7.26:1 | Pass |
| `muted` on `lavender` | 5.25:1 | Pass |

## Glass rules

- `.glass`: white 78→60% vertical gradient, `blur(16px) saturate(160%)`, 1px white border, inset highlight and a soft violet shadow. `.glass-dark` is used on the night CTA band.
- **Never nest glass in glass.** Use `.panel` (solid white 92%) inside a glass surface.
- **At most ~6 blurred surfaces per viewport.** Lists of small items use `.panel` or plain tinted backgrounds.
- The mobile blur is reduced to 10px.
- Fallbacks: `@supports not (backdrop-filter)` → near-solid white; `prefers-reduced-transparency` → solid white and a flat page background.
- The atmosphere layer (`.site-atmosphere`) is fixed and uses static radial gradients with no filters, so it's cheap to composite.

## Typography

- Display: **Manrope** (curki.ai's primary face), 700–800, tight tracking (-0.025em).
- Body: **Plus Jakarta Sans**, 400–600, 1.6–1.7 line height.
- Labels: **IBM Plex Mono** 12px uppercase, 0.14em tracking, used for eyebrows and record-style metadata.
- Scale: H1 clamp ~2.6rem → 4.25rem; H2 1.9rem → 2.75rem; H3 1.125–1.375rem.

## Motion

Motion should feel calm and purposeful. Each page gets one or two "wow" moments; everything else stays subtle.

### Tokens

| Token | CSS | JS (`lib/motion.ts`) | Use |
|---|---|---|---|
| Instant | `--dur-instant` 120ms | `duration.instant` | Micro feedback |
| Fast | `--dur-fast` 200ms | `duration.fast` | Colour and hover state |
| Base | `--dur-base` 350ms | `duration.base` | Tabs, accordion, page transitions |
| Slow | `--dur-slow` 600ms | `duration.slow` | Flips, hover-reveal, lift |
| Reveal | `--dur-reveal` 700ms | `duration.reveal` | Scroll and word reveals |
| Ambient | `--dur-ambient` 22s | n/a | Orb drift |
| Calm easing | `--ease-calm` (0.22, 1, 0.36, 1) | `ease.calm` | Default |
| Out-expo | `--ease-out-expo` | `ease.outExpo` | Counters |
| Springs | n/a | `spring.soft`, `spring.snap` | Cursor-following effects, snapping |

### Components (`components/interactive/`)

| Component | Where it's used | Reduced motion | Touch |
|---|---|---|---|
| FlipCard + FilterableFlipGrid | Home associate grid | Cross-fade | Tap toggles |
| TiltCard | Associate modules | Static | Static |
| SpotlightCard | Associate use cases | Plain glass | Plain glass |
| ExpandableCard | Associate capabilities | Fade, no morph | Tap |
| StackedCards | `/associates` hero | Final positions | Fans out on scroll |
| HoverRevealCard | Home pain points | Fade, no slide | Tap + |
| MagneticButton | Every CTA | No pull; ripple fades | No pull |
| Carousel | Related associates | Instant snap | Swipe |
| WordReveal, drifting orbs, Parallax | Home hero; associate hero parallax | Static | No parallax |
| Reveal | Sections and cards | Fade only | Same |
| AnimatedCounter | Stat strips | Final values | Same |
| StepsTimeline | How it works (home and associate pages) | Fully drawn | Same |
| Marquee | Home industry strip | Static wrapped list | Same |
| Tabs | Personas, industries | No slide | Same |
| Accordion | FAQs | Instant height, fade | Same |
| ScrollProgress | Associate pages | Same | Same |
| Page transition (`app/template.tsx`) | Client-side route changes only | Fade | Same |
| CursorGlow | `/components-preview` only (optional) | Hidden | Hidden |

### Performance rules

- Animate transform and opacity only. The accordion's `grid-template-rows` transition is the one exception, and it only ever runs after a click.
- Moving or 3D-transformed surfaces (flip faces, floating hero cards, tilt cards, carousel cards, stacked cards) use `.glass-flat`, never backdrop blur.
- The H1 word reveal starts at 0.01 opacity (not 0), so the largest element is painted immediately for LCP.
- The first page load never plays the page transition. Counters don't reset numbers already on screen.
- Motion features load lazily after hydration (`lib/motion-features.ts`).
- Animated elements reserve their space (stacked tab panels, grid-overlaid flip faces, fixed-height decks, width-reserving counters), so there's no CLS.

## Layout

- Container max width 72rem with 20–32px gutters. Section padding is 5–7rem vertically.
- Mobile-first. Cards stack to one column below 640px.
