import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";
import ExpertCard from "@/components/shared/ExpertCard";
import { FEATURED_EXPERTS } from "@/constants/data";

export default function ExpertsSection() {
  return (
    <section id="experts" className="section">
      <div className="container-inner flex flex-col gap-12">
        <SectionHeader
          badge="Top Mentors"
          heading="Learn from India's best"
          subtext="Every expert is verified, rated, and ready to help you grow. Book a session in minutes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_EXPERTS.map((expert) => (
            <ExpertCard key={expert.id} {...expert} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="md" className="rounded-full">
            View All Experts
          </Button>
        </div>
      </div>
    </section>
  );
}
