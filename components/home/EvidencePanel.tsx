import Image from "next/image";
import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import { getAssociate } from "@/data/associates";
import { heroDemo } from "@/data/site";
import { cn } from "@/lib/cn";
import { ParallaxLayer, ParallaxScene } from "@/components/interactive/Parallax";

// Signature hero visual: an illustrative, source-linked answer from Ask Oliver,
// with drifting orbs and floating associate cards that respond to the mouse.
export function EvidencePanel() {
  const lead = getAssociate(heroDemo.associateSlug);
  if (!lead) return null;

  return (
    <ParallaxScene className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <ParallaxLayer depth={-18} aria-hidden className="absolute -top-20 -right-12 size-[28rem]">
        <div className="orb orb-drift inset-0" style={{ "--orb": "rgb(155 128 255 / 0.5)" } as CSSProperties} />
      </ParallaxLayer>
      <ParallaxLayer depth={-10} aria-hidden className="absolute -bottom-24 -left-16 size-80">
        <div className="orb orb-drift-slow inset-0" style={{ "--orb": "rgb(32 186 158 / 0.28)" } as CSSProperties} />
      </ParallaxLayer>

      <ParallaxLayer depth={6}>
        <figure className="glass relative overflow-hidden rounded-[1.75rem] p-4 sm:p-6">
          <figcaption className="sr-only">{heroDemo.caption}</figcaption>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={lead.image.src}
                alt={lead.image.alt}
                width={44}
                height={44}
                sizes="44px"
                className="size-11 rounded-full object-cover ring-2 ring-white"
              />
              <div>
                <p className="font-display font-bold text-ink">{heroDemo.assistant}</p>
                <p className="font-mono text-[0.6875rem] text-muted">{lead.role}</p>
              </div>
            </div>
            <p className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 font-mono text-[0.6875rem] text-teal-ink ring-1 ring-teal/30">
              <span aria-hidden className="size-1.5 rounded-full bg-teal" />
              Connected
            </p>
          </div>

          <ul aria-label={`${lead.shortName}'s modules`} className="mt-4 flex flex-wrap gap-1.5">
            {heroDemo.modules.map((s) => (
              <li key={s} className="rounded-full bg-lavender px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft">
                {s}
              </li>
            ))}
          </ul>

          <div className="panel ledger mt-5 rounded-2xl p-4 sm:p-5">
            <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-brand-deep px-4 py-2.5 text-sm text-white">
              {heroDemo.question}
            </p>

            <div className="mt-4 flex gap-3">
              <Sparkles aria-hidden className="mt-1 size-4 shrink-0 text-brand-deep" />
              <p className="text-[0.9375rem] leading-relaxed font-medium text-ink">{heroDemo.answer}</p>
            </div>

            <ul className="mt-4 divide-y divide-ink/6 rounded-xl bg-white ring-1 ring-ink/6">
              {heroDemo.findings.map((f) => (
                <li key={f.label} className="flex flex-col gap-0.5 px-3.5 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden className={cn("size-2 rounded-full", f.status === "risk" ? "bg-[#ff254e]" : "bg-[#f5a524]")} />
                    <span className="sr-only">{f.status === "risk" ? "High risk:" : "Watch:"}</span>
                    <span className="font-semibold text-ink">{f.label}</span>
                  </span>
                  <span className="pl-[1.125rem] text-muted sm:pl-0 sm:text-right">{f.detail}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 grid gap-x-3 gap-y-1 font-mono text-[0.6875rem] leading-relaxed text-muted sm:grid-cols-[auto_1fr]">
              <dt className="tracking-[0.12em] uppercase">Sources</dt>
              <dd>{heroDemo.sources.join("  ·  ")}</dd>
              <dt className="mt-1 tracking-[0.12em] uppercase sm:mt-0">Next step</dt>
              <dd className="text-ink-soft">{heroDemo.action}</dd>
            </dl>
          </div>

          <p className="mt-3 text-right font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{heroDemo.label}</p>
        </figure>
      </ParallaxLayer>

      {heroDemo.chips.map((chip, i) => {
        const a = getAssociate(chip.associate);
        if (!a) return null;
        return (
          <ParallaxLayer
            key={chip.associate}
            depth={i === 0 ? 26 : 34}
            aria-hidden
            className={cn("absolute hidden lg:block", i === 0 ? "-top-7 right-10" : "-bottom-8 -left-10")}
          >
            {/* Floating cards use the no-blur surface: re-blurring moving layers every frame is expensive. */}
            <div className="float-y" style={{ "--delay": `${i * 1.4}s` } as CSSProperties}>
              <div
                className="glass-flat rise flex max-w-[16rem] items-center gap-2.5 rounded-2xl py-2 pr-3.5 pl-2"
                style={{ "--delay": `${420 + i * 180}ms` } as CSSProperties}
              >
                <Image src={a.image.src} alt="" width={32} height={32} sizes="32px" className="size-8 rounded-full object-cover" />
                <p className="text-xs leading-snug text-ink-soft">
                  <span className="font-semibold text-ink">{a.name}</span> {chip.text}
                </p>
              </div>
            </div>
          </ParallaxLayer>
        );
      })}
    </ParallaxScene>
  );
}
