"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedHeadlineProps {
  words?: string[];
  className?: string;
}

const DEFAULT_WORDS = ["serious", "curious", "devoted", "focused"];

export default function AnimatedHeadline({
  words = DEFAULT_WORDS,
  className = "text-primary",
}: AnimatedHeadlineProps): React.ReactElement {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const wordRef    = useRef<HTMLSpanElement>(null);
  const indexRef   = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const el      = wordRef.current;
    if (!el || !wrapper) return;

    // Measure every word's natural width upfront — no DOM flicker during cycles
    const widths: number[] = [];
    words.forEach((w) => {
      el.textContent = w;
      widths.push(el.offsetWidth);
    });
    el.textContent = words[0];

    // Start at first word's exact width — no trailing gap
    gsap.set(wrapper, { width: widths[0] });

    const cycle = () => {
      const next = (indexRef.current + 1) % words.length;

      gsap.to(el, {
        yPercent: -115,
        opacity: 0,
        scale: 0.82,
        filter: "blur(6px)",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          indexRef.current = next;
          el.textContent   = words[next];

          // Resize wrapper to fit new word — runs in parallel with enter
          gsap.to(wrapper, { width: widths[next], duration: 0.38, ease: "power2.inOut" });

          gsap.fromTo(
            el,
            { yPercent: 115, opacity: 0, scale: 0.82, filter: "blur(6px)" },
            { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, ease: "power3.out" },
          );
        },
      });
    };

    const id = setInterval(cycle, 2800);
    return () => clearInterval(id);
  }, [words]);

  return (
    <span
      ref={wrapperRef}
      className="inline-block overflow-hidden align-bottom"
      style={{ lineHeight: "inherit" }}
    >
      <span ref={wordRef} className={`inline-block ${className}`}>
        {words[0]}
      </span>
    </span>
  );
}
