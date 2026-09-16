import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function Section({ id, title, intro, align = "left", className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={cn("relative py-20 sm:py-28", className)}>
      <Container>
        {title && (
          <header className={cn("mb-12 max-w-2xl sm:mb-16", align === "center" && "mx-auto text-center")}>
            <h2 id={headingId} className="text-3xl font-bold leading-[1.1] sm:text-[2.75rem]">
              {title}
            </h2>
            {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
