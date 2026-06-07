"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CreonexIdeology(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
              once: true,
            },
          },
        );
      }

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
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="section-py relative overflow-hidden">
      <div className="page-container">

        <div ref={textRef} className="mx-auto max-w-2xl text-center">
          <p className="text-label text-primary mb-5">Why Creonex</p>
          <h2 className="text-h1 text-foreground mb-6 text-balance tracking-wide">
            The first platform where quality beats followers.
          </h2>
          <p className="text-body text-muted-foreground mb-8 text-balance leading-relaxed">
            Creonex ranks creators by how good they actually are — not by how many people follow them. A structural shift that has never been done at scale in India.
          </p>
          <Button size="lg" nativeButton={false} render={<Link href="#how-it-works" />}>
            See how it works
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Button>
        </div>

        <div ref={visualRef} className="mt-8 md:mt-10">
          <div ref={imageRef} className="mx-auto w-full overflow-hidden rounded-2xl border border-border shadow-xl sm:w-[76%]">
            <div className="relative aspect-video w-full bg-card">
              <Image
                src="/creator-profiles/second-section-image.png"
                alt="Creonex platform"
                fill
                className="object-cover"
                sizes="(max-width: 720px) 100vw, 72vw"
              />

              {/* CTA overlaid inside the image, bottom-center */}
              <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-8">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/signup" />}
                  className="rounded-full bg-white px-10 text-black shadow-lg transition-all duration-500 ease-out hover:scale-[1.03] hover:bg-primary hover:text-primary-foreground"
                >
                  Start your page
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
