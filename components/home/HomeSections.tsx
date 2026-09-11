import { Check, EyeOff, KeyRound, Lock, MapPin, Unplug, UserCheck, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { associates } from "@/data/associates";
import {
  connectSteps,
  homeCopy,
  homeFaqs,
  industries,
  personas,
  problemPillars,
  proofStats,
  securityPoints,
  site,
  type SecurityIcon,
} from "@/data/site";
import { toFlipCard } from "@/lib/cards";
import { cn } from "@/lib/cn";
import { stagger } from "@/lib/motion";
import { AssociateChip, AssociateRow } from "@/components/associates/AssociateChip";
import { Accordion } from "@/components/interactive/Accordion";
import { AnimatedCounter } from "@/components/interactive/AnimatedCounter";
import { FilterableFlipGrid, type FlipFilter } from "@/components/interactive/FilterableFlipGrid";
import { HoverRevealCard } from "@/components/interactive/HoverRevealCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { Marquee } from "@/components/interactive/Marquee";
import { StepsTimeline } from "@/components/interactive/StepsTimeline";
import { Tabs, type TabItem } from "@/components/interactive/Tabs";
import { WordReveal, wordCount } from "@/components/interactive/WordReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { EvidencePanel } from "./EvidencePanel";

const labelClass = "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted";

export function Hero() {
  const { hero } = homeCopy;
  return (
    <section aria-labelledby="hero-heading" className="relative pt-12 pb-14 sm:pt-20 sm:pb-20">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-heading" className="word-reveal mt-6 text-[2.5rem] leading-[1.04] font-extrabold sm:text-6xl lg:text-[3.75rem]">
            <WordReveal text={hero.titleLead} /> <WordReveal text={hero.titleAccent} startIndex={wordCount(hero.titleLead)} className="text-gradient" />
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-body sm:text-xl sm:leading-relaxed">{hero.intro}</p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--delay": "450ms" } as CSSProperties}>
            <MagneticButton href={site.bookingUrl} size="lg" arrow>
              {site.bookingLabel}
            </MagneticButton>
            <MagneticButton href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </MagneticButton>
          </div>
          <ul className="rise mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" style={{ "--delay": "600ms" } as CSSProperties}>
            {hero.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden className="size-4 text-teal-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <EvidencePanel />
      </Container>
    </section>
  );
}

export function StatStrip({ alwaysAnimate = false }: { alwaysAnimate?: boolean }) {
  return (
    <Container>
      <dl className="glass grid grid-cols-2 overflow-hidden rounded-card lg:grid-cols-4">
        {proofStats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col-reverse justify-end gap-1 border-ink/8 p-5 sm:p-7",
              i % 2 === 1 && "border-l",
              i >= 2 && "border-t lg:border-t-0",
              i === 2 && "lg:border-l",
            )}
          >
            <dt className="text-sm leading-snug text-muted">{s.label}</dt>
            <dd className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              <AnimatedCounter value={s.value} alwaysAnimate={alwaysAnimate} />
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export function IndustryStrip() {
  return (
    <section aria-labelledby="industry-strip-heading" className="pt-14 sm:pt-16">
      <Container>
        <h2 id="industry-strip-heading" className="text-center font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-muted uppercase">
          {homeCopy.marquee.eyebrow}
        </h2>
      </Container>
      <Marquee items={industries.map((i) => i.name)} label={homeCopy.marquee.label} className="mt-5" />
    </section>
  );
}

export function AssociatesSection() {
  const copy = homeCopy.associates;
  const filters: FlipFilter[] = [
    { id: "all", label: copy.filterAll, slugs: null },
    ...personas.map((p) => ({ id: p.id, label: p.shortTitle, slugs: p.associates })),
  ];
  return (
    <Section id="associates" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <FilterableFlipGrid cards={associates.map(toFlipCard)} filters={filters} label={copy.filterLabel} />
    </Section>
  );
}

export function ProblemsSection() {
  const copy = homeCopy.problems;
  return (
    <Section id="problems" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <ul className="grid gap-5 lg:grid-cols-3">
        {problemPillars.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * stagger} className="h-full">
              <HoverRevealCard eyebrow={String(i + 1).padStart(2, "0")} title={p.title} summary={p.statement} toggleLabel={copy.toggleLabel}>
                <p className="leading-relaxed text-body">{p.detail}</p>
                <p className={cn(labelClass, "mt-5")}>{copy.solvedBy}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.associates.map((slug) => (
                    <li key={slug}>
                      <AssociateChip slug={slug} />
                    </li>
                  ))}
                </ul>
              </HoverRevealCard>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-center text-sm text-muted">{copy.hint}</p>
      <Reveal>
        <p className="mx-auto mt-20 max-w-3xl text-center font-display text-3xl leading-tight font-bold text-ink sm:text-[2.75rem]">
          {copy.quote}
        </p>
      </Reveal>
    </Section>
  );
}

const securityIcons: Record<SecurityIcon, LucideIcon> = {
  "map-pin": MapPin,
  lock: Lock,
  key: KeyRound,
  "eye-off": EyeOff,
  "user-check": UserCheck,
  unplug: Unplug,
};

export function HowItWorksSection() {
  const copy = homeCopy.how;
  return (
    <Section id="how-it-works" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <div className="grid gap-12 lg:grid-cols-2">
        <StepsTimeline steps={connectSteps} />

        <Reveal>
          <GlassCard className="p-5 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-lg font-bold text-ink">{copy.systemsTitle}</p>
              <p className="shrink-0 rounded-full bg-lavender px-2.5 py-1 font-mono text-[0.6875rem] whitespace-nowrap text-brand-deep">
                {copy.systemsNote}
              </p>
            </div>
            <ul className="mt-5 space-y-2">
              {copy.systems.map((s) => (
                <li key={s} className="panel flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                  <span className="font-medium text-ink">{s}</span>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-[0.6875rem] whitespace-nowrap text-teal-ink">
                    <span aria-hidden className="size-1.5 rounded-full bg-teal" />
                    Read-only
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-lavender/80 px-4 py-3 text-sm leading-relaxed text-ink-soft">{copy.layerNote}</p>
          </GlassCard>
        </Reveal>
      </div>

      <div className="mt-24">
        <h3 className="max-w-xl text-2xl font-bold sm:text-3xl">{copy.securityTitle}</h3>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-card border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-3">
          {securityPoints.map((p) => {
            const Icon = securityIcons[p.icon];
            return (
              <li key={p.title} className="bg-page/90 p-6 sm:p-7">
                <Icon aria-hidden className="size-5 text-brand-deep" />
                <h4 className="mt-4 font-display font-bold text-ink">{p.title}</h4>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export function PersonaTabs() {
  const copy = homeCopy.who;
  const items: TabItem[] = personas.map((p) => ({
    id: p.id,
    label: p.shortTitle,
    content: (
      <GlassCard className="grid gap-8 p-7 sm:p-9 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h3 className="text-2xl font-bold">{p.title}</h3>
          <p className="mt-2 font-display text-lg leading-snug font-semibold text-brand-deep">{p.concern}</p>
          <ul className="mt-6 space-y-3">
            {p.pains.map((pain) => (
              <li key={pain} className="flex gap-3 leading-relaxed text-body">
                <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-muted" />
                {pain}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={labelClass}>{copy.associatesLabel}</p>
          <ul className="mt-4 space-y-2.5">
            {p.associates.map((slug) => (
              <li key={slug}>
                <AssociateRow slug={slug} />
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>
    ),
  }));
  return <Tabs items={items} label={copy.personasLabel} />;
}

export function IndustryTabs() {
  const copy = homeCopy.who;
  const items: TabItem[] = industries.map((ind) => {
    const list = associates.filter((a) => a.industries.includes(ind.id));
    return {
      id: ind.id,
      label: ind.name,
      content: (
        <GlassCard className="p-7 sm:p-9">
          <h4 className="text-xl font-bold">{ind.name}</h4>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <li key={a.slug}>
                <AssociateRow slug={a.slug} detail="tagline" />
              </li>
            ))}
          </ul>
        </GlassCard>
      ),
    };
  });
  return <Tabs items={items} label={copy.industriesLabel} />;
}

export function WhoItsForSection() {
  const copy = homeCopy.who;
  return (
    <Section id="who-its-for" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <PersonaTabs />

      <div className="mt-24">
        <h3 className="text-2xl font-bold sm:text-3xl">{copy.industriesTitle}</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{copy.industriesNote}</p>
        {/* TODO: confirm which AI Associates are offered in each non-care industry. */}
        <IndustryTabs />
      </div>
    </Section>
  );
}

export function HomeFaqSection() {
  return (
    <Section id="faq" eyebrow={homeCopy.faq.eyebrow} title={homeCopy.faq.title}>
      <div className="max-w-3xl">
        <Accordion items={homeFaqs} />
      </div>
    </Section>
  );
}
