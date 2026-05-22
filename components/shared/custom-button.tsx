"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  className?: string;
}

export default function CustomButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className,
}: CustomButtonProps) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  function handleMouseEnter() {
    setHovered(true);
    gsap.to(fillRef.current, {
      scaleY: 1,
      duration: 0.4,
      ease: "power3.inOut",
      transformOrigin: "bottom center",
      overwrite: true,
    });
  }

  function handleMouseLeave() {
    setHovered(false);
    gsap.to(fillRef.current, {
      scaleY: 0,
      duration: 0.4,
      ease: "power3.inOut",
      transformOrigin: "bottom center",
      overwrite: true,
    });
  }

  const isPrimary = variant === "primary";

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-[3px] overflow-hidden inline-flex items-center justify-center",
        "px-6 py-3",
        "border-1 border-primary cursor-pointer select-none",
        isPrimary ? "bg-primary" : "bg-white",
        className
      )}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 will-change-transform",
          isPrimary ? "bg-white" : "bg-primary"
        )}
        style={{ transform: "scaleY(0)", transformOrigin: "bottom center" }}
      />
      <span
        className={cn(
          "relative z-10 text-sm font-semibold leading-none",
          "transition-colors duration-[250ms] ease-out",
          isPrimary
            ? hovered ? "text-primary" : "text-white"
            : hovered ? "text-white" : "text-primary"
        )}
      >
        {children}
      </span>
    </button>
  );
}
