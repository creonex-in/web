import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import CoursesSection from "@/components/sections/CoursesSection";
import ExpertsSection from "@/components/sections/ExpertsSection";
import WhyCreonexSection from "@/components/sections/WhyCreonexSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

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
