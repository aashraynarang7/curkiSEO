"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { AssociateIcon } from "@/components/associates/AssociateIcon";
import type { FlipCardData } from "./FlipCard";

type StackedCardsProps = {
  cards: FlipCardData[];
  label: string;
  className?: string;
};

/**
 * A deck of associate cards that fans out when scrolled into view. Hovering or focusing a
 * card lifts it to the front. Transform-only; cards are links, so everything is keyboard reachable.
 */
export function StackedCards({ cards, label, className }: StackedCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [active, setActive] = useState<number | null>(null);
  const [layout, setLayout] = useState({ width: 0, cardWidth: 224 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setLayout({ width: entry.contentRect.width, cardWidth: window.innerWidth < 640 ? 176 : 224 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mid = (cards.length - 1) / 2;
  const fanned = inView && layout.width > 0;
  const spread = Math.min(layout.cardWidth * 0.6, (layout.width - layout.cardWidth) / Math.max(1, cards.length - 1));

  return (
    <div ref={ref} className={cn("relative h-[21rem] sm:h-[24rem]", className)} onPointerLeave={() => setActive(null)}>
      <ul aria-label={label} className="absolute inset-0">
        {cards.map((c, i) => {
          const offset = i - mid;
          const lifted = active === i;
          return (
            <li
              key={c.slug}
              className="pointer-events-none absolute inset-0 grid place-items-center"
              style={{ zIndex: lifted ? 20 : 10 - Math.round(Math.abs(offset)) }}
            >
              <m.div
                className="pointer-events-auto w-44 sm:w-56"
                initial={false}
                animate={{
                  x: fanned ? offset * spread : offset * 10,
                  y: (fanned ? Math.abs(offset) * 18 : Math.abs(offset) * 4) + (lifted ? -24 : 0),
                  rotate: fanned ? offset * 6 : offset * 2,
                  scale: lifted ? 1.05 : 1,
                }}
                transition={{ type: "spring", ...spring.soft, delay: fanned && active === null ? Math.abs(offset) * 0.05 : 0 }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              >
                <Link
                  href={`/associates/${c.slug}`}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="glass-flat block rounded-card p-4 sm:p-5"
                >
                  <span className="flex items-start justify-between">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      width={64}
                      height={64}
                      sizes="64px"
                      className="size-14 rounded-2xl object-cover sm:size-16"
                    />
                    <span className="grid size-9 place-items-center rounded-xl bg-lavender text-brand-deep">
                      <AssociateIcon name={c.icon} className="size-4" />
                    </span>
                  </span>
                  <span className="mt-4 block font-mono text-[0.625rem] font-medium tracking-[0.14em] text-brand-deep uppercase sm:text-[0.6875rem]">
                    {c.role}
                  </span>
                  <span className="mt-1 block font-display text-xl font-bold text-ink">{c.name}</span>
                  <span className="mt-2 line-clamp-3 block text-sm leading-snug text-muted">{c.tagline}</span>
                </Link>
              </m.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
