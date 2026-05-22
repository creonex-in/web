"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CustomButton from "../shared/custom-button";

interface MobileNavProps {
  links: { label: string; href: string }[];
}

export default function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  function handleLinkClick(href: string) {
    setOpen(false);
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }, 300);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden" aria-label="Open menu">
        <FaBars className="size-5 text-foreground" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <nav className="flex flex-col gap-6 mt-8">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className="nav-link text-base block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <CustomButton variant="outline" className="w-full">Login</CustomButton>
            <CustomButton className="w-full">Get Started Free</CustomButton>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
