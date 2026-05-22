import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="section">
      <div className="container-inner">
        <div className="bg-brand-gradient rounded-3xl px-8 py-20 flex flex-col items-center text-center gap-6">
          <span className="section-badge !bg-white/15 !border-white/20 !text-white">
            Get started today
          </span>
          <h2 className="text-white max-w-xl text-headline-sm sm:text-headline leading-[1.2]">
            Your next breakthrough starts with one session
          </h2>
          <p className="body text-white/80 max-w-md">
            Join 50,000+ learners already growing faster with Creonex. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              size="pill"
              className="bg-white text-brand-dark rounded-full hover:bg-white/90 border-transparent font-semibold"
            >
              Start for Free
            </Button>
            <Button
              variant="outline"
              size="pill"
              className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
