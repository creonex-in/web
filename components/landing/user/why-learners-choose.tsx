"use client";

const FEATURES = [
  {
    number: "01",
    title: "Personalized Learning",
    description: "Connect directly with creators and experts who match your learning goals.",
    themeClass: "bg-[#eef2ff] dark:bg-indigo-950/30 border-[#c7d2fe] dark:border-indigo-500/30 hover:border-indigo-400/60",
    tagClass: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40",
  },
  {
    number: "02",
    title: "Verified Experts",
    description: "Every creator goes through a quality review process before joining the platform.",
    themeClass: "bg-[#ecfdf5] dark:bg-emerald-950/30 border-[#a7f3d0] dark:border-emerald-500/30 hover:border-emerald-400/60",
    tagClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40",
  },
  {
    number: "03",
    title: "Outcome-Focused Learning",
    description: "Gain practical skills, career guidance, and actionable insights instead of passive content consumption.",
    themeClass: "bg-[#faf5ff] dark:bg-purple-950/30 border-[#e9d5ff] dark:border-purple-500/30 hover:border-purple-400/60",
    tagClass: "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40",
  },
];

export default function WhyLearnersChoose(): React.ReactElement {
  return (
    <section className="py-20 md:py-28 bg-background border-b border-border/40 relative overflow-hidden">
      {/* Premium ambient glow background */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-foreground/5 blur-[120px] pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Sticky Title & Concept */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left lg:sticky lg:top-28 lg:self-start">
            <span className="text-label text-primary block mb-4 tracking-widest font-sans">WHY CREONEX</span>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] lg:leading-[1.15] font-bold tracking-tight text-foreground font-display mb-6">
              Designed to help you actually grow.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-lg mx-auto lg:mx-0 font-sans">
              Skip the generic video repositories. Creonex connects you directly with top-tier practitioners to gain real-world outcomes.
            </p>
          </div>

          {/* Right Column: Clean Vertical Stack List */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 md:space-y-6 font-sans">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx} 
                className={`group flex gap-6 p-6 md:p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${feature.themeClass}`}
              >
                {/* Minimalist Number Icon */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-sm font-bold shrink-0 transition-all duration-300 group-hover:scale-105 shadow-sm ${feature.tagClass}`}>
                  {feature.number}
                </div>

                {/* Content Block */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 font-display transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}