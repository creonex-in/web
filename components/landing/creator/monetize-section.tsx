"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// ── Types & Data ──────────────────────────────────────────────────────────────

type BadgeVariant = "popular" | "soon" | "future";

type MonetizeCard = {
  id: string;
  image: string;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
};

const CARDS: MonetizeCard[] = [
  {
    id: "workshops",
    image: "/showcase/course-preview.png",
    title: "Live Workshops",
    description: "Host group sessions and share your knowledge at scale.",
    badge: "Popular",
    badgeVariant: "popular",
  },
  {
    id: "sessions",
    image: "/showcase/expert-session.png",
    title: "1:1 Sessions",
    description: "Personalized consultations with individual learners.",
  },
  {
    id: "digital",
    image: "/showcase/course-preview.png",
    title: "Digital Products",
    description: "Sell templates, guides, and resources on your own terms.",
  },
  {
    id: "courses",
    image: "/showcase/expert-session.png",
    title: "Courses",
    description: "Pre-recorded video courses that earn while you sleep.",
    badge: "Coming Soon",
    badgeVariant: "soon",
  },
  {
    id: "memberships",
    image: "/showcase/course-preview.png",
    title: "Memberships",
    description: "Recurring revenue through gated community access.",
    badge: "Future",
    badgeVariant: "future",
  },
  {
    id: "collaborations",
    image: "/showcase/expert-session.png",
    title: "Collaborations",
    description: "Co-create and co-sell content with fellow creators.",
  },
];

const BADGE_CLASS: Record<BadgeVariant, string> = {
  popular: "bg-primary text-primary-foreground",
  soon:    "border border-border bg-secondary text-secondary-foreground",
  future:  "border border-border bg-muted text-muted-foreground",
};

// Visible cards per breakpoint — matches Tailwind sm/lg
const getVisibleCount = (): number => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

// ── Card ──────────────────────────────────────────────────────────────────────

function CardImage({ src, alt }: { src: string; alt: string }): React.ReactElement {
  const [errored, setErrored] = useState(false);

  if (!errored) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setErrored(true)}
        />
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full bg-muted">
      <div className="flex h-full flex-col gap-3 p-5">
        <div className="h-2 w-2/3 rounded-full bg-border" />
        <div className="h-2 w-1/2 rounded-full bg-border/60" />
        <div className="mt-2 flex-1 rounded-lg bg-border/30" />
      </div>
    </div>
  );
}

function FeatureCard({ card }: { card: MonetizeCard }): React.ReactElement {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_8px_32px_oklch(0_0_0/0.10)]">
      <CardImage src={card.image} alt={card.title} />

      <div className="flex flex-col gap-2.5 p-6 md:p-7">
        {card.badge && card.badgeVariant && (
          <span
            className={cn(
              "w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              BADGE_CLASS[card.badgeVariant],
            )}
          >
            {card.badge}
          </span>
        )}
        <h3 className="text-h4 text-foreground">{card.title}</h3>
        <p className="text-body-sm text-muted-foreground">{card.description}</p>
      </div>
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function MonetizeSection(): React.ReactElement {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // overflow-hidden clip
  const trackRef     = useRef<HTMLDivElement>(null); // translating flex row

  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentPage, setCurrentPage]   = useState(0);

  // Chunk CARDS into pages based on how many cards are visible
  const pages = useMemo<MonetizeCard[][]>(() => {
    const result: MonetizeCard[][] = [];
    for (let i = 0; i < CARDS.length; i += visibleCount) {
      result.push(CARDS.slice(i, i + visibleCount));
    }
    return result;
  }, [visibleCount]);

  const pageCount = pages.length;

  // Navigate to a specific page — translates track by exact container width
  const goToPage = useCallback(
    (page: number) => {
      const container = containerRef.current;
      const track     = trackRef.current;
      if (!container || !track) return;

      const clamped = gsap.utils.clamp(0, pageCount - 1, page);
      gsap.to(track, {
        x:        -clamped * container.offsetWidth,
        duration: 0.55,
        ease:     "power3.inOut",
      });
      setCurrentPage(clamped);
    },
    [pageCount],
  );

  // Handle responsive recalculation on resize
  useGSAP(
    () => {
      const update = () => {
        const count = getVisibleCount();
        setVisibleCount((prev) => {
          if (prev === count) return prev;
          // Reset carousel position when layout changes
          setCurrentPage(0);
          gsap.set(trackRef.current, { x: 0 });
          return count;
        });
      };

      window.addEventListener("resize", update, { passive: true });
      return () => window.removeEventListener("resize", update);
    },
    { scope: sectionRef },
  );

  // Grid class derived from visible count — no hardcoded logic in JSX
  const gridClass = cn(
    "grid w-full flex-shrink-0 gap-5",
    visibleCount === 1 && "grid-cols-1",
    visibleCount === 2 && "grid-cols-2",
    visibleCount >= 3 && "grid-cols-3",
  );

  return (
    <section ref={sectionRef} className="section-py border-t border-border bg-background">

      {/* Header */}
      <div className="page-container mb-12 text-center">
        <p className="text-label mb-3 text-primary">Earn your way</p>
        <h2 className="text-h1 text-balance text-foreground">
          Monetize & expertise{" "}
          <span className="text-primary">your way.</span>
        </h2>
        <p className="text-body mx-auto mt-4 max-w-sm text-muted-foreground">
          Six revenue streams. One platform. You own everything.
        </p>
      </div>

      {/* Carousel — all inside page-container */}
      <div className="page-container">

      {/* Clip + track */}
        <div ref={containerRef} className="overflow-hidden">
          <div ref={trackRef} className="flex will-change-transform">
            {pages.map((pageCards, pageIdx) => (
              <div key={pageIdx} className={gridClass}>
                {pageCards.map((card) => (
                  <FeatureCard key={card.id} card={card} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-6">

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className="rounded-full bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
          </Button>

          {/* Dots — one per page, not per card */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Carousel pages">
            {Array.from({ length: pageCount }, (_, i) => (
              <Button
                key={i}
                variant="ghost"
                role="tab"
                aria-selected={i === currentPage}
                aria-label={`Page ${i + 1} of ${pageCount}`}
                onClick={() => goToPage(i)}
                className={cn(
                  "h-1.5 rounded-full p-0 transition-all duration-300",
                  i === currentPage
                    ? "w-6 bg-primary hover:bg-primary"
                    : "w-1.5 bg-border hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            aria-label="Next page"
            className="rounded-full bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
          >
            <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
          </Button>

        </div>
      </div>

    </section>
  );
}
