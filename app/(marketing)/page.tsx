import type { Metadata } from "next";
import PageTransition from "@/components/shared/page-transition";
import UserHero from "@/components/sections/user/user-hero";
import CategoryGrid from "@/components/sections/user/category-grid";
import LearningShowcase from "@/components/sections/user/learning-showcase";
import HowItWorks from "@/components/sections/user/how-it-works";
import CreatorButton from "@/components/sections/user/creator-button";
import CinematicGallery from "@/components/sections/creator/creators-gallery";
import UpcomingSessions from "@/components/sections/user/upcoming-sessions";
import PaymentsTrust from "@/components/sections/user/payments-trust";
import Testimonials from "@/components/sections/user/testimonials";
import Faqs from "@/components/sections/creator/faqs";

export const metadata: Metadata = {
  title: "Creonex — Learn from India's Best Creators",
  description:
    "Discover courses and book 1-on-1 mentorship sessions with verified experts across design, tech, marketing, and more.",
};

export default function Page(): React.ReactElement {
  return (
    <PageTransition>
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
    </PageTransition>
  );
}
