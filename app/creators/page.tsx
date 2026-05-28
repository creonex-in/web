import type { Metadata } from "next";
import PageTransition from "@/components/shared/page-transition";
import HeroSection from "@/components/sections/creator-landing-sections/hero-section";
import CreonexIdeology from "@/components/sections/creator-landing-sections/creonex-ideology";
import CinematicGallery from "@/components/sections/creator-landing-sections/creators-gallery";
import CreatorTimeline from "@/components/sections/creator-landing-sections/creator-timeline";
import ProductWalkthrough from "@/components/sections/creator-landing-sections/product-walkthrough";
import HowItWorks from "@/components/sections/creator-landing-sections/how-it-works";
import Faqs from "@/components/sections/creator-landing-sections/faqs";
import Testimonials from "@/components/sections/creator-landing-sections/testimonials";

export const metadata: Metadata = {
  title: "For Creators — Creonex",
  description:
    "Sell courses, host sessions, and build your community. One platform built for micro-creators across India.",
};

export default function CreatorsPage(): React.ReactElement {
  return (
    <PageTransition>
      <main>
        <HeroSection />
        <CreonexIdeology />
        <CinematicGallery />
        <ProductWalkthrough />
        <CreatorTimeline />
        <HowItWorks />
        <Testimonials />
        <Faqs />
      </main>
    </PageTransition>
  );
}
