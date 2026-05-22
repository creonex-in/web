"use client";

import { FaSearch, FaStar, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const QUICK_FILTERS = ["All", "CAT Prep", "Design", "Coding", "Finance", "Fitness", "Animation"];

function ExpertAvailableCard() {
  return (
    <Card className="shadow-xl w-[200px] select-none">
      <CardContent className="flex flex-col gap-3 py-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-brand-ghost text-brand font-bold text-sm">PK</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-[12px] font-semibold text-foreground truncate">Priya K.</p>
            <p className="text-[11px] text-muted-foreground truncate">UX Designer</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="size-3 text-yellow-400" />
          <span className="text-[11px] font-medium text-foreground">4.6</span>
          <span className="text-[11px] text-muted-foreground">· 12k learners</span>
        </div>
        <Badge variant="success" className="text-[10px] w-fit rounded-full">
          Available
        </Badge>
      </CardContent>
    </Card>
  );
}

function LiveWorkshopCard() {
  return (
    <Card className="shadow-xl w-[200px] select-none">
      <CardContent className="flex flex-col gap-1.5 py-3.5">
        <span className="text-[9px] font-bold tracking-widest uppercase text-brand">Live Workshop</span>
        <p className="text-[12px] font-semibold text-foreground leading-tight">CAT Quant Mastery</p>
        <p className="text-[11px] text-muted-foreground">Today, 7PM</p>
        <Badge variant="destructive" className="text-[10px] w-fit rounded-full mt-0.5">
          Live Soon
        </Badge>
      </CardContent>
    </Card>
  );
}

function ExpertEarningsCard() {
  return (
    <Card className="shadow-xl w-[200px] select-none">
      <CardContent className="flex flex-col gap-3 py-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-accent-indigo/20 text-accent-indigo font-bold text-sm">AR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-[12px] font-semibold text-foreground truncate">Arjun R.</p>
            <p className="text-[11px] text-muted-foreground truncate">Finance &amp; Investing</p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-bold text-foreground">₹2,400 earned today</p>
          <p className="text-[11px] text-emerald-500 font-medium">↑ 1.54% this week</p>
        </div>
      </CardContent>
    </Card>
  );
}

function NewLearnersCard() {
  return (
    <Card className="shadow-xl w-[180px] select-none">
      <CardContent className="flex flex-col gap-2 py-3.5">
        <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground">Just Joined</span>
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2 shrink-0">
            {(["S", "M", "R"] as const).map((letter, i) => (
              <Avatar key={letter} className="size-7 border-2 border-card">
                <AvatarFallback
                  className={`text-[10px] font-bold ${i === 0
                    ? "bg-brand-ghost text-brand"
                    : i === 1
                      ? "bg-accent-indigo/20 text-accent-indigo"
                      : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {letter}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">3 new learners today</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HeroSection() {
  return (
    <section className="section relative overflow-hidden min-h-[620px]">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden />

      {/* Left — top */}
      <div className="hidden xl:block absolute left-[3vw] xl:left-[5vw] top-[32%] -translate-y-1/2 rotate-[-4deg] z-10">
        <ExpertAvailableCard />
      </div>
      {/* Left — bottom */}
      <div className="hidden xl:block absolute left-[3vw] xl:left-[5vw] top-[70%] -translate-y-1/2 rotate-[-3deg] z-10">
        <LiveWorkshopCard />
      </div>

      {/* Right — top */}
      <div className="hidden xl:block absolute right-[3vw] xl:right-[5vw] top-[32%] -translate-y-1/2 rotate-[4deg] z-10">
        <ExpertEarningsCard />
      </div>
      {/* Right — bottom */}
      <div className="hidden xl:block absolute right-[3vw] xl:right-[5vw] top-[70%] -translate-y-1/2 rotate-[3deg] z-10">
        <NewLearnersCard />
      </div>

      {/* Center content */}
      <div className="container-inner flex flex-col items-center text-center gap-7 pt-6 pb-8 max-w-hero-text">

        {/* Learn / Earn toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-full p-1">
          <Button variant="brand" size="sm" className="rounded-full px-7 h-8 text-[13px]">
            Learn
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full px-7 h-8 text-[13px] text-muted-foreground hover:bg-transparent">
            Earn
          </Button>
        </div>

        <h1 className="text-hero-sm sm:text-hero leading-[1.15] font-extrabold tracking-tight">
          Learn directly from people{" "}
          <span className="text-brand-gradient">who've already</span>{" "}
          done it.
        </h1>

        <p className="body text-[16px] max-w-copy">
          Discover expert creators across careers, finance, coding, design,
          CAT prep, and more — curated by quality, not follower count.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-search flex items-center bg-card border border-border rounded-full shadow-sm overflow-hidden pl-5 pr-1.5 py-1.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
          <FaSearch className="size-4 text-muted-foreground shrink-0 mr-3" />
          <Input
            type="text"
            placeholder="Search UI/UX, CAT Prep, Finance, Coding…"
            className="flex-1 border-0 bg-transparent text-[15px] shadow-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-auto py-0 px-0 min-w-0"
          />
          <Button variant="brand" size="default" className="shrink-0 rounded-full w-9 h-9 p-0">
            <FaArrowRight className="size-3.5" />
          </Button>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_FILTERS.map((label, i) => (
            <Button
              key={label}
              variant={i === 0 ? "brand" : "outline"}
              size="sm"
              className={`rounded-full text-[13px] ${i !== 0 ? "hover:border-brand hover:text-brand hover:bg-brand-faint" : ""}`}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Trust row */}
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span><strong className="text-foreground font-semibold">50K+</strong> Learners</span>
          <Separator orientation="vertical" className="h-4" />
          <span><strong className="text-foreground font-semibold">1,200+</strong> Experts</span>
          <Separator orientation="vertical" className="h-4" />
          <span><strong className="text-foreground font-semibold">4.8★</strong> Rating</span>
        </div>
      </div>
    </section>
  );
}
