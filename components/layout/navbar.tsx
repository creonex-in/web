"use client";

import { JSX, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faBook,
  faUsers,
  faBolt,
  faCirclePlay,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import MobileNav from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────

const EXPLORE_LEFT = [
  {
    icon: faCalendarCheck,
    label: "Sessions",
    description: "Book a 1-on-1 with India's top creators",
    href: "#sessions",
  },
  {
    icon: faBook,
    label: "Courses",
    description: "Self-paced learning at your own speed",
    href: "#courses",
  },
  {
    icon: faUsers,
    label: "Community",
    description: "Join spaces built for serious learners",
    href: "#community",
  },
] as const;

const EXPLORE_RIGHT = [
  {
    icon: faBolt,
    label: "For Creators",
    description: "Sell what you know, grow who you reach",
    href: "#creators",
  },
  {
    icon: faCirclePlay,
    label: "How It Works",
    description: "From signup to first sale in minutes",
    href: "#how-it-works",
  },
  {
    icon: faTag,
    label: "Pricing",
    description: "Simple, creator-first plans",
    href: "#pricing",
  },
] as const;

const PLAIN_LINKS = [
  { label: "Find Experts", href: "#experts" },
  { label: "Courses",      href: "#courses" },
  { label: "How It Works", href: "#how-it-works" },
] as const;

const ALL_MOBILE_LINKS = [
  { label: "Explore",      href: "#explore" },
  { label: "Find Experts", href: "#experts" },
  { label: "Courses",      href: "#courses" },
  { label: "How It Works", href: "#how-it-works" },
] as const;

gsap.registerPlugin(ScrollTrigger);

// ── Component ─────────────────────────────────────────────────────────────────

export default function Navbar(): JSX.Element {
  const { isSignedIn, isLoaded } = useAuth();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    ScrollTrigger.create({
      start: "20px top",
      onEnter:    () => header.setAttribute("data-scrolled", ""),
      onLeaveBack: () => header.removeAttribute("data-scrolled"),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-transparent bg-transparent transition-all duration-300 data-[scrolled]:border-border data-[scrolled]:bg-background/80 data-[scrolled]:shadow-sm data-[scrolled]:backdrop-blur-md"
    >
      <nav className="page-container grid h-16 grid-cols-3 items-center gap-6">

        {/* ── Col 1: Logo ─────────────────────────────────────────────────── */}
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

        {/* ── Col 2: Nav links (desktop) ───────────────────────────────── */}
        <div className="hidden items-center justify-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-0.5">

              {/* Explore — mega-menu trigger */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground data-popup-open:bg-transparent data-open:bg-transparent data-popup-open:text-foreground",
                  )}
                >
                  Explore
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="w-[600px] p-2">

                    {/* Top accent strip */}
                    <div className="mb-2 h-0.5 w-10 rounded-full bg-primary mx-3" />

                    <div className="grid grid-cols-2">

                      {/* Left: Discover */}
                      <div className="p-3">
                        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/60">
                          Discover
                        </p>
                        <ul className="space-y-0.5">
                          {EXPLORE_LEFT.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                className="group flex items-center gap-3.5 rounded-xl px-3 py-3 transition-all duration-150 hover:bg-muted"
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary transition-all duration-150 group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                                  <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">
                                    {item.label}
                                  </p>
                                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Divider + Right: Start Here */}
                      <div className="border-l border-border/60 p-3">
                        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/60">
                          Start Here
                        </p>
                        <ul className="space-y-0.5">
                          {EXPLORE_RIGHT.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                className="group flex items-center gap-3.5 rounded-xl px-3 py-3 transition-all duration-150 hover:bg-muted"
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary transition-all duration-150 group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                                  <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">
                                    {item.label}
                                  </p>
                                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Plain links */}
              {PLAIN_LINKS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ── Col 3: Actions ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 lg:flex">
            {isLoaded && !isSignedIn && (
              <>
                <SignInButton>
                  <Button className="cursor-pointer" variant="outline" size="lg">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="cursor-pointer" variant="default" size="lg">
                    Get Started Free
                  </Button>
                </SignUpButton>
              </>
            )}
            {isLoaded && isSignedIn && <UserButton />}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-4 lg:hidden">
            {isLoaded && isSignedIn && <UserButton />}
            <MobileNav links={ALL_MOBILE_LINKS} />
          </div>

        </div>

      </nav>
    </header>
  );
}
