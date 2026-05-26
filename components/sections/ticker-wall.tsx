"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Creator = {
  id: string;
  name: string;
  niche: string;
  earning: string;
  quote: string;
  initials: string;
  avatarBg: string;
  avatar: string;
};

const ROW_ONE: Creator[] = [
  {
    id: "1",
    name: "Priya Sharma",
    niche: "UI/UX Design",
    earning: "₹18,400",
    quote: "Creonex changed how I monetise my skills.",
    initials: "PS",
    avatarBg: "bg-rose-200",
    avatar: "",
  },
  {
    id: "2",
    name: "Arjun Mehta",
    niche: "Full-Stack Dev",
    earning: "₹24,200",
    quote: "My students find me here every week.",
    initials: "AM",
    avatarBg: "bg-sky-200",
    avatar: "",
  },
  {
    id: "3",
    name: "Kavya Nair",
    niche: "Content Strategy",
    earning: "₹12,800",
    quote: "First platform that actually pays creators.",
    initials: "KN",
    avatarBg: "bg-emerald-200",
    avatar: "",
  },
  {
    id: "4",
    name: "Rohan Das",
    niche: "Motion Graphics",
    earning: "₹31,600",
    quote: "My course sold out in 48 hours.",
    initials: "RD",
    avatarBg: "bg-orange-200",
    avatar: "",
  },
  {
    id: "5",
    name: "Sneha Kapoor",
    niche: "Brand Identity",
    earning: "₹9,200",
    quote: "Finally a home for Indian creators.",
    initials: "SK",
    avatarBg: "bg-purple-200",
    avatar: "",
  },
  {
    id: "6",
    name: "Tanmay Bhat",
    niche: "Video Production",
    earning: "₹27,000",
    quote: "Sessions fill up every Sunday night.",
    initials: "TB",
    avatarBg: "bg-yellow-200",
    avatar: "",
  },
];

const ROW_TWO: Creator[] = [
  {
    id: "7",
    name: "Vikram Singh",
    niche: "No-Code Tools",
    earning: "₹15,000",
    quote: "Sold 60 seats without any marketing.",
    initials: "VS",
    avatarBg: "bg-pink-200",
    avatar: "",
  },
  {
    id: "8",
    name: "Ananya Rao",
    niche: "Digital Marketing",
    earning: "₹22,500",
    quote: "1-on-1 sessions fill up instantly.",
    initials: "AR",
    avatarBg: "bg-blue-200",
    avatar: "",
  },
  {
    id: "9",
    name: "Karthik Iyer",
    niche: "Photography",
    earning: "₹8,900",
    quote: "Great platform for niche creators.",
    initials: "KI",
    avatarBg: "bg-amber-200",
    avatar: "",
  },
  {
    id: "10",
    name: "Meera Pillai",
    niche: "Yoga & Wellness",
    earning: "₹19,700",
    quote: "Built a community of 800 learners.",
    initials: "MP",
    avatarBg: "bg-green-200",
    avatar: "",
  },
  {
    id: "11",
    name: "Dev Agarwal",
    niche: "SaaS & Products",
    earning: "₹41,200",
    quote: "Best ROI of any platform I've tried.",
    initials: "DA",
    avatarBg: "bg-red-200",
    avatar: "",
  },
  {
    id: "12",
    name: "Ritu Verma",
    niche: "Copywriting",
    earning: "₹13,600",
    quote: "My workshop waitlist stays full.",
    initials: "RV",
    avatarBg: "bg-violet-200",
    avatar: "",
  },
];

type CreatorCardProps = {
  creator: Creator;
  onEnter: () => void;
  onLeave: () => void;
};

function CreatorCard({
  creator,
  onEnter,
  onLeave,
}: CreatorCardProps): React.ReactElement {
  return (
    <Card
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative w-44 flex-shrink-0 cursor-default select-none overflow-hidden rounded-2xl bg-[#252220] p-5 ring-white/8 transition-transform duration-200 ease-out hover:scale-[1.04] hover:ring-white/20"
    >
      {/* Default state */}
      <div className="flex flex-col items-center text-center transition-opacity duration-200 group-hover:opacity-0">
        <Avatar className="size-16 ring-4 ring-white/8">
          {creator.avatar ? (
            <AvatarImage src={creator.avatar} alt={creator.name} />
          ) : null}
          <AvatarFallback
            className={`${creator.avatarBg} text-lg font-bold text-stone-800`}
          >
            {creator.initials}
          </AvatarFallback>
        </Avatar>

        <p className="mt-3 text-sm font-semibold text-white">{creator.name}</p>

        <Badge
          variant="outline"
          className="mt-1.5 border-white/10 bg-white/5 text-stone-400"
        >
          {creator.niche}
        </Badge>

        <p className="mt-4 text-2xl font-bold text-primary">
          {creator.earning}
        </p>
        <p className="text-[11px] text-stone-600">earned this week</p>
      </div>

      {/* Hover overlay — quote */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[#1e1c1a] px-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="mb-3 text-xs text-primary/60"
        />
        <p className="text-center text-sm leading-snug text-stone-200">
          {creator.quote}
        </p>
        <p className="mt-3 text-xs text-stone-500">— {creator.name}</p>
      </div>
    </Card>
  );
}

export default function TickerWall(): React.ReactElement {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const tween1Ref = useRef<gsap.core.Tween | null>(null);
  const tween2Ref = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tween1Ref.current = gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      tween2Ref.current = gsap.fromTo(
        row2Ref.current,
        { xPercent: -50 },
        { xPercent: 0, duration: 40, ease: "none", repeat: -1 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-py overflow-hidden bg-foreground">
      <div className="page-container mb-14 text-center">
        <p className="text-label text-stone-500">Social Proof</p>
        <h2 className="text-h2 mt-2 text-white">
          Real creators. Real earnings. Every week.
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div ref={row1Ref} className="mb-4 flex w-max gap-4">
          {[...ROW_ONE, ...ROW_ONE].map((creator, i) => (
            <CreatorCard
              key={`r1-${creator.id}-${i}`}
              creator={creator}
              onEnter={() => tween1Ref.current?.pause()}
              onLeave={() => tween1Ref.current?.resume()}
            />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div ref={row2Ref} className="flex w-max gap-4">
          {[...ROW_TWO, ...ROW_TWO].map((creator, i) => (
            <CreatorCard
              key={`r2-${creator.id}-${i}`}
              creator={creator}
              onEnter={() => tween2Ref.current?.pause()}
              onLeave={() => tween2Ref.current?.resume()}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
