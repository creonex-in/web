"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CreatorButton(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [".cb-label", ".cb-heading", ".cb-body", ".cb-cta"],
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
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
    <section ref={sectionRef} className="dark section-py bg-background relative">

      {/* Ambient teal glows */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-primary/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-8 -left-12 h-40 w-40 rounded-full bg-primary/8 blur-xl" />

      <div className="page-container relative">
        <div className="mx-auto max-w-3xl text-center">

          {/* Label — plain text, no badge */}
          <p className="cb-label text-label text-primary mb-5">For Creators</p>

          {/* Heading */}
          <h2 className="cb-heading text-display text-balance text-foreground">
            Your knowledge is worth{" "}
            <span className="text-primary">more than you think.</span>
          </h2>

          {/* Body */}
          <p className="cb-body text-body mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            1,800+ creators on Creonex teach what they already know — design, coding,
            music, finance, government exams — and earn real income every month.
            No studio. No team. Just your expertise.
          </p>

          {/* Single CTA */}
          <div className="cb-cta mt-10 flex justify-center">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/creators" />}
              className="rounded-full px-10"
            >
              Start Teaching Today
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1"
              />
            </Button>
          </div>

          {/* Zero risk note */}
          <p className="mt-5 text-xs text-muted-foreground/50">
            Free to join · No approval needed · First payout within 7 days
          </p>

        </div>
      </div>
    </section>
  );
}
