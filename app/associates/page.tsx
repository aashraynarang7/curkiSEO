import type { Metadata } from "next";
import { associates } from "@/data/associates";
import { associatesIndexCopy } from "@/data/site";
import { associatesItemListSchema, breadcrumbSchema, buildMetadata, type Crumb } from "@/lib/seo";
import { AssociateCard } from "@/components/associates/AssociateCard";
import { StatStrip } from "@/components/home/HomeSections";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: associatesIndexCopy.seo.title,
  description: associatesIndexCopy.seo.description,
  path: "/associates",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "AI Associates", path: "/associates" },
];

export default function AssociatesIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={associatesItemListSchema(associates)} />

      <section aria-labelledby="associates-heading" className="pt-8 pb-14 sm:pt-12 sm:pb-16">
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>{associatesIndexCopy.eyebrow}</Eyebrow>
            <h1 id="associates-heading" className="mt-5 text-4xl leading-[1.05] font-extrabold sm:text-6xl">
              {associatesIndexCopy.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-body sm:text-xl">{associatesIndexCopy.intro}</p>
          </div>
        </Container>
      </section>

      <StatStrip />

      <section aria-label="All AI Associates" className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {associates.map((a, i) => (
              <li
                key={a.slug}
                className={cn(
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                  i === associates.length - 1 && i % 2 === 0 && "sm:col-span-2 lg:col-span-3",
                )}
              >
                <Reveal delay={i * 0.05} className="h-full">
                  <AssociateCard associate={a} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
