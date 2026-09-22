import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Everything public is crawlable, including AI search crawlers (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended), so the Associates can be cited in AI answers.
// Non-public pages (/components-preview, 404) opt out with a noindex meta instead of a
// Disallow, so crawlers can still see the noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
