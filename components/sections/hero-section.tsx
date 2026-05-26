import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedHeadline from "@/components/sections/animated-headline";

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
            <Button size="lg" render={<Link href="/signup" />}>
              Start for Free
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/courses" />}>
              Explore Courses
            </Button>
          </div>

          {/* <p className="text-body-sm text-muted-foreground mt-10">
            Trusted by{" "}
            <span className="text-foreground font-semibold">
              2,400+ creators
            </span>{" "}
            across India
          </p> */}
        </div>
      </div>


    </section>
  );
}
