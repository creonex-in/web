"use client";

import { useEffect, useRef, useCallback } from "react";
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
import { Button } from "@/components/ui/button";

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

const AUTO_DELAY = 4;

// ─── Carousel ────────────────────────────────────────────────────────────────

interface CarouselProps {
  images: SlideImage[];
}

function Carousel({ images }: CarouselProps): React.ReactElement {
  const slideEls   = useRef<(HTMLDivElement | null)[]>([]);
  const progressEl = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<gsap.core.Tween | null>(null);
  const idxRef     = useRef(0);
  const count      = images.length;

  const goTo = useCallback((next: number) => {
    timerRef.current?.kill();
    gsap.killTweensOf(progressEl.current);

    const n = ((next % count) + count) % count;
    idxRef.current = n;

    const targets = slideEls.current.filter((el): el is HTMLDivElement => el !== null);
    gsap.to(targets, {
      xPercent: (i) => (i - n) * 100,
      duration: 0.55,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      progressEl.current,
      { scaleX: 0 },
      { scaleX: 1, duration: AUTO_DELAY, ease: "none", transformOrigin: "left" },
    );

    timerRef.current = gsap.delayedCall(AUTO_DELAY, () => goTo(n + 1));
  }, [count]);

  useEffect(() => {
    const targets = slideEls.current.filter((el): el is HTMLDivElement => el !== null);
    gsap.set(targets, { xPercent: (i) => i * 100 });
    goTo(0);
    return () => { timerRef.current?.kill(); };
  }, [goTo]);

  return (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-card">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-border/30">
              <div className="flex w-24 flex-col overflow-hidden rounded border border-dashed border-border/40">
                <div className="flex items-center gap-1 border-b border-border/30 px-1.5 py-1">
                  <div className="h-1 w-1 rounded-full bg-border/40" />
                  <div className="h-1 w-1 rounded-full bg-border/40" />
                  <div className="h-1 w-1 rounded-full bg-border/40" />
                </div>
                <div className="h-8" />
              </div>
              <span className="text-[10px] text-muted-foreground/35">
                Web screenshot · {i + 1} / {count}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Arrows */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => goTo(idxRef.current - 1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-background/90 group-hover:opacity-100"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => goTo(idxRef.current + 1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-background/90 group-hover:opacity-100"
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
      </Button>

      {/* Progress line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
        <div ref={progressEl} className="h-full origin-left bg-primary/70" />
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HowItWorks(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".how-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="how-it-works" className="dark section-py bg-background">
      <div className="page-container">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-label mb-4 text-primary">How It Works</p>
          <h2 className="text-display text-balance text-foreground">
            Simple steps to{" "}
            <span className="text-primary">earning online.</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-lg text-muted-foreground">
            No waiting, no approvals. Publish your knowledge and start earning the same day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="how-card flex flex-col gap-5">
              <Carousel images={step.images} />
              <div>
                <p className="text-label mb-2 text-primary">Step {parseInt(step.number, 10)}</p>
                <h3 className="text-h3 mb-2 text-foreground">{step.title}</h3>
                <p className="text-body-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
