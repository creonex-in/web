"use client";

import SectionHeader from "@/components/shared/SectionHeader";
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
              className="card-feature rounded-xl border border-border"
            >
              <AccordionTrigger className="text-left heading-step px-0 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="body text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
