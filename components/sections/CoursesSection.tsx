import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";
import CourseCard from "@/components/shared/CourseCard";
import { FEATURED_COURSES } from "@/constants/data";

export default function CoursesSection() {
  return (
    <section id="courses" className="section section-surface">
      <div className="container-inner flex flex-col gap-12">
        <SectionHeader
          badge="Featured Courses"
          heading="Top-rated courses by real pros"
          subtext="Self-paced, project-based learning from verified experts. No fluff — just skills you can actually use."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COURSES.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="md" className="rounded-full">
            Browse All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
