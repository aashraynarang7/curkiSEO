"use client";

import { useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { ReducedMotionScope } from "@/components/motion/ReducedMotion";
import { CursorGlow } from "@/components/interactive/CursorGlow";
import { Container } from "@/components/ui/Container";

/** Toolbar with a reduced-motion switch that applies to every demo inside. */
export function PreviewShell({ children }: { children: ReactNode }) {
  const [reduce, setReduce] = useState(false);

  return (
    <>
      <div className="sticky top-[5.25rem] z-40">
        <Container>
          <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-3">
            <p className="text-sm text-body" aria-live="polite">
              <strong className="text-ink">Motion:</strong> {reduce ? "reduced (simulated)" : "full"}
              <span className="hidden text-muted sm:inline"> · Your OS reduced-motion setting always takes priority.</span>
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={reduce}
              onClick={() => setReduce((v) => !v)}
              className="inline-flex items-center gap-3 rounded-full text-sm font-semibold text-ink"
            >
              Simulate reduced motion
              <span aria-hidden className={cn("relative h-6 w-11 rounded-full transition-colors", reduce ? "bg-brand-deep" : "bg-ink/20")}>
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300",
                    reduce && "translate-x-5",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </div>
      <ReducedMotionScope reduce={reduce}>
        <CursorGlow />
        {children}
      </ReducedMotionScope>
    </>
  );
}

/** Remounts its children so entrance animations can be replayed. */
export function ReplayBox({ children, label = "Replay" }: { children: ReactNode; label?: string }) {
  const [key, setKey] = useState(0);
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 hover:bg-white"
        >
          <RotateCcw aria-hidden className="size-4" />
          {label}
        </button>
      </div>
      <div key={key}>{children}</div>
    </div>
  );
}
