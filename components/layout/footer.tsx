import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// ── Data ──────────────────────────────────────────────────────────────────────

const PRODUCT_LINKS = [
  { label: "Sell Sessions", href: "#sessions" },
  { label: "Publish Courses", href: "#courses" },
  { label: "Build Community", href: "#community" },
  { label: "Creator Tools", href: "#creators" },
  { label: "Pricing", href: "/signup" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Cookie Policy", href: "/cookies" },
];

const SOCIAL_LINKS = [
  { icon: faYoutube, href: "#", label: "YouTube" },
  { icon: faInstagram, href: "#", label: "Instagram" },
  { icon: faLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: faXTwitter, href: "#", label: "X / Twitter" },
  { icon: faEnvelope, href: "mailto:hello@creonex.in", label: "Email" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer(): React.ReactElement {
  return (
    <footer className="dark relative overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />

      {/* ── Main content ──────────────────────────────────────────────────────── */}
      <div className="page-container pt-16 pb-10 md:pt-20">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-4 md:gap-x-10 lg:gap-x-16 xl:gap-x-20">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <Image
                src="/logo.webp"
                alt="Creonex"
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                Creonex
              </span>
            </Link>

            <p className="text-body-sm leading-relaxed text-muted-foreground">
              Creonex is an all-in-one platform built for Indian micro-creators
              to sell courses, host sessions, and build thriving communities —
              from a single place.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  <FontAwesomeIcon icon={icon} className="size-4" />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-body-sm text-muted-foreground/60 mt-auto">
              © {new Date().getFullYear()} Creonex Inc.
            </p>
          </div>

          {/* Product links */}
          <div>
            <p className="text-label text-muted-foreground/50 mb-5">Product</p>
            <ul className="space-y-3.5">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-body-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="text-label text-muted-foreground/50 mb-5">Company</p>
            <ul className="space-y-3.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-body-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="text-label text-muted-foreground/50 mb-5">Legal</p>
            <ul className="space-y-3.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-body-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Watermark ─────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden flex justify-center"
        style={{ height: "clamp(3.5rem, 15.4vw, 12.6rem)" }}
      >
        <p className="font-display font-bold leading-none tracking-tighter text-foreground/[0.025] whitespace-nowrap shrink-0"
          style={{ fontSize: "clamp(5rem, 22vw, 18rem)" }}>
          CREONEX
        </p>
      </div>

    </footer>
  );
}