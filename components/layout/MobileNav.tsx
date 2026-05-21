"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileNavProps {
  links: { label: string; href: string }[];
}

export default function MobileNav({ links }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" aria-label="Open menu">
        <Menu className="size-5" />
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
            <button className="btn-ghost-nav w-full">Login</button>
            <button className="btn-primary w-full">Get Started Free</button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
