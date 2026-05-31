"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const pathname = usePathname();

  useEffect(() => {
    // Own scroll position ourselves — stop the browser restoring stale offsets
    // that fight Lenis after client-side navigation.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({ duration: 1.5 });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // On route change: jump to top, then recompute every ScrollTrigger so the new
  // page's scrubbed sections measure against scroll position 0 (not the offset
  // carried over from the previous page).
  useEffect(() => {
    window.scrollTo(0, 0);
    lenisInstance?.scrollTo(0, { immediate: true, force: true });

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}
