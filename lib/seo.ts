import type { Metadata } from "next";
import type { Associate } from "@/data/associates";
import type { Faq } from "@/data/site";
import { site } from "@/data/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({ title, description, path, keywords }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ---------- JSON-LD ----------

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/curki-logo.png"),
    description: site.description,
    areaServed: { "@type": "Country", name: "Australia" },
    address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
    ...(site.contactEmail ? { email: site.contactEmail } : {}),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.language,
    publisher: { "@id": orgId },
  };
}

export function softwareApplicationSchema(associate: Associate) {
  const url = absoluteUrl(`/associates/${associate.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: associate.name,
    alternateName: `${associate.name} ${associate.role}`,
    description: associate.summary,
    url,
    image: absoluteUrl(associate.image.src.src),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: associate.domain,
    operatingSystem: "Web",
    inLanguage: site.language,
    featureList: associate.capabilities.map((c) => c.title),
    audience: {
      "@type": "BusinessAudience",
      audienceType: associate.personas.join(", "),
    },
    provider: { "@id": orgId },
    publisher: { "@id": orgId },
  };
}

export function associatesItemListSchema(list: Associate[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Curki AI Associates",
    itemListElement: list.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: absoluteUrl(`/associates/${a.slug}`),
    })),
  };
}

export function faqPageSchema(faqs: Faq[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
