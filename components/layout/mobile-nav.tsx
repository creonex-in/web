"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
  links: ReadonlyArray<{ label: string; href: string }>;
  ctaText?: string;
}

export default function MobileNav({ links, ctaText = "Get Started Free" }: MobileNavProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Toggle menu" />
        }
      >
        <FontAwesomeIcon
          icon={open ? faXmark : faGrip}
          className="size-4"
        />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="px-6 pt-5">
          <SheetTitle className="text-left text-xl font-bold tracking-tight">
            Creonex
          </SheetTitle>
        </SheetHeader>

        <Separator className="mt-4" />

        <nav className="flex flex-col gap-1 px-3 py-4">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Separator />

        {isLoaded && !isSignedIn && (
          <div className="flex flex-col gap-2 px-6 py-5">
            <SignInButton>
              <Button
                variant="outline"
                className="w-full cursor-pointer"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="default"
                className="w-full cursor-pointer"
              >
                {ctaText}
              </Button>
            </SignUpButton>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
