"use client";

import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  links: { label: string; href: string }[];
}

export default function MobileNav({ links }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" aria-label="Open menu">
        <FaBars className="size-5 text-foreground" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <nav className="flex flex-col gap-6 mt-8">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link text-base">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Button variant="ghost-nav" size="md" className="w-full">Login</Button>
            <Button variant="brand" size="md" className="w-full">Get Started Free</Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
