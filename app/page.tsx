import type { Metadata } from "next";
import MarketingShell from "@/components/layout/marketing-shell";
import UserHero from "@/components/landing/user/user-hero";
import CategoryGrid from "@/components/landing/user/category-grid";
import LearningShowcase from "@/components/landing/user/learning-showcase";
import HowItWorks from "@/components/landing/user/how-it-works";
import CreatorButton from "@/components/landing/user/creator-button";
import FeaturedCreators from "@/components/landing/user/featured-creators";
import Testimonials from "@/components/landing/user/testimonials";
import Faqs from "@/components/landing/shared/faqs";
import FinalCta from "@/components/landing/user/final-cta";

export const metadata: Metadata = {
  title: "Creonex — Learn from India's Best Creators",
  description:
    "Discover courses and book 1-on-1 mentorship sessions with verified experts across design, tech, marketing, and more.",
};

export default function LearnerLandingPage(): React.ReactElement {
  return (
    <MarketingShell>
      <main>
        <UserHero />
        <FeaturedCreators />
        <CategoryGrid />
        <LearningShowcase />
        <HowItWorks />
        <CreatorButton />
        <Testimonials />
        <Faqs />
        <FinalCta />
      </main>
    </MarketingShell>
  );
}
