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
      // Each element scrubs in independently — slight offset creates natural stagger
      const shared = { ease: "none", force3D: true } as const;

      [
        { el: ".cb-label",   end: "top 30%" },
        { el: ".cb-heading", end: "top 24%" },
        { el: ".cb-body",    end: "top 20%" },
        { el: ".cb-cta",     end: "top 16%" },
      ].forEach(({ el, end }) => {
        gsap.fromTo(
          el,
          { scale: 0.7, opacity: 0, force3D: true },
          {
            scale: 1,
            opacity: 1,
            ...shared,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end,
              scrub: 1.8,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="dark section-py bg-background relative overflow-hidden">

      {/* Ambient teal glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/15 blur-[96px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-[72px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-10 -left-16 h-44 w-44 rounded-full bg-primary/8 blur-[60px]" />

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
            200+ creators on Creonex teach what they already know — design, coding,
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
