"use client";

import { Fragment, useEffect, useRef } from "react";
import { animate } from "motion/react";
import { duration, ease } from "@/lib/motion";
import { useShouldReduceMotion } from "@/components/motion/ReducedMotion";

type AnimatedCounterProps = {
  value: string;
  /** Animate even if the number is already on screen at mount (used by the preview replay). */
  alwaysAnimate?: boolean;
};

/**
 * Counts every number in a stat (e.g. "$60k+", "3–5%") up from zero when it scrolls into view.
 * The server HTML always contains the final value (SEO, no-JS). Width is reserved with the
 * final digits so nothing shifts. Skipped if already visible on load, or with reduced motion.
 */
export function AnimatedCounter({ value, alwaysAnimate = false }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useShouldReduceMotion();
  const parts = value.split(/(\d+(?:\.\d+)?)/);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduce) return;
    const slots = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-count]"));
    const r = root.getBoundingClientRect();
    const onScreen = r.top < window.innerHeight && r.bottom > 0;
    if (onScreen && !alwaysAnimate) return; // don't flash a visible number back to zero

    slots.forEach((s) => (s.textContent = "0"));
    let controls: { stop: () => void } | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        controls = animate(0, 1, {
          duration: duration.count,
          ease: ease.outExpo,
          onUpdate: (p) => slots.forEach((s) => (s.textContent = String(Math.round(Number(s.dataset.count) * p)))),
        });
      },
      { threshold: 0.6 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      controls?.stop();
      slots.forEach((s) => (s.textContent = s.dataset.count ?? ""));
    };
  }, [reduce, alwaysAnimate]);

  return (
    <span ref={ref}>
      {parts.map((part, i) =>
        /^\d/.test(part) ? (
          <span key={i} className="count-slot" data-final={part}>
            <span data-count={part}>{part}</span>
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
