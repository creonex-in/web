"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import MobileNav from "./mobile-nav";
import { NAV_LINKS } from "@/constants/navigation";
import CustomButton from "../shared/custom-button";

function NavItem({ label, href }: { label: string; href: string }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    gsap.to(lineRef.current, {
      scaleX: 1,
      transformOrigin: "left",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  function onLeave() {
    gsap.to(lineRef.current, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.3,
      ease: "power2.in",
      overwrite: "auto",
    });
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative py-2 px-1 text-[12px] font-bold uppercase tracking-[0.13em] text-charcoal hover:text-foreground transition-colors duration-200"
    >
      {label}
      <span
        ref={lineRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-[3px] bg-primary"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      />
    </a>
  );
}

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) < 10) return;

      const scrollingDown = delta > 0;

      if (scrollingDown && currentScrollY > 150 && !isHidden.current) {
        gsap.to(headerRef.current, {
          yPercent: -100,
          duration: 0.55,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        isHidden.current = true;
      } else if ((!scrollingDown || currentScrollY < 50) && isHidden.current) {
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
        isHidden.current = false;
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <nav className="container-inner flex items-center justify-between h-18 px-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.webp"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
            priority
          />
          <span className="text-[18px] font-bold tracking-tight text-foreground">
            Creonex
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavItem label={link.label} href={link.href} />
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton >
              <CustomButton className={"cursor-pointer"} variant="outline">Login</CustomButton>
            </SignInButton>
            <SignUpButton>
              <CustomButton className={"cursor-pointer"} variant="primary">Get Started Free</CustomButton>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 lg:hidden">
          <Show when="signed-in">
            <UserButton />
          </Show>
          <MobileNav links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
