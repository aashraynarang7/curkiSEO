"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import * as m from "motion/react-m";
import { useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ease, magneticPull, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/ButtonLink";
import { useShouldReduceMotion } from "@/components/motion/ReducedMotion";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
};

type Ripple = { id: number; x: number; y: number };

/** CTA link gently pulled toward the cursor, with a ripple on press. */
export function MagneticButton({ href, children, variant = "primary", size = "md", arrow = false, className }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const nextId = useRef(0);
  const reduce = useShouldReduceMotion();
  const x = useSpring(0, spring.soft);
  const y = useSpring(0, spring.soft);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onPointerMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * magneticPull);
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * magneticPull * 0.6);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const id = nextId.current++;
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
  };

  const classes = cn(buttonClassName({ variant, size }), "relative overflow-hidden", className);
  const rippleColour = variant === "primary" || variant === "ghostOnDark" ? "bg-white/40" : "bg-brand/20";
  const content = (
    <>
      {ripples.map((rp) => (
        <m.span
          key={rp.id}
          aria-hidden
          className={cn("pointer-events-none absolute -mt-12 -ml-12 size-24 rounded-full", rippleColour)}
          style={{ left: rp.x, top: rp.y }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3.2, opacity: 0 }}
          transition={{ duration: 0.65, ease: ease.calm }}
          onAnimationComplete={() => setRipples((rs) => rs.filter((r) => r.id !== rp.id))}
        />
      ))}
      <span className="relative inline-flex items-center gap-2">
        {children}
        {arrow && (
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 reduced:transition-none" />
        )}
      </span>
    </>
  );

  return (
    <m.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
    >
      {/^https?:\/\//.test(href) ? (
        <a href={href} className={classes}>
          {content}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {content}
        </Link>
      )}
    </m.span>
  );
}
