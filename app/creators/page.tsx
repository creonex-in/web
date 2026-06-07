import type { Metadata } from "next";
import CreatorShell from "@/components/layout/creator-shell";
import HeroSection from "@/components/landing/creator/hero-section";
import CreatorTrustSection from "@/components/landing/creator/creator-trust-section";
import MonetizeSection from "@/components/landing/creator/monetize-section";
import IndiaFirstPayments from "@/components/landing/creator/india-first-payments";
import MobileAppSection from "@/components/landing/creator/mobile-app-section";
import CollaborationMarketplace from "@/components/landing/creator/collaboration-marketplace";
import CreatorTimeline from "@/components/landing/creator/creator-timeline";
import Testimonials from "@/components/landing/user/testimonials";
import Faqs from "@/components/landing/shared/faqs";
import CreatorFinalCta from "@/components/landing/creator/creator-final-cta";

export const metadata: Metadata = {
  title: "For Creators — Creonex",
  description:
    "Sell courses, host sessions, and build your community. One platform built for micro-creators across India.",
};

const CREATOR_TESTIMONIALS = [
  {
    id: "c5",
    name: "Arjun D.",
    niche: "Marketing Consultant",
    quote: "Before Creonex, I was duct-taping together five different platforms. It was a nightmare of broken integrations and dropped payments. Since migrating my entire workflow here, my operational costs have dropped to near zero and my community engagement has skyrocketed because everything is finally in one unified, beautiful place.",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "c3",
    name: "Rohan K.",
    niche: "Finance Creator",
    quote: "I finally cancelled my 5 other software subscriptions. Having my newsletter, courses, and community in one unified OS is saving me ₹25,000 a month.",
    avatarSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "c1",
    name: "Vikram S.",
    niche: "Tech YouTuber",
    quote: "Creonex completely changed how I monetize my audience. I moved all my courses here and the conversions are 3x higher than my old platform.",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "c2",
    name: "Aditi R.",
    niche: "Design Mentor",
    quote: "The 1:1 session booking is flawless. Zero dropped calls, calendar syncing works magically, and my payouts hit my account instantly.",
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "c4",
    name: "Neha P.",
    niche: "Fitness Coach",
    quote: "Earning multiple streams of income has never been this easy. The analytics give me deep insights into what my audience actually wants to buy.",
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "c6",
    name: "Priya M.",
    niche: "Language Tutor",
    quote: "Simply the best decision I've made for my personal brand.",
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
];

export default function CreatorLandingPage(): React.ReactElement {
  return (
    <CreatorShell>
      <main>
        <HeroSection />
        <CreatorTrustSection />
        <MonetizeSection />
        <CollaborationMarketplace />
        <CreatorTimeline />
        <IndiaFirstPayments />
        <MobileAppSection />
        <Testimonials 
          heading="Loved by Top Creators" 
          subheading="SUCCESS STORIES" 
          testimonials={CREATOR_TESTIMONIALS} 
        />
        <Faqs />
        <CreatorFinalCta />
      </main>
    </CreatorShell>
  );
}
