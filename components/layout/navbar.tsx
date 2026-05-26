"use client";

import { JSX, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/layout/mobile-nav";

const NAV_LINKS = [
  { label: "Explore", href: "#explore" },
  { label: "Find Experts", href: "#experts" },
  { label: "Courses", href: "#courses" },
  { label: "How It Works", href: "#how-it-works" },
] as const;

gsap.registerPlugin(ScrollTrigger);

export default function Navbar(): JSX.Element {
  const { isSignedIn, isLoaded } = useAuth();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    ScrollTrigger.create({
      start: "20px top",
      onEnter: () =>
        header.setAttribute("data-scrolled", ""),
      onLeaveBack: () =>
        header.removeAttribute("data-scrolled"),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-transparent bg-transparent transition-all duration-300 data-[scrolled]:border-border data-[scrolled]:bg-background/80 data-[scrolled]:shadow-sm data-[scrolled]:backdrop-blur-md"
    >
      <nav className="page-container flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
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
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          {isLoaded && !isSignedIn && (
            <>
              <SignInButton>
                <Button className="cursor-pointer" variant="outline" size={"lg"}>
                  Login
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="cursor-pointer" variant="default" size={"lg"}>
                  Get Started Free
                </Button>
              </SignUpButton>
            </>
          )}
          {isLoaded && isSignedIn && <UserButton />}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-4 lg:hidden">
          {isLoaded && isSignedIn && <UserButton />}
          <MobileNav links={NAV_LINKS} />
        </div>

      </nav>
    </header>
  );
}
