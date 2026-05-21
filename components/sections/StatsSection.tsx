import { STATS } from "@/constants/data";

export default function StatsSection() {
  return (
    <section className="section-sm section-surface">
      <div className="container-inner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-1">
              <span className="text-3xl font-extrabold text-brand-gradient">
                {stat.value}
              </span>
              <span className="body-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
