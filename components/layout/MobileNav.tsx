"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

export type NavLink = { href: string; label: string; detail?: string };

export function MobileNav({
  associates,
  links,
  cta,
}: {
  associates: NavLink[];
  links: NavLink[];
  cta: NavLink;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full text-ink ring-1 ring-ink/10 bg-white/70"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="panel absolute inset-x-3 top-full mt-2 max-h-[80vh] overflow-y-auto rounded-3xl bg-white p-3 shadow-2xl shadow-brand-night/15"
      >
        <nav aria-label="Mobile">
          <p className="px-3 pt-2 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">AI Associates</p>
          <ul>
            {associates.map((a) => (
              <li key={a.href}>
                <Link href={a.href} onClick={close} className="flex flex-col rounded-2xl px-3 py-2.5 hover:bg-lavender">
                  <span className="font-semibold text-ink">{a.label}</span>
                  {a.detail && <span className="text-sm text-muted">{a.detail}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-2 border-t border-ink/5 pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="block rounded-2xl px-3 py-2.5 font-medium text-ink hover:bg-lavender">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cta.href}
            onClick={close}
            className="mt-3 flex h-12 items-center justify-center rounded-full bg-brand-deep font-semibold text-white"
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
