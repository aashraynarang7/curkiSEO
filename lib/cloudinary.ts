/**
 * Cloudinary delivery URLs.
 *
 * Delivery is unauthenticated — it needs nothing but the cloud name, which is public because it
 * sits in every URL. The API key and secret in `.env.local` are for the Admin and Upload APIs
 * (pushing assets up, listing them) and must never reach a client component.
 *
 * Nothing here is routed through `next/image` or Next's video handling: Cloudinary already
 * re-encodes, caches and serves from its own CDN, so a second pass through `/_next/image` would
 * re-optimise bytes that are already optimal. This is the same reasoning as `ArtImage`, which
 * serves the pre-encoded files in `public/` as a plain `<picture>`.
 */

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const BASE = "https://res.cloudinary.com";

/**
 * Cloudinary treats `/` in a public ID as a folder separator and must see it unescaped, so each
 * segment is encoded on its own. Without this, an ID like `modules/alex hr` breaks the URL.
 */
function encodePublicId(publicId: string): string {
  return publicId.split("/").map(encodeURIComponent).join("/");
}

function buildUrl(resourceType: "image" | "video", transform: string, publicId: string, format: string, version?: number): string {
  if (!cloudName) {
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  // A version segment makes the URL immutable, so the CDN and the browser can cache it forever.
  // Without one Cloudinary still resolves the latest asset, just with a shorter cache life.
  const versionSegment = version ? `v${version}/` : "";
  return `${BASE}/${cloudName}/${resourceType}/upload/${transform}/${versionSegment}${encodePublicId(publicId)}.${format}`;
}

export type CloudinaryVideoOptions = {
  /** Cap the delivered width; the aspect ratio is preserved and a smaller source is never upscaled. */
  width?: number;
  /** Asset version from the Cloudinary dashboard. Supply it to get immutable, long-cached URLs. */
  version?: number;
  /** Second to grab the poster frame from. Defaults to the first frame. */
  posterSecond?: number;
};

export type CloudinaryVideoSource = {
  src: string;
  /** Goes straight into `<source type>`, so the browser can skip formats it can't play. */
  type: string;
};

/**
 * Sources and a poster frame for one uploaded video.
 *
 * Two explicit formats rather than `f_auto`: for video, `f_auto` depends on user-agent sniffing,
 * whereas `<source>` elements let the browser pick from what it actually supports. VP9/WebM comes
 * first because it is materially smaller; H.264/MP4 is the universal fallback (Safari included).
 *
 * The poster is a still frame from the video itself, delivered as an image, so the section paints
 * something meaningful before anyone presses play — and before a single video byte is fetched.
 */
export function cloudinaryVideo(publicId: string, options: CloudinaryVideoOptions = {}) {
  const { width = 1600, version, posterSecond = 0 } = options;

  // `q_auto` picks a quality per format; `c_limit` only ever shrinks, never upscales a small source.
  const transform = `q_auto,c_limit,w_${width}`;

  const sources: CloudinaryVideoSource[] = [
    { src: buildUrl("video", `${transform},vc_vp9`, publicId, "webm", version), type: "video/webm" },
    { src: buildUrl("video", `${transform},vc_auto`, publicId, "mp4", version), type: "video/mp4" },
  ];

  return {
    sources,
    // `so_` is the seek offset. The frame is delivered through the image pipeline, so `f_auto`
    // is reliable here and yields AVIF or WebP where the browser supports it.
    poster: buildUrl("video", `so_${posterSecond},f_auto,q_auto,c_limit,w_${width}`, publicId, "jpg", version),
  };
}

export type CloudinaryImageOptions = {
  width?: number;
  version?: number;
};

/** A single delivery URL for an uploaded image, in the best format the requesting browser accepts. */
export function cloudinaryImage(publicId: string, options: CloudinaryImageOptions = {}): string {
  const { width = 1600, version } = options;
  return buildUrl("image", `f_auto,q_auto,c_limit,w_${width}`, publicId, "jpg", version);
}
