import { preload } from "react-dom";

/**
 * Decorative background illustration for a section.
 *
 * Rendered as a CSS background on an `aria-hidden` layer, never an `<img>`: the art carries
 * no information, so it stays out of the accessibility tree and out of the document's content.
 * Its own wrapper does the clipping, so the parallax can overflow the art without also
 * clipping the section's drifting orbs.
 *
 * The parent must be positioned (`relative`).
 */
const variants = {
  hero: "bg-art-hero",
  features: "bg-art-features",
  cta: "bg-art-cta",
} as const;

export function BackgroundArt({ variant }: { variant: keyof typeof variants }) {
  // Only the hero art is above the fold, so only it is worth preloading. Everything else is a CSS
  // background the browser fetches when the section is about to paint. The two links mirror the
  // media query in `.bg-art-hero`, so a phone never preloads the desktop-sized file.
  if (variant === "hero") {
    preload("/images/associates/bg-hero-sm.avif", {
      as: "image",
      type: "image/avif",
      media: "(max-width: 767px)",
      fetchPriority: "high",
    });
    preload("/images/associates/bg-hero.avif", {
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
        <span className={`bg-art-img ${variants[variant]}`} />
      </span>
      <span className="bg-art-wash" />
    </div>
  );
}
