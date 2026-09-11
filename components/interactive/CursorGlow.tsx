"use client";

import { useEffect } from "react";
import * as m from "motion/react-m";
import { useSpring } from "motion/react";
import { spring } from "@/lib/motion";
import { hasFinePointer, useShouldReduceMotion } from "@/components/motion/ReducedMotion";

const INTERACTIVE = "a, button, [role='tab'], [role='switch'], input, select, textarea, summary";

/**
 * Optional soft glow that trails the native cursor and grows over interactive elements.
 * It never hides or replaces the system cursor. Desktop (fine pointer) only; off with reduced motion.
 */
export function CursorGlow() {
  const reduce = useShouldReduceMotion();
  const x = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.4 });
  const scale = useSpring(1, spring.soft);
  const opacity = useSpring(0, spring.soft);

  useEffect(() => {
    if (reduce || !hasFinePointer()) {
      opacity.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      scale.set(target ? 2.6 : 1);
    };
    const onLeave = () => opacity.set(0);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y, scale, opacity]);

  return <m.div aria-hidden className="cursor-glow" style={{ x, y, scale, opacity }} />;
}
