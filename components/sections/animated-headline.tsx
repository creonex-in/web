"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORDS = ["serious", "curious", "devoted", "focused"];

export default function AnimatedHeadline(): React.ReactElement {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const el = wordRef.current;
    if (!el || !wrapper) return;

    // Measure max width across all words, lock to that so no word clips
    let maxWidth = 0;
    const original = el.textContent;
    WORDS.forEach((w) => {
      el.textContent = w;
      maxWidth = Math.max(maxWidth, el.offsetWidth);
    });
    el.textContent = original;
    wrapper.style.width = `${maxWidth}px`;

    const cycle = () => {
      gsap.to(el, {
        yPercent: -115,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          indexRef.current = (indexRef.current + 1) % WORDS.length;
          el.textContent = WORDS[indexRef.current];
          gsap.fromTo(
            el,
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
          );
        },
      });
    };

    const id = setInterval(cycle, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <h1 className="text-display text-balance">
      The next step for{" "}
      <span
        ref={wrapperRef}
        className="inline-block overflow-hidden align-bottom"
        style={{ lineHeight: "inherit" }}
      >
        <span ref={wordRef} className="inline-block text-primary">
          serious
        </span>
      </span>{" "}
      creators
    </h1>
  );
}
