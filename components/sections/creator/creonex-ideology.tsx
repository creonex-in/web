"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

export default function CreonexIdeology(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Text — GPU-accelerated smooth stagger ───────────────────────────────
      const items = Array.from(textRef.current?.children ?? []);
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 32, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            force3D: true,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // ── Image card — scroll-scrubbed expand (grows as you scroll in) ────────
      gsap.fromTo(
        imageRef.current,
        { scale: 0.7, opacity: 0, force3D: true },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 95%",
            end: "top 18%",
            scrub: 1.8,
          },
        },
      );

    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-py relative overflow-hidden"
    >
      <div className="page-container">

        {/* ── Centered manifesto text ──────────────────────────────────────────── */}
        <div ref={textRef} className="mx-auto max-w-2xl text-center">

          <p className="text-label text-primary mb-5">
            Why Creonex
          </p>

          <h2 className="text-h1 text-foreground mb-6 text-balance tracking-wide">
            The first platform where quality beats followers.
          </h2>

          <p className="text-body text-muted-foreground mb-8 text-balance leading-relaxed">
            Creonex ranks creators by how good they actually are — not by how many people follow them. A structural shift that has never been done at scale in India.
          </p>

          <Button size="lg" nativeButton={false} render={<Link href="#how-it-works" />}>
            See how it works
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1"
            />
          </Button>

        </div>

        {/* ── Image placeholder ────────────────────────────────────────────────── */}
        <div ref={visualRef} className="mt-16 md:mt-20">
          <div ref={imageRef} className="mx-auto w-full overflow-hidden rounded-2xl border border-border shadow-xl sm:w-[76%]">
            <div className="relative aspect-video w-full bg-card">
              <Image
                src="/creator-profiles/second-section-image.png"
                alt="Creonex platform"
                fill
                className="object-cover"
                sizes="(max-width: 720px) 100vw, 72vw"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
