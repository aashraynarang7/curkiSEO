import { associatesIndexCopy } from "@/data/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Curki AI Associates for finance, documentation, HR, rostering and compliance";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Curki AI Associates",
    title: "Oliver, Zoe, Alex, Will and James",
    subtitle: associatesIndexCopy.intro,
  });
}
