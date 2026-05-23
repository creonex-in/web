"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGraduationCap,
  faCalendarCheck,
  faGauge,
} from "@fortawesome/free-solid-svg-icons";
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

function NotificationBell() {
  return (
    <button
      aria-label="Notifications"
      className="relative p-2 rounded-full hover:bg-[var(--surface)] transition-colors duration-200 group"
    >
      <FontAwesomeIcon
        icon={faBell}
        className="size-4 text-[var(--muted-foreground)] group-hover:text-[var(--brand)] transition-colors duration-200"
      />
      {/* unread indicator */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[var(--brand)] ring-1 ring-background"
      />
    </button>
  );
}

const userButtonAppearance = {
  elements: {
    avatarBox:
      "size-8 ring-2 ring-[#EBF2FD] hover:ring-[#337DEB] transition-all duration-200 cursor-pointer",
  },
} as const;

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

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavItem label={link.label} href={link.href} />
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton>
              <CustomButton className="cursor-pointer" variant="outline">
                Login
              </CustomButton>
            </SignInButton>
            <SignUpButton>
              <CustomButton className="cursor-pointer" variant="primary">
                Get Started Free
              </CustomButton>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <NotificationBell />

            {/* My Learning shortcut — visible only at xl+ to avoid crowding */}
            <Link
              href="/my-courses"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         text-[11px] font-bold uppercase tracking-[0.08em]
                         text-[var(--charcoal)] hover:bg-[var(--surface)] hover:text-[var(--brand)]
                         transition-all duration-200"
            >
              <FontAwesomeIcon icon={faGraduationCap} className="size-3.5" />
              My Learning
            </Link>

            <UserButton appearance={userButtonAppearance}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Dashboard"
                  labelIcon={
                    <FontAwesomeIcon icon={faGauge} className="size-4" />
                  }
                  href="/dashboard"
                />
                <UserButton.Link
                  label="My Courses"
                  labelIcon={
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="size-4"
                    />
                  }
                  href="/my-courses"
                />
                <UserButton.Link
                  label="Bookings"
                  labelIcon={
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="size-4"
                    />
                  }
                  href="/bookings"
                />
              </UserButton.MenuItems>
            </UserButton>
          </Show>
        </div>

        {/* Mobile right actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <Show when="signed-in">
            <NotificationBell />
            <UserButton appearance={userButtonAppearance}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Dashboard"
                  labelIcon={
                    <FontAwesomeIcon icon={faGauge} className="size-4" />
                  }
                  href="/dashboard"
                />
                <UserButton.Link
                  label="My Courses"
                  labelIcon={
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="size-4"
                    />
                  }
                  href="/my-courses"
                />
                <UserButton.Link
                  label="Bookings"
                  labelIcon={
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="size-4"
                    />
                  }
                  href="/bookings"
                />
              </UserButton.MenuItems>
            </UserButton>
          </Show>
          <MobileNav links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
