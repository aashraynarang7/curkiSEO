"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Item } from "@/data/associates";
import { cn } from "@/lib/cn";
import { useShouldReduceMotion } from "@/components/motion/ReducedMotion";

const PER_PAGE = 4;
const INTERVAL = 5200;

/**
 * Key capabilities, four at a time, in purple capsules that pop in and then flip to the next four.
 *
 * Every capability is in the server HTML on first paint — the pages are stacked in the same grid
 * cells and swapped with transforms, never mounted and unmounted. That keeps the copy indexable
 * and means the block reserves its full height up front, so nothing shifts as it cycles.
 *
 * Accessibility:
 * - Auto-advance is real motion that starts on its own, so there is an explicit pause control
 *   (WCAG 2.2.2), and it also pauses on hover and on keyboard focus.
 * - Under reduced motion nothing auto-advances and the flip is instant; the pager still works, so
 *   the content is all reachable, it just never moves on its own.
 * - Off-screen pages are `aria-hidden`, so a screen reader is told about the four on show rather
 *   than all nine at once. The pager reaches the rest.
 */
export function CapabilityCapsules({ items, label }: { items: Item[]; label: string }) {
  const pages: Item[][] = [];
  for (let i = 0; i < items.length; i += PER_PAGE) pages.push(items.slice(i, i + PER_PAGE));

  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const reduce = useShouldReduceMotion();
  const liveRef = useRef<HTMLParagraphElement>(null);

  const go = useCallback((next: number) => setPage(((next % pages.length) + pages.length) % pages.length), [pages.length]);

  useEffect(() => {
    if (reduce || !playing || held || pages.length < 2) return;
    const id = window.setInterval(() => setPage((p) => (p + 1) % pages.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduce, playing, held, pages.length]);

  if (pages.length === 0) return null;

  return (
    <div
      className="capsules"
      data-motion-instant={reduce ? "" : undefined}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: PER_PAGE }, (_, slot) => (
          <li key={slot} data-gsap-pop className="capsule-slot">
            {pages.map((pageItems, p) => {
              const item = pageItems[slot];
              if (!item) return null;
              const active = p === page;
              return (
                <article
                  key={item.title}
                  className="capsule-face"
                  data-active={active}
                  aria-hidden={!active}
                  style={{ transitionDelay: `${slot * 70}ms` }}
                >
                  {/* white/90, not /70: at 10px the lighter value measured 3.77:1 on the capsule. */}
                  <p className="font-mono text-[0.625rem] tracking-[0.16em] text-white/90 uppercase">
                    {String(p * PER_PAGE + slot + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug font-bold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/85">{item.detail}</p>
                </article>
              );
            })}
          </li>
        ))}
      </ul>

      {pages.length > 1 && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => go(page - 1)} className="capsule-btn" aria-label={`Previous ${label}`}>
            <ChevronLeft aria-hidden className="size-4" />
          </button>

          <ul className="flex items-center gap-2">
            {pages.map((_, p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => go(p)}
                  aria-current={p === page ? "true" : undefined}
                  aria-label={`${label}, group ${p + 1} of ${pages.length}`}
                  className={cn("capsule-dot", p === page && "capsule-dot-on")}
                />
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => go(page + 1)} className="capsule-btn" aria-label={`Next ${label}`}>
            <ChevronRight aria-hidden className="size-4" />
          </button>

          {!reduce && (
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="capsule-btn"
              aria-label={playing ? `Pause ${label}` : `Play ${label}`}
            >
              {playing ? <Pause aria-hidden className="size-3.5" /> : <Play aria-hidden className="size-3.5" />}
            </button>
          )}
        </div>
      )}

      <p ref={liveRef} aria-live="polite" className="sr-only">
        {`Group ${page + 1} of ${pages.length}`}
      </p>
    </div>
  );
}
