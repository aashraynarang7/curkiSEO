import type { MetadataRoute } from "next";
import { associates } from "@/data/associates";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.contentUpdated);
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/associates"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...associates.map((a) => ({
      url: absoluteUrl(`/associates/${a.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
