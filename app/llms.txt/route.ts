import { associates } from "@/data/associates";
import { homeFaqs, site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

// llms.txt (https://llmstxt.org): a plain-Markdown map of the site for AI search engines and
// assistants. Generated from the same data as the pages, so it can never drift from the copy.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Based in ${site.location}. ${site.oneLiner}`,
    "",
    "## AI Associates",
    "",
    ...associates.map((a) => `- [${a.name}: ${a.role}](${absoluteUrl(`/associates/${a.slug}`)}): ${a.summary}`),
    "",
    ...associates.flatMap((a) => [
      `### ${a.name}`,
      "",
      ...a.capabilities.map((c) => `- ${c.title}: ${c.detail}`),
      "",
      `What ${a.shortName} won't do:`,
      "",
      ...a.boundaries.map((b) => `- ${b.title}: ${b.detail}`),
      "",
    ]),
    "## FAQ",
    "",
    ...homeFaqs.flatMap((f) => [`- ${f.question}`, `  ${f.answer}`]),
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")})`,
    `- [All AI Associates](${absoluteUrl("/associates")})`,
    ...site.sameAs.map((url) => `- [${new URL(url).hostname.replace("www.", "")}](${url})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
