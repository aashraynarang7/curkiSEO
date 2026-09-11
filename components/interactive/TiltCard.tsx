"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import * as m from "motion/react-m";
import { useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { maxTilt, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useShouldReduceMotion } from "@/components/motion/ReducedMotion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  glare?: boolean;
};

/**
 * Subtle 3D tilt following the cursor (max ~8°) with a moving glare.
 * Mouse only: touch devices and reduced motion get a static card.
 */
export function TiltCard({ children, className, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useShouldReduceMotion();
  const rotateX = useSpring(0, spring.soft);
  const rotateY = useSpring(0, spring.soft);
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);
  const glareOpacity = useSpring(0, spring.soft);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const onPointerMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateY.set((px - 0.5) * 2 * maxTilt);
    rotateX.set(-(py - 0.5) * 2 * maxTilt);
    glareX.set(e.clientX - r.left);
    glareY.set(e.clientY - r.top);
    glareOpacity.set(1);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <m.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ transform }}
      className={cn("relative h-full rounded-card", className)}
    >
      {children}
      {glare && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-card">
          <m.div
            className="absolute -top-[170px] -left-[170px] size-[340px] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.7),rgb(255_255_255/0))]"
            style={{ x: glareX, y: glareY, opacity: glareOpacity }}
          />
        </div>
      )}
    </m.div>
  );
}
