import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: string[];
  label: string;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
};

// CSS-only infinite marquee. The first copy of the items is read by assistive tech;
// repeats are aria-hidden. Pauses on hover; becomes a static wrapped list with reduced motion.
export function Marquee({ items, label, duration = 45, className }: MarqueeProps) {
  const looped = [...items, ...items];
  const group = (copy: number) => (
    <ul className="marquee-group" aria-hidden={copy > 0 || undefined} data-duplicate={copy > 0 || undefined}>
      {looped.map((item, i) => {
        const repeat = copy > 0 || i >= items.length;
        return (
          <li key={`${copy}-${i}`} aria-hidden={(copy === 0 && repeat) || undefined} data-duplicate={repeat || undefined} className="marquee-item">
            <span aria-hidden className="size-1.5 rounded-full bg-teal" />
            {item}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      className={cn("marquee", className)}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track">
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
