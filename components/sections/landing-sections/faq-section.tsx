"use client";

import SectionHeader from "@/components/shared/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants/data";

export default function FAQSection() {
  return (
    <section className="section">
      <div className="container-inner flex flex-col gap-12">
        <SectionHeader
          badge="FAQ"
          heading="Questions? We've got answers."
          subtext="Everything you need to know about learning and booking sessions on Creonex."
        />

        <Accordion className="w-full max-w-2xl mx-auto flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-2xl border border-border bg-card px-6"
            >
              <AccordionTrigger className="text-left text-[15px] font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="body pb-4">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
