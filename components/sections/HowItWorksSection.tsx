import SectionHeader from "@/components/shared/SectionHeader";
import { HOW_IT_WORKS_STEPS } from "@/constants/data";

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
          {/* connector line on md+ */}
          <div
            className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border"
            aria-hidden
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 relative">
              <div className="size-16 rounded-full bg-brand-ghost flex items-center justify-center shrink-0 z-10">
                <span className="text-xl font-extrabold text-brand-gradient">
                  {step.number}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="heading-step">{step.title}</h3>
                <p className="body text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
