import type { Metadata } from "next";
import MarketingShell from "@/components/layout/marketing-shell";
import HeroSection from "@/components/landing/creator/hero-section";
import CreonexIdeology from "@/components/landing/creator/creonex-ideology";
import CinematicGallery from "@/components/landing/shared/creators-gallery";
import CreatorTimeline from "@/components/landing/creator/creator-timeline";
import ProductWalkthrough from "@/components/landing/creator/product-walkthrough";
import HowItWorks from "@/components/landing/creator/how-it-works";
import MonetizeSection from "@/components/landing/creator/monetize-section";
import PlatformInfrastructure from "@/components/landing/creator/platform-infrastructure";
import Faqs from "@/components/landing/shared/faqs";
import Testimonials from "@/components/landing/creator/testimonials";

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
