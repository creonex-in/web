"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Draggable);

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "sessions" | "courses" | "community";

type Tab = {
  id: TabId;
  label: string;
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  {
    id: "sessions",
    label: "Sessions",
    heading: "Let your audience book you — on your terms",
    description:
      "Set your availability once. Your audience finds you, picks a slot, and pays — no back-and-forth, no scheduling chaos. Your time, your price.",
    primaryCta: "Start Taking Sessions",
    secondaryCta: "See How It Works",
    image: "/creator-profiles/sessions.png",
  },
  {
    id: "courses",
    label: "Courses",
    heading: "Build once. Earn every week.",
    description:
      "Upload your curriculum, set a price, and go live. Full chapter control, student progress tracking, and a checkout that converts.",
    primaryCta: "Create Your Course",
    secondaryCta: "View Demo",
    image: "/creator-profiles/create-course.png",
  },
  {
    id: "community",
    label: "Community",
    heading: "Your brand, your space, your rules.",
    description:
      "A private community lives right next to your courses. Posts, announcements, member Q&A — all under your name, without leaving Creonex.",
    primaryCta: "Build Your Community",
    secondaryCta: "See an Example",
    image: "/creator-profiles/join-community.png",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductWalkthrough(): React.ReactElement {
  const [activeIdx, setActiveIdx]   = useState(0);
  const activeIdxRef                = useRef(0);
  const contentRef                  = useRef<HTMLDivElement>(null);
  const draggableRef                = useRef<Draggable | null>(null);
  const busyRef                     = useRef(false);

  // ── Transition ──────────────────────────────────────────────────────────────
  // Store in a ref so the Draggable closure always calls the latest version.
  const transitionRef = useRef((nextIdx: number, dir: 1 | -1) => {
    const el = contentRef.current;
    if (!el || busyRef.current) return;
    busyRef.current = true;
    draggableRef.current?.disable();

    gsap.set(el, { x: 0 });
    gsap.to(el, {
      x: dir * -72,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        activeIdxRef.current = nextIdx;
        setActiveIdx(nextIdx);
        gsap.set(el, { x: dir * 72, opacity: 0 });
        gsap.to(el, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            busyRef.current = false;
            draggableRef.current?.enable();
          },
        });
      },
    });
  });

  const switchTab = (idx: number) => {
    if (idx === activeIdxRef.current || busyRef.current) return;
    const dir = idx > activeIdxRef.current ? 1 : -1;
    transitionRef.current(idx, dir);
  };

  // ── Draggable setup ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const [d] = Draggable.create(el, {
      type: "x",
      cursor: "grab",
      activeCursor: "grabbing",
      onDragEnd() {
        const hitDist = Math.abs(this.x) > 80;
        const hitVel  = Math.abs(this.velocityX) > 450;

        if (!hitDist && !hitVel) {
          gsap.to(el, { x: 0, duration: 0.45, ease: "power3.out" });
          return;
        }

        const goNext  = this.x < 0 || this.velocityX < -450;
        const nextIdx = goNext
          ? (activeIdxRef.current + 1) % TABS.length
          : (activeIdxRef.current - 1 + TABS.length) % TABS.length;

        gsap.set(el, { x: 0 });
        transitionRef.current(nextIdx, goNext ? 1 : -1);
      },
    });

    draggableRef.current = d;
    return () => { d.kill(); };
  }, []);

  const active = TABS[activeIdx];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section className="section-py bg-background">
      <div className="page-container">
        <div className="dark overflow-hidden rounded-3xl bg-background px-6 py-10 md:px-12 md:py-14">

          {/* Tab strip */}
          <div className="mb-10 border-b border-border">
            <div className="flex">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => switchTab(i)}
                  className={cn(
                    "relative px-6 pb-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none",
                    activeIdx === i
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                  {activeIdx === i && (
                    <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content — Draggable target */}
          <div
            ref={contentRef}
            className="grid cursor-grab select-none items-center gap-10 active:cursor-grabbing lg:grid-cols-2 lg:gap-16"
          >
            {/* Left — copy */}
            <div>
              <h2 className="text-h1 text-balance text-foreground">
                {active.heading}
              </h2>
              <p className="text-body mt-4 max-w-md text-muted-foreground">
                {active.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/signup" />}
                >
                  {active.primaryCta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  className="border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground"
                  render={<Link href="/signup" />}
                >
                  {active.secondaryCta}
                </Button>
              </div>
            </div>

            {/* Right — screenshot */}
            <div className="pointer-events-none relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/50">
              <Image
                src={active.image}
                alt={active.label}
                fill
                draggable={false}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => switchTab(i)}
                aria-label={tab.label}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none",
                  i === activeIdx
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/50",
                )}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}