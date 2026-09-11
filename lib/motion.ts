// Motion design tokens for JavaScript-driven animation.
// Keep in sync with the CSS tokens in app/globals.css (--dur-*, --ease-*).

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  reveal: 0.7,
  count: 1.4,
} as const;

export const ease = {
  /** Default for reveals, flips and page transitions. */
  calm: [0.22, 1, 0.36, 1],
  /** Counters and long decelerations. */
  outExpo: [0.16, 1, 0.3, 1],
} as const;

export const spring = {
  /** Cursor-following effects: tilt, magnetic buttons, parallax. */
  soft: { stiffness: 150, damping: 18, mass: 0.6 },
  /** Snapping: carousels, sliding indicators. */
  snap: { stiffness: 320, damping: 34, mass: 0.8 },
} as const;

export const stagger = 0.06;

/** Maximum tilt in degrees for TiltCard. */
export const maxTilt = 8;

/** Maximum pull in pixels for MagneticButton. */
export const magneticPull = 8;
