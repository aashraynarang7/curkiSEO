import { Plus } from "lucide-react";
import type { Faq } from "@/data/site";

// Native <details> accordion: no JavaScript, keyboard accessible, content always in the HTML.
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="glass divide-y divide-ink/8 rounded-card px-5 sm:px-8">
      {faqs.map((f, i) => (
        <details key={f.question} className="group py-2" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-lg py-4 [&::-webkit-details-marker]:hidden">
            <h3 className="text-left text-[1.0625rem] leading-snug font-semibold sm:text-lg">{f.question}</h3>
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-lavender text-brand-deep transition-transform duration-300 group-open:rotate-45">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="pr-2 pb-5 leading-relaxed text-body sm:pr-14">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
