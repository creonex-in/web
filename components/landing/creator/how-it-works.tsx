"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faLayerGroup,
  faChartLine,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Types ────────────────────────────────────────────────────────────────────

type SlideImage = {
  src: string;
  alt: string;
};

type Step = {
  number: string;
  icon: IconDefinition;
  title: string;
  description: string;
  images: SlideImage[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    number: "01",
    icon: faPenToSquare,
    title: "Create your creator profile",
    description:
      "Set up your public storefront in minutes — bio, expertise, and social proof. No tech skills needed.",
    images: [
      { src: "/creator-profiles/raj.png", alt: "Profile setup screen" },
      { src: "/creator-profiles/raj.png", alt: "Profile preview" },
      { src: "/creator-profiles/raj.png", alt: "Creator badge" },
    ],
  },
  {
    number: "02",
    icon: faLayerGroup,
    title: "Publish courses or sessions",
    description:
      "Upload your curriculum or open 1-on-1 booking slots. You control the price, pace, and availability.",
    images: [
      { src: "/creator-profiles/shraddha.jpeg", alt: "Course builder" },
      { src: "/creator-profiles/shraddha.jpeg", alt: "Session scheduling" },
      { src: "/creator-profiles/shraddha.jpeg", alt: "Pricing setup" },
      { src: "/creator-profiles/shraddha.jpeg", alt: "Curriculum editor" },
    ],
  },
  {
    number: "03",
    icon: faChartLine,
    title: "Earn while you sleep",
    description:
      "Your audience discovers you via search and recommendations. Payments land in your account — zero manual work.",
    images: [
      { src: "/creator-profiles/shraddha.jpeg", alt: "Earnings dashboard" },
      { src: "/creator-profiles/shraddha.jpeg", alt: "Analytics overview" },
      { src: "/creator-profiles/shraddha.jpeg", alt: "Student growth" },
    ],
  },
];

// ─── Carousel ────────────────────────────────────────────────────────────────

interface CarouselProps {
  images: SlideImage[];
}

function Carousel({ images }: CarouselProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideEls = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const count = images.length;

  /*
    useGSAP handles context creation + cleanup automatically.
    contextSafe wraps event handlers so any tweens they create are
    tracked by the same context and killed on unmount — no manual
    cleanup, no stale tweens.
  */
  const { contextSafe } = useGSAP(
    () => {
      const slides = slideEls.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      gsap.set(slides, { xPercent: (i: number) => i * 100 });
    },
    { scope: containerRef },
  );

  const goTo = contextSafe((next: number) => {
    const n = Math.max(0, Math.min(next, count - 1));
    if (n === active) return;
    setActive(n);

    const slides = slideEls.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    gsap.to(slides, {
      xPercent: (i: number) => (i - n) * 100,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
    });
  });

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => { slideEls.current[i] = el; }}
          className="absolute inset-0 will-change-transform"
        >
          {img.src ? (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              draggable={false}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex w-24 flex-col overflow-hidden rounded border border-dashed border-border/40">
                <div className="flex items-center gap-1 border-b border-border/30 px-1.5 py-1">
                  <div className="h-1 w-1 rounded-full bg-border/40" />
                  <div className="h-1 w-1 rounded-full bg-border/40" />
                  <div className="h-1 w-1 rounded-full bg-border/40" />
                </div>
                <div className="h-8" />
              </div>
              <span className="text-[10px] text-muted-foreground/35">
                Screenshot · {i + 1} / {count}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Arrows — always visible on mobile, hover-reveal on desktop,
           disabled (dimmed) at the first / last slide */}
      <button
        type="button"
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
        aria-label="Previous slide"
        className="absolute left-2.5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/55 disabled:opacity-20 disabled:cursor-default lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:disabled:opacity-20"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        disabled={active === count - 1}
        aria-label="Next slide"
        className="absolute right-2.5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/55 disabled:opacity-20 disabled:cursor-default lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:disabled:opacity-20"
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
      </button>

      {/* Dot indicators */}
      <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            className={[
              "size-1.5 rounded-full transition-all duration-300",
              i === active
                ? "scale-125 bg-white/80"
                : "bg-white/30 hover:bg-white/60",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HowItWorks(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".how-card",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="dark bg-background py-20 md:py-28 lg:py-32"
    >
      <div className="page-container">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <p className="text-label mb-4 text-primary">How It Works</p>
          <h2 className="text-display text-balance text-foreground">
            Simple steps to{" "}
            <span className="text-primary">earning online.</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-lg text-muted-foreground">
            No waiting, no approvals. Publish your knowledge and start
            earning the same day.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="how-card flex flex-col gap-6">
              <Carousel images={step.images} />
              <div>
                <p className="text-label mb-2 text-primary">
                  Step {parseInt(step.number, 10)}
                </p>
                <h3 className="text-h3 mb-2 text-foreground">{step.title}</h3>
                <p className="text-body-sm text-muted-foreground">
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