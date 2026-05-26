import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedHeadline from "@/components/sections/animated-headline";
import { VideoPlayer } from "@/components/shared/video-player";

export default function HeroSection() {
  return (
    <section className="section-py relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 "
      />

      <div className="page-container">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedHeadline />

          <p className="text-body text-muted-foreground mx-auto mt-6 max-w-xl text-balance">
            Sell courses, host sessions, build your community — one platform
            built for micro-creators like you.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
              Start for Free
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/courses" />}>
              Explore Courses
            </Button>
          </div>

        </div>

        {/* Product demo video */}
        <div className="mt-16 rounded-3xl border border-border bg-card p-2 shadow-2xl shadow-black/10 ring-1 ring-border/50">
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