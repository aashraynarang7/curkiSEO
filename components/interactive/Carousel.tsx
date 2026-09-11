"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import * as m from "motion/react-m";
import { animate, useMotionValue, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useShouldReduceMotion } from "@/components/motion/ReducedMotion";

export type CarouselSlide = { id: string; label: string; content: ReactNode };

type Metrics = { step: number; maxIndex: number; visible: number };

/**
 * Draggable, swipeable carousel with momentum and snap. Arrow keys when focused, prev/next
 * buttons, and it scrolls a slide into view when something inside it receives focus.
 * All slides are real HTML on load.
 */
export function Carousel({ slides, label, className }: { slides: CarouselSlide[]; label: string; className?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reduce = useShouldReduceMotion();
  const regionId = useId();
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>({ step: 0, maxIndex: Math.max(0, slides.length - 1), visible: 1 });
  const metricsRef = useRef(metrics);
  const indexRef = useRef(0);
  const dragged = useRef(false);

  const goTo = useCallback(
    (target: number, velocity = 0) => {
      const { step, maxIndex } = metricsRef.current;
      const next = Math.max(0, Math.min(maxIndex, target));
      indexRef.current = next;
      setIndex(next);
      animate(x, -next * step, reduce ? { duration: 0 } : { type: "spring", ...spring.snap, velocity });
    },
    [reduce, x],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const ro = new ResizeObserver(() => {
      const first = track.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = first.offsetWidth + gap;
      const visible = Math.max(1, Math.floor((viewport.clientWidth + gap + 1) / step));
      const maxIndex = Math.max(0, slides.length - visible);
      const clamped = Math.min(indexRef.current, maxIndex);
      metricsRef.current = { step, maxIndex, visible };
      indexRef.current = clamped;
      setMetrics({ step, maxIndex, visible });
      setIndex(clamped);
      x.set(-clamped * step);
    });
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [slides.length, x]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { step } = metricsRef.current;
    if (step) {
      const projected = x.get() + info.velocity.x * 0.2; // momentum
      goTo(Math.round(-projected / step), info.velocity.x);
    }
    window.setTimeout(() => {
      dragged.current = false;
    }, 0);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(indexRef.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(indexRef.current - 1);
    }
  };

  const ensureVisible = (i: number) => {
    const { visible } = metricsRef.current;
    const start = indexRef.current;
    if (i < start) goTo(i);
    else if (i > start + visible - 1) goTo(i - visible + 1);
  };

  const positions = metrics.maxIndex + 1;
  const controlClass =
    "grid size-11 place-items-center rounded-full bg-white/85 text-ink ring-1 ring-ink/10 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className={className}>
      <div
        ref={viewportRef}
        id={regionId}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="-mx-3 overflow-hidden rounded-card px-3 py-4"
      >
        <m.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -metrics.maxIndex * metrics.step, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => {
            dragged.current = true;
          }}
          onDragEnd={onDragEnd}
          onClickCapture={(e) => {
            if (dragged.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          style={{ x }}
          className="flex cursor-grab touch-pan-y gap-5 select-none active:cursor-grabbing [&_a]:[-webkit-user-drag:none] [&_img]:pointer-events-none"
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
              onFocus={() => ensureVisible(i)}
              className="w-[85%] shrink-0 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              {s.content}
            </div>
          ))}
        </m.div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="button" aria-controls={regionId} onClick={() => goTo(index - 1)} disabled={index === 0} className={controlClass}>
          <ChevronLeft aria-hidden className="size-5" />
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          aria-controls={regionId}
          onClick={() => goTo(index + 1)}
          disabled={index >= metrics.maxIndex}
          className={controlClass}
        >
          <ChevronRight aria-hidden className="size-5" />
          <span className="sr-only">Next</span>
        </button>
        <p aria-live="polite" className={cn("ml-1 font-mono text-xs text-muted", positions <= 1 && "sr-only")}>
          {index + 1} / {positions}
        </p>
      </div>
    </div>
  );
}
