"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faIndianRupeeSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Types ─────────────────────────────────────────────────────────────────────

type SessionStatus = "Popular" | "Few Spots Left" | "Trending" | "New";

type Session = {
  id: string;
  expert: { name: string; role: string; initials: string; avatar: string };
  topic: string;
  date: string;
  time: string;
  price: number;
  status: SessionStatus;
  category: "Design" | "Engineering" | "Career";
};

const FILTERS = ["All", "Design", "Engineering", "Career"] as const;
type Filter = (typeof FILTERS)[number];

// ── Data ──────────────────────────────────────────────────────────────────────

const SESSIONS: Session[] = [
  {
    id: "s1",
    expert: { name: "Sarah Johnson", role: "Senior Product Designer @ Google", initials: "SJ", avatar: "/creator-profiles/raj.png" },
    topic: "UI/UX Portfolio Review",
    date: "June 14", time: "7:00 PM IST", price: 999,
    status: "Popular", category: "Design",
  },
  {
    id: "s2",
    expert: { name: "Rahul Verma", role: "Frontend Engineer @ Microsoft", initials: "RV", avatar: "/creator-profiles/raj.png" },
    topic: "React Interview Preparation",
    date: "June 15", time: "6:30 PM IST", price: 799,
    status: "Few Spots Left", category: "Engineering",
  },
  {
    id: "s3",
    expert: { name: "Priya Sharma", role: "Engineering Manager @ Amazon", initials: "PS", avatar: "/creator-profiles/raj.png" },
    topic: "System Design Fundamentals",
    date: "June 16", time: "8:00 PM IST", price: 1299,
    status: "Trending", category: "Engineering",
  },
  {
    id: "s4",
    expert: { name: "Arjun Mehta", role: "Senior Software Engineer @ Adobe", initials: "AM", avatar: "/creator-profiles/raj.png" },
    topic: "Career Growth for Developers",
    date: "June 17", time: "5:00 PM IST", price: 699,
    status: "New", category: "Career",
  },
];

const STATUS_CLASS: Record<SessionStatus, string> = {
  "Popular":        "border-primary/30 bg-primary/10 text-primary",
  "Few Spots Left": "border-destructive/30 bg-destructive/10 text-destructive",
  "Trending":       "border-primary/30 bg-primary/10 text-primary",
  "New":            "border-border bg-secondary text-secondary-foreground",
};

const STATUS_DOT: Record<SessionStatus, string> = {
  "Popular":        "bg-primary",
  "Few Spots Left": "animate-pulse bg-destructive",
  "Trending":       "bg-primary",
  "New":            "bg-muted-foreground",
};

// ── Expert avatar ─────────────────────────────────────────────────────────────

function ExpertAvatar({ expert }: { expert: Session["expert"] }): React.ReactElement {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative shrink-0">
      {!errored ? (
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
          <Image
            src={expert.avatar}
            alt={expert.name}
            fill
            className="object-cover"
            sizes="48px"
            onError={() => setErrored(true)}
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-primary/10 text-xs font-bold text-primary">
          {expert.initials}
        </div>
      )}
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-primary" />
    </div>
  );
}

// ── Session card ──────────────────────────────────────────────────────────────

function SessionCard({ session }: { session: Session }): React.ReactElement {
  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 [will-change:transform] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_40px_oklch(0.543_0.093_177_/_0.12)] sm:p-6">

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Expert */}
      <div className="flex min-w-0 items-center gap-3">
        <ExpertAvatar expert={session.expert} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight text-foreground">
            {session.expert.name}
          </p>
          <p className="truncate text-[11px] leading-snug text-muted-foreground">
            {session.expert.role}
          </p>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Topic */}
      <div className="flex-1">
        <p className="text-label mb-1.5 text-primary/60">Session</p>
        <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
          {session.topic}
        </h3>
      </div>

      {/* Date / Time + Price */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3 shrink-0 text-primary/50" />
            {session.date}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FontAwesomeIcon icon={faClock} className="h-3 w-3 shrink-0 text-primary/50" />
            {session.time}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 text-foreground">
          <FontAwesomeIcon icon={faIndianRupeeSign} className="h-3 w-3" />
          <span className="text-lg font-bold leading-none sm:text-xl">
            {session.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Status + CTA */}
      <div className="flex items-center justify-between gap-2">
        <span className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
          STATUS_CLASS[session.status],
        )}>
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_DOT[session.status])} />
          <span className="truncate">{session.status}</span>
        </span>

        <Button
          variant="ghost"
          size="sm"
          aria-label={`Book ${session.topic} with ${session.expert.name}`}
          className="h-auto shrink-0 gap-1.5 p-0 text-xs text-primary hover:bg-transparent hover:text-primary/70 sm:text-sm"
        >
          Book
          <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function UpcomingSessions(): React.ReactElement {
  const sectionRef  = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = activeFilter === "All"
    ? SESSIONS
    : SESSIONS.filter((s) => s.category === activeFilter);

  useGSAP(
    () => {
      gsap.fromTo(".us-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="dark section-py relative bg-background">

      {/* Smaller blobs — no overflow-hidden clipping cost, reduced blur radius */}
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/6 blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-primary/6 blur-2xl" />

      <div className="page-container relative">

        <div className="us-header mx-auto mb-10 max-w-xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <p className="text-label text-primary">Upcoming Sessions</p>
          </div>
          <h2 className="text-h1 text-balance text-foreground">
            Book your next{" "}
            <span className="text-primary">learning session</span>
          </h2>
          <p className="text-body mx-auto mt-4 max-w-sm text-muted-foreground">
            Expert-led 1:1 sessions happening this week. Learn from professionals through personalized guidance.
          </p>
        </div>

        {/* Filter pills */}
        <div className="us-header mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={activeFilter === filter ? "default" : "secondary"}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length === 1 ? (
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <SessionCard session={filtered[0]} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {filtered.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}

        <div className="us-header mt-10 flex justify-center">
          <Button size="lg" className="rounded-full px-8 font-semibold">
            Explore more sessions
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
