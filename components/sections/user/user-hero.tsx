"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSearch from "@/components/shared/hero-search";

gsap.registerPlugin(useGSAP);

const STATS = [
  { value: "1,800+", label: "Verified Experts" },
  { value: "500+",   label: "Courses" },
  { value: "10K+",   label: "Learners" },
] as const;

export default function UserHero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".u-hero-item",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: "power3.out", delay: 0.1, clearProps: "all" },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className="relative z-10 pt-14 pb-6 md:pt-20 md:pb-10">
      <div ref={containerRef} className="page-container">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="u-hero-item text-display text-balance text-foreground">
            India&apos;s{" "}
            <span className="text-primary">best creators,</span>
            <br />
            teaching what you actually need.
          </h1>

          <p className="u-hero-item text-body mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
            Browse courses, book 1-on-1 mentorship sessions, and join communities
            built by verified experts — all in one place.
          </p>

          <div className="u-hero-item relative z-10 mt-8 w-full px-1 text-left">
            <HeroSearch />
          </div>

          {/* Social proof — z-0 so search dropdown always wins */}
          <div className="u-hero-item relative z-0 mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-h3 text-foreground">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                {i < STATS.length - 1 && (
                  <div className="h-8 w-px bg-border" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
