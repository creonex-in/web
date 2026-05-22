import Link from "next/link";
import Image from "next/image";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
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
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton >
              <Button className={"cursor-pointer"} variant="ghost-nav" size="md">Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button className={"cursor-pointer"} variant="brand" size="md">Get Started Free</Button>
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
