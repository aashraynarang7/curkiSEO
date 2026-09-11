"use client";

import { createContext, useContext, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";

const ForcedReduce = createContext(false);

/**
 * Forces reduced motion for everything inside (used by /components-preview).
 * Sets data-motion="reduce" so CSS-driven effects respond too, and tells motion
 * components to skip transform and layout animation.
 */
export function ReducedMotionScope({ reduce, children }: { reduce: boolean; children: ReactNode }) {
  return (
    <ForcedReduce.Provider value={reduce}>
      <MotionConfig reducedMotion={reduce ? "always" : "user"}>
        <div data-motion={reduce ? "reduce" : "full"} className="contents">
          {children}
        </div>
      </MotionConfig>
    </ForcedReduce.Provider>
  );
}

/**
 * True when the OS asks for reduced motion OR a ReducedMotionScope forces it.
 * Use in effects and event handlers, not to change initial render output
 * (the OS value is unknown during server rendering).
 */
export function useShouldReduceMotion(): boolean {
  const forced = useContext(ForcedReduce);
  const system = useReducedMotion();
  return forced || Boolean(system);
}

/** Cursor-driven effects only run on devices with a precise hovering pointer. */
export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
