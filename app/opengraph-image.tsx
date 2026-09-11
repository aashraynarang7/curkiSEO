import { homeCopy } from "@/data/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Curki AI: AI Associates that turn operational chaos into clarity in minutes";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "AI Associates · Built in Sydney",
    title: "Turn operational chaos into clarity in minutes",
    subtitle: homeCopy.associates.intro,
  });
}
