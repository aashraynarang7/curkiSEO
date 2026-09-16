import { preload } from "react-dom";
import type { CSSProperties } from "react";
import { isBackgroundArtVariant } from "./BackgroundArt";

/**
 * Dark hero backdrop: a navy void with purple light breaking across it like the sheen on a fold
 * of silk.
 *
 * Each "crease" is one very wide, very shallow radial gradient — soft by construction, so the
 * effect needs no `filter: blur()` anywhere and stays cheap to composite. GsapStage picks the
 * creases up by `data-silk-crease`, spreads them out from the centre on load and then drifts them
 * on long, offset loops. Static (but still lit) under reduced motion.
 *
 * The associate's own role artwork sits underneath on `multiply`, which leaves the navy almost
 * untouched where the artwork is pale and deepens it where the forms are, so each page carries a
 * faint watermark of its own illustration instead of every hero looking identical.
 *
 * Decorative throughout: `aria-hidden`, no text, nothing in the accessibility tree.
 */
const creases = [
  { rotate: -22, top: "18%", colour: "150 118 255", w: "175%", h: "44%", delay: 0 },
  { rotate: 14, top: "46%", colour: "186 140 255", w: "160%", h: "30%", delay: 0.18 },
  { rotate: -8, top: "72%", colour: "112 84 240", w: "185%", h: "38%", delay: 0.36 },
  { rotate: 32, top: "34%", colour: "205 165 255", w: "120%", h: "20%", delay: 0.54 },
  { rotate: -38, top: "62%", colour: "126 96 255", w: "140%", h: "24%", delay: 0.72 },
];

export function SilkBackdrop({ variant }: { variant: string }) {
  const art = isBackgroundArtVariant(variant) ? variant : null;
  if (art) {
    preload(`/images/associates/bg-${art}-sm.avif`, { as: "image", type: "image/avif", media: "(max-width: 767px)" });
    preload(`/images/associates/bg-${art}.avif`, { as: "image", type: "image/avif", media: "(min-width: 768px)" });
  }
  return (
    <div aria-hidden className="silk">
      {art && <span className={`silk-art bg-art-${art}`} />}
      {creases.map((c, i) => (
        <span
          key={i}
          data-silk-crease
          className="silk-crease"
          style={
            {
              "--crease": c.colour,
              "--crease-rotate": `${c.rotate}deg`,
              "--crease-delay": `${c.delay}s`,
              top: c.top,
              width: c.w,
              height: c.h,
            } as CSSProperties
          }
        />
      ))}
      <span className="silk-grain" />
    </div>
  );
}
