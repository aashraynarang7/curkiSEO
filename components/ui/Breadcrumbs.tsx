import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/cn";

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", dark ? "text-white/70" : "text-muted")}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
              {last ? (
                <span aria-current="page" className={cn("font-medium", dark ? "text-white" : "text-ink")}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className={dark ? "hover:text-white" : "hover:text-brand-deep"}>
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
