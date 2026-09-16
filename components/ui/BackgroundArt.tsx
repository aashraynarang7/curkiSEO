import { preload } from "react-dom";

/**
 * Decorative background illustration for a section.
 *
 * Rendered as a CSS background on an `aria-hidden` layer, never an `<img>`: the art carries
 * no information, so it stays out of the accessibility tree and out of the document's content.
 * Its own wrapper does the clipping, so the parallax can overflow the art without also
 * clipping the section's drifting orbs.
 *
 * Every variant name maps by convention to a `.bg-art-<variant>` rule in globals.css and to
 * `/images/associates/bg-<variant>.*` on disk, so adding an associate needs no wiring here.
 *
 * The parent must be positioned (`relative`).
 */
const variants = [
  "hero",
  "features",
  "cta",
  "oliver-finance",
  "zoe-documentation",
  "alex-hr-onboarding",
  "will-rostering",
  "james-compliance",
] as const;

export type BackgroundArtVariant = (typeof variants)[number];

/** Sections that render above the fold, so their art is worth preloading. */
const belowFold = new Set<BackgroundArtVariant>(["features", "cta"]);

/**
 * True when a name (an associate slug, say) has background art of its own. Lets a caller fall
 * back to the generic hero art instead of emitting a class that has no rule behind it.
 */
export function isBackgroundArtVariant(name: string): name is BackgroundArtVariant {
  return (variants as readonly string[]).includes(name);
}

export function BackgroundArt({ variant }: { variant: BackgroundArtVariant }) {
  // Below-the-fold art is just a CSS background the browser fetches when the section is about to
  // paint. Above the fold it is preloaded, with two links mirroring the media query in the CSS so
  // a phone never preloads the desktop-sized file.
  if (!belowFold.has(variant)) {
    preload(`/images/associates/bg-${variant}-sm.avif`, {
      as: "image",
      type: "image/avif",
      media: "(max-width: 767px)",
      fetchPriority: "high",
    });
    preload(`/images/associates/bg-${variant}.avif`, {
      as: "image",
      type: "image/avif",
      media: "(min-width: 768px)",
      fetchPriority: "high",
    });
  }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Two layers on purpose: the outer one is GSAP's scroll-parallax target (yPercent), the
          inner one carries the always-on CSS drift. Splitting them keeps the two animations off
          the same properties, so neither overwrites the other. */}
      <span data-bg-art={variant} className="bg-art">
        <span className={`bg-art-img bg-art-${variant}`} />
      </span>
      <span className="bg-art-wash" />
    </div>
  );
}
