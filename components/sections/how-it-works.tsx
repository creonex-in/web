import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faLayerGroup,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Step = {
  icon: IconDefinition;
  number: string;
  title: string;
  description: string;
  benefits: string[];
};

const STEPS: Step[] = [
  {
    icon: faPenToSquare,
    number: "01",
    title: "Create your creator profile",
    description:
      "Set up your public storefront in minutes — bio, expertise, and social proof. No tech skills needed.",
    benefits: [
      "Custom public profile page",
      "Verified creator badge",
      "Shareable link for every platform",
    ],
  },
  {
    icon: faLayerGroup,
    number: "02",
    title: "Publish courses or sessions",
    description:
      "Upload your curriculum or open 1-on-1 booking slots. You control the price, pace, and availability.",
    benefits: [
      "Drag-and-drop curriculum builder",
      "Flexible session scheduling",
      "Built-in payment checkout",
    ],
  },
  {
    icon: faMoneyBill,
    number: "03",
    title: "Earn while you sleep",
    description:
      "Your audience discovers you via search and recommendations. Payments land in your account — zero manual work.",
    benefits: [
      "Instant UPI & bank payouts",
      "Automated reminders & follow-ups",
      "Monthly earnings dashboard",
    ],
  },
];

function StepCard({ step }: { step: Step }): React.ReactElement {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      {/* Top accent bar — slides in on hover */}
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />

      {/* Icon + watermark number */}
      <div className="mb-7 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
          <FontAwesomeIcon icon={step.icon} className="h-5 w-5" />
        </div>
        <span className="font-display select-none text-7xl font-bold leading-none text-foreground/[0.04]">
          {step.number}
        </span>
      </div>

      {/* Text */}
      <h3 className="text-h3 mb-3 text-foreground">{step.title}</h3>
      <p className="text-body-sm mb-7 flex-1 leading-relaxed text-muted-foreground">
        {step.description}
      </p>

      {/* Divider */}
      <div className="mb-5 h-px bg-border" />

      {/* Benefits */}
      <ul className="space-y-3">
        {step.benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-3">
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <span className="text-body-sm text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorks(): React.ReactElement {
  return (
    <section id="how-it-works" className="section-py bg-background">
      <div className="page-container">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-label text-primary mb-4">How It Works</p>
          <h2 className="text-h1 text-balance text-foreground">
            From signup to{" "}
            <span className="text-primary">first sale</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-lg text-balance text-muted-foreground">
            No waiting, no approvals. Publish your knowledge and start earning
            the same day.
          </p>
        </div>

        {/* Step tracker — visible from sm up */}
        <div className="relative mb-10 hidden sm:block">
          {/* Connecting line: anchored to center of first and last column (each col = 33.33%, center at 16.67%) */}
          <div className="absolute left-[16.67%] right-[16.67%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          <div className="relative grid grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number} className="flex justify-center">
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background text-xs font-bold text-primary">
                  {parseInt(step.number, 10)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-7">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

      </div>
    </section>
  );
}