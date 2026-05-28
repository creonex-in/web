"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedHeadline from "@/components/shared/animated-headline";
import HeroSearch from "@/components/sections/user-landing-sections/hero-search";

export default function UserHero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".u-hero-item", {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.15,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-py relative overflow-hidden">
      <div ref={containerRef} className="page-container">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="u-hero-item text-display text-balance text-foreground">
            Learn{" "}
            <AnimatedHeadline
              words={["design", "marketing", "photography", "coding", "finance"]}
            />{" "}
            from India&apos;s best creators.
          </h1>

          <p className="u-hero-item text-body mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Browse courses, book 1-on-1 mentorship sessions, and join communities
            built by verified experts — all in one place.
          </p>

          <div className="u-hero-item mt-10 text-left">
            <HeroSearch />
          </div>

        </div>
      </div>
    </section>
  );
}
