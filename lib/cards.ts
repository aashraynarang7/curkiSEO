import type { Associate } from "@/data/associates";
import type { FlipCardData } from "@/components/interactive/FlipCard";

/** Minimal card props, so client components don't receive the full associate copy. */
export function toFlipCard(a: Associate): FlipCardData {
  return {
    slug: a.slug,
    name: a.name,
    shortName: a.shortName,
    role: a.role,
    tagline: a.tagline,
    icon: a.icon,
    image: a.image.src,
    imageAlt: a.image.alt,
    outcomes: a.cardOutcomes,
  };
}
