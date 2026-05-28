import type { Metadata } from "next";
import PageTransition from "@/components/shared/page-transition";
import UserHero from "@/components/sections/user-landing-sections/user-hero";
import CreatorButton from "@/components/sections/user-landing-sections/creator-button";
import CinematicGallery from "@/components/sections/creator-landing-sections/creators-gallery";
import Testimonials from "@/components/sections/creator-landing-sections/testimonials";
import Faqs from "@/components/sections/creator-landing-sections/faqs";

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
        <CreatorButton />
        <Testimonials />
        <CinematicGallery />
        <Faqs />
      </main>
    </PageTransition>
  );
}
