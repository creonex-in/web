import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces&q=80",
];

export default function UserHero(): React.ReactElement {


  return (
    <section className="relative z-10 overflow-hidden pt-10 md:pt-18 pb-16 md:pb-28">

      {/* Cool Attraction: Subtle Dotted Canvas Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_40%,transparent_100%)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]" />

      {/* Cool Attraction: Ambient Accent Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="page-container relative z-10 flex flex-col items-center justify-center text-center">

        {/* Dynamic Floating Avatars (Desktop Only) */}
        <div className="u-float-1 absolute left-[5%] top-[10%] hidden lg:block xl:left-[10%]">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-background shadow-xl">
            <Image src={AVATARS[0]} alt="UI/UX Expert" fill className="object-cover" sizes="64px" />
          </div>
          <div className="absolute -bottom-2 -right-4 flex items-center rounded-full border-2 border-background bg-card px-2.5 py-0.5 text-[10px] font-bold text-foreground shadow-sm">UI/UX</div>
        </div>

        <div className="u-float-2 absolute right-[5%] top-[25%] hidden lg:block xl:right-[10%]">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-background shadow-xl">
            <Image src={AVATARS[1]} alt="Engineering Expert" fill className="object-cover" sizes="56px" />
          </div>
          <div className="absolute -bottom-2 -left-6 flex items-center rounded-full border-2 border-background bg-accent px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">SDE-3</div>
        </div>

        <div className="u-float-3 absolute left-[12%] top-[60%] hidden lg:block xl:left-[18%]">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-4 border-background shadow-xl">
            <Image src={AVATARS[2]} alt="Marketing Expert" fill className="object-cover" sizes="48px" />
          </div>
        </div>

        {/* Trust Badge */}
        <div className="u-hero-item mb-8 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 py-1.5 pl-2 pr-4 shadow-sm backdrop-blur-md">
          <div className="flex -space-x-2">
            {AVATARS.map((src, i) => (
              <div key={i} className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background">
                <Image src={src} alt="Learner" fill className="object-cover" sizes="24px" />
              </div>
            ))}
          </div>
          <p className="text-[11px] font-semibold tracking-wide text-foreground/80 sm:text-xs">
            Trusted by <span className="font-bold text-foreground">10,000+</span> ambitious learners
          </p>
        </div>

        {/* Massive Typography */}
        <div className="u-hero-item max-w-4xl relative">
          <h1 className="text-display text-balance text-foreground">
            India&apos;s best creators,
            <br />
            teaching what you <span className="relative inline-block text-primary">
              actually need.
              <svg className="absolute -bottom-2 left-0 w-full text-accent opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00035 6.64388C43.5181 2.37893 103.023 -1.2405 198.334 6.64388" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
        </div>

        <p className="u-hero-item text-body mx-auto mt-7 max-w-2xl text-balance sm:text-lg">
          Browse courses, book 1-on-1 mentorship sessions, and join communities
          built by verified experts — all in one place.
        </p>

        {/* Call to Actions */}
        <div className="u-hero-item relative z-20 mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button 
            size="lg" 
            nativeButton={false}
            render={<Link href="/top-creators" />}
            className="h-14 w-full sm:w-auto rounded-full px-8 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Explore Mentors
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            nativeButton={false}
            render={<Link href="/join" />}
            className="h-14 w-full sm:w-auto rounded-full border-border/80 bg-card/40 px-8 text-base font-bold backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-card"
          >
            Apply as a Creator
          </Button>
        </div>

        {/* Subtle Static Trust Logos (Avoids Marquee Conflict) */}
        <div className="u-hero-item mt-16 flex w-full max-w-3xl flex-col items-center border-t border-border/40 pt-8">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Learners from top companies trust Creonex
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground/50 sm:gap-10 md:gap-14">
            <span className="text-lg font-bold tracking-tight md:text-xl">Google</span>
            <span className="text-lg font-bold tracking-tight md:text-xl">Microsoft</span>
            <span className="text-lg font-bold tracking-tight md:text-xl">Amazon</span>
            <span className="text-lg font-bold tracking-tight md:text-xl">Zomato</span>
            <span className="text-lg font-bold tracking-tight md:text-xl">Swiggy</span>
          </div>
        </div>

      </div>
    </section>
  );
}
