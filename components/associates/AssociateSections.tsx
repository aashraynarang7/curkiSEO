import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Ban, Check, Minus, MessageCircleQuestion } from "lucide-react";
import { associates, getRelated, type Associate } from "@/data/associates";
import { connectSteps, industries, site } from "@/data/site";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { AssociateCard } from "./AssociateCard";
import { AssociateIcon } from "./AssociateIcon";
import { Accordion } from "@/components/interactive/Accordion";
import { Carousel } from "@/components/interactive/Carousel";
import { ExpandableCard } from "@/components/interactive/ExpandableCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { ParallaxLayer, ParallaxScene } from "@/components/interactive/Parallax";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { StepsTimeline } from "@/components/interactive/StepsTimeline";
import { TiltCard } from "@/components/interactive/TiltCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const labelClass = "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]";
const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];

export function AssociateHero({ a, crumbs }: { a: Associate; crumbs: Crumb[] }) {
  const splitAt = a.h1.indexOf(": ");
  const lead = splitAt > -1 ? a.h1.slice(0, splitAt) : a.h1;
  const rest = splitAt > -1 ? a.h1.slice(splitAt + 2) : "";

  return (
    <section aria-labelledby="associate-heading" className="relative pt-8 pb-14 sm:pt-12 sm:pb-20">
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <Eyebrow>
              {a.role} · {a.domain}
            </Eyebrow>
            <h1 id="associate-heading" className="mt-5 text-5xl leading-[1.02] font-extrabold sm:text-6xl lg:text-7xl">
              <span className="text-gradient">{lead}</span>
              {rest && (
                <>
                  <span className="sr-only">: </span>
                  <span className="mt-4 block text-[1.625rem] leading-[1.2] font-bold text-ink sm:text-[2rem] lg:text-[2.25rem]">
                    {rest}
                  </span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{a.summary}</p>
            <ul className="mt-7 grid gap-2.5">
              {a.cardOutcomes.map((o) => (
                <li key={o} className="flex gap-2.5 font-medium text-ink-soft">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-teal-ink" />
                  {o}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href={site.bookingUrl} size="lg" arrow>
                {site.bookingLabel}
              </MagneticButton>
              <MagneticButton href="#capabilities" size="lg" variant="secondary">
                What {a.shortName} does
              </MagneticButton>
            </div>
          </div>

          <ParallaxScene className="relative mx-auto w-full max-w-md">
            <ParallaxLayer depth={-18} aria-hidden className="absolute -inset-16">
              <div className="orb orb-drift inset-0" style={{ "--orb": "rgb(155 128 255 / 0.42)" } as CSSProperties} />
            </ParallaxLayer>
            <ParallaxLayer depth={8}>
              <figure className="glass relative rounded-[2rem] p-3">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  preload
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 448px, 90vw"
                  className="aspect-square w-full rounded-[1.5rem] object-cover"
                />
                <figcaption className="panel mx-1 mt-3 mb-1 rounded-2xl px-4 py-3">
                  <span className={cn(labelClass, "flex items-center gap-2 text-brand-deep")}>
                    <MessageCircleQuestion aria-hidden className="size-3.5" />
                    Ask {a.shortName}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-snug text-ink">
                    {a.askPrompts?.[0] ? `“${a.askPrompts[0]}”` : a.tagline}
                  </span>
                </figcaption>
              </figure>
            </ParallaxLayer>
            <ParallaxLayer depth={26} aria-hidden className="absolute -top-5 -left-6 hidden sm:block">
              <div className="float-y">
                <div className="glass-flat flex items-center gap-2.5 rounded-2xl py-2 pr-4 pl-2">
                  <span className="grid size-9 place-items-center rounded-xl bg-lavender text-brand-deep">
                    <AssociateIcon name={a.icon} className="size-4" />
                  </span>
                  <span className="text-sm font-semibold text-ink">{a.domain}</span>
                </div>
              </div>
            </ParallaxLayer>
          </ParallaxScene>
        </div>
      </Container>
    </section>
  );
}

export function ProblemSolution({ a }: { a: Associate }) {
  return (
    <Section id="problem" eyebrow="The problem" title={`What changes with ${a.name}`}>
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-card border border-ink/8 bg-white/45 p-7 sm:p-9">
            <h3 className={cn(labelClass, "text-muted")}>Before</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{a.problem.before}</p>
            <ul className="mt-6 space-y-3 border-t border-ink/8 pt-6">
              {a.problem.pains.map((p) => (
                <li key={p} className="flex gap-3 text-body">
                  <Minus aria-hidden className="mt-1 size-4 shrink-0 text-muted" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="h-full">
          <GlassCard className="h-full p-7 sm:p-9">
            <h3 className={cn(labelClass, "text-teal-ink")}>With {a.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink">{a.solution.after}</p>
            <p className="mt-8 border-t border-ink/8 pt-6 font-display text-xl leading-snug font-bold text-ink">“{a.quote}”</p>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

export function Outcomes({ a }: { a: Associate }) {
  return (
    <Section id="outcomes" eyebrow="Outcomes" title={`What ${a.shortName} delivers`}>
      <ul className="grid gap-px overflow-hidden rounded-card border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-3">
        {a.outcomes.map((o) => (
          <li key={o.title} className="bg-page/90 p-7">
            <h3 className="text-xl leading-snug font-bold">{o.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{o.detail}</p>
          </li>
        ))}
      </ul>

      {a.valueModel && (
        <Reveal>
          <figure className="glass mt-10 overflow-hidden rounded-card">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-6 sm:px-8">
              <span className="font-display text-lg font-bold text-ink">{a.valueModel.heading}</span>
              <span className={cn(labelClass, "text-muted")}>Illustrative model</span>
            </figcaption>
            <div className="overflow-x-auto px-2 sm:px-4">
              <table className="mt-4 w-full min-w-[32rem] text-left text-[0.9375rem]">
                <thead>
                  <tr className="border-b border-ink/8">
                    <th scope="col" className={cn(labelClass, "px-4 py-3 text-muted")}>
                      Before
                    </th>
                    <th scope="col" className={cn(labelClass, "px-4 py-3 text-brand-deep")}>
                      With {a.shortName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {a.valueModel.rows.map((r) => (
                    <tr key={r.before} className="border-b border-ink/6 last:border-0">
                      <td className="px-4 py-3.5 text-body">{r.before}</td>
                      <td className="px-4 py-3.5 font-semibold text-ink">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 pt-2 pb-6 text-sm text-muted sm:px-8">{a.valueModel.footnote}</p>
          </figure>
        </Reveal>
      )}
    </Section>
  );
}

export function Modules({ a }: { a: Associate }) {
  if (!a.modules?.length) return null;
  return (
    <Section id="modules" eyebrow="Modules" title={`${numberWords[a.modules.length] ?? a.modules.length} modules, one Associate`}>
      <ul className={cn("grid gap-5", a.modules.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {a.modules.map((mod, i) => (
          <li key={mod.title}>
            <Reveal className="h-full">
              <TiltCard>
                <GlassCard as="article" blur={false} className="h-full p-7">
                  <p className={cn(labelClass, "text-brand-deep")}>Module {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-2xl font-bold">{mod.title}</h3>
                  <p className="mt-3 leading-relaxed text-body">{mod.detail}</p>
                </GlassCard>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Capabilities({ a }: { a: Associate }) {
  return (
    <Section id="capabilities" eyebrow="Capabilities" title="Key capabilities" intro={`What ${a.shortName} can do for your team. Select a capability for detail.`}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {a.capabilities.map((c, i) => (
          <li key={c.title}>
            <Reveal className="h-full">
              <ExpandableCard
                eyebrow={String(i + 1).padStart(2, "0")}
                title={c.title}
                summary={c.detail}
                context={`${a.name} · ${a.role}`}
                cta={{ href: site.bookingUrl, label: `See ${a.shortName} in a walkthrough` }}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function UseCases({ a }: { a: Associate }) {
  return (
    <Section id="use-cases" eyebrow="In practice" title={`${a.shortName} at work`}>
      <ul className="grid gap-5 md:grid-cols-3">
        {a.useCases.map((u, i) => (
          <li key={u.title}>
            <Reveal className="h-full">
              <SpotlightCard as="article" contentClassName="p-7">
                <p className={cn(labelClass, "text-muted")}>Scenario {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl font-bold">{u.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{u.detail}</p>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Trust({ a }: { a: Associate }) {
  return (
    <Section id="trust" eyebrow="Built for trust" title="Asks before it assumes. Knows its limits.">
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal className="h-full">
          <GlassCard className="h-full p-7 sm:p-9">
            <h3 className="text-2xl font-bold">When {a.shortName} is unsure</h3>
            <ul className="mt-6 space-y-5">
              {a.uncertainty.map((u) => (
                <li key={u.title} className="panel ledger rounded-2xl p-5">
                  <h4 className={cn(labelClass, "text-brand-deep")}>{u.title}</h4>
                  <p className="mt-2.5 leading-relaxed text-ink">{u.detail}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
        <Reveal className="h-full">
          <div className="h-full rounded-card border border-ink/8 bg-white/45 p-7 sm:p-9">
            <h3 className="text-2xl font-bold">What {a.shortName} won&apos;t do</h3>
            <ul className="mt-6 divide-y divide-ink/8">
              {a.boundaries.map((b) => (
                <li key={b.title} className="flex gap-4 py-4 first:pt-0">
                  <Ban aria-hidden className="mt-1 size-4 shrink-0 text-muted" />
                  <div>
                    <h4 className="font-display font-bold text-ink">{b.title}</h4>
                    <p className="mt-1 leading-relaxed text-muted">{b.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Connect({ a }: { a: Associate }) {
  return (
    <Section
      id="connect"
      eyebrow="How it connects"
      title={`Connect ${a.shortName} to your systems`}
      intro="API-first and read-only by default. Most teams connect a system in about 3 minutes once credentials are ready, with no system changes and no IT project."
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-10">
          <div>
            <h3 className={cn(labelClass, "text-muted")}>Systems to connect</h3>
            <ul className="mt-4 space-y-2">
              {a.connect.systems.map((s) => (
                <li key={s} className="panel flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-ink">
                  <span aria-hidden className="size-1.5 rounded-full bg-teal" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={cn(labelClass, "text-muted")}>You configure</h3>
            <ul className="mt-4 space-y-2.5">
              {a.connect.configure.map((c) => (
                <li key={c} className="flex gap-2.5 text-body">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-teal-ink" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={cn(labelClass, "text-muted")}>Data protection</h3>
            <ul className="mt-4 space-y-2.5">
              {["Hosted on Microsoft Azure Australia, encrypted at rest and in transit", ...a.security].map((s) => (
                <li key={s} className="flex gap-2.5 text-body">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-teal-ink" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal>
          <GlassCard className="p-7 sm:p-9">
            <h3 className="text-2xl font-bold">Up and running in four steps</h3>
            <StepsTimeline steps={connectSteps} headingLevel="h4" variant="tinted" className="mt-7" />
            <p className="mt-8 rounded-xl bg-lavender/80 px-4 py-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">
              Stuck on scopes or ID mapping? Book a free 30-minute session and our product experts will onboard you end to end.{" "}
              <Link href={site.bookingUrl} className="font-semibold text-brand-deep underline-offset-4 hover:underline">
                {site.bookingLabel}
              </Link>
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

export function Fit({ a }: { a: Associate }) {
  const industryNames = industries.filter((i) => a.industries.includes(i.id)).map((i) => i.name);
  return (
    <Section id="who-its-for" eyebrow="Who it's for" title={`Who ${a.name} is for`}>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-card border border-ink/8 bg-white/45 p-7">
          <h3 className={cn(labelClass, "text-muted")}>Roles</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {a.personas.map((p) => (
              <li key={p} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink-soft ring-1 ring-ink/8">
                {p}
              </li>
            ))}
          </ul>
          <h3 className={cn(labelClass, "mt-8 text-muted")}>Industries</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {industryNames.map((n) => (
              <li key={n} className="rounded-full bg-lavender px-3 py-1.5 text-sm font-medium text-ink-soft">
                {n}
              </li>
            ))}
          </ul>
        </div>
        <GlassCard className="p-7 lg:col-span-2">
          <h3 className={cn(labelClass, "text-teal-ink")}>Ideal for</h3>
          <p className="mt-3 text-lg leading-relaxed text-ink">{a.fit.idealFor}</p>
          {a.fit.notIdealFor && (
            <>
              <h3 className={cn(labelClass, "mt-8 text-muted")}>Not the right fit</h3>
              <p className="mt-3 leading-relaxed text-body">{a.fit.notIdealFor}</p>
            </>
          )}
        </GlassCard>
      </div>
    </Section>
  );
}

export function AssociateFaq({ a }: { a: Associate }) {
  return (
    <Section id="faq" eyebrow="FAQ" title={`${a.name}: frequently asked questions`}>
      <div className="max-w-3xl">
        <Accordion items={a.faqs} />
      </div>
    </Section>
  );
}

export function Related({ a }: { a: Associate }) {
  const related = getRelated(a);
  const ordered = [...related, ...associates.filter((o) => o.slug !== a.slug && !a.related.includes(o.slug))];
  if (!ordered.length) return null;
  return (
    <Section id="related" eyebrow="Related AI Associates" title="Explore related AI Associates">
      <Carousel
        label="AI Associates"
        slides={ordered.map((r) => ({ id: r.slug, label: r.name, content: <AssociateCard associate={r} flat /> }))}
      />
      <Link
        href="/associates"
        className="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand-deep underline-offset-4 hover:underline"
      >
        See all AI Associates
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </Section>
  );
}
