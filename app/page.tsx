import type { Metadata } from "next";
import HeroSection from "@/components/sections/hero-section";
import TickerWall from "@/components/sections/ticker-wall";

export const metadata: Metadata = {
  title: "Creonex — The Platform for Serious Creators",
  description:
    "Sell courses, host sessions, and build your community. One platform built for micro-creators across India.",
};

export default function Page() {
  return (
    <main>
      <HeroSection />
      <TickerWall />
    </main>
  );
}
