"use client";

import { useEffect, useId, useRef } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/cn";
import { useShouldReduceMotion } from "@/components/motion/ReducedMotion";

type Step = { title: string; detail: string };

type StepsTimelineProps = {
  steps: Step[];
  headingLevel?: "h3" | "h4";
  variant?: "light" | "tinted";
  className?: string;
};

/**
 * Numbered steps joined by an SVG line that draws itself as the list scrolls through
 * the viewport. The line is decorative; the steps are a plain ordered list.
 */
export function StepsTimeline({ steps, headingLevel = "h3", variant = "light", className }: StepsTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useShouldReduceMotion();
  const gradientId = `steps-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const pathLength = useMotionValue(0);

  useMotionValueEvent(smooth, "change", (v) => {
    if (!reduce) pathLength.set(v);
  });
  useEffect(() => {
    pathLength.set(reduce ? 1 : smooth.get());
  }, [reduce, smooth, pathLength]);

  const Heading = headingLevel;

  return (
    <ol ref={ref} className={cn("relative space-y-9", className)}>
      <svg
        aria-hidden
        className="absolute top-5 left-[19px] h-[calc(100%-2.5rem)] w-0.5 overflow-visible"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b36e1" />
            <stop offset="60%" stopColor="#9b80ff" />
            <stop offset="100%" stopColor="#20ba9e" />
          </linearGradient>
        </defs>
        <path d="M1 0 V100" stroke="rgb(28 22 41 / 0.1)" strokeWidth="2" fill="none" />
        <m.path d="M1 0 V100" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" fill="none" style={{ pathLength }} />
      </svg>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5">
          <span
            className={cn(
              "relative grid size-10 shrink-0 place-items-center rounded-full font-mono text-sm font-medium text-brand-deep shadow-sm ring-1 ring-brand/20",
              variant === "light" ? "bg-white" : "bg-lavender",
            )}
          >
            {i + 1}
          </span>
          <div className="pt-1.5">
            <Heading className="font-display text-lg font-bold text-ink">{s.title}</Heading>
            <p className="mt-1.5 leading-relaxed text-muted">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
