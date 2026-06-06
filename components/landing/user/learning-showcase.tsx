"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPlay,
  faCalendarCheck,
  faFileLines,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Types ─────────────────────────────────────────────────────────────────────

type Feature = {
  id: string;
  label: string;
  icon: IconDefinition;
  title: string;
  description: string;
  benefits: string[];
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  reversed: boolean;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    id: "courses",
    label: "Pre-recorded Classes",
    icon: faPlay,
    title: "Learn at your own pace",
    description:
      "Access expert-created pre-recorded classes designed to help you master skills with structured lessons — available on your schedule, forever.",
    benefits: [
      "Lifetime access to courses",
      "Structured learning paths",
      "Learn anytime, anywhere",
      "Expert-created content",
    ],
    tags: ["Self-paced", "Video lessons", "Certificates"],
    imageSrc: "/showcase/course-preview.png",
    imageAlt: "Creonex course dashboard showing video player and lesson list",
    reversed: false,
  },
  {
    id: "sessions",
    label: "1:1 Expert Sessions",
    icon: faCalendarCheck,
    title: "Get personal guidance from experts",
    description:
      "Book private sessions with creators to solve doubts, get mentorship, and accelerate your growth with focused, personalized attention.",
    benefits: [
      "Direct expert interaction",
      "Personalized guidance",
      "Doubt solving sessions",
      "Career and skill mentorship",
    ],
    tags: ["30 or 60 min", "Book instantly", "Via video call"],
    imageSrc: "/showcase/expert-session.png",
    imageAlt: "Creonex expert booking interface with calendar and profile",
    reversed: true,
  },
  {
    id: "resources",
    label: "PDFs & Documentation",
    icon: faFileLines,
    title: "Access curated learning resources",
    description:
      "Download premium notes, guides, templates, and documentation created by industry experts to support your learning at every step.",
    benefits: [
      "Topic-wise resources",
      "Expert-written guides",
      "Templates & documents",
      "Download anytime",
    ],
    tags: ["PDFs", "Templates", "Guides"],
    imageSrc: "/showcase/resources-library.png",
    imageAlt: "Creonex resource library with downloadable files and categories",
    reversed: false,
  },
];

// ── ShowcaseImage ─────────────────────────────────────────────────────────────

interface ShowcaseImageProps {
  src: string;
  alt: string;
}

function ShowcaseImage({ src, alt }: ShowcaseImageProps): React.ReactElement {
  const [errored, setErrored] = useState(false);

  return (
    <div className="ls-image relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/50 shadow-[0_16px_48px_-12px_oklch(0_0_0/0.10)] transition-shadow duration-300 hover:shadow-[0_24px_64px_-12px_oklch(0_0_0/0.16)]">
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-muted via-muted/60 to-background/80">
          <div className="w-3/5 overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg">
            <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/70 px-3 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
              <div className="mx-3 h-1.5 flex-1 rounded-full bg-border/70" />
            </div>
            <div className="space-y-3 p-5">
              <div className="h-2.5 w-full rounded-full bg-border/60" />
              <div className="h-2.5 w-4/5 rounded-full bg-border/45" />
              <div className="h-2.5 w-3/5 rounded-full bg-border/30" />
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="h-9 rounded-lg bg-primary/10" />
                <div className="h-9 rounded-lg bg-border/30" />
                <div className="h-9 rounded-lg bg-border/20" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FeatureBlock ──────────────────────────────────────────────────────────────

interface FeatureBlockProps {
  feature: Feature;
}

function FeatureBlock({ feature }: FeatureBlockProps): React.ReactElement {
  return (
    <div className="ls-block grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">

      <div className={feature.reversed ? "lg:order-last" : ""}>
        <ShowcaseImage src={feature.imageSrc} alt={feature.imageAlt} />
      </div>

      <div className="ls-content flex flex-col gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <FontAwesomeIcon icon={feature.icon} className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-label text-primary">{feature.label}</span>
        </div>

        <h3 className="text-h2 text-balance text-foreground">{feature.title}</h3>
        <p className="text-body text-muted-foreground">{feature.description}</p>

        <ul className="space-y-3">
          {feature.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-body-sm text-foreground/90">{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-1">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function LearningShowcase(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ls-header > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
          ease: "power3.out", clearProps: "all",
          scrollTrigger: { trigger: ".ls-header", start: "top 80%", once: true },
        },
      );

      // gsap.utils.toArray scopes query to sectionRef — no document.querySelectorAll
      gsap.utils.toArray<HTMLElement>(".ls-block", sectionRef.current).forEach((block) => {
        const img     = block.querySelector(".ls-image");
        const content = block.querySelector(".ls-content");
        const targets = [img, content].filter(Boolean) as Element[];
        if (!targets.length) return;

        gsap.fromTo(
          targets,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.12,
            ease: "power3.out", clearProps: "all",
            scrollTrigger: { trigger: block, start: "top 78%", once: true },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="section-py bg-background">
      <div className="page-container">

        <div className="ls-header mx-auto mb-20 max-w-2xl text-center md:mb-28">
          <p className="text-label text-primary mb-4">Learning Resources</p>
          <h2 className="text-h1 text-balance text-foreground">
            Everything you need to{" "}
            <span className="text-primary">master your skills</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-lg text-balance text-muted-foreground">
            Learn from expert creators through courses, personalized sessions, and
            curated resources built for your growth.
          </p>
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {FEATURES.map((feature) => (
            <FeatureBlock key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/learner/courses" />}
            className="rounded-full px-8"
          >
            Browse all courses
            <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
