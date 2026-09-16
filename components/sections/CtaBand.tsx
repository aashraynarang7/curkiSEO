import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { cta, site } from "@/data/site";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { BackgroundArt } from "@/components/ui/BackgroundArt";
import { Container } from "@/components/ui/Container";

export function CtaBand({ title = cta.title, body = cta.body }: { title?: string; body?: string }) {
  return (
    <section id="book-a-walkthrough" aria-labelledby="cta-heading" className="relative isolate py-20 sm:py-28">
      <BackgroundArt variant="cta" />
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-night px-6 py-14 sm:px-12 sm:py-20">
          <div aria-hidden className="orb orb-drift -top-44 -right-28 size-[38rem]" style={{ "--orb": "rgb(101 72 255 / 0.55)" } as CSSProperties} />
          <div aria-hidden className="orb orb-drift-slow -bottom-52 -left-28 size-[30rem]" style={{ "--orb": "rgb(32 186 158 / 0.28)" } as CSSProperties} />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 id="cta-heading" className="text-3xl leading-[1.1] font-bold text-white sm:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{body}</p>
              <div className="mt-9">
                {/* TODO: point site.bookingUrl at the real booking calendar. */}
                <MagneticButton href={site.bookingUrl} variant="onDark" size="lg" arrow>
                  {site.bookingLabel}
                </MagneticButton>
              </div>
            </div>
            <ul className="glass-dark space-y-4 rounded-card p-6 sm:p-7">
              {cta.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10">
                    <Check aria-hidden className="size-4 text-teal" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
