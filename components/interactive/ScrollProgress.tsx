"use client";

import * as m from "motion/react-m";
import { useScroll, useSpring } from "motion/react";

/** Thin reading-progress bar pinned to the top of the viewport (transform: scaleX). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-brand-deep via-brand to-teal"
      style={{ scaleX }}
    />
  );
}
