import SectionHeader from "@/components/shared/SectionHeader";
import { CATEGORIES } from "@/constants/data";

export default function CategoriesSection() {
  return (
    <section id="explore" className="section">
      <div className="container-inner flex flex-col gap-12">
        <SectionHeader
          badge="Browse by Domain"
          heading="Explore every creative field"
          subtext="From design and development to finance and content creation — find experts and courses in the domain you want to master."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="card-feature hover:shadow-lg flex flex-col items-center gap-4 cursor-pointer group !p-6"
            >
              <span className={`icon-pad-${cat.accent} group-hover:scale-105 transition-transform duration-200`}>
                <cat.Icon className="size-5" />
              </span>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                <span className="text-xs text-muted-foreground">{cat.count} courses</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
