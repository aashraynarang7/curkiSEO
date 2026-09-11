import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "onDark";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-deep text-white shadow-[0_10px_24px_-12px_rgb(91_54_225/0.8),inset_0_1px_0_rgb(255_255_255/0.2)] hover:bg-[#4d2bcc]",
  secondary: "bg-white/80 text-ink ring-1 ring-ink/10 hover:bg-white hover:ring-ink/20",
  onDark: "bg-white text-ink hover:bg-lavender",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

/** Shared button styling, also used by MagneticButton. */
export function buttonClassName({ variant = "primary", size = "md" }: { variant?: ButtonVariant; size?: ButtonSize }) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-300",
    variants[variant],
    sizes[size],
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", arrow = false, className }: ButtonLinkProps) {
  const classes = cn(buttonClassName({ variant, size }), className);
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
