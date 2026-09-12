import { Fragment } from "react";

type AnimatedCounterProps = {
  value: string;
  /** Kept for the preview page's replay control; GSAP re-runs the tween when it remounts. */
  alwaysAnimate?: boolean;
};

/**
 * Counts every number in a stat (e.g. "$60k+", "3–5%") up from zero when it scrolls into view.
 *
 * The server HTML always contains the final value, so it is correct for SEO and with JS off.
 * `GsapStage` picks up each `[data-gsap-count]` slot and tweens it, snapped to whole numbers;
 * under reduced motion no tween is created and the final value simply stays put. Width is
 * reserved with the final digits by `.count-slot`, so counting up never shifts the layout.
 */
export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const parts = value.split(/(\d+(?:\.\d+)?)/);
  return (
    <span>
      {parts.map((part, i) =>
        /^\d/.test(part) ? (
          <span key={i} className="count-slot" data-final={part}>
            <span data-gsap-count={part}>{part}</span>
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
