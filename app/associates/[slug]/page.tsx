import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { associates, getAssociate } from "@/data/associates";
import { breadcrumbSchema, buildMetadata, faqPageSchema, softwareApplicationSchema, type Crumb } from "@/lib/seo";
import {
  AssociateFaq,
  AssociateHero,
  Capabilities,
  Connect,
  Fit,
  Modules,
  Outcomes,
  ProblemSolution,
  Related,
  Trust,
  UseCases,
} from "@/components/associates/AssociateSections";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return associates.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/associates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getAssociate(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seo.title,
    description: a.seo.description,
    path: `/associates/${a.slug}`,
    keywords: a.seo.keywords,
  });
}

export default async function AssociatePage({ params }: PageProps<"/associates/[slug]">) {
  const { slug } = await params;
  const a = getAssociate(slug);
  if (!a) notFound();

  const path = `/associates/${a.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "AI Associates", path: "/associates" },
    { name: a.name, path },
  ];

  return (
    <>
      <JsonLd data={softwareApplicationSchema(a)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqPageSchema(a.faqs, path)} />

      <ScrollProgress />
      <AssociateHero a={a} crumbs={crumbs} />
      <ProblemSolution a={a} />
      <Outcomes a={a} />
      <Modules a={a} />
      <Capabilities a={a} />
      <UseCases a={a} />
      <Trust a={a} />
      <Connect a={a} />
      <Fit a={a} />
      <AssociateFaq a={a} />
      <Related a={a} />
      <CtaBand
        title={`See ${a.name} working with your systems`}
        body={`Book a 30-minute walkthrough. Our product experts will look at your stack, confirm which connectors are live and set up ${a.shortName} with you.`}
      />
    </>
  );
}
