import type { Metadata } from "next";
import HeroSection from "@/components/sections/hero-section";
import CreonexIdeology from "@/components/sections/creonex-ideology";
import CinematicGallery from "@/components/sections/creators-gallery";
import CreatorTimeline from "@/components/sections/creator-timeline";
import ProductWalkthrough from "@/components/sections/product-walkthrough";

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
      <CreatorTimeline />
      <ProductWalkthrough />
    </main>
  );
}
