"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type CategoryCardData = {
  id: string;
  label: string;
  experts: number;
  courses: number;
  imageSrc: string;
};

interface Props {
  cat: CategoryCardData;
}

export default function CategoryCard({ cat }: Props): React.ReactElement {
  const [imgErr, setImgErr] = useState(false);

  return (
    <Link
      href={`/courses?category=${cat.id}`}
      aria-label={`${cat.label} — ${cat.experts} experts, ${cat.courses} courses`}
      className="category-card group block cursor-pointer rounded-md bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden md:h-80 lg:h-96">
        {!imgErr ? (
          <Image
            src={cat.imageSrc}
            alt={cat.label}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      {/* Text */}
      <div className="px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
        <h3 className="text-sm font-medium tracking-tight text-foreground md:text-base">
          {cat.label}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {cat.experts} experts · {cat.courses} courses
        </p>
      </div>
    </Link>
  );
}
