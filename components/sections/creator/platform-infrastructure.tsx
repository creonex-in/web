"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faBolt,
  faCalendarDays,
  faLock,
  faReceipt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Data ──────────────────────────────────────────────────────────────────────

type Feature = {
  icon: IconDefinition;
  label: string;
  description: string;
  image: string;
  tint: string;
  gridClass: string;
};

const FEATURES: Feature[] = [
  {
    icon: faCalendarDays,
    label: "Booking Management",
    description: "Manage your schedule, availability, and learner bookings from one dashboard.",
    image: "/showcase/course-preview.png",
    tint: "bg-primary/[0.04]",
    gridClass: "md:col-start-1 md:row-start-1",
  },
  {
    icon: faShieldHalved,
    label: "Secure Payouts",
    description: "Bank-grade encryption. Earnings hit your account within 24 hours, every time.",
    image: "/showcase/expert-session.png",
    tint: "bg-card",
    gridClass: "md:col-start-2 md:row-start-1 md:row-span-3",
  },
  {
    icon: faCreditCard,
    label: "UPI & All Payments",
    description: "Built for India — UPI, cards, net banking, and wallets with zero friction.",
    image: "/showcase/course-preview.png",
    tint: "bg-accent/15",
    gridClass: "md:col-start-3 md:row-start-1",
  },
  {
    icon: faBolt,
    label: "Automated Payouts",
    description: "Get paid automatically after every session. No manual steps, no delays.",
    image: "/showcase/expert-session.png",
    tint: "bg-secondary/60",
    gridClass: "md:col-start-1 md:row-start-2",
  },
  {
    icon: faLock,
    label: "Access Management",
    description: "Control who accesses your sessions, resources, and premium content.",
    image: "/showcase/course-preview.png",
    tint: "bg-muted",
    gridClass: "md:col-start-3 md:row-start-2 md:row-span-2",
  },
  {
    icon: faReceipt,
    label: "Auto Invoices",
    description: "Professional invoices generated automatically for every booking.",
    image: "/showcase/expert-session.png",
    tint: "bg-primary/[0.04]",
    gridClass: "md:col-start-1 md:row-start-3",
  },
];

// ── Card image with fallback skeleton ─────────────────────────────────────────

function CardImage({ src, alt }: { src: string; alt: string }): React.ReactElement {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative min-h-36 flex-1 overflow-hidden">
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col gap-3 bg-muted p-4">
          <div className="h-2 w-2/3 rounded-full bg-border" />
          <div className="h-2 w-1/2 rounded-full bg-border/60" />
          <div className="mt-1 flex-1 rounded-xl bg-border/25" />
        </div>
      )}
    </div>
  );
}

// ── Bento card ────────────────────────────────────────────────────────────────

function BentoCard({ feature }: { feature: Feature }): React.ReactElement {
  return (
    <div
      className={cn(
        "bento-card group flex flex-col overflow-hidden rounded-2xl border border-border/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_8px_32px_oklch(0_0_0/0.07)]",
        feature.tint,
        feature.gridClass,
      )}
    >
      <CardImage src={feature.image} alt={feature.label} />

      <div className="flex items-start gap-3 p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <FontAwesomeIcon icon={feature.icon} className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-h4 text-foreground">{feature.label}</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{feature.description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function PlatformInfrastructure(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".bento-card",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: { each: 0.07, from: "start" },
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="section-py border-t border-border bg-background">
      <div className="page-container">

        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-label mb-3 text-primary">Platform Infrastructure</p>
          <h2 className="text-h1 text-balance text-foreground">
            Focus on teaching.{" "}
            <span className="text-primary">We handle the rest.</span>
          </h2>
          <p className="text-body mx-auto mt-4 max-w-md text-muted-foreground">
            Bookings, payments, invoices, and learner access — automated so you never think about operations.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[repeat(3,minmax(240px,auto))] md:gap-5">
          {FEATURES.map((feature) => (
            <BentoCard key={feature.label} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}
