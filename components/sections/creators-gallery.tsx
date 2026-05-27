"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faChevronLeft, faChevronRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(Draggable, ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

interface Creator {
  id: number;
  name: string;
  niche: string;
  followers: string;
  courses: number;
  src?: string;
}

const CREATORS_BASE: Creator[] = [
  { id: 1, name: "Arjun Sharma", niche: "Photography", followers: "12.4K", courses: 8, src: "/creator-profiles/raj.png" },
  { id: 2, name: "Priya Menon", niche: "UX Design", followers: "9.8K", courses: 6, src: "/creator-profiles/raj.png" },
  { id: 3, name: "Vikram Nair", niche: "Music Production", followers: "7.2K", courses: 5, src: "/creator-profiles/raj.png" },
  { id: 4, name: "Sneha Iyer", niche: "Classical Dance", followers: "15.1K", courses: 4, src: "/creator-profiles/raj.png" },
  { id: 5, name: "Rohan Kapoor", niche: "Filmmaking", followers: "11.3K", courses: 9, src: "/creator-profiles/shraddha.jpeg" },
  { id: 6, name: "Aditi Bhatt", niche: "Creative Writing", followers: "8.6K", courses: 7, src: "/creator-profiles/shraddha.jpeg" },
  { id: 7, name: "Kunal Mehta", niche: "Digital Marketing", followers: "22.7K", courses: 12, src: "/creator-profiles/shraddha.jpeg" },
  { id: 8, name: "Meera Pillai", niche: "Cooking & Nutrition", followers: "18.4K", courses: 10, src: "/creator-profiles/shraddha.jpeg" },
];

// Duplicate to get 16 items — same as the codepen's 14 pattern
const CREATORS = [...CREATORS_BASE, ...CREATORS_BASE].map((c, i) => ({ ...c, id: i }));

const G_POS: [number, number][] = [
  [22, 14], [42, 20], [18, 28], [55, 12],
  [28, 18], [46, 24], [15, 22], [60, 15],
  [22, 14], [42, 20], [18, 28], [55, 12],
  [28, 18], [46, 24], [15, 22], [60, 15],
];
const G_HUE = [175, 179, 173, 178, 176, 180, 174, 177, 175, 179, 173, 178, 176, 180, 174, 177];

// ── Seamless loop (exact GSAP codepen pattern) ────────────────────────────────

function buildSeamlessLoop(
  items: HTMLElement[],
  spacing: number,
  animateFunc: (el: HTMLElement) => gsap.core.Timeline,
): gsap.core.Timeline {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;
  const rawSeq = gsap.timeline({ paused: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seamless = gsap.timeline({ paused: true, repeat: -1, onRepeat(this: any) { if (this._time === this._dur) this._tTime += this._dur - 0.01; } });

  for (let i = 0; i < items.length + overlap * 2; i++) {
    rawSeq.add(animateFunc(items[i % items.length]), i * spacing);
  }

  rawSeq.time(startTime);
  seamless
    .to(rawSeq, { time: loopTime, duration: loopTime - startTime, ease: "none" })
    .fromTo(rawSeq,
      { time: overlap * spacing + 1 },
      { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: "none" },
    );

  return seamless;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CinematicGallery(): React.ReactElement {
  const galleryRef   = useRef<HTMLDivElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);
  const navRef       = useRef<{ prev: () => void; next: () => void } | null>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const dragProxy = dragProxyRef.current;
    if (!gallery || !dragProxy) return;

    const cards = Array.from(gallery.querySelectorAll<HTMLElement>(".g-card"));
    if (!cards.length) return;

    // ── Key change: spacing 0.1 matches the codepen tightly-packed look
    const SPACING = 0.1;
    const AUTO_SPD = 0.0005; // slower auto-scroll feels more cinematic
    const snapTo = gsap.utils.snap(SPACING);

    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const animateFunc = (el: HTMLElement): gsap.core.Timeline =>
      gsap.timeline()
        .fromTo(el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false },
        )
        .fromTo(el,
          { xPercent: 400 },
          { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
          0,
        );

    const loop = buildSeamlessLoop(cards, SPACING, animateFunc);
    const wrapTime = gsap.utils.wrap(0, loop.duration());
    const proxy = { offset: 0 };
    let dragging = false;
    let startOffset = 0;

    const scrub = gsap.to(proxy, {
      offset: 0,
      onUpdate() { loop.time(wrapTime(proxy.offset)); },
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    // Auto-scroll — commented out in favour of manual prev/next controls
    // const tick = () => {
    //   if (!dragging) {
    //     scrub.vars.offset += AUTO_SPD;
    //     scrub.invalidate().restart();
    //   }
    // };
    // gsap.ticker.add(tick);

    const goTo = (offset: number) => {
      scrub.vars.offset = snapTo(offset);
      scrub.invalidate().restart();
    };

    navRef.current = {
      prev: () => goTo((scrub.vars.offset as number) - SPACING),
      next: () => goTo((scrub.vars.offset as number) + SPACING),
    };

    const [drag] = Draggable.create(dragProxy, {
      type: "x",
      trigger: gallery,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() { dragging = true; startOffset = proxy.offset; },
      onDrag(this: Draggable) {
        dragging = true;
        scrub.vars.offset = startOffset + (this.startX - this.x) * 0.001; // 0.001 matches codepen
        scrub.invalidate().restart();
      },
      onDragEnd() { dragging = false; goTo(scrub.vars.offset as number); },
    });

    return () => {
      // gsap.ticker.remove(tick);
      drag.kill();
      scrub.kill();
      loop.kill();
    };
  }, []);

  return (
    <section className="dark section-py relative overflow-hidden bg-background">

      {/* Heading — relative + z-10 keeps it above gallery stacking context */}
      <div className="page-container mb-12 text-center relative z-10">
        <p className="text-label text-primary mb-3">Creator Community</p>
        <h2 className="text-h2 text-foreground text-balance">Your name belongs here too</h2>
      </div>

      {/* Gallery — isolate creates own stacking context, cards can't escape it */}
      <div
        ref={galleryRef}
        className="relative overflow-hidden select-none"
        style={{ height: 420, isolation: "isolate" }}
      >
        {/* Invisible drag proxy */}
        <div ref={dragProxyRef} className="absolute" style={{ width: 1, height: 1 }} />

        {CREATORS.map((c, i) => (
          <div
            key={c.id}
            className="g-card absolute overflow-hidden rounded-3xl border border-border/50 will-change-transform shadow-2xl shadow-black/50"
            style={{ width: 248, height: 368, left: "calc(50% - 124px)", top: 26 }}
          >
            {/* Inner glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 z-20" />

            {/* Full-bleed photo */}
            {c.src ? (
              <Image
                src={c.src}
                alt={c.name}
                fill
                className="object-cover"
                sizes="248px"
                draggable={false}
                priority={i < 3}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: [
                    `radial-gradient(ellipse 90% 70% at ${G_POS[i][0]}% ${G_POS[i][1]}%, oklch(0.30 0.09 ${G_HUE[i]} / 0.88) 0%, transparent 55%)`,
                    `radial-gradient(ellipse 65% 85% at ${100 - G_POS[i][0]}% ${100 - G_POS[i][1]}%, oklch(0.20 0.06 ${G_HUE[i]} / 0.68) 0%, transparent 55%)`,
                  ].join(", "),
                }}
              />
            )}

            {/* Subtle primary ambient tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

            {/* Tall gradient overlay — info floats on photo */}
            <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-4 pt-8 z-10 flex flex-col justify-end gap-2.5">
              <Badge
                variant="outline"
                className="w-fit border-primary/40 bg-primary/20 text-primary text-[10px] tracking-wide uppercase px-2"
              >
                {c.niche}
              </Badge>

              <div className="flex items-center gap-1.5">
                <p className="text-[15px] font-semibold text-white leading-tight">{c.name}</p>
                <FontAwesomeIcon icon={faCircleCheck} className="size-3.5 text-primary shrink-0" />
              </div>

              <Separator className="bg-white/15" />

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/55">{c.followers} followers</span>
                <span className="text-white/20">·</span>
                <span className="text-[11px] text-white/55">{c.courses} courses</span>
              </div>
            </div>
          </div>
        ))}

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 md:w-52 bg-gradient-to-r from-background to-transparent z-[101]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 md:w-52 bg-gradient-to-l from-background to-transparent z-[101]" />
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-col items-center gap-6">

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navRef.current?.prev()}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="size-4" />
          </button>
          <button
            onClick={() => navRef.current?.next()}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <FontAwesomeIcon icon={faChevronRight} className="size-4" />
          </button>
        </div>

        {/* CTA */}
        <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
          Start your creator journey
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
        </Button>

      </div>

    </section>
  );
}