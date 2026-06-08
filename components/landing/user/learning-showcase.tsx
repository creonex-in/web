"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
  faVideo,
  faGraduationCap,
  faBookOpen,
  faUsers,
  faUserTie,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";


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
    id: "sessions",
    label: "1:1 Expert Sessions",
    icon: faCalendarCheck,
    title: "Get personalized guidance from experts",
    description:
      "Book private one-on-one sessions with creators, mentors, and industry experts for focused guidance tailored exactly to where you are in your journey.",
    benefits: [
      "Private sessions with verified creators",
      "Personalized, focused attention",
      "Doubt-solving and career advice",
      "Book in minutes, meet via video",
    ],
    tags: ["30 or 60 min", "Book instantly", "Video call"],
    imageSrc: "/showcase/expert-session.png",
    imageAlt: "Creonex expert booking interface with calendar and creator profile",
    reversed: false,
  },
  {
    id: "workshops",
    label: "Live Workshops & Webinars",
    icon: faVideo,
    title: "Learn live from practitioners",
    description:
      "Join interactive live events where you can ask questions in real time and learn directly from experts who are actively working in the field.",
    benefits: [
      "Real-time Q&A with the creator",
      "Interactive, not just a recording",
      "Learn from active practitioners",
      "Recordings included post-event",
    ],
    tags: ["Live sessions", "Real-time Q&A", "Recordings"],
    imageSrc: "/showcase/expert-session.png",
    imageAlt: "Creonex live workshop interface with attendees and Q&A panel",
    reversed: true,
  },
  {
    id: "courses",
    label: "Structured Online Courses",
    icon: faGraduationCap,
    title: "Master skills at your own pace",
    description:
      "Work through step-by-step courses designed by verified creators — structured from beginner to advanced, available on your schedule, forever.",
    benefits: [
      "Step-by-step structured curriculum",
      "Lifetime access after purchase",
      "Verified creator content",
      "Learn anytime, on any device",
    ],
    tags: ["Self-paced", "Lifetime access", "Certificates"],
    imageSrc: "/showcase/course-preview.png",
    imageAlt: "Creonex course dashboard showing video player and lesson list",
    reversed: false,
  },
  {
    id: "resources",
    label: "Digital Resources & Toolkits",
    icon: faBookOpen,
    title: "Practical tools that accelerate learning",
    description:
      "Access templates, guides, e-books, frameworks, and ready-to-use resources built by creators to help you skip the basics and get to results faster.",
    benefits: [
      "Templates & frameworks ready to use",
      "E-books and in-depth guides",
      "Creator-built practical toolkits",
      "Download and keep forever",
    ],
    tags: ["Templates", "E-books", "Frameworks"],
    imageSrc: "/showcase/resources-library.png",
    imageAlt: "Creonex resource library with downloadable files and categories",
    reversed: true,
  },
  {
    id: "communities",
    label: "Exclusive Learning Communities",
    icon: faUsers,
    title: "Grow together with like-minded learners",
    description:
      "Connect with peers inside niche communities, participate in discussions, share progress, and learn collectively with others on the same path.",
    benefits: [
      "Niche communities around your goal",
      "Active discussions and peer support",
      "Moderated by expert creators",
      "Stay accountable and motivated",
    ],
    tags: ["Niche groups", "Discussions", "Peer support"],
    imageSrc: "/showcase/resources-library.png",
    imageAlt: "Creonex community feed with discussions and member profiles",
    reversed: false,
  },
  {
    id: "mentorship",
    label: "Mentorship & Coaching Programs",
    icon: faUserTie,
    title: "Long-term support from experienced mentors",
    description:
      "Get ongoing guidance, a personalized learning roadmap, and accountability from experienced mentors who help you reach your goals consistently.",
    benefits: [
      "Personalized roadmaps for your goals",
      "Regular check-ins and accountability",
      "Long-term mentor relationship",
      "Structured coaching programs",
    ],
    tags: ["Long-term", "1-on-1 coaching", "Roadmaps"],
    imageSrc: "/showcase/course-preview.png",
    imageAlt: "Creonex mentorship program dashboard with progress tracking",
    reversed: true,
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
          sizes="(max-width: 1024px) 100vw, 100vw"
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted ring-1 ring-border">
            <FontAwesomeIcon icon={feature.icon} className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="text-label text-muted-foreground">{feature.label}</span>
        </div>

        <h3 className="text-h2 text-balance text-foreground">{feature.title}</h3>
        <p className="text-body text-muted-foreground">{feature.description}</p>

        <ul className="space-y-3">
          {feature.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 shrink-0 text-muted-foreground" />
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


  return (
    <section ref={sectionRef} className="section-py bg-background">
      <div className="page-container">

        <div className="ls-header mx-auto mb-20 max-w-2xl text-center md:mb-28">
          <p className="text-label text-primary mb-4">Multiple Ways to Learn</p>
          <h2 className="text-h1 text-balance text-foreground">
            Learn Your Way{" "}
            <span className="text-primary">on Creonex</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-lg text-balance text-muted-foreground">
            Whether you want to gain a new skill, accelerate your career, or learn
            directly from creators — Creonex gives you multiple ways to learn in
            one place.
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
            Explore all learning paths
            <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
