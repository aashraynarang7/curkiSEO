import { cn } from "@/lib/cn";

/**
 * Blue "live recording" pulse: concentric rings radiating outward from behind the portrait,
 * over a slow breathing glow.
 *
 * Purely decorative, so it is hidden from assistive tech. Transform and opacity only, on plain
 * elements that never carry `backdrop-filter`, so it composites on the GPU and costs nothing to
 * animate. Under `prefers-reduced-motion` the blanket `animation: none` rule in globals.css stops
 * every ring — they rest at opacity 0 and only the static glow remains, which is the intended
 * still state rather than a frozen mid-animation frame.
 *
 * The parent must be positioned.
 */
export function RecordingPulse({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pulse", className)}>
      {/* A centred square keeps the rings perfect circles whatever shape the parent is. */}
      <span className="pulse-core">
        <span className="pulse-glow" />
        {/* Evenly offset so a new ring leaves as the previous one fades. */}
        <span className="pulse-ring" />
        <span className="pulse-ring pulse-ring-2" />
        <span className="pulse-ring pulse-ring-3" />
        <span className="pulse-ring pulse-ring-4" />
      </span>
    </span>
  );
}
