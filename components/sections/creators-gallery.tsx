"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";

gsap.registerPlugin(Draggable);

// ── Data ──────────────────────────────────────────────────────────────────────

interface Creator {
  id: number;
  name: string;
  niche: string;
  students: string;
  courses: number;
  src?: string;
}

const CREATORS: Creator[] = [
  { id: 1, name: "Arjun Sharma",  niche: "Photography",         students: "12.4K", courses: 8,  src: "/creator-profiles/raj.png"      },
  { id: 2, name: "Priya Menon",   niche: "UX Design",           students: "9.8K",  courses: 6,  src: "/creator-profiles/raj.png"      },
  { id: 3, name: "Vikram Nair",   niche: "Music Production",    students: "7.2K",  courses: 5,  src: "/creator-profiles/raj.png"      },
  { id: 4, name: "Sneha Iyer",    niche: "Classical Dance",     students: "15.1K", courses: 4,  src: "/creator-profiles/raj.png"      },
  { id: 5, name: "Rohan Kapoor",  niche: "Filmmaking",          students: "11.3K", courses: 9,  src: "/creator-profiles/shraddha.jpeg" },
  { id: 6, name: "Aditi Bhatt",   niche: "Creative Writing",    students: "8.6K",  courses: 7,  src: "/creator-profiles/shraddha.jpeg" },
  { id: 7, name: "Kunal Mehta",   niche: "Digital Marketing",   students: "22.7K", courses: 12, src: "/creator-profiles/shraddha.jpeg" },
  { id: 8, name: "Meera Pillai",  niche: "Cooking & Nutrition", students: "18.4K", courses: 10, src: "/creator-profiles/shraddha.jpeg" },
];

const N_ORIG  = CREATORS.length;
const REPEAT  = 5;
const DISPLAY = Array.from({ length: N_ORIG * REPEAT }, (_, i) => CREATORS[i % N_ORIG]);
const N       = DISPLAY.length; // 40

// ── Motion constants ──────────────────────────────────────────────────────────

const LERP        = 0.055;
const AUTO_SPD    = 0.38;
const FRICTION    = 0.90;
const VEL_GATE    = 0.50;
const SCALE_Y_PER = 0.09;
const SCALE_X_PER = 0.03;
const OPACITY_PER = 0.15;
const Z_PER       = 90;

// ── Responsive layout ─────────────────────────────────────────────────────────

interface Dims {
  cw: number; ch: number; stride: number; perspective: number; cull: number;
}

const DESKTOP: Dims = { cw: 268, ch: 396, stride: 302, perspective: 1100, cull: 4.6 };

function getDims(vw: number): Dims {
  if (vw >= 1024) return DESKTOP;
  if (vw >= 768)  return { cw: 232, ch: 342, stride: 262, perspective: 1000, cull: 4.2 };
  if (vw >= 480)  return { cw: 188, ch: 276, stride: 212, perspective: 850,  cull: 3.5 };
  return                 { cw: 155, ch: 228, stride: 176, perspective: 720,  cull: 2.8 };
}

const G_POS: [number, number][] = [
  [22, 14], [42, 20], [18, 28], [55, 12],
  [28, 18], [46, 24], [15, 22], [60, 15],
];
const G_HUE = [175, 179, 173, 178, 176, 180, 174, 177];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CinematicGallery(): React.ReactElement {
  const [dims, setDims] = useState<Dims>(DESKTOP);
  const dimsRef         = useRef<Dims>(DESKTOP);
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef       = useRef(0);
  const currRef         = useRef(0);
  const velRef          = useRef(0);
  const dragging        = useRef(false);
  const galleryRef      = useRef<HTMLDivElement>(null);
  const dragProxyRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d     = getDims(window.innerWidth);
    const initX = (N / 2) * d.stride;
    dimsRef.current   = d;
    scrollRef.current = initX;
    currRef.current   = initX;
    setDims(d);

    const cards = cardRefs.current;

    // ── Ticker loop ───────────────────────────────────────────────────────────
    const tick = () => {
      const { stride, cull } = dimsRef.current;
      const ONE   = N_ORIG * stride;
      const SLOW  = ONE * 1.5;
      const SHIGH = ONE * (REPEAT - 1.5);

      if (!dragging.current) {
        if (Math.abs(velRef.current) > VEL_GATE) {
          scrollRef.current += velRef.current;
          velRef.current    *= FRICTION;
        } else {
          velRef.current     = 0;
          scrollRef.current += AUTO_SPD;
        }
      }

      // Seamless wrap — shifts both refs equally so lerp sees no jump
      if (scrollRef.current > SHIGH) {
        scrollRef.current -= ONE;
        currRef.current   -= ONE;
      } else if (scrollRef.current < SLOW) {
        scrollRef.current += ONE;
        currRef.current   += ONE;
      }

      currRef.current += (scrollRef.current - currRef.current) * LERP;
      const cx = currRef.current;

      for (let i = 0; i < N; i++) {
        const card = cards[i];
        if (!card) continue;

        const offset   = i * stride - cx;
        const slots    = offset / stride;
        const absSlots = Math.abs(slots);

        if (absSlots > cull) {
          gsap.set(card, { opacity: 0, pointerEvents: "none" });
          continue;
        }

        const glow = Math.max(0, 1 - absSlots * 4) * 0.48;

        gsap.set(card, {
          x:             offset,
          z:             -absSlots * Z_PER,
          scaleY:        Math.max(1 - absSlots * SCALE_Y_PER, 0.52),
          scaleX:        Math.max(1 - absSlots * SCALE_X_PER, 0.83),
          opacity:       Math.max(1 - absSlots * OPACITY_PER, 0.10),
          boxShadow:     glow > 0.01
            ? `0 0 ${Math.round(glow * 72)}px ${Math.round(glow * 18)}px oklch(0.543 0.093 177 / ${glow.toFixed(2)})`
            : "none",
          pointerEvents: absSlots < 0.65 ? "auto" : "none",
        });
      }
    };

    gsap.ticker.add(tick);

    // ── Draggable ─────────────────────────────────────────────────────────────
    const proxy = dragProxyRef.current;
    const gallery = galleryRef.current;
    if (!proxy || !gallery) return;

    let dragStartScroll = 0;

    const [drag] = Draggable.create(proxy, {
      type: "x",
      trigger: gallery,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() {
        dragging.current = true;
        velRef.current   = 0;
        dragStartScroll  = scrollRef.current;
      },
      onDrag(this: Draggable) {
        const delta       = this.startX - this.x;
        const next        = dragStartScroll + delta;
        velRef.current    = next - scrollRef.current;
        scrollRef.current = next;
      },
      onDragEnd() {
        dragging.current = false;
      },
    });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const nd         = getDims(window.innerWidth);
      const centerCard = scrollRef.current / dimsRef.current.stride;
      const newONE     = N_ORIG * nd.stride;
      const newX       = Math.max(
        newONE * 1.5,
        Math.min(newONE * (REPEAT - 1.5), centerCard * nd.stride),
      );
      scrollRef.current = newX;
      currRef.current   = newX;
      dimsRef.current   = nd;
      setDims(nd);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      gsap.ticker.remove(tick);
      drag.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="dark section-py relative overflow-hidden bg-background">

      <div className="page-container mb-12 text-center">
        <p className="text-label text-primary mb-3">Top Creators</p>
        <h2 className="text-h2 text-foreground text-balance">
          India&apos;s finest, teaching you
        </h2>
      </div>

      <div
        ref={galleryRef}
        className="relative flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ height: dims.ch + 60, perspective: `${dims.perspective}px` }}
      >
        {/* Invisible drag proxy — Draggable moves this, trigger maps to gallery */}
        <div ref={dragProxyRef} className="absolute" style={{ width: 1, height: 1 }} />

        <div
          className="relative [transform-style:preserve-3d]"
          style={{ width: dims.cw, height: dims.ch }}
        >
          {DISPLAY.map((creator, i) => {
            const orig     = i % N_ORIG;
            const [gx, gy] = G_POS[orig];
            const hue      = G_HUE[orig];

            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="absolute inset-0 overflow-hidden rounded-2xl border border-border will-change-transform [transform-style:preserve-3d]"
              >
                {!creator.src && (
                  <div
                    className="absolute inset-0 bg-card"
                    style={{
                      backgroundImage: [
                        `radial-gradient(ellipse 90% 70% at ${gx}% ${gy}%, oklch(0.30 0.09 ${hue} / 0.88) 0%, transparent 55%)`,
                        `radial-gradient(ellipse 65% 85% at ${100 - gx}% ${100 - gy}%, oklch(0.20 0.06 ${hue} / 0.68) 0%, transparent 55%)`,
                      ].join(", "),
                    }}
                  />
                )}

                {creator.src && (
                  <Image
                    src={creator.src}
                    alt={creator.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 155px, (max-width: 768px) 188px, (max-width: 1024px) 232px, 268px"
                    draggable={false}
                    priority={i < 5}
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-16 bg-gradient-to-t from-background via-background/75 to-transparent">
                  <span className="text-label text-primary block mb-1">
                    {creator.niche}
                  </span>
                  <span className="text-h4 text-foreground block mb-2">
                    {creator.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-label text-muted-foreground">
                      {creator.students} students
                    </span>
                    <span className="text-label text-muted-foreground opacity-40">·</span>
                    <span className="text-label text-muted-foreground">
                      {creator.courses} courses
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 md:w-52 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 md:w-52 bg-gradient-to-l from-background to-transparent" />
      </div>

    </section>
  );
}
