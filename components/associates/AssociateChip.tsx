import Image from "next/image";
import Link from "next/link";
import { getAssociate } from "@/data/associates";

export function AssociateChip({ slug }: { slug: string }) {
  const a = getAssociate(slug);
  if (!a) return null;
  return (
    <Link
      href={`/associates/${a.slug}`}
      className="relative z-[2] inline-flex items-center gap-2 rounded-full bg-white/90 py-1 pr-3 pl-1 text-sm font-medium text-ink-soft ring-1 ring-ink/8 transition-colors hover:text-brand-deep hover:ring-brand/30"
    >
      <Image src={a.image.src} alt="" width={24} height={24} sizes="24px" className="size-6 rounded-full object-cover" />
      {a.name}
    </Link>
  );
}

/** Larger associate link used inside tab panels. */
export function AssociateRow({ slug, detail = "role" }: { slug: string; detail?: "role" | "tagline" }) {
  const a = getAssociate(slug);
  if (!a) return null;
  return (
    <Link
      href={`/associates/${a.slug}`}
      className="panel group flex h-full items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-white"
    >
      <Image
        src={a.image.src}
        alt={a.image.alt}
        width={48}
        height={48}
        sizes="48px"
        className="size-12 shrink-0 rounded-xl object-cover"
      />
      <span className="min-w-0">
        <span className="block font-display font-bold text-ink group-hover:text-brand-deep">{a.name}</span>
        <span className="block text-sm leading-snug text-muted">{detail === "tagline" ? a.tagline : a.role}</span>
      </span>
    </Link>
  );
}
