"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Draggable);

// ── Data ──────────────────────────────────────────────────────────────────────

type Testimonial = {
  id: string;
  name: string;
  niche: string;
  quote: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    niche: "UI/UX Design",
    quote:
      "Creonex gave me a real home for my design courses. My first cohort sold out in two weeks — no paid ads, just organic discovery.",
    initials: "PS",
  },
  {
    id: "2",
    name: "Arjun Mehta",
    niche: "Full-Stack Dev",
    quote:
      "I run live sessions every weekend. The scheduling and payments just work — I focus entirely on teaching, nothing else.",
    initials: "AM",
  },
  {
    id: "3",
    name: "Kavya Nair",
    niche: "Content Strategy",
    quote:
      "First platform that pays Indian creators fairly. My community grew to 600 members in three months without any marketing budget.",
    initials: "KN",
  },
  {
    id: "4",
    name: "Rohan Das",
    niche: "Motion Graphics",
    quote:
      "Uploaded my first course on Saturday, had my first sale by Sunday evening. The onboarding is genuinely that smooth.",
    initials: "RD",
  },
  {
    id: "5",
    name: "Sneha Kapoor",
    niche: "Brand Identity",
    quote:
      "The profile page looks so professional that people trust it immediately. My session bookings doubled in the first month.",
    initials: "SK",
  },
];

const N = TESTIMONIALS.length;

function depthStyle(d: number) {
  return {
    scale:  1 - d * 0.04,
    y:      d * 10,
    zIndex: N - d,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TestimonialsSection(): React.ReactElement {
  const orderRef     = useRef<number[]>(TESTIMONIALS.map((_, i) => i));
  const [topIdx, setTopIdx] = useState(0);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const draggableRef = useRef<Draggable | null>(null);
  const busyRef      = useRef(false);

  function attachDraggable() {
    draggableRef.current?.kill();
    const topCardIdx = orderRef.current[0];
    const el = cardRefs.current[topCardIdx];
    if (!el) return;

    const [d] = Draggable.create(el, {
      type: "x",
      cursor: "grab",
      activeCursor: "grabbing",
      onDrag() {
        gsap.set(el, { rotation: this.x / 20 });
      },
      onDragEnd() {
        if (busyRef.current) return;
        const hit = Math.abs(this.x) > 90 || Math.abs(this.velocityX) > 500;

        if (!hit) {
          gsap.to(el, { x: 0, rotation: 0, duration: 0.5, ease: "power3.out" });
          return;
        }

        busyRef.current = true;
        d.disable();

        const goLeft = this.x < 0 || this.velocityX < -500;

        gsap.to(el, {
          x:        goLeft ? -560 : 560,
          rotation: goLeft ? -18 : 18,
          opacity:  0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            const old = orderRef.current;
            const newOrder = [...old.slice(1), old[0]];
            orderRef.current = newOrder;

            newOrder.forEach((cardIdx, depth) => {
              gsap.to(cardRefs.current[cardIdx], {
                ...depthStyle(depth),
                duration: 0.35,
                ease: "power2.out",
              });
            });

            gsap.set(el, { x: 0, rotation: 0, opacity: 1, ...depthStyle(N - 1) });

            setTopIdx(newOrder[0]);
            busyRef.current = false;
            gsap.delayedCall(0.3, attachDraggable);
          },
        });
      },
    });

    draggableRef.current = d;
  }

  useEffect(() => {
    orderRef.current.forEach((cardIdx, depth) => {
      const el = cardRefs.current[cardIdx];
      if (!el) return;
      gsap.set(el, { x: 0, rotation: 0, opacity: 1, ...depthStyle(depth) });
    });
    attachDraggable();
    return () => { draggableRef.current?.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background py-16">
      <div className="page-container flex flex-col items-center">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-label text-primary mb-4">What creators say</p>
          <h2 className="text-h1 text-balance text-foreground">
            Real stories,{" "}
            <span className="text-muted-foreground">real creators.</span>
          </h2>
          <p className="text-body mt-5 text-muted-foreground">
            Over 2,400 creators across India use Creonex to sell their knowledge,
            earn consistently, and build businesses they actually own.
          </p>
        </div>

        {/* Draggable card deck */}
        <div className="flex w-full flex-col items-center gap-6">
          <div className="relative h-[280px] w-full max-w-[560px] overflow-visible">
            {TESTIMONIALS.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="absolute inset-x-0 top-0 h-[220px] select-none touch-none rounded-2xl border border-border bg-card px-7 py-6 shadow-sm"
              >
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="mb-3 h-4 w-4 text-foreground/20"
                />
                <p className="text-body leading-relaxed text-foreground line-clamp-3">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-foreground">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-body-sm text-muted-foreground">{item.niche}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Avatar strip */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {TESTIMONIALS.map((item, i) => (
                <div
                  key={item.id}
                  aria-label={item.name}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-xs font-semibold text-foreground transition-transform duration-200",
                    i === topIdx && "z-10 scale-110 ring-2 ring-foreground ring-offset-1 ring-offset-background"
                  )}
                >
                  {item.initials}
                </div>
              ))}
            </div>
            <p className="text-body-sm text-muted-foreground">{N} featured creators</p>
          </div>

          <p className="text-label text-muted-foreground/40">drag to browse</p>
        </div>

      </div>
    </section>
  );
}
