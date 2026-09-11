"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import * as m from "motion/react-m";
import { useSpring } from "motion/react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string; content: ReactNode };

type TabsProps = {
  items: TabItem[];
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
};

const INDICATOR_BASE = 100; // px; the indicator is scaled from this width (transform only)

/**
 * Accessible tabs (WAI-ARIA APG, automatic activation). The active indicator slides with
 * transform; panels cross-fade. Every panel is rendered in the HTML and stacked in one
 * grid cell, so switching never shifts layout. Inactive panels are inert.
 */
export function Tabs({ items, label, className }: TabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const x = useSpring(0, spring.snap);
  const scaleX = useSpring(0, spring.snap);
  const opacity = useSpring(0, spring.snap);

  const measure = useCallback(
    (index: number, immediate: boolean) => {
      const tab = tabRefs.current[index];
      if (!tab) return;
      const nextX = tab.offsetLeft;
      const nextScale = tab.offsetWidth / INDICATOR_BASE;
      if (immediate) {
        x.jump(nextX);
        scaleX.jump(nextScale);
      } else {
        x.set(nextX);
        scaleX.set(nextScale);
      }
      opacity.set(1);
    },
    [x, scaleX, opacity],
  );

  useEffect(() => {
    activeRef.current = active;
    measure(active, false);
  }, [active, measure]);

  useEffect(() => {
    measure(activeRef.current, true);
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(() => measure(activeRef.current, true));
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  const select = (index: number, focus: boolean) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    if (focus) {
      const tab = tabRefs.current[next];
      tab?.focus();
      tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: items.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  return (
    <div className={className}>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div
          ref={listRef}
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="glass relative inline-flex gap-1 rounded-full p-1.5"
        >
          <m.span
            aria-hidden
            className="absolute top-1.5 bottom-1.5 left-0 origin-left rounded-full bg-brand-deep shadow-[0_8px_20px_-10px_rgb(91_54_225/0.9)]"
            style={{ width: INDICATOR_BASE, x, scaleX, opacity }}
          />
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`${baseId}-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i, false)}
                className={cn(
                  "relative z-[1] rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-5",
                  selected ? "text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tab-panels mt-8">
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <div
              key={item.id}
              id={`${baseId}-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${item.id}`}
              data-active={selected}
              inert={!selected}
              tabIndex={selected ? 0 : -1}
              className="tab-panel rounded-card"
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
