"use client";

import { useEffect, useState, type ReactNode } from "react";
import * as m from "motion/react-m";
import { duration, ease } from "@/lib/motion";

// True once the app has hydrated. The first page load never animates (protects LCP and
// keeps server HTML fully visible); later client-side route changes fade and slide in.
let hasHydrated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animateIn] = useState(() => typeof window !== "undefined" && hasHydrated);

  useEffect(() => {
    hasHydrated = true;
  }, []);

  return (
    <m.div
      initial={animateIn ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: ease.calm }}
    >
      {children}
    </m.div>
  );
}
