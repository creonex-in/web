import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/landing/shared/video-player";

export default function HeroSection(): React.ReactElement {
  return (
    <section className="relative overflow-hidden pt-14 pb-6 md:pt-20 md:pb-10">

      <div className="page-container relative">
        <div className="mx-auto max-w-3xl text-center">

          {/* Headline */}
          <h1 className="text-display text-balance text-foreground">
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
            preload="metadata"
          />
        </div>

      </div>
    </section>
  );
}
