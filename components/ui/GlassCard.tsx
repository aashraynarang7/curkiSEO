import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "li" | "figure" | "aside";
  /** Backdrop blur. Turn off inside 3D transforms (flip faces) or when nesting glass. */
  blur?: boolean;
  /** Adds the calm hover lift. */
  lift?: boolean;
  children?: ReactNode;
};

/** Base surface for every card in the design system. */
export function GlassCard({ as: Tag = "div", blur = true, lift = false, className, children, ...rest }: GlassCardProps) {
  return (
    <Tag className={cn(blur ? "glass" : "glass-flat", "rounded-card", lift && "lift", className)} {...rest}>
      {children}
    </Tag>
  );
}
