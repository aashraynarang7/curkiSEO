import Link from "next/link";
import { associates } from "@/data/associates";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-ink/5 bg-white/60 py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label={`${site.name} home`} className="inline-block rounded-full">
              <Logo />
            </Link>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{site.oneLiner}</p>
            <p className="mt-4 text-sm text-muted">
              Built in {site.location}. Data hosted on Microsoft Azure Australia.
            </p>
          </div>

          <nav aria-label="AI Associates">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink">AI Associates</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {associates.map((a) => (
                <li key={a.slug}>
                  <Link href={`/associates/${a.slug}`} className="text-body hover:text-brand-deep">
                    {a.name} <span className="text-muted">· {a.role}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              <li><Link href="/associates" className="text-body hover:text-brand-deep">All AI Associates</Link></li>
              <li><Link href="/#how-it-works" className="text-body hover:text-brand-deep">How it works</Link></li>
              <li><Link href="/#who-its-for" className="text-body hover:text-brand-deep">Who it&apos;s for</Link></li>
              <li><Link href="/#faq" className="text-body hover:text-brand-deep">FAQ</Link></li>
              <li><Link href={site.bookingUrl} className="text-body hover:text-brand-deep">{site.bookingLabel}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/5 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          {/* TODO: add Privacy Policy and Terms links once those pages exist. */}
        </div>
      </Container>
    </footer>
  );
}
