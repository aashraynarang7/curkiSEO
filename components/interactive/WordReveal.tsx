import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

type WordRevealProps = {
  text: string;
  /** Offset for the stagger when several WordReveals share one heading. */
  startIndex?: number;
  className?: string;
};

// CSS-only word-by-word reveal (no JavaScript, so it never waits on hydration).
// Words start at 0.01 opacity, not 0, so the heading still counts as painted for LCP.
// The full sentence stays as plain text in the HTML. Parent needs the `word-reveal` class.
export function WordReveal({ text, startIndex = 0, className }: WordRevealProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className={cn("word", className)} style={{ "--i": startIndex + i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function wordCount(text: string): number {
  return text.split(" ").length;
}
