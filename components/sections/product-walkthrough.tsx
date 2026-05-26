"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "sessions" | "courses" | "community";

type Tab = {
  id: TabId;
  label: string;
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  {
    id: "sessions",
    label: "Sessions",
    heading: "Let experts book you — on your terms",
    description:
      "Set your availability once. Students find you, pick a slot, and pay — no back-and-forth. Your calendar, fully yours.",
    primaryCta: "Start Taking Sessions",
    secondaryCta: "See How It Works",
    image: "/creator-profiles/sessions.png",
  },
  {
    id: "courses",
    label: "Courses",
    heading: "Build once. Earn every week.",
    description:
      "Upload your curriculum, set a price, and go live. Full chapter control, progress tracking, and a checkout that converts.",
    primaryCta: "Create Your Course",
    secondaryCta: "Browse Courses",
    image: "/creator-profiles/create-course.png",
  },
  {
    id: "community",
    label: "Community",
    heading: "Your students, your feed, your space.",
    description:
      "A private community lives right next to your courses. Posts, announcements, member Q&A — all without leaving Creonex.",
    primaryCta: "Build Your Community",
    secondaryCta: "See an Example",
    image: "/creator-profiles/join-community.png",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductWalkthrough(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabId>("sessions");
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  const switchTab = (id: TabId) => {
    if (id === activeTab) return;
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.16,
      ease: "power2.in",
      onComplete: () => setActiveTab(id),
    });
  };

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
    );
  }, [activeTab]);

  const active = TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="section-py">
      <div className="page-container">
        {/* Dark container */}
        <div className="overflow-hidden rounded-3xl bg-[#0F0E0D] px-6 py-10 md:px-12 md:py-14">

          {/* Tab strip */}
          <div className="mb-10 overflow-x-auto scrollbar-hide">
            <Tabs
              value={activeTab}
              onValueChange={(v: string | null) => {
                if (v) switchTab(v as TabId);
              }}
            >
              <TabsList
                variant="default"
                className="h-auto w-max gap-0 rounded-none border-b border-white/10 bg-transparent p-0"
              >
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="h-auto cursor-pointer rounded-none border-b-2 border-transparent px-6 pb-3 pt-0 text-sm font-medium text-stone-400 transition-all duration-200 hover:text-white data-active:border-primary data-active:bg-transparent data-active:text-white data-active:shadow-none"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Content — GSAP target */}
          <div
            ref={contentRef}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {/* Left — copy */}
            <div>
              <h2 className="text-h1 text-balance text-white">
                {active.heading}
              </h2>
              <p className="text-body mt-4 max-w-md text-stone-400">
                {active.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/signup" />}
                >
                  {active.primaryCta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  className="border-white/15 bg-transparent text-white hover:bg-white/8 hover:text-white"
                  render={<Link href="/courses" />}
                >
                  {active.secondaryCta}
                </Button>
              </div>
            </div>

            {/* Right — product screenshot */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
              <Image
                src={active.image}
                alt={active.label}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}