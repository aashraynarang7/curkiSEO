import type { Metadata } from "next";
import { homeCopy, homeFaqs } from "@/data/site";
import { buildMetadata, faqPageSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  AssociatesSection,
  Hero,
  HomeFaqSection,
  HowItWorksSection,
  ProblemsSection,
  StatStrip,
  WhoItsForSection,
} from "@/components/home/HomeSections";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: homeCopy.seo.title,
  description: homeCopy.seo.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqPageSchema(homeFaqs, "/")} />
      <Hero />
      <StatStrip />
      <AssociatesSection />
      <ProblemsSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <HomeFaqSection />
      <CtaBand />
    </>
  );
}
