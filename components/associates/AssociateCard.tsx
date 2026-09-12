import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Associate } from "@/data/associates";
import { cn } from "@/lib/cn";
import { ArtImage } from "@/components/ui/ArtImage";
import { GlassCard } from "@/components/ui/GlassCard";

type AssociateCardProps = {
  associate: Associate;
  headingLevel?: "h2" | "h3";
  compact?: boolean;
  /** No backdrop blur: use inside moving containers (carousels) to keep dragging smooth. */
  flat?: boolean;
  className?: string;
};

export function AssociateCard({ associate: a, headingLevel = "h3", compact = false, flat = false, className }: AssociateCardProps) {
  const Heading = headingLevel;
  return (
    <GlassCard as="article" data-gsap-hover blur={!flat} lift className={cn("group relative flex h-full flex-col p-6 sm:p-7", className)}>
      {!compact && (
        <div
          data-art-frame
          className="-mx-6 -mt-6 mb-6 grid aspect-[16/7] place-items-center overflow-hidden rounded-t-card bg-(--art-bg) sm:-mx-7 sm:-mt-7"
          style={{ "--art-bg": a.art.bg } as CSSProperties}
        >
          <ArtImage name={a.art.name} alt={a.art.alt} width={640} height={640} float className="size-full object-contain" />
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <Image
            src={a.image.src}
            alt={a.image.alt}
            width={64}
            height={64}
            sizes="64px"
            className="size-16 rounded-2xl object-cover ring-1 ring-white"
          />
          <span aria-hidden className="absolute -right-1 -bottom-1 size-3.5 rounded-full bg-teal ring-2 ring-white" />
        </div>
        <div>
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brand-deep">{a.role}</p>
          <Heading className="mt-1 text-2xl font-bold">
            <Link
              href={`/associates/${a.slug}`}
              className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-deep"
            >
              {a.name}
            </Link>
          </Heading>
        </div>
      </div>

      <p className="mt-5 text-[0.9375rem] leading-relaxed text-body">{a.tagline}</p>

      {!compact && (
        <ul className="mt-5 space-y-2.5 border-t border-ink/8 pt-5">
          {a.cardOutcomes.map((o) => (
            <li key={o} className="flex gap-2.5 text-sm leading-snug text-ink-soft">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-ink" />
              {o}
            </li>
          ))}
        </ul>
      )}

      <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-deep">
        Meet {a.shortName}
        <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
      </span>
    </GlassCard>
  );
}
