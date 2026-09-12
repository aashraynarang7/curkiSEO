/**
 * Pre-optimised illustration from `public/images/associates/`.
 *
 * These files are already encoded to AVIF and WebP at 1x and 2x by the imagery build step,
 * so they're served as a plain `<picture>` rather than through `next/image`: no second
 * round of re-encoding, and the exact bytes we measured are the bytes that ship.
 * `width`/`height` are always set so the box is reserved before the image decodes (no CLS).
 */
type ArtImageProps = {
  /** File stem in `public/images/associates/`, e.g. "will-rostering". */
  name: string;
  /** Descriptive alt text. Pass "" only for purely decorative art. */
  alt: string;
  width: number;
  height: number;
  /** Above the fold: load eagerly and decode in the critical path. */
  eager?: boolean;
  /** Opt this image into GsapStage's slow vertical float. */
  float?: boolean;
  className?: string;
};

const base = "/images/associates";

export function ArtImage({ name, alt, width, height, eager = false, float = false, className }: ArtImageProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}/${name}.avif 1x, ${base}/${name}@2x.avif 2x`} />
      <source type="image/webp" srcSet={`${base}/${name}.webp 1x, ${base}/${name}@2x.webp 2x`} />
      <img
        src={`${base}/${name}.webp`}
        data-gsap-float={float ? "" : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
