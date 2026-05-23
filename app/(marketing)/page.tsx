import HeroSection from "@/components/sections/landing-sections/hero-section";
import StatsSection from "@/components/sections/landing-sections/stats-section";
import CategoriesSection from "@/components/sections/landing-sections/categories-section";
import CoursesSection from "@/components/sections/landing-sections/courses-section";
import ExpertsSection from "@/components/sections/landing-sections/experts-section";
import WhyCreonexSection from "@/components/sections/landing-sections/why-creonex-section";
import HowItWorksSection from "@/components/sections/landing-sections/how-it-works-section";
import TestimonialsSection from "@/components/sections/landing-sections/testimonial-section";
import FAQSection from "@/components/sections/landing-sections/faq-section";
import CTASection from "@/components/sections/landing-sections/cta-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <CoursesSection />
      <ExpertsSection />
      <WhyCreonexSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
