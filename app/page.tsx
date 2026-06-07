import type { Metadata } from "next";
import MarketingShell from "@/components/layout/marketing-shell";
import UserHero from "@/components/landing/user/user-hero";
import CategoryGrid from "@/components/landing/user/category-grid";
import LearningShowcase from "@/components/landing/user/learning-showcase";
import HowItWorks from "@/components/landing/user/how-it-works";
import CreatorButton from "@/components/landing/user/creator-button";
import CinematicGallery from "@/components/landing/shared/creators-gallery";
import UpcomingSessions from "@/components/landing/user/upcoming-sessions";
import PaymentsTrust from "@/components/landing/user/payments-trust";
import Testimonials from "@/components/landing/user/testimonials";
import Faqs from "@/components/landing/shared/faqs";

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
        <CategoryGrid />
        <CinematicGallery showViewProfile />
        <LearningShowcase />
        <HowItWorks />
        <UpcomingSessions />
        <PaymentsTrust />
        <CreatorButton />
        <Testimonials />
        <Faqs />
      </main>
    </MarketingShell>
  );
}
