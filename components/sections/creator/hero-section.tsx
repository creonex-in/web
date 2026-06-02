import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/shared/video-player";

const STATS = [
  { value: "2,400+", label: "Active Creators" },
  { value: "₹2L+", label: "Top Monthly Earning" },
  { value: "Free", label: "To Get Started" },
] as const;

export default function HeroSection(): React.ReactElement {
  return (
    <section className="relative overflow-hidden pt-14 pb-6 md:pt-20 md:pb-10">

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]"
      />

      <div className="page-container relative">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Creator Platform · India
          </div>

          {/* Headline */}
          <h1 className="text-display mt-5 text-balance text-foreground">
            Turn your expertise into{" "}
            <span className="text-primary">a real business.</span>
          </h1>

          {/* Subtext */}
          <p className="text-body mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
            Sell courses, host 1-on-1 sessions, build a paid community —
            all from one profile. No studio, no team, no gatekeepers.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/signup" />}
              className="rounded-full px-8"
            >
              Start for Free
              <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="#how-it-works" />}
              className="rounded-full px-8"
            >
              See How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-h3 text-foreground">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                {i < STATS.length - 1 && (
                  <div className="h-8 w-px bg-border" />
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Product demo video */}
        <div className="mt-14 rounded-3xl bg-card  shadow-2xl shadow-black/10 ring-1 ring-border/50">
          <VideoPlayer
            src="/videos/demo.mp4"
            poster="/images/demo-poster.jpg"
            size="full"
            className="rounded-2xl"
            autoPlay
            muted
            loop
            preload="auto"
          />
        </div>

      </div>
    </section>
  );
}
