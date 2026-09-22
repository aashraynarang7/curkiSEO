import { cloudinaryVideo, type CloudinaryVideoOptions } from "@/lib/cloudinary";

/**
 * A video hosted on Cloudinary, rendered as a plain `<video>` with a poster frame.
 *
 * Click to play, never autoplay: the motion rules keep ambient video off this site, and an
 * autoplaying 1080p demo would also compete with the LCP element for bandwidth. `preload="none"`
 * means the poster is the only thing fetched until someone presses play, so a video below the
 * fold costs one small image.
 *
 * `width` and `height` are the video's intrinsic pixel dimensions (1920×1080 for the module
 * recordings). They set the aspect ratio so the box is reserved before the poster decodes; the
 * CSS below makes the element fluid inside that ratio, so there is no CLS at any width.
 *
 * If a section ever genuinely needs an ambient or scroll-driven clip, that belongs in
 * `components/interactive/` with an entry on `/components-preview`, not here.
 */
type CloudinaryVideoProps = {
  /** Public ID in Cloudinary, e.g. "HR_module_Alex". Folders are part of the ID: "modules/alex". */
  publicId: string;
  /** What the video shows. Announced to screen readers and shown if the poster fails to load. */
  label: string;
  /** Intrinsic dimensions of the source video, used to reserve the box. */
  width: number;
  height: number;
  /** WebVTT captions in `public/`. Strongly preferred for any video carrying spoken content. */
  captionsSrc?: string;
  className?: string;
} & CloudinaryVideoOptions;

export function CloudinaryVideo({
  publicId,
  label,
  width,
  height,
  captionsSrc,
  className,
  ...deliveryOptions
}: CloudinaryVideoProps) {
  const { sources, poster } = cloudinaryVideo(publicId, deliveryOptions);

  return (
    <video
      controls
      playsInline
      preload="none"
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      className={className}
      style={{ aspectRatio: `${width} / ${height}`, width: "100%", height: "auto" }}
    >
      {sources.map((source) => (
        <source key={source.type} src={source.src} type={source.type} />
      ))}
      {captionsSrc ? (
        <track kind="captions" src={captionsSrc} srcLang="en-AU" label="English (Australia)" default />
      ) : null}
      {label}
    </video>
  );
}
