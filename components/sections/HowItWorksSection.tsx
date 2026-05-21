import { FaCompass, FaBookOpen, FaTrophy } from "react-icons/fa";
import SectionHeader from "@/components/shared/SectionHeader";
import { HOW_IT_WORKS_STEPS } from "@/constants/data";
import type { ComponentType } from "react";

const STEP_ICONS: ComponentType<{ className?: string }>[] = [
  FaCompass,
  FaBookOpen,
  FaTrophy,
];

export default function HowItWorksSection() {
  return (
    <section className="section section-surface">
      <div className="container-inner flex flex-col gap-12">
        <SectionHeader
          badge="How It Works"
          heading="From zero to expert in 3 steps"
          subtext="Whether you want to learn a new skill or find a mentor, Creonex makes it simple and fast."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div
            className="hidden md:block absolute top-9 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-border"
            aria-hidden
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const StepIcon = STEP_ICONS[i];
            return (
              <div key={i} className="flex flex-col items-center text-center gap-4 relative">
                <div className="size-[72px] rounded-full bg-brand-ghost flex items-center justify-center shrink-0 z-10">
                  <StepIcon className="size-6 text-brand" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand">
                    {step.number}
                  </span>
                  <h3 className="text-[18px] font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="body text-center">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
