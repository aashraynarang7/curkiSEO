import Image from "next/image";
import Link from "next/link";
import { getAssociate } from "@/data/associates";

export function AssociateChip({ slug }: { slug: string }) {
  const a = getAssociate(slug);
  if (!a) return null;
  return (
    <Link
      href={`/associates/${a.slug}`}
      className="inline-flex items-center gap-2 rounded-full bg-white/90 py-1 pr-3 pl-1 text-sm font-medium text-ink-soft ring-1 ring-ink/8 transition-colors hover:text-brand-deep hover:ring-brand/30"
    >
      <Image src={a.image.src} alt="" width={24} height={24} sizes="24px" className="size-6 rounded-full object-cover" />
      {a.name}
    </Link>
  );
}
