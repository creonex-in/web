import { FaStar } from "react-icons/fa";
import SectionHeader from "@/components/shared/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TESTIMONIALS } from "@/constants/data";

export default function TestimonialsSection() {
  return (
    <section className="section section-surface">
      <div className="container-inner flex flex-col gap-12">
        <SectionHeader
          badge="Success Stories"
          heading="What our learners say"
          subtext="Real outcomes from real people who used Creonex to level up their careers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="card-feature hover:shadow-lg flex flex-col gap-5">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="size-3.5 text-yellow-400" />
                ))}
              </div>
              <p className="body text-foreground line-clamp-4">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                <Avatar className="size-9 shrink-0">
                  <AvatarImage src={t.avatar} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
