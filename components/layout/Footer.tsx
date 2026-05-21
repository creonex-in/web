import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container-inner px-4 sm:px-8 pt-16 pb-8">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-xs">
            <span className="brand-wordmark text-3xl">Creonex</span>
            <p className="body text-subtle">
              Creonex helps learners discover real experts across India and grow
              faster through trusted guidance.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 flex-wrap">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {col.heading}
                </span>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base text-foreground hover:text-brand transition-colors"
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
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="text-sm font-medium text-muted-foreground">
              Join Creonex today!
            </span>
            <p className="body">
              Sign up to receive updates and be first to know about sales and
              promotions.
            </p>
            <form className="flex gap-2">
              <Input placeholder="Enter your email" type="email" />
              <button type="submit" className="btn-primary shrink-0">
                Submit
              </button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-center text-subtle">
          ©2026 Creonex. All rights reserved. · Made with ♥ in India 🇮🇳
        </p>
      </div>
    </footer>
  );
}

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Find a creator", href: "#" },
      { label: "Become a creator", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Case Study", href: "#" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookies Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];
