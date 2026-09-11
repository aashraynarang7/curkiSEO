"use client";

import { createContext, useContext, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { spring } from "@/lib/motion";
import { hasFinePointer, useShouldReduceMotion } from "@/components/motion/ReducedMotion";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };
const ParallaxContext = createContext<Pointer | null>(null);

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Tracks the mouse relative to the scene centre (-1..1). Layers inside move by their depth.
 * Disabled for touch devices and reduced motion.
 */
export function ParallaxScene({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useShouldReduceMotion();
  const x = useSpring(0, spring.soft);
  const y = useSpring(0, spring.soft);

  useEffect(() => {
    if (reduce || !hasFinePointer()) {
      x.set(0);
      y.set(0);
      return;
    }
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        x.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        y.set(clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduce, x, y]);

  return (
    <ParallaxContext.Provider value={{ x, y }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}

type ParallaxLayerProps = {
  /** Maximum movement in pixels. Negative values move against the cursor. */
  depth: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-hidden"?: boolean;
};

export function ParallaxLayer({ depth, className, style, children, ...rest }: ParallaxLayerProps) {
  const ctx = useContext(ParallaxContext);
  const fallback = useMotionValue(0);
  const tx = useTransform(ctx?.x ?? fallback, (v) => v * depth);
  const ty = useTransform(ctx?.y ?? fallback, (v) => v * depth);
  return (
    <m.div className={className} style={{ ...style, x: tx, y: ty }} {...rest}>
      {children}
    </m.div>
  );
}
