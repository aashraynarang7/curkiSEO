"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Scroll reveal for below-the-fold content. Never wrap the H1 or hero (protects LCP).
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}
