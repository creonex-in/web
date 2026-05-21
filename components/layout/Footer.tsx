import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SOCIAL_LINKS = [
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
];

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Find a creator", href: "/find" },
      { label: "Become a creator", href: "/become" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Case Study", href: "/case-study" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container-inner px-4 sm:px-8 pt-16 pb-8">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 justify-between">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-footer-col">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt=""
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              <span className="text-[20px] font-bold tracking-tight text-foreground">
                Creonex
              </span>
            </div>
            <p className="body text-subtle">
              Creonex helps learners discover real experts across India and grow
              faster through trusted guidance.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="size-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-brand hover:border-brand transition-colors"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12 flex-wrap">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {col.heading}
                </span>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="body text-foreground hover:text-brand transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4 max-w-footer-col">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-foreground">Stay in the loop</span>
              <p className="body text-subtle">
                Get curated expert picks and course drops — no spam, ever.
              </p>
            </div>
            <form className="flex gap-2">
              <Input
                placeholder="Your email address"
                type="email"
                className="h-10 flex-1"
              />
              <Button
                type="submit"
                variant="brand"
                size="md"
                className="shrink-0 px-4"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            ©2026 Creonex. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ♥ in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
