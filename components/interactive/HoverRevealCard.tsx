"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { GlassCard } from "@/components/ui/GlassCard";

type HoverRevealCardProps = {
  eyebrow?: string;
  title: string;
  summary: ReactNode;
  /** Revealed from the bottom on hover, focus or tap. Always present in the HTML. */
  children: ReactNode;
  toggleLabel: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function HoverRevealCard({ eyebrow, title, summary, children, toggleLabel, headingLevel = "h3", className }: HoverRevealCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Heading = headingLevel;

  return (
    <GlassCard
      as="article"
      data-open={open}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      className={cn("reveal-host relative flex min-h-[25rem] flex-col overflow-hidden p-7 sm:p-8", className)}
    >
      <div className="flex items-start justify-between gap-4">
        {eyebrow ? <p className="font-mono text-xs text-brand-deep">{eyebrow}</p> : <span />}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[2] grid size-9 shrink-0 place-items-center rounded-full bg-lavender text-brand-deep transition-colors hover:bg-white"
        >
          <Plus aria-hidden className={cn("size-4 transition-transform duration-300 reduced:transition-none", open && "rotate-45")} />
          <span className="sr-only">{open ? `Hide details: ${title}` : `${toggleLabel}: ${title}`}</span>
        </button>
      </div>
      <Heading className="mt-5 text-2xl font-bold">{title}</Heading>
      <div className="mt-3 font-display text-lg leading-snug font-semibold text-ink-soft">{summary}</div>

      <div id={panelId} className="reveal-panel panel absolute inset-x-0 bottom-0 z-[1] rounded-t-3xl border-x-0 border-b-0 p-7 shadow-[0_-18px_40px_-28px_rgb(49_16_129/0.35)] sm:p-8">
        {children}
      </div>
    </GlassCard>
  );
}
