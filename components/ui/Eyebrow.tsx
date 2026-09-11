import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className, tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em]",
        tone === "light" ? "text-brand-deep" : "text-[#c9bcff]",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-teal" />
      {children}
    </p>
  );
}
