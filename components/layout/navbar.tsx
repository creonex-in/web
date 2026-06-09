"use client";

import { JSX, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";
import { CreatorDashboardButton } from "@/components/layout/creator-dashboard-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarCheck,
  faBook,
  faUsers,
  faBolt,
  faCirclePlay,
  faTag,
  faChartLine,
  faShieldHalved,
  faMagnifyingGlass,
  faFileLines,
  faVideo,
  faLaptopCode,
  faAward,
  faUserCheck,
  faCreditCard,
  faBriefcase,
  faCommentDots,
  faStar,
  faRobot,
  faFileInvoice,
  faMicrophone,
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

// ── Types ─────────────────────────────────────────────────────────────────────

type NavItem = {
  icon: IconDefinition;
  label: string;
  description: string;
  href: string;
  badge?: {
    text: string;
    variant: "new" | "coming-soon";
  };
};

type NavConfig = {
  megaLabel: string;
  megaCols: { heading: string; items: NavItem[] }[];
  plainLinks: { label: string; href: string }[];
  ctaText: string;
  mobileLinks: { label: string; href: string }[];
};

// ── Per-route configs ─────────────────────────────────────────────────────────

const LEARNER_CONFIG: NavConfig = {
  megaLabel: "Explore",
  megaCols: [
    {
      heading: "Learning Formats",
      items: [
        { icon: faBook, label: "Courses", description: "Structured self-paced video classes", href: "#courses" },
        { icon: faCalendarCheck, label: "1:1 Sessions", description: "Book private sessions with top mentors", href: "#sessions" },
        { icon: faVideo, label: "Webinars", description: "Join interactive live workshops", href: "#webinars" },
        { icon: faUsers, label: "Communities", description: "Learn alongside ambitious peers", href: "#community" },
        { icon: faFileLines, label: "Digital Goods", description: "Get premium roadmaps, notes & templates", href: "#resources" },
        { icon: faLaptopCode, label: "Cohorts", description: "Intensive group bootcamps with labs", href: "#cohorts" },
        { icon: faAward, label: "Masterclasses", description: "Advanced workshops by industry leaders", href: "#masterclasses", badge: { text: "Coming soon", variant: "coming-soon" } },
      ],
    },
    {
      heading: "Why Creonex",
      items: [
        { icon: faUserCheck, label: "Top 1% Mentors", description: "Learn from verified practitioners only", href: "#explore" },
        { icon: faCreditCard, label: "UPI & Easy Checkout", description: "100% secure payments via UPI & Cards", href: "#payments" },
        { icon: faBriefcase, label: "Job-Ready Projects", description: "Build portfolios employers actually trust", href: "#projects" },
        { icon: faCommentDots, label: "Doubt Support", description: "Get direct feedback on your homework", href: "#support" },
        { icon: faStar, label: "Verified Reviews", description: "Read honest reviews from past students", href: "#testimonials" },
      ],
    },
    {
      heading: "AI Learning Tools",
      items: [
        { icon: faRobot, label: "AI Career Path", description: "Get personalized roadmaps in seconds", href: "#ai-path", badge: { text: "NEW", variant: "new" } },
        { icon: faFileInvoice, label: "AI Resume Review", description: "Optimize your CV for hiring filters", href: "#ai-resume", badge: { text: "NEW", variant: "new" } },
        { icon: faMicrophone, label: "AI Mock Interviews", description: "Practice live interviews with real-time feedback", href: "#ai-interview", badge: { text: "NEW", variant: "new" } },
      ],
    },
  ],
  plainLinks: [
    { label: "Find Mentors", href: "/top-creators" },
    { label: "How It Works", href: "#how-it-works" },
  ],
  ctaText: "Get Started",
  mobileLinks: [
    { label: "Find Mentors", href: "/top-creators" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Get Started", href: "/sign-up" },
  ],
};

const CREATOR_CONFIG: NavConfig = {
  megaLabel: "Features",
  megaCols: [
    {
      heading: "Monetization Models",
      items: [
        { icon: faBook, label: "Courses", description: "Host and sell video courses", href: "#courses" },
        { icon: faCalendarCheck, label: "1:1 Sessions", description: "Open booking slots for live calls", href: "#sessions" },
        { icon: faVideo, label: "Webinars", description: "Launch free or paid workshops", href: "#webinars" },
        { icon: faUsers, label: "Communities", description: "Build paid premium memberships", href: "#community" },
        { icon: faFileLines, label: "Digital Products", description: "Sell PDF guides, templates & files", href: "#products" },
        { icon: faAward, label: "Coaching", description: "Host long-term cohort coaching", href: "#coaching", badge: { text: "Coming soon", variant: "coming-soon" } },
      ],
    },
    {
      heading: "Platform Engine",
      items: [
        { icon: faLaptopCode, label: "Branded Pages", description: "No-code portfolio and landing pages", href: "#pages" },
        { icon: faCreditCard, label: "Integrated Checkout", description: "Secure global checkout and payments", href: "#checkout" },
        { icon: faChartLine, label: "Direct Payouts", description: "Receive payouts to bank in 48 hours", href: "#payouts" },
        { icon: faShieldHalved, label: "DRM Protection", description: "Protect your intellectual property", href: "#drm" },
        { icon: faBolt, label: "Integrations", description: "Connect with standard tools", href: "#integrations" },
      ],
    },
    {
      heading: "AI Creator Suite",
      items: [
        { icon: faRobot, label: "AI Website Builder", description: "Generate high-converting landing pages", href: "#ai-builder", badge: { text: "NEW", variant: "new" } },
        { icon: faCommentDots, label: "AI Smart Agent", description: "Automate sales, support & student chats", href: "#ai-agents", badge: { text: "NEW", variant: "new" } },
        { icon: faFileInvoice, label: "AI Content Copilot", description: "Write scripts, descriptions & curriculum", href: "#ai-copilot", badge: { text: "NEW", variant: "new" } },
      ],
    },
  ],
  plainLinks: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Learners", href: "/" },
  ],
  ctaText: "Start Teaching",
  mobileLinks: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Learners", href: "/" },
    { label: "Start Teaching", href: "/sign-up/creator" },
  ],
};

function getNavConfig(pathname: string): NavConfig {
  return pathname === "/creators" ? CREATOR_CONFIG : LEARNER_CONFIG;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MegaItem({ item }: { item: NavItem }): JSX.Element {
  return (
    <li>
      <Link
        href={item.href}
        className="group flex items-start gap-3 rounded-xl px-2.5 py-2 transition-all duration-200 hover:bg-muted"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-200 group-hover:border-foreground/20 group-hover:bg-background group-hover:text-foreground">
          <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-sm font-semibold text-foreground group-hover:text-foreground/90 leading-tight">
              {item.label}
            </span>
            {item.badge && (
              <span className={cn(
                "text-[8px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded leading-none shrink-0",
                item.badge.variant === "new"
                  ? "bg-[#d2f34c] text-black font-black"
                  : "bg-primary/10 text-primary"
              )}>
                {item.badge.text}
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90">
            {item.description}
          </p>
        </div>
      </Link>
    </li>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

import { useEffect } from "react";

export default function Navbar(): JSX.Element {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const config = getNavConfig(pathname);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.setAttribute("data-scrolled", "");
      } else {
        header.removeAttribute("data-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-transparent bg-transparent transition-all duration-300 data-[scrolled]:border-border data-[scrolled]:bg-background/80 data-[scrolled]:shadow-sm data-[scrolled]:backdrop-blur-md"
    >
      <nav className="page-container grid h-20 grid-cols-2 items-center gap-6 lg:grid-cols-3">

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

        {/* ── Col 2: Nav links (desktop) ───────────────────────────────────── */}
        <div className="hidden place-self-center lg:flex">
          <NavigationMenu align="center">
            <NavigationMenuList className="gap-0.5">

              {/* Mega menu — label + content driven by config */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground data-open:bg-transparent data-popup-open:bg-transparent data-popup-open:text-foreground",
                  )}
                >
                  {config.megaLabel}
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="w-[920px] p-4 bg-background rounded-2xl shadow-xl border border-border/50">
                    <div className="grid grid-cols-3 gap-2">
                      {config.megaCols.map((col, index) => (
                        <div key={col.heading} className={cn("p-2", index > 0 && "border-l border-border/40")}>
                          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
                            {col.heading}
                          </p>
                          <ul className="space-y-1">
                            {col.items.map((item) => (
                              <MegaItem key={item.label} item={item} />
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Plain links */}
              {config.plainLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-transparent",
                      pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
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
        <div className="flex items-center justify-end gap-2 justify-self-end">

          {/* Desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            {isLoaded && !isSignedIn && (
              <>
                <Link href="/sign-in">
                  <Button className="cursor-pointer" variant="outline" size="lg">
                    Login
                  </Button>
                </Link>
                <Link href={pathname === '/creators' ? '/sign-up?intent=creator' : '/sign-up?intent=learner'}>
                  <Button className="cursor-pointer" variant="default" size="lg">
                    {config.ctaText}
                  </Button>
                </Link>
              </>
            )}
            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-2">
                <CreatorDashboardButton />
                <UserButton />
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-4 lg:hidden">
            {isLoaded && isSignedIn && <UserButton />}
            <MobileNav
              links={config.mobileLinks}
              ctaText={config.ctaText}
              ctaHref={pathname === '/creators' ? '/sign-up?intent=creator' : '/sign-up?intent=learner'}
            />
          </div>

        </div>

      </nav>
    </header>
  );
}