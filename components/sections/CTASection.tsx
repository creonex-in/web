export default function CTASection() {
  return (
    <section className="section">
      <div className="container-inner">
        <div className="bg-brand-gradient rounded-3xl px-8 py-16 flex flex-col items-center text-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Get started today
          </span>
          <h2 className="text-white max-w-xl">
            Your next breakthrough starts with one session
          </h2>
          <p className="text-white/80 body max-w-md">
            Join 50,000+ learners who are already growing faster with Creonex. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-8 py-3 rounded-full bg-white text-brand font-semibold text-sm hover:bg-white/90 transition-colors">
              Start for Free
            </button>
            <button className="px-8 py-3 rounded-full border border-white/30 text-white text-sm hover:bg-white/10 transition-colors">
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
