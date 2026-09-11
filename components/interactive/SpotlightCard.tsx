"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/cn";
import { useShouldReduceMotion } from "@/components/motion/ReducedMotion";
import { GlassCard } from "@/components/ui/GlassCard";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  as?: "div" | "article";
};

/**
 * A soft radial glow follows the cursor inside the card and lights the 1px glass border.
 * The glow moves with transform and fades with opacity. Mouse only.
 */
export function SpotlightCard({ children, className, contentClassName, as = "div" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useShouldReduceMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useSpring(0, { stiffness: 220, damping: 30 });

  const onPointerMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    opacity.set(1);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => opacity.set(0)}
      className={cn("relative h-full overflow-hidden rounded-card bg-white/50 p-px", className)}
    >
      {/* Border light: sits behind the inner surface and shows through the 1px gap. */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute -top-[200px] -left-[200px] size-[400px] rounded-full bg-[radial-gradient(closest-side,rgb(101_72_255/0.85),rgb(155_128_255/0.3)_50%,rgb(155_128_255/0))]"
        style={{ x, y, opacity }}
      />
      <GlassCard as={as} className={cn("relative h-full overflow-hidden rounded-[calc(var(--radius-card)-1px)]", contentClassName)}>
        <m.div
          aria-hidden
          className="pointer-events-none absolute -top-[180px] -left-[180px] size-[360px] rounded-full bg-[radial-gradient(closest-side,rgb(155_128_255/0.18),rgb(155_128_255/0))]"
          style={{ x, y, opacity }}
        />
        <div className="relative h-full">{children}</div>
      </GlassCard>
    </div>
  );
}
