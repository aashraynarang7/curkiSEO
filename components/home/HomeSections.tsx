import Link from "next/link";
import { Check, EyeOff, KeyRound, Lock, MapPin, Unplug, UserCheck, type LucideIcon } from "lucide-react";
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
import { cn } from "@/lib/cn";
import { AssociateCard } from "@/components/associates/AssociateCard";
import { AssociateChip } from "@/components/associates/AssociateChip";
import { FaqList } from "@/components/sections/FaqList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
          <h1 id="hero-heading" className="mt-6 text-[2.5rem] leading-[1.04] font-extrabold sm:text-6xl lg:text-[3.75rem]">
            {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-body sm:text-xl sm:leading-relaxed">{hero.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={site.bookingUrl} size="lg" arrow>
              {site.bookingLabel}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
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

export function StatStrip() {
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
            <dd className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export function AssociatesSection() {
  const copy = homeCopy.associates;
  return (
    <Section id="associates" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {associates.map((a, i) => (
          <li
            key={a.slug}
            className={cn(i < 3 ? "lg:col-span-2" : "lg:col-span-3", i === associates.length - 1 && i % 2 === 0 && "sm:col-span-2 lg:col-span-3")}
          >
            <Reveal delay={i * 0.05} className="h-full">
              <AssociateCard associate={a} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ProblemsSection() {
  const copy = homeCopy.problems;
  return (
    <Section id="problems" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <ol className="grid gap-px overflow-hidden rounded-card border border-ink/8 bg-ink/8 lg:grid-cols-3">
        {problemPillars.map((p, i) => (
          <li key={p.id} className="flex flex-col bg-page/90 p-7 sm:p-9">
            <p className="font-mono text-xs text-brand-deep">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-6 text-2xl font-bold">{p.title}</h3>
            <p className="mt-3 font-display text-lg leading-snug font-semibold text-ink-soft">{p.statement}</p>
            <p className="mt-4 leading-relaxed text-muted">{p.detail}</p>
            <div className="mt-auto pt-8">
              <p className={labelClass}>Solved by</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.associates.map((slug) => (
                  <li key={slug}>
                    <AssociateChip slug={slug} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
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
        <ol className="relative space-y-9 before:absolute before:top-3 before:bottom-3 before:left-5 before:w-px before:bg-linear-to-b before:from-brand-soft before:to-teal/40">
          {connectSteps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5">
              <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white font-mono text-sm font-medium text-brand-deep shadow-sm ring-1 ring-brand/20">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="glass rounded-card p-5 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-lg font-bold text-ink">{copy.systemsTitle}</p>
              <p className="shrink-0 whitespace-nowrap rounded-full bg-lavender px-2.5 py-1 font-mono text-[0.6875rem] text-brand-deep">{copy.systemsNote}</p>
            </div>
            <ul className="mt-5 space-y-2">
              {copy.systems.map((s) => (
                <li key={s} className="panel flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                  <span className="font-medium text-ink">{s}</span>
                  <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[0.6875rem] text-teal-ink">
                    <span aria-hidden className="size-1.5 rounded-full bg-teal" />
                    Read-only
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-lavender/80 px-4 py-3 text-sm leading-relaxed text-ink-soft">{copy.layerNote}</p>
          </div>
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

export function WhoItsForSection() {
  const copy = homeCopy.who;
  return (
    <Section id="who-its-for" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <ul className="grid gap-5 md:grid-cols-2">
        {personas.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 0.05} className="h-full">
              <article className="glass flex h-full flex-col rounded-card p-7 sm:p-8">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 font-display leading-snug font-semibold text-brand-deep">{p.concern}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.pains.map((pain) => (
                    <li key={pain} className="flex gap-3 text-[0.9375rem] leading-relaxed text-body">
                      <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-muted" />
                      {pain}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <p className={labelClass}>Your AI Associates</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.associates.map((slug) => (
                      <li key={slug}>
                        <AssociateChip slug={slug} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-24">
        <h3 className="text-2xl font-bold sm:text-3xl">{copy.industriesTitle}</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{copy.industriesNote}</p>
        {/* TODO: confirm which AI Associates are offered in each non-care industry. */}
        <ul className="mt-8 grid gap-px overflow-hidden rounded-card border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((ind) => {
            const list = associates.filter((a) => a.industries.includes(ind.id));
            return (
              <li key={ind.id} className="flex flex-col bg-page/90 p-6">
                <h4 className="font-display leading-snug font-bold text-ink">{ind.name}</h4>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {list.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/associates/${a.slug}`}
                        className="inline-block rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink-soft ring-1 ring-ink/8 hover:text-brand-deep"
                      >
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export function HomeFaqSection() {
  return (
    <Section id="faq" eyebrow={homeCopy.faq.eyebrow} title={homeCopy.faq.title}>
      <div className="max-w-3xl">
        <FaqList faqs={homeFaqs} />
      </div>
    </Section>
  );
}
