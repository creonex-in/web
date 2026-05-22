import SectionHeader from "@/components/shared/section-header";
import CourseCard from "@/components/shared/course-card";
import CustomButton from "@/components/shared/custom-button";
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
          <CustomButton>
            Browse All Courses
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
