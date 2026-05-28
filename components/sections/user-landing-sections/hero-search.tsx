"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Input }  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

gsap.registerPlugin(Draggable);

// ─── Mock data ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "UI/UX Design",
  "Full Stack Dev",
  "Govt. Exam Prep",
  "Photography",
  "Digital Marketing",
  "Music Production",
  "Content Creation",
  "Finance & Investing",
  "Fitness & Yoga",
  "Data Science",
  "Video Editing",
  "Graphic Design",
] as const;

const STEP = 220; // px per arrow click

// ─── Component ─────────────────────────────────────────────────────────────────

export default function HeroSearch(): React.ReactElement {
  const [query, setQuery]   = useState("");
  const [active, setActive] = useState<string | null>(null);

  const containerRef  = useRef<HTMLDivElement>(null);
  const stripRef      = useRef<HTMLDivElement>(null);
  const leftArrowRef  = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
  const dragRef       = useRef<Draggable | null>(null);
  const maxDragRef    = useRef(0);

  // ── Arrow visibility — driven by GSAP, no re-renders ─────────────────────

  const syncArrows = (x: number) => {
    const max = maxDragRef.current;
    gsap.to(leftArrowRef.current,  { opacity: x < -4 ? 1 : 0.25, duration: 0.18 });
    gsap.to(rightArrowRef.current, { opacity: max > 0 && x > -max + 4 ? 1 : 0.25, duration: 0.18 });
  };

  // ── Arrow click handlers ───────────────────────────────────────────────────

  const scrollLeft = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const cur  = gsap.getProperty(strip, "x") as number;
    const next = Math.min(0, cur + STEP);
    gsap.to(strip, {
      x: next,
      duration: 0.4,
      ease: "power2.out",
      onUpdate() { syncArrows(gsap.getProperty(strip, "x") as number); },
      onComplete() { dragRef.current?.update(true); },
    });
  };

  const scrollRight = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const cur  = gsap.getProperty(strip, "x") as number;
    const next = Math.max(-maxDragRef.current, cur - STEP);
    gsap.to(strip, {
      x: next,
      duration: 0.4,
      ease: "power2.out",
      onUpdate() { syncArrows(gsap.getProperty(strip, "x") as number); },
      onComplete() { dragRef.current?.update(true); },
    });
  };

  // ── Setup ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const strip     = stripRef.current;
    const container = containerRef.current;
    if (!strip || !container) return;

    // Entry animation
    const ctx = gsap.context(() => {
      gsap.from(Array.from(strip.children), {
        opacity: 0,
        x: 16,
        duration: 0.4,
        stagger: 0.035,
        ease: "power2.out",
        delay: 0.3,
        clearProps: "opacity,x",
      });
    });

    // Draggable
    const maxDrag       = strip.scrollWidth - container.offsetWidth;
    maxDragRef.current  = Math.max(0, maxDrag);

    const [drag] = Draggable.create(strip, {
      type: "x",
      bounds: { minX: -maxDragRef.current, maxX: 0 },
      cursor: "grab",
      activeCursor: "grabbing",
      edgeResistance: 0.85,
      onDrag()    { syncArrows(this.x); },
      onDragEnd() { syncArrows(this.x); },
    });
    dragRef.current = drag;

    // Initial arrow state
    syncArrows(0);

    return () => { ctx.revert(); drag.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to search endpoint
  };

  const pickCategory = (cat: string) => {
    const next = active === cat ? null : cat;
    setActive(next);
    setQuery(next ?? "");
    // TODO: trigger filtered search
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full px-1">

      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-full border-2 border-border bg-background px-4 py-2 shadow-lg transition-all duration-200 focus-within:border-primary/50 focus-within:shadow-xl"
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="h-4 w-4 shrink-0 text-muted-foreground"
        />
        <Input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(null); }}
          placeholder="Search for any course, skill, or topic..."
          className="flex-1 border-0 bg-transparent py-2 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
        />
        <Button type="submit" size="lg" className="shrink-0 rounded-full px-6">
          Search
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-3.5 w-3.5" />
        </Button>
      </form>

      {/* Category strip */}
      <div className="relative mt-4">

        {/* Left arrow + gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center bg-gradient-to-r from-background via-background/80 to-transparent pr-6 pl-0">
          <button
            ref={leftArrowRef}
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all duration-150 hover:border-primary/50 hover:text-primary"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="h-2.5 w-2.5" />
          </button>
        </div>

        {/* Scrollable strip */}
        <div ref={containerRef} className="overflow-hidden select-none px-9">
          <div ref={stripRef} className="flex w-max gap-2.5 pb-2 pt-1">
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                onClick={() => pickCategory(cat)}
                className={cn(
                  "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-3.5 text-xs font-medium transition-all duration-200 hover:border-primary/50 hover:text-primary",
                  active === cat
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
              >
                {cat}
                <FontAwesomeIcon icon={faArrowRight} className="h-2.5 w-2.5" />
              </Badge>
            ))}
          </div>
        </div>

        {/* Right arrow + gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center bg-gradient-to-l from-background via-background/80 to-transparent pl-6 pr-0">
          <button
            ref={rightArrowRef}
            onClick={scrollRight}
            aria-label="Scroll right"
            className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all duration-150 hover:border-primary/50 hover:text-primary"
          >
            <FontAwesomeIcon icon={faChevronRight} className="h-2.5 w-2.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
