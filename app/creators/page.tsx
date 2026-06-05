import type { Metadata } from "next";
import MarketingShell from "@/components/layout/marketing-shell";
import HeroSection from "@/components/sections/creator/hero-section";
import CreonexIdeology from "@/components/sections/creator/creonex-ideology";
import CinematicGallery from "@/components/sections/shared/creators-gallery";
import CreatorTimeline from "@/components/sections/creator/creator-timeline";
import ProductWalkthrough from "@/components/sections/creator/product-walkthrough";
import HowItWorks from "@/components/sections/creator/how-it-works";
import MonetizeSection from "@/components/sections/creator/monetize-section";
import PlatformInfrastructure from "@/components/sections/creator/platform-infrastructure";
import Faqs from "@/components/sections/shared/faqs";
import Testimonials from "@/components/sections/creator/testimonials";

export const metadata: Metadata = {
  title: "For Creators — Creonex",
  description:
    "Sell courses, host sessions, and build your community. One platform built for micro-creators across India.",
};

export default function CreatorLandingPage(): React.ReactElement {
  return (
    <MarketingShell>
      <main>
        <HeroSection />
        <CreonexIdeology />
        <CinematicGallery />
        <MonetizeSection />
        <PlatformInfrastructure />
        <ProductWalkthrough />
        <CreatorTimeline />
        <HowItWorks />
        <Testimonials />
        <Faqs />
      </main>
    </MarketingShell>
  );
}
