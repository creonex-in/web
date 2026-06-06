"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
  { id: 1, name: "Arjun Sharma", niche: "Photography", students: "12.4K", courses: 8, src: "/creator-profiles/raj.png" },
  { id: 2, name: "Priya Menon", niche: "UX Design", students: "9.8K", courses: 6, src: "/creator-profiles/raj.png" },
  { id: 3, name: "Vikram Nair", niche: "Music Production", students: "7.2K", courses: 5, src: "/creator-profiles/raj.png" },
  { id: 4, name: "Sneha Iyer", niche: "Classical Dance", students: "15.1K", courses: 4, src: "/creator-profiles/raj.png" },
  { id: 5, name: "Rohan Kapoor", niche: "Filmmaking", students: "11.3K", courses: 9, src: "/creator-profiles/shraddha.jpeg" },
  { id: 6, name: "Aditi Bhatt", niche: "Creative Writing", students: "8.6K", courses: 7, src: "/creator-profiles/shraddha.jpeg" },
  { id: 7, name: "Kunal Mehta", niche: "Digital Marketing", students: "22.7K", courses: 12, src: "/creator-profiles/shraddha.jpeg" },
  { id: 8, name: "Meera Pillai", niche: "Cooking & Nutrition", students: "18.4K", courses: 10, src: "/creator-profiles/shraddha.jpeg" },
];

const N_ORIG = CREATORS.length;
const REPEAT = 5;
const DISPLAY = Array.from({ length: N_ORIG * REPEAT }, (_, i) => CREATORS[i % N_ORIG]);
const N = DISPLAY.length; // 40

// ── Motion constants ──────────────────────────────────────────────────────────

const LERP = 0.055;
const AUTO_SPD = 0.38;
const FRICTION = 0.90;
const VEL_GATE = 0.50;
const SCALE_Y_PER = 0.09;
const SCALE_X_PER = 0.03;
const OPACITY_PER = 0.15;
const Z_PER = 90;

// Any frame whose deltaRatio exceeds this is treated as an abnormal hitch
// (GC pause, tab refocus, the ticker being re-added by the IntersectionObserver).
// On those frames we DON'T advance the scroll — we only keep easing. That's what
// removes the "speed-up then settle" burst at the auto-scroll / loop boundary:
// there is never a backlog of distance to catch up on.
const HITCH_DR = 3;

// ── Responsive layout ─────────────────────────────────────────────────────────

interface Dims {
  cw: number; ch: number; stride: number; perspective: number; cull: number;
}

const DESKTOP: Dims = { cw: 268, ch: 396, stride: 302, perspective: 1100, cull: 4.6 };

function getDims(vw: number): Dims {
  if (vw >= 1024) return DESKTOP;
  if (vw >= 768) return { cw: 232, ch: 342, stride: 262, perspective: 1000, cull: 4.2 };
  if (vw >= 480) return { cw: 188, ch: 276, stride: 212, perspective: 850, cull: 3.5 };
  return { cw: 155, ch: 228, stride: 176, perspective: 720, cull: 2.8 };
}

const G_POS: [number, number][] = [
  [22, 14], [42, 20], [18, 28], [55, 12],
  [28, 18], [46, 24], [15, 22], [60, 15],
];
const G_HUE = [175, 179, 173, 178, 176, 180, 174, 177];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CinematicGallery({ showViewProfile = false }: { showViewProfile?: boolean }): React.ReactElement {
  const [dims, setDims] = useState<Dims>(DESKTOP);
  const [centerIdx, setCenterIdx] = useState(0);

  const dimsRef = useRef<Dims>(DESKTOP);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef(0);
  const currRef = useRef(0);
  const velRef = useRef(0);
  const dragging = useRef(false);
  const prevCenterRef = useRef(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);

  // gsap.utils.wrap is GSAP's built-in helper for seamless looping. We keep two:
  // one to bound the scroll scalar into [0, SPAN), and one to map each card's
  // raw offset into [-SPAN/2, SPAN/2) so every card wraps individually, far
  // off-screen. Rebuilt whenever the stride (and therefore SPAN) changes.
  const wrapScrollRef = useRef<(v: number) => number>((v) => v);
  const wrapOffsetRef = useRef<(v: number) => number>((v) => v);

  const rebuildWraps = (stride: number) => {
    const SPAN = N * stride;
    wrapScrollRef.current = gsap.utils.wrap(0, SPAN);
    wrapOffsetRef.current = gsap.utils.wrap(-SPAN / 2, SPAN / 2);
  };

  useEffect(() => {
    const d = getDims(window.innerWidth);
    const initX = (N / 2) * d.stride;
    dimsRef.current = d;
    scrollRef.current = initX;
    currRef.current = initX;
    rebuildWraps(d.stride);
    setDims(d);

    const cards = cardRefs.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Per-card state to skip redundant style writes each frame.
    const culled: boolean[] = [];
    const lastShadow: string[] = [];
    const lastPE: string[] = []; // pointer-events isn't composited — gate it like box-shadow

    // ── Ticker loop ───────────────────────────────────────────────────────────
    const tick = () => {
      const rawDr = gsap.ticker.deltaRatio(); // 1 at 60fps, ~0.5 at 120fps, ~2 at 30fps
      const dr = Math.min(rawDr, 2);        // framerate-independent, but bounded
      const hitch = rawDr > HITCH_DR;          // abnormal frame → don't advance, only ease

      const { stride, cull } = dimsRef.current;
      const SPAN = N * stride;

      if (!dragging.current) {
        if (Math.abs(velRef.current) > VEL_GATE) {
          if (!hitch) scrollRef.current += velRef.current * dr;
          velRef.current *= Math.pow(FRICTION, dr);
        } else {
          velRef.current = 0;
          if (!reduceMotion && !hitch) scrollRef.current += AUTO_SPD * dr;
        }
      }

      // Bound the scroll scalar with gsap.utils.wrap, then shift currRef by the
      // exact same amount so the two never fall out of phase. Because every card
      // position is computed modulo SPAN below, this shift is completely invisible.
      const before = scrollRef.current;
      scrollRef.current = wrapScrollRef.current(before);
      currRef.current += scrollRef.current - before;

      // Framerate-independent easing toward the target (dr is capped at 2, so this
      // can never overshoot — no burst even on a slow frame).
      const k = 1 - Math.pow(1 - LERP, dr);
      currRef.current += (scrollRef.current - currRef.current) * k;
      const cx = currRef.current;

      // Track center creator — only when the "View profile" link needs it, and
      // only on change. The card list is memoized, so this re-render can't re-diff
      // the 40 cards; it only refreshes the link.
      if (showViewProfile) {
        const c = ((Math.round(cx / stride) % N_ORIG) + N_ORIG) % N_ORIG;
        if (c !== prevCenterRef.current) {
          prevCenterRef.current = c;
          setCenterIdx(c);
        }
      }

      for (let i = 0; i < N; i++) {
        const card = cards[i];
        if (!card) continue;

        // Nearest copy of this card around the centre, wrapped into [-SPAN/2, SPAN/2).
        // Each card wraps individually ~20 slots out — fully culled — so nothing
        // teleports across the viewport.
        const offset = wrapOffsetRef.current(i * stride - cx);
        const absSlots = Math.abs(offset) / stride;

        if (absSlots > cull) {
          if (!culled[i]) {
            gsap.set(card, { opacity: 0 });
            card.style.pointerEvents = "none";
            lastPE[i] = "none";
            culled[i] = true;
          }
          continue;
        }
        culled[i] = false;

        // Transforms + opacity are GPU-composited — cheap to write every frame.
        gsap.set(card, {
          x: offset,
          z: -absSlots * Z_PER,
          scaleY: Math.max(1 - absSlots * SCALE_Y_PER, 0.52),
          scaleX: Math.max(1 - absSlots * SCALE_X_PER, 0.83),
          opacity: Math.max(1 - absSlots * OPACITY_PER, 0.10),
        });

        // pointer-events isn't a visual property — only write it when it flips.
        const pe = absSlots < 0.65 ? "auto" : "none";
        if (pe !== lastPE[i]) {
          card.style.pointerEvents = pe;
          lastPE[i] = pe;
        }

        // box-shadow triggers paint — only write it when it actually changes
        // (glow is non-zero only for the near-center card).
        const glow = Math.max(0, 1 - absSlots * 4) * 0.48;
        const shadow = glow > 0.01
          ? `0 0 ${Math.round(glow * 72)}px ${Math.round(glow * 18)}px oklch(0.543 0.093 177 / ${glow.toFixed(2)})`
          : "none";
        if (shadow !== lastShadow[i]) {
          gsap.set(card, { boxShadow: shadow });
          lastShadow[i] = shadow;
        }
      }
    };

    // Run the ticker only while the gallery is on-screen and the tab is visible.
    let ticking = false;
    const startTick = (): void => { if (!ticking) { ticking = true; gsap.ticker.add(tick); } };
    const stopTick = (): void => { if (ticking) { ticking = false; gsap.ticker.remove(tick); } };

    const proxy = dragProxyRef.current;
    const gallery = galleryRef.current;
    if (!proxy || !gallery) return;

    // ── Draggable (created inside a gsap.context for clean teardown) ────────────
    let dragLastX = 0;

    const ctx = gsap.context(() => {
      Draggable.create(proxy, {
        type: "x",
        trigger: gallery,
        cursor: "grab",
        activeCursor: "grabbing",
        onPress(this: Draggable) {
          // If the press target is a link, cancel drag immediately so the click fires.
          const target = (this.pointerEvent as PointerEvent | null)?.target as HTMLElement | null;
          if (target?.closest?.("a")) {
            this.endDrag(this.pointerEvent as PointerEvent);
            return;
          }
          velRef.current = 0;
        },
        onDrag(this: Draggable) {
          if (!dragging.current) {
            // First frame: capture the pointer baseline, don't move yet.
            dragging.current = true;
            dragLastX = this.x;
            return;
          }
          // Incremental: apply only the per-frame pointer delta. Because we never
          // set scrollRef to an absolute value, the seamless wrap can shift it
          // freely without desyncing.
          const move = -(this.x - dragLastX);
          dragLastX = this.x;
          scrollRef.current += move; // follow the finger 1:1, no lag

          // Momentum (used after release) is clamped so a hard flick can't launch
          // the track faster than the easing can track.
          const maxV = dimsRef.current.stride * 2;
          velRef.current = Math.max(-maxV, Math.min(maxV, move));
        },
        onDragEnd() {
          dragging.current = false;
        },
      });
    }, gallery);

    // ── Resize ──────────────────────────────────────────────────────────────────
    const onResize = () => {
      const nd = getDims(window.innerWidth);
      const centerCard = scrollRef.current / dimsRef.current.stride;
      const newX = centerCard * nd.stride;
      scrollRef.current = newX;
      currRef.current = newX;
      dimsRef.current = nd;
      rebuildWraps(nd.stride);
      setDims(nd);
    };

    window.addEventListener("resize", onResize, { passive: true });

    // ── Visibility gating ─────────────────────────────────────────────────────
    let onScreen = false;
    const sync = (): void => {
      if (onScreen && !document.hidden) startTick();
      else stopTick();
    };
    const io = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; sync(); },
      { threshold: 0 },
    );
    io.observe(gallery);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stopTick();
      ctx.revert();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The card list never depends on centerIdx (or even dims — cards are absolutely
  // positioned via inset-0). Memoizing it with stable element identity means a
  // centerIdx re-render bails out of reconciling this whole subtree → no stutter.
  const cardElements = useMemo(
    () =>
      DISPLAY.map((creator, i) => {
        const orig = i % N_ORIG;
        const [gx, gy] = G_POS[orig];
        const hue = G_HUE[orig];

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

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-4 pb-4 pt-20 backdrop-blur-[2px]">
              <span className="text-label mb-1 block text-primary">
                {creator.niche}
              </span>
              <span className="text-h4 mb-2 block text-foreground">
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
      }),
    [],
  );

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
          {cardElements}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 md:w-52 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 md:w-52 bg-gradient-to-l from-background to-transparent" />
      </div>

      {showViewProfile && (
        <div className="page-container mt-8 flex items-center justify-center">
          <Link
            href={`/creators/${CREATORS[centerIdx].id}`}
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            View {CREATORS[centerIdx].name}&apos;s profile
            <FontAwesomeIcon
              icon={faArrowRight}
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      )}

    </section>
  );
}