import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import logo from "@/associates/curki_logo.png";
import { associates } from "@/data/associates";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { MobileNav, type NavLink } from "./MobileNav";

const links: NavLink[] = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#who-its-for", label: "Who it's for" },
  { href: "/#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Image src={logo} alt="" width={30} height={26} className="h-[26px] w-auto" />
      <span className="font-display text-lg font-extrabold tracking-tight text-ink">
        Curki<span className="text-brand-deep">.AI</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const associateLinks: NavLink[] = associates.map((a) => ({
    href: `/associates/${a.slug}`,
    label: a.name,
    detail: a.role,
  }));

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass relative mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 sm:pl-5">
        <Link href="/" aria-label={`${site.name} home`} className="rounded-full">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm font-medium text-ink-soft">
            <li className="group relative">
              <Link
                href="/associates"
                className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 transition-colors hover:bg-white/70 hover:text-ink"
              >
                AI Associates
                <ChevronDown aria-hidden className="size-3.5 transition-transform group-hover:rotate-180 reduced:transition-none" />
              </Link>
              <div className="invisible absolute top-full left-1/2 w-[22rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="panel rounded-3xl p-2 shadow-2xl shadow-brand-night/15">
                  {associates.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/associates/${a.slug}`}
                        className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-lavender"
                      >
                        <Image
                          src={a.image.src}
                          alt=""
                          width={40}
                          height={40}
                          sizes="40px"
                          className="size-10 rounded-full object-cover"
                        />
                        <span className="flex flex-col">
                          <span className="font-semibold text-ink">{a.name}</span>
                          <span className="text-[0.8125rem] text-muted">{a.role}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-full px-3.5 py-2 transition-colors hover:bg-white/70 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapper handles visibility: the button sets inline-flex, which would override `hidden`. */}
          <div className="hidden sm:block">
            <MagneticButton href={site.bookingUrl} size="sm">
              {site.bookingLabel}
            </MagneticButton>
          </div>
          <MobileNav
            associates={associateLinks}
            links={[{ href: "/associates", label: "All AI Associates" }, ...links]}
            cta={{ href: site.bookingUrl, label: site.bookingLabel }}
          />
        </div>
      </div>
    </header>
  );
}
