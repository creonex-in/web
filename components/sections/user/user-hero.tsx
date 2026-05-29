"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeadline from "@/components/shared/animated-headline";
import HeroSearch from "@/components/shared/hero-search";

gsap.registerPlugin(useGSAP);

const ANIMATED_WORDS = ["design", "coding", "finance", "content", "fitness"];

export default function UserHero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".u-hero-item", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="section-py relative overflow-hidden">
      <div ref={containerRef} className="page-container">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="u-hero-item text-display text-balance text-foreground">
            Learn{" "}
            <AnimatedHeadline words={ANIMATED_WORDS} />{" "}
            from India&apos;s best creators.
          </h1>

          <p className="u-hero-item text-body mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Browse courses, book 1-on-1 mentorship sessions, and join communities
            built by verified experts — all in one place.
          </p>

          <div className="u-hero-item mt-10 w-full px-1 text-left">
            <HeroSearch
              onSearch={(query, category) => {
                // TODO: wire to /api/search
                void query; void category;
              }}
              onCategorySelect={(category) => {
                // TODO: trigger filtered listing
                void category;
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
