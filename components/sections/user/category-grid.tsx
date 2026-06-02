"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import CategoryCard, { type CategoryCardData } from "@/components/shared/category-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: CategoryCardData[] = [
  { id: "design",  label: "UI/UX Design",   experts: 240, courses: 38, imageSrc: "/categories/category-1.png"  },
  { id: "coding",  label: "Coding",          experts: 420, courses: 86, imageSrc: "/categories/category-2.jpeg" },
  { id: "finance", label: "Finance",         experts: 310, courses: 52, imageSrc: "/categories/category-3.jpg"  },
  { id: "career",  label: "Career Growth",   experts: 290, courses: 44, imageSrc: "/categories/category-4.webp" },
  { id: "cat",     label: "CAT Prep",        experts: 180, courses: 24, imageSrc: "/categories/category-1.png"  },
  { id: "resume",  label: "Resume Review",   experts: 150, courses: 18, imageSrc: "/categories/category-1.png"  },
  { id: "brand",   label: "Personal Brand",  experts: 210, courses: 31, imageSrc: "/categories/category-1.png"  },
];

const VISIBLE_COUNT = 4;

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CategoryGrid(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".category-card", {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="section-py bg-background">
      <div className="page-container">

        {/* Header */}
        <div className="mx-auto mb-12 max-w-lg text-center">
          <p className="text-label mb-3 text-primary">Categories</p>
          <h2 className="text-h1 text-balance text-foreground">
            1,800+ experts.{" "}
            <span className="text-primary">One platform.</span>
          </h2>
          <p className="text-body mx-auto mt-4 max-w-sm text-muted-foreground">
            Find your mentor in under 60 seconds.
          </p>
        </div>

        {/* Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {CATEGORIES.slice(0, VISIBLE_COUNT).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button className="cursor-pointer rounded-full px-8 font-semibold" size="lg">
            Explore all categories
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
