import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bgColorClass: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    id: "browse",
    title: "Browse",
    description: "Discover top creators and mentors across domains.",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Browse creators",
    bgColorClass: "bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20",
  },
  {
    id: "book",
    title: "Book",
    description: "Instantly schedule a 1-on-1 session or enroll.",
    imageSrc: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Book session",
    bgColorClass: "bg-purple-500/10 dark:bg-purple-500/5 border border-purple-500/20",
  },
  {
    id: "learn",
    title: "Learn",
    description: "Gain real skills and accelerate your career.",
    imageSrc: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Learn skills",
    bgColorClass: "bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export default function HowItWorks(): React.ReactElement {
  return (
    <section className="bg-background pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="page-container">

        {/* Header */}
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center md:mb-20">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold tracking-wide text-primary">
            How it works
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
            Your learning journey, simplified.
          </h2>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`group relative flex w-full flex-col items-center overflow-hidden rounded-[2.5rem] px-6 py-12 transition-transform duration-500 hover:-translate-y-2 sm:px-8 lg:py-14 ${step.bgColorClass}`}
            >
              {/* Floating Image Composition */}
              <div className="relative aspect-[4/3] w-full max-w-[300px] overflow-hidden rounded-[20px] shadow-lg ring-1 ring-border/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl bg-muted">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Text Content */}
              <div className="mt-10 flex flex-col items-center text-center">
                <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground lg:text-3xl">
                  {step.title}
                </h3>
                <p className="max-w-[300px] text-base font-medium leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
