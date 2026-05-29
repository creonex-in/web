import type { Metadata } from "next";
import PageTransition from "@/components/shared/page-transition";
import HeroSection from "@/components/sections/creator/hero-section";
import CreonexIdeology from "@/components/sections/creator/creonex-ideology";
import CinematicGallery from "@/components/sections/creator/creators-gallery";
import CreatorTimeline from "@/components/sections/creator/creator-timeline";
import ProductWalkthrough from "@/components/sections/creator/product-walkthrough";
import HowItWorks from "@/components/sections/creator/how-it-works";
import Faqs from "@/components/sections/creator/faqs";
import Testimonials from "@/components/sections/creator/testimonials";

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
