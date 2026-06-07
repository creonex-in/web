"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const WAYS_TO_EARN = [
  {
    id: "calls",
    title: "1:1 Calls",
    tagline: "Live consultation sessions",
    description: "Offer personalized one-on-one sessions and get booked directly through your profile.",
    features: [
      "Calendar availability management",
      "Google Calendar sync",
      "Automatic meeting links",
      "Booking confirmations & reminders",
      "Secure escrow payments",
      "No-show protection",
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-500/20 to-blue-600/0",
  },
  {
    id: "courses",
    title: "Courses",
    tagline: "Pre-recorded structured learning",
    description: "Create and sell self-paced courses that students can access anytime.",
    features: [
      "Course & module builder",
      "Video hosting & streaming",
      "Student progress tracking",
      "Completion certificates",
      "Multiple lesson formats",
      "Refund management",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    color: "from-primary/30 to-primary/0",
  },
  {
    id: "digital",
    title: "Digital Products",
    tagline: "PDFs, templates & toolkits",
    description: "Sell downloadable resources and digital assets with instant delivery.",
    features: [
      "Multiple file format support",
      "Instant downloads",
      "Secure file access",
      "Product quantity limits",
      "File updates for buyers",
      "Download protection",
    ],
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1200&q=80",
    color: "from-emerald-500/20 to-emerald-600/0",
  },
  {
    id: "webinars",
    title: "Webinars",
    tagline: "Live group sessions at scale",
    description: "Host live workshops, masterclasses, and group learning sessions.",
    features: [
      "Seat limits",
      "Early-bird pricing",
      "Live Q&A management",
      "Session recordings",
      "Resource sharing",
      "Waitlist management",
    ],
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
    color: "from-purple-500/20 to-purple-600/0",
  },
  {
    id: "communities",
    title: "Paid Communities",
    tagline: "Recurring revenue from your tribe",
    description: "Build a private membership community with recurring subscriptions.",
    features: [
      "Monthly & yearly subscriptions",
      "Private community spaces",
      "Resource library",
      "Member engagement tools",
      "Moderation controls",
      "Revenue analytics",
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    color: "from-pink-500/20 to-pink-600/0",
  },
  {
    id: "collab",
    title: "Collaborations",
    tagline: "Automated revenue sharing",
    description: "Co-create courses, host joint webinars, or run affiliate sales with instant split payments.",
    features: [
      "Revenue split management",
      "Joint product launches",
      "Affiliate partnerships",
      "Referral tracking",
      "Automated payouts",
      "Collaboration analytics",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    color: "from-amber-500/20 to-amber-600/0",
  }
];

export default function MonetizeSection(): React.ReactElement {
  const [activeTabId, setActiveTabId] = useState(WAYS_TO_EARN[1].id); // Default to Courses
  
  const activeTab = WAYS_TO_EARN.find(t => t.id === activeTabId) || WAYS_TO_EARN[1];

  return (
    <section className="bg-background pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      <div className="page-container">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-10">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Create</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4 text-balance">
            Everything Your Audience Needs,<br/> In One Platform
          </h2>
          <p className="text-base md:text-lg font-medium text-muted-foreground max-w-2xl mx-auto text-balance">
            From your first digital download to a full-scale academy—create unlimited products, reach a wider audience, and build multiple income streams.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 border-b border-border/50 pb-px">
            {WAYS_TO_EARN.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "relative px-6 py-4 text-sm font-semibold transition-colors whitespace-nowrap outline-none",
                  activeTabId === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.title}
                {activeTabId === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-sm shadow-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Massive Card */}
        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-border/80 bg-card p-6 md:p-12 shadow-2xl overflow-hidden min-h-[500px]">
          
          {/* Bottom Ambient Glow based on active tab color */}
          <div className={cn("absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t opacity-20 blur-[100px] transition-colors duration-1000", activeTab.color)} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-12 items-center h-full"
            >
              {/* Left Content */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                  {activeTab.title}: {activeTab.tagline}
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  {activeTab.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {activeTab.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button nativeButton={false} render={<Link href="/signup" />} className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20">
                    Start Building
                  </Button>
                  <Button nativeButton={false} render={<Link href="#demo" />} variant="outline" className="rounded-full px-8 font-bold border-border bg-transparent hover:bg-muted text-foreground">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Right Image Container */}
              <div className="relative h-[350px] lg:h-[450px] w-full rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl bg-black">
                <Image
                  src={activeTab.image}
                  alt={activeTab.title}
                  fill
                  className="object-cover opacity-80 transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
