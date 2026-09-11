import { associates, getAssociate } from "@/data/associates";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Curki AI Associate";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return associates.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAssociate(slug);
  if (!a) {
    return renderOgImage({ eyebrow: "Curki AI", title: "AI Associates", subtitle: "Turn operational chaos into clarity in minutes." });
  }
  return renderOgImage({
    eyebrow: `${a.role} · ${a.domain}`,
    title: a.name,
    subtitle: a.tagline,
    portrait: `${a.shortName.toLowerCase()}.jpeg`,
  });
}
