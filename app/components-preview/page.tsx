import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { associates } from "@/data/associates";
import { connectSteps, homeCopy, homeFaqs, industries, problemPillars, securityPoints, site } from "@/data/site";
import { toFlipCard } from "@/lib/cards";
import { AssociateCard } from "@/components/associates/AssociateCard";
import { AssociateChip } from "@/components/associates/AssociateChip";
import { EvidencePanel } from "@/components/home/EvidencePanel";
import { IndustryTabs, PersonaTabs, StatStrip } from "@/components/home/HomeSections";
import { Accordion } from "@/components/interactive/Accordion";
import { Carousel } from "@/components/interactive/Carousel";
import { ExpandableCard } from "@/components/interactive/ExpandableCard";
import { FlipCard } from "@/components/interactive/FlipCard";
import { HoverRevealCard } from "@/components/interactive/HoverRevealCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { Marquee } from "@/components/interactive/Marquee";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { StackedCards } from "@/components/interactive/StackedCards";
import { StepsTimeline } from "@/components/interactive/StepsTimeline";
import { TiltCard } from "@/components/interactive/TiltCard";
import { WordReveal, wordCount } from "@/components/interactive/WordReveal";
import { PreviewShell, ReplayBox } from "@/components/preview/PreviewShell";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Components preview",
  description: "Internal preview of the Curki AI interactive component library, with a reduced-motion toggle.",
  robots: { index: false, follow: false },
};

const sections = [
  ["flip", "FlipCard"],
  ["tilt", "TiltCard"],
  ["spotlight", "SpotlightCard"],
  ["expandable", "ExpandableCard"],
  ["stacked", "StackedCards"],
  ["hover-reveal", "HoverRevealCard"],
  ["magnetic", "MagneticButton"],
  ["carousel", "Carousel"],
  ["hero", "Hero: word reveal, orbs, parallax"],
  ["reveal", "Scroll reveals"],
  ["counters", "Animated counters"],
  ["timeline", "SVG line drawing"],
  ["marquee", "Infinite marquee"],
  ["tabs", "Interactive tabs"],
  ["accordion", "Animated accordion"],
  ["page-level", "Scroll progress, page transitions, cursor glow"],
] as const;

function PreviewSection({ id, title, notes, children }: { id: string; title: string; notes: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-ink/8 py-16">
      <Container>
        <div className="mb-8 max-w-3xl">
          <h2 id={`${id}-heading`} className="text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 leading-relaxed text-muted">{notes}</p>
        </div>
        {children}
      </Container>
    </section>
  );
}

export default function ComponentsPreviewPage() {
  const cards = associates.map(toFlipCard);
  const oliver = associates[0];
  const { hero } = homeCopy;

  return (
    <>
      <ScrollProgress />

      <section className="pt-10 pb-8">
        <Container>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Components preview</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Every interactive component in the Curki AI design system. Use the switch to simulate reduced motion and check each
            fallback. Test keyboard use with Tab, Enter, Space, arrow keys and Esc.
          </p>
          <nav aria-label="Components" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-block rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-ink-soft ring-1 ring-ink/8 hover:text-brand-deep">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <PreviewShell>
        <PreviewSection
          id="flip"
          title="FlipCard"
          notes="Mouse: hover flips. Touch: tap toggles, tap the back to return. Keyboard: focus flips, Enter/Space toggles (aria-pressed), Esc returns to the front. Reduced motion: faces cross-fade instead of rotating. Both faces are in the HTML."
        >
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.slice(0, 3).map((c) => (
              <li key={c.slug}>
                <FlipCard data={c} />
              </li>
            ))}
          </ul>
        </PreviewSection>

        <PreviewSection id="tilt" title="TiltCard" notes="Tilts up to 8° toward the cursor with a moving glare. Mouse only; static on touch and with reduced motion.">
          <ul className="grid gap-5 md:grid-cols-3">
            {oliver.modules?.map((mod) => (
              <li key={mod.title}>
                <TiltCard>
                  <GlassCard as="article" blur={false} className="h-full p-7">
                    <h3 className="text-xl font-bold">{mod.title}</h3>
                    <p className="mt-3 leading-relaxed text-body">{mod.detail}</p>
                  </GlassCard>
                </TiltCard>
              </li>
            ))}
          </ul>
        </PreviewSection>

        <PreviewSection id="spotlight" title="SpotlightCard" notes="A soft glow follows the cursor and lights the glass border. Mouse only; plain glass card on touch and with reduced motion.">
          <ul className="grid gap-5 md:grid-cols-3">
            {oliver.useCases.map((u) => (
              <li key={u.title}>
                <SpotlightCard as="article" contentClassName="p-7">
                  <h3 className="text-xl font-bold">{u.title}</h3>
                  <p className="mt-3 leading-relaxed text-body">{u.detail}</p>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </PreviewSection>

        <PreviewSection
          id="expandable"
          title="ExpandableCard"
          notes="Click, Enter or Space opens a modal with a shared layout animation. Focus moves into the dialog and is trapped; Esc, the close button or the backdrop closes it and focus returns. Reduced motion: no morph, simple fade."
        >
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {oliver.capabilities.slice(0, 3).map((c, i) => (
              <li key={c.title}>
                <ExpandableCard
                  eyebrow={String(i + 1).padStart(2, "0")}
                  title={c.title}
                  summary={c.detail}
                  context={`${oliver.name} · ${oliver.role}`}
                  cta={{ href: `/${site.bookingUrl}`, label: `See ${oliver.shortName} in a walkthrough` }}
                />
              </li>
            ))}
          </ul>
        </PreviewSection>

        <PreviewSection id="stacked" title="StackedCards" notes="The deck fans out when scrolled into view. Hover or focus a card to lift it to the front. Reduced motion: final positions without movement.">
          <StackedCards cards={cards} label="AI Associates deck" className="mx-auto max-w-3xl" />
        </PreviewSection>

        <PreviewSection
          id="hover-reveal"
          title="HoverRevealCard"
          notes="Details slide up on hover or keyboard focus. Touch users tap +. Esc closes. Reduced motion: details fade in without sliding."
        >
          <ul className="grid gap-5 lg:grid-cols-3">
            {problemPillars.map((p, i) => (
              <li key={p.id}>
                <HoverRevealCard eyebrow={String(i + 1).padStart(2, "0")} title={p.title} summary={p.statement} toggleLabel="Show details">
                  <p className="leading-relaxed text-body">{p.detail}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.associates.map((slug) => (
                      <li key={slug}>
                        <AssociateChip slug={slug} />
                      </li>
                    ))}
                  </ul>
                </HoverRevealCard>
              </li>
            ))}
          </ul>
        </PreviewSection>

        <PreviewSection id="magnetic" title="MagneticButton" notes="Gently pulled toward the cursor (max 8px) with a ripple on press. No pull on touch or with reduced motion; the ripple becomes a fade.">
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#magnetic" size="lg" arrow>
              {site.bookingLabel}
            </MagneticButton>
            <MagneticButton href="#magnetic" size="lg" variant="secondary">
              Meet the AI Associates
            </MagneticButton>
            <div className="rounded-3xl bg-night p-5">
              <MagneticButton href="#magnetic" size="lg" variant="onDark" arrow>
                {site.bookingLabel}
              </MagneticButton>
            </div>
          </div>
        </PreviewSection>

        <PreviewSection
          id="carousel"
          title="Carousel"
          notes="Drag or swipe with momentum and snap. Focus the carousel and use the arrow keys, or the buttons. Tabbing to a card scrolls it into view. Reduced motion: instant snapping."
        >
          <Carousel label="AI Associates" slides={associates.map((a) => ({ id: a.slug, label: a.name, content: <AssociateCard associate={a} flat /> }))} />
        </PreviewSection>

        <PreviewSection
          id="hero"
          title="Hero: word reveal, drifting orbs, floating parallax cards"
          notes="Word-by-word CSS reveal (starts at 0.01 opacity so it doesn't delay LCP). Orbs drift slowly; the panel and floating cards move with the mouse at different depths. Reduced motion: static."
        >
          <ReplayBox label="Replay reveal">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <h3 className="word-reveal text-4xl leading-[1.05] font-extrabold sm:text-5xl">
                <WordReveal text={hero.titleLead} /> <WordReveal text={hero.titleAccent} startIndex={wordCount(hero.titleLead)} className="text-gradient" />
              </h3>
              <EvidencePanel />
            </div>
          </ReplayBox>
        </PreviewSection>

        <PreviewSection id="reveal" title="Scroll reveals" notes="Fade and slide in with a staggered delay as they enter the viewport. Reduced motion: fade only.">
          <ReplayBox>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {securityPoints.map((p) => (
                <li key={p.title}>
                  <Reveal className="h-full">
                    <GlassCard className="h-full p-6">
                      <h3 className="font-display font-bold text-ink">{p.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{p.detail}</p>
                    </GlassCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </ReplayBox>
        </PreviewSection>

        <PreviewSection
          id="counters"
          title="Animated counters"
          notes="Site figures from the audience file count up when visible. The final values are in the HTML and their width is reserved, so nothing shifts. Reduced motion: final values only."
        >
          <ReplayBox>
            <StatStrip alwaysAnimate />
          </ReplayBox>
        </PreviewSection>

        <PreviewSection id="timeline" title="SVG line drawing" notes="The connecting line draws itself as the steps scroll through the viewport. Reduced motion: fully drawn.">
          <div className="max-w-xl">
            <StepsTimeline steps={connectSteps} />
          </div>
        </PreviewSection>

        <PreviewSection id="marquee" title="Infinite marquee" notes="Scrolls slowly and pauses on hover. Repeats are hidden from screen readers. Reduced motion: a static, wrapped list.">
          <Marquee items={industries.map((i) => i.name)} label="Industries we serve" />
        </PreviewSection>

        <PreviewSection
          id="tabs"
          title="Interactive tabs"
          notes="The active indicator slides between tabs and panels cross-fade. Arrow keys, Home and End move between tabs. All panels are in the HTML; inactive ones are inert."
        >
          <div className="space-y-12">
            <PersonaTabs />
            <IndustryTabs />
          </div>
        </PreviewSection>

        <PreviewSection id="accordion" title="Animated accordion" notes="Smooth height with a rotating icon. Answers are always in the HTML; closed panels are inert. Reduced motion: instant open, content fades.">
          <div className="max-w-3xl">
            <Accordion items={homeFaqs.slice(0, 4)} />
          </div>
        </PreviewSection>

        <PreviewSection
          id="page-level"
          title="Scroll progress, page transitions, cursor glow"
          notes="The bar at the top of this page tracks scroll progress (also on associate pages). Client-side route changes fade and slide in; the first load never animates. The soft cursor glow is enabled on this page only and accompanies the native cursor."
        >
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-white/85 px-4 py-2 font-semibold text-ink ring-1 ring-ink/10 hover:bg-white">
              Go to home (page transition)
            </Link>
            <Link href="/associates/oliver-finance" className="rounded-full bg-white/85 px-4 py-2 font-semibold text-ink ring-1 ring-ink/10 hover:bg-white">
              Go to Oliver AI (scroll progress)
            </Link>
          </div>
        </PreviewSection>
      </PreviewShell>
    </>
  );
}
