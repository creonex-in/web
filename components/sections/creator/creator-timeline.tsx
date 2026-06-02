"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

interface Milestone {
  phase: string;
  month: string;
  title: string;
  body: string;
  stat: string | null;
}

const CREATOR = {
  name: "Arjun Sharma",
  niche: "Productivity & UX Design",
  location: "Pune, Maharashtra",
  src: "/creator-profiles/raj.png",
  quote: "I stopped waiting to feel ready. The first workshop changed everything.",
};

const MILESTONES: Milestone[] = [
  {
    phase: "The Beginning",
    month: "Month 1",
    title: "Zero audience. One idea.",
    body: "Six years of design experience — no audience, no course, no plan. Just one workshop idea he couldn't stop thinking about. He ran it free, just to see if anyone would show up.",
    stat: null,
  },
  {
    phase: "First Signal",
    month: "Month 2",
    title: "12 people showed up.",
    body: "A free 90-minute Notion session. No slides, no pitch — just teaching what he knew. Twelve strangers attended. Three asked if he'd do it again, paid.",
    stat: "12 live attendees",
  },
  {
    phase: "First Revenue",
    month: "Month 3",
    title: "₹499 × 40. Real money.",
    body: "A paid cohort. He over-delivered, ran long, answered every DM. Sold out in four days. Something clicked — people would pay to learn from him.",
    stat: "₹19,960 earned",
  },
  {
    phase: "Community",
    month: "Month 5",
    title: "500 followers. DMs every day.",
    body: "Word spread without ads. A community formed — not around a product, but around someone who genuinely taught. His niche found him.",
    stat: "500+ members",
  },
  {
    phase: "Momentum",
    month: "Month 8",
    title: "₹50,000/month. Consistently.",
    body: "Two live cohorts. One recorded course. Members referring members. Income stopped feeling exciting and started feeling reliable.",
    stat: "₹50K / month",
  },
  {
    phase: "Full Circle",
    month: "Month 14",
    title: "₹2,00,000/month. No investors. No office.",
    body: "Just his craft, his community, and a platform designed for creators serious about growing. He resigned the next morning.",
    stat: "₹2,00,000 / month",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CreatorTimeline(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const endingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {

      // ── 1. Line grows downward with scroll ──────────────────────────────────
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 2,
          },
        },
      );

      // ── 2. Image — subtle parallax float (desktop) ──────────────────────────
      if (!isMobile && imageRef.current) {
        gsap.to(imageRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      }

      // ── 3. Card reveals + dot activation ────────────────────────────────────
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: isMobile ? 16 : 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 87%",
              toggleActions: "play none none reverse",
            },
          },
        );

        const dot = dotRefs.current[i];
        if (dot) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 62%",
            end: "bottom 28%",
            onEnter: () =>
              gsap.to(dot, {
                scale: 1.55,
                boxShadow: "0 0 0 5px oklch(0.543 0.093 177 / 0.18)",
                duration: 0.4,
                ease: "power2.out",
                overwrite: true,
              }),
            onLeave: () =>
              gsap.to(dot, {
                scale: 1,
                boxShadow: "0 0 0 0px oklch(0.543 0.093 177 / 0)",
                duration: 0.35,
                overwrite: true,
              }),
            onEnterBack: () =>
              gsap.to(dot, {
                scale: 1.55,
                boxShadow: "0 0 0 5px oklch(0.543 0.093 177 / 0.18)",
                duration: 0.4,
                ease: "power2.out",
                overwrite: true,
              }),
            onLeaveBack: () =>
              gsap.to(dot, {
                scale: 1,
                boxShadow: "0 0 0 0px oklch(0.543 0.093 177 / 0)",
                duration: 0.35,
                overwrite: true,
              }),
          });
        }
      });

      // ── 4. Ending — cinematic fade-up ───────────────────────────────────────
      if (endingRef.current) {
        gsap.fromTo(
          endingRef.current,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: endingRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-12 md:py-16"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-border" />

      <div className="page-container">

        {/* ── Section heading ──────────────────────────────────────────────────── */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-label text-primary mb-5">The Creonex Path</p>
          <h2 className="text-h1 text-foreground text-balance">
            One idea.{" "}
            <span className="text-primary">Real income.</span>
            <br className="hidden sm:block" />
            {" "}Yours to build.
          </h2>
          <p className="text-body text-muted-foreground mt-6 max-w-lg mx-auto text-balance leading-relaxed">
            Every serious creator starts from zero. This is what the journey looks like — built on knowledge, consistency, and a platform designed for it.
          </p>
        </div>

        {/* ── Two-column grid — items-center vertically centers the image ──────── */}
        <div className="mx-auto grid max-w-5xl items-center lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] lg:gap-20 xl:gap-28">

          {/* ──────────────── LEFT: creator image (centered by grid) ─────────── */}
          <div className="hidden lg:block">
            <div ref={imageRef}>

              {/* Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border shadow-sm">
                <Image
                  src={CREATOR.src}
                  alt={CREATOR.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width: 1280px) 380px, 440px"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
              </div>

              {/* Creator info */}
              <div className="mt-4">
                <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {CREATOR.name}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-primary/15 bg-primary/[0.08] px-2.5 py-0.5">
                    <span className="text-label text-primary">{CREATOR.niche}</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground/50">
                    <FontAwesomeIcon icon={faLocationDot} className="size-2.5" />
                    {CREATOR.location}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-4">
                <div className="h-px bg-border/50" />
                <blockquote className="py-4">
                  <p className="font-display text-sm font-medium leading-relaxed text-foreground/70">
                    &ldquo;{CREATOR.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="h-px bg-border/50" />
              </div>

              {/* Disclaimer */}
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
                Illustrative journey. Creonex is built for creators ready to take this path.
              </p>

            </div>
          </div>

          {/* ──────────────── RIGHT: timeline milestones ─────────────────────── */}
          <div ref={timelineRef} className="relative [perspective:1000px]">

            {/* Mobile creator header */}
            <div className="mb-10 flex items-center gap-4 lg:hidden">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border">
                <Image
                  src={CREATOR.src}
                  alt={CREATOR.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-h4 text-foreground">{CREATOR.name}</p>
                <p className="text-body-sm text-muted-foreground">{CREATOR.niche}</p>
              </div>
            </div>

            {/* Progress line track — extends into gap toward card */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[6px] top-0 -bottom-[60px] md:-bottom-[92px] lg:-bottom-16 w-px overflow-hidden bg-border"
            >
              <div
                ref={lineRef}
                className="absolute inset-0 origin-top bg-primary"
              />
            </div>

            {/* Milestones */}
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group relative pb-7 pl-10 last:pb-0"
              >
                {/* Dot */}
                <div
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className={
                    i === MILESTONES.length - 1
                      ? "absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 shadow-[0_0_14px_4px_rgba(0,137,123,0.28)]"
                      : "absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-card"
                  }
                />

                {/* Phase + month */}
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="text-label text-primary">{m.phase}</span>
                  <span className="text-xs text-muted-foreground/30">·</span>
                  <span className="text-label text-muted-foreground">{m.month}</span>
                </div>

                {/* Card — hover lift + border reveal */}
                <div className="-mx-4 rounded-xl border border-transparent p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-border/60 group-hover:shadow-sm">
                  <h3 className="text-h3 text-foreground mb-2.5">{m.title}</h3>
                  <p className="text-body-sm text-muted-foreground max-w-md leading-relaxed">
                    {m.body}
                  </p>
                  {m.stat && (
                    <div className="mt-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-1.5">
                      <span className="text-label text-primary">{m.stat}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
          {/* end RIGHT */}

        </div>
        {/* end grid */}

        {/* ── Ending — centered below the full grid ────────────────────────────── */}
        <div ref={endingRef} className="mx-auto mt-10 flex max-w-5xl justify-center md:mt-14">
          <div className="relative w-full max-w-2xl">

            {/* Card */}
            <div
              className="dark group/card relative w-full overflow-hidden rounded-2xl border border-border bg-background px-8 py-10 text-center transition-colors duration-300 md:py-12"
            >
              {/* Teal glows — intensify on card hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-52 w-52 rounded-full bg-primary/[0.14] blur-3xl transition-all duration-500 group-hover/card:bg-primary/[0.24]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-primary/[0.09] blur-2xl transition-all duration-500 group-hover/card:bg-primary/[0.18]"
              />

              <p className="text-display mb-4 text-balance text-foreground">
                Start your <span className="text-primary">story.</span>
              </p>
              <p className="text-body mx-auto mb-8 max-w-sm leading-relaxed text-muted-foreground">
                Your audience is already out there, waiting for someone like you.
              </p>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/signup" />}
                  className="[a]:hover:bg-primary hover:-translate-y-0.5"
                >
                  Begin for free
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
