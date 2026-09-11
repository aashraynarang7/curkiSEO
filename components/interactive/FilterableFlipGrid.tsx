"use client";

import { useId, useMemo, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { duration, ease, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { FlipCard, type FlipCardData } from "./FlipCard";

export type FlipFilter = { id: string; label: string; slugs: string[] | null };

type FilterableFlipGridProps = {
  cards: FlipCardData[];
  filters: FlipFilter[];
  label: string;
};

/**
 * Filter chips with a sliding active indicator (shared layout) over a grid of FlipCards that
 * animate in and out. All cards are in the server HTML ("All" is the default).
 */
export function FilterableFlipGrid({ cards, filters, label }: FilterableFlipGridProps) {
  const [activeId, setActiveId] = useState(filters[0]?.id);
  const indicatorId = `filter-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const current = filters.find((f) => f.id === activeId) ?? filters[0];
  const visible = useMemo(
    () => (current?.slugs ? cards.filter((c) => current.slugs?.includes(c.slug)) : cards),
    [cards, current],
  );

  return (
    <>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div role="group" aria-label={label} className="glass inline-flex gap-1 rounded-full p-1.5">
          {filters.map((f) => {
            const selected = f.id === current?.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(f.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-5",
                  selected ? "text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {selected && (
                  <m.span
                    layoutId={indicatorId}
                    className="absolute inset-0 rounded-full bg-brand-deep shadow-[0_8px_20px_-10px_rgb(91_54_225/0.9)]"
                    transition={{ type: "spring", ...spring.snap }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {`Showing ${visible.length} of ${cards.length} AI Associates`}
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((card) => (
            <m.li
              key={card.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: duration.base, ease: ease.calm }}
              className="h-full"
            >
              <FlipCard data={card} />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
