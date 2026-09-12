import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Scroll reveal for below-the-fold content. Marks the element for `GsapStage`, which batches
 * everything currently entering the viewport into one staggered tween.
 *
 * Deliberately a server component with no hidden initial state: the server HTML is fully
 * visible, and GSAP only hides it in a layout effect (before paint) when the visitor has not
 * asked for reduced motion. Never wrap the H1 or hero with this — that is the hero's own tween.
 */
export function Reveal({ children, className }: RevealProps) {
  return (
    <div data-gsap-reveal className={className}>
      {children}
    </div>
  );
}
