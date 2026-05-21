"use client";

import { FaSearch, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const QUICK_FILTERS = [
  "UI/UX Design",
  "Development",
  "Marketing",
  "Finance",
  "Photography",
  "Music",
];

// Floating left card — course preview
function FloatingCourseCard() {
  return (
    <Card className="shadow-xl w-[200px] select-none gap-3">
      <div className="mx-3 mt-1 h-24 rounded-lg bg-gradient-to-br from-brand-ghost to-accent-indigo flex items-center justify-center">
        <span className="text-3xl">🎨</span>
      </div>
      <CardContent className="flex flex-col gap-2 pb-3">
        <p className="text-[12px] font-semibold text-foreground line-clamp-2 leading-tight">
          UI/UX Design Masterclass
        </p>
        <div className="flex items-center gap-1">
          <FaStar className="size-3 text-yellow-400" />
          <span className="text-[11px] text-muted-foreground">4.9 · 2.4k students</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-foreground">₹1,499</span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Design</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Floating right card — expert preview
function FloatingExpertCard() {
  return (
    <Card className="shadow-xl w-[190px] select-none">
      <CardContent className="flex flex-col gap-3 py-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-brand-ghost text-brand font-bold text-sm">A</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-[12px] font-semibold text-foreground truncate">Arjun Sharma</p>
            <p className="text-[11px] text-muted-foreground truncate">Product Designer</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaStar className="size-3 text-yellow-400" />
            <span className="text-[11px] font-medium text-foreground">4.9</span>
          </div>
          <span className="text-[11px] text-muted-foreground">312 sessions</span>
        </div>
        <Button variant="brand" size="default" className="w-full text-[11px] h-7 rounded-full">
          Book Session
        </Button>
      </CardContent>
    </Card>
  );
}

export default function HeroSection() {
  return (
    <section className="section relative overflow-hidden min-h-[600px]">
      {/* Background glow */}
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden />

      {/* Floating left card */}
      <div className="hidden lg:block absolute left-[4vw] xl:left-[6vw] top-[50%] -translate-y-[60%] rotate-[-4deg] z-10">
        <FloatingCourseCard />
      </div>

      {/* Floating right card */}
      <div className="hidden lg:block absolute right-[4vw] xl:right-[6vw] top-[50%] -translate-y-[55%] rotate-[4deg] z-10">
        <FloatingExpertCard />
      </div>

      {/* Center content */}
      <div className="container-inner flex flex-col items-center text-center gap-7 pt-6 pb-8 max-w-hero-text">
        <span className="section-badge">India's Creator Learning Platform</span>

        <h1 className="text-hero-sm sm:text-hero leading-[1.15] font-extrabold tracking-tight">
          Learn directly from people{" "}
          <span className="text-brand-gradient">who've already</span>{" "}
          done it.
        </h1>

        <p className="body text-[16px] max-w-copy">
          Discover courses, workshops &amp; 1-on-1 sessions from verified creators
          across design, tech, marketing, and more.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-search flex items-center bg-card border border-border rounded-full shadow-sm overflow-hidden pl-5 pr-1.5 py-1.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all">
          <FaSearch className="size-4 text-muted-foreground shrink-0 mr-3" />
          <Input
            type="text"
            placeholder="Search courses, experts, topics…"
            className="flex-1 border-0 bg-transparent text-[15px] shadow-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-auto py-0 px-0 min-w-0"
          />
          <Button variant="brand" size="default" className="shrink-0 rounded-full px-5 h-9">
            Search
          </Button>
        </div>

        {/* Quick filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[13px] text-muted-foreground shrink-0">Trending:</span>
          {QUICK_FILTERS.map((label) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              className="rounded-full text-[13px] hover:border-brand hover:text-brand hover:bg-brand-faint"
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
