"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/site";
import { GlassCard } from "@/components/ui/GlassCard";

type AccordionProps = {
  items: Faq[];
  /** Index opened on load, or null for all closed. */
  defaultOpen?: number | null;
  headingLevel?: "h2" | "h3";
};

/**
 * FAQ accordion (WAI-ARIA APG). Smooth height via the grid-template-rows technique,
 * rotating icon, fading content. Answers are always in the HTML; closed ones are inert.
 */
export function Accordion({ items, defaultOpen = 0, headingLevel = "h3" }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen === null ? [] : [defaultOpen]));
  const baseId = useId();
  const Heading = headingLevel;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <GlassCard className="divide-y divide-ink/8 px-5 sm:px-8">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const buttonId = `${baseId}-button-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.question} className="py-1">
            <Heading className="text-[1.0625rem] leading-snug font-semibold sm:text-lg">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-6 rounded-lg py-4 text-left"
              >
                <span>{item.question}</span>
                <span data-open={isOpen} className="acc-icon mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-lavender text-brand-deep">
                  <Plus aria-hidden className="size-4" />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} data-open={isOpen} inert={!isOpen} className="acc-panel">
              <div>
                <p className="acc-content pr-2 pb-5 leading-relaxed text-body sm:pr-14">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </GlassCard>
  );
}
