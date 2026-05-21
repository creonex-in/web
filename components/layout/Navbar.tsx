import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";

const NAV_LINKS = [
  { label: "Explore", href: "#explore" },
  { label: "Find Experts", href: "#experts" },
  { label: "Courses", href: "#courses" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container-inner flex items-center justify-between h-16 px-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="brand-wordmark text-2xl">Creonex</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-ghost-nav">Login</button>
          <button className="btn-primary">Get Started Free</button>
        </div>

        {/* Mobile */}
        <MobileNav links={NAV_LINKS} />
      </nav>
    </header>
  );
}
