"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { ArrowRight, Maximize2, X } from "lucide-react";
import { duration, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

type ExpandableCardProps = {
  eyebrow?: string;
  title: string;
  /** Full text. Clamped on the card, shown in full when expanded. Always in the HTML. */
  summary: string;
  context?: string;
  cta?: { href: string; label: string };
  headingLevel?: "h3" | "h4";
  className?: string;
};

const subscribe = () => () => {};
const RADIUS = 20; // matches --radius-card (1.25rem); set inline so layout animation keeps corners crisp

/**
 * Card that expands into a modal detail view with a shared layout animation (layoutId).
 * Modal: role="dialog", focus moves in and is trapped, Esc / close / backdrop close, focus returns.
 */
export function ExpandableCard({ eyebrow, title, summary, context, cta, headingLevel = "h3", className }: ExpandableCardProps) {
  const [open, setOpen] = useState(false);
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const layoutId = `expandable-${uid}`;
  const titleId = `${layoutId}-title`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const Heading = headingLevel;

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <m.div layoutId={layoutId} style={{ borderRadius: RADIUS }} className={cn("glass group relative flex h-full flex-col p-6 sm:p-7", className)}>
        <div className="flex items-start justify-between gap-4">
          {eyebrow ? <p className="font-mono text-xs text-brand-deep">{eyebrow}</p> : <span />}
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-full bg-lavender text-brand-deep transition-transform duration-300 group-hover:scale-110 reduced:transition-none reduced:group-hover:scale-100"
          >
            <Maximize2 className="size-3.5" />
          </span>
        </div>
        <Heading className="mt-4 text-lg leading-snug font-bold">{title}</Heading>
        <p className="mt-2 line-clamp-2 leading-relaxed text-muted">{summary}</p>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="absolute inset-0 rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-deep"
        >
          <span className="sr-only">Expand details: {title}</span>
        </button>
      </m.div>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <m.div key="dialog" className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-8" exit={{ opacity: 1 }}>
                <m.div
                  aria-hidden
                  className="absolute inset-0 bg-ink/45"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: duration.base }}
                  onClick={() => setOpen(false)}
                />
                <m.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  layoutId={layoutId}
                  style={{ borderRadius: RADIUS }}
                  transition={{ type: "spring", ...spring.snap }}
                  className="glass-flat relative w-full max-w-lg p-7 sm:p-9"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-lavender text-brand-deep hover:bg-white"
                  >
                    <X aria-hidden className="size-4" />
                    <span className="sr-only">Close</span>
                  </button>
                  {eyebrow && <p className="font-mono text-xs text-brand-deep">{eyebrow}</p>}
                  {context && (
                    <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{context}</p>
                  )}
                  <h2 id={titleId} className="mt-4 pr-10 text-2xl font-bold">
                    {title}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-body">{summary}</p>
                  {cta && (
                    <Link
                      href={cta.href}
                      onClick={() => setOpen(false)}
                      className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-deep underline-offset-4 hover:underline"
                    >
                      {cta.label}
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  )}
                </m.div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
