import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Soft radial glow behind hero */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.938 0.043 278.2 / 0.35) 0%, transparent 70%)",
        }}
      />

      <div className="container-inner flex flex-col items-center text-center gap-8">
        <span className="section-badge">India's Creator Learning Platform</span>

        <h1 className="max-w-3xl">
          Learn from India's{" "}
          <span className="text-brand-gradient">best creators</span>{" "}
          &amp; experts
        </h1>

        <p className="body max-w-xl text-muted-foreground">
          Discover thousands of courses and book 1-on-1 mentorship sessions
          with verified professionals across design, tech, marketing, and more.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link href="#explore" className="btn-primary px-8 py-3 text-base">
            Start Learning Free
          </Link>
          <Link
            href="#experts"
            className="btn-ghost-nav px-8 py-3 text-base rounded-full border border-border"
          >
            Find an Expert
          </Link>
        </div>

        {/* Trust row */}
        <p className="text-sm text-muted-foreground">
          Trusted by{" "}
          <span className="font-semibold text-foreground">50,000+</span>{" "}
          learners across India
        </p>
      </div>
    </section>
  );
}
