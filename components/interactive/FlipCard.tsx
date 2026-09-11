"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { ArrowRight, Check, RotateCw } from "lucide-react";
import type { AssociateIconName } from "@/data/associates";
import { cn } from "@/lib/cn";
import { AssociateIcon } from "@/components/associates/AssociateIcon";
import { GlassCard } from "@/components/ui/GlassCard";

export type FlipCardData = {
  slug: string;
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  icon: AssociateIconName;
  image: StaticImageData;
  imageAlt: string;
  outcomes: string[];
};

type FlipCardProps = {
  data: FlipCardData;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * 3D flip card. Mouse: flips on hover. Touch/pen: tap toggles. Keyboard: flips on focus,
 * Enter/Space toggles, Esc returns to the front. Both faces are real HTML on page load.
 * With reduced motion the faces cross-fade instead of rotating (CSS in globals.css).
 */
export function FlipCard({ data, headingLevel = "h3", className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef("");
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const backId = useId();
  const Heading = headingLevel;

  const onPointerEnter = (e: PointerEvent) => {
    lastPointer.current = e.pointerType;
    if (e.pointerType === "mouse") setFlipped(true);
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setFlipped(false);
  };
  const onPointerDown = (e: PointerEvent) => {
    lastPointer.current = e.pointerType;
  };

  // Clicks from keyboard (detail 0), touch or pen toggle. Mouse users already flip on hover.
  const onToggle = (e: MouseEvent) => {
    if (lastPointer.current === "mouse" && e.detail > 0) return;
    setFlipped((v) => !v);
  };

  // Tapping the back (outside its link) flips back for touch users.
  const onBackClick = (e: MouseEvent) => {
    if (lastPointer.current === "mouse") return;
    if ((e.target as HTMLElement).closest("a")) return;
    setFlipped(false);
  };

  const onFocusToggle = (e: FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget.matches(":focus-visible")) setFlipped(true);
  };

  const onBlur = (e: FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setFlipped(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && flipped) {
      setFlipped(false);
      toggleRef.current?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("flip relative h-full", className)}
      data-flipped={flipped}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <div className="flip-inner">
        {/* Front */}
        <GlassCard blur={false} aria-hidden={flipped} className="flip-face flip-front flex flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="relative">
              <Image
                src={data.image}
                alt={data.imageAlt}
                width={72}
                height={72}
                sizes="72px"
                className="size-[4.5rem] rounded-2xl object-cover ring-1 ring-white"
              />
              <span aria-hidden className="absolute -right-1 -bottom-1 size-3.5 rounded-full bg-teal ring-2 ring-white" />
            </div>
            <span className="grid size-11 place-items-center rounded-2xl bg-lavender text-brand-deep">
              <AssociateIcon name={data.icon} className="size-5" />
            </span>
          </div>
          <p className="mt-6 font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-brand-deep uppercase">{data.role}</p>
          <Heading className="mt-1.5 text-2xl font-bold">{data.name}</Heading>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{data.tagline}</p>
          <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-brand-deep">
            <RotateCw className="size-4" />
            See key outcomes
          </span>
        </GlassCard>

        {/* Back */}
        <GlassCard
          blur={false}
          id={backId}
          aria-hidden={!flipped}
          onClick={onBackClick}
          className="flip-face flip-back flex flex-col bg-linear-to-b from-white to-lavender p-6 sm:p-7"
        >
          <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-brand-deep uppercase">{data.name} · Key outcomes</p>
          <ul className="mt-5 space-y-3.5">
            {data.outcomes.map((o) => (
              <li key={o} className="flex gap-3 leading-snug font-medium text-ink">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal/15">
                  <Check aria-hidden className="size-3.5 text-teal-ink" />
                </span>
                {o}
              </li>
            ))}
          </ul>
          <Link
            href={`/associates/${data.slug}`}
            tabIndex={flipped ? 0 : -1}
            className="group/link relative z-[2] mt-auto inline-flex items-center gap-2 self-start rounded-full pt-7 text-sm font-semibold text-brand-deep"
          >
            Learn more about {data.shortName}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:translate-x-1 reduced:transition-none" />
          </Link>
        </GlassCard>
      </div>

      {/* Whole-card toggle. Out of the way (pointer-events) once flipped so the back link is clickable. */}
      <button
        ref={toggleRef}
        type="button"
        aria-pressed={flipped}
        aria-controls={backId}
        onClick={onToggle}
        onFocus={onFocusToggle}
        className={cn(
          "absolute inset-0 z-[1] rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-deep",
          flipped && "pointer-events-none",
        )}
      >
        <span className="sr-only">{flipped ? `Show ${data.name} summary` : `Show ${data.name} key outcomes`}</span>
      </button>
    </div>
  );
}
