import type { Metadata } from "next";
import HeroSection from "@/components/sections/hero-section";
import CreonexIdeology from "@/components/sections/creonex-ideology";
import CinematicGallery from "@/components/sections/creators-gallery";
import CreatorTimeline from "@/components/sections/creator-timeline";
import ProductWalkthrough from "@/components/sections/product-walkthrough";
import HowItWorks from "@/components/sections/how-it-works";
import Faqs from "@/components/sections/faqs";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Creonex — The Platform for Serious Creators",
  description:
    "Sell courses, host sessions, and build your community. One platform built for micro-creators across India.",
};

export default function Page() {
  return (
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
  );
}
