import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page couldn't be found. Explore Curki AI Associates for finance, documentation, HR, rostering and compliance.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-28 sm:py-36">
      <Container className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 text-lg text-muted">The page may have moved. Start from the home page or meet the AI Associates.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/associates" variant="secondary">
            Meet the AI Associates
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
