'use client'

import Link from 'next/link'
import Image from 'next/image'
import { UserButton, useAuth } from '@clerk/nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { buttonVariants } from '@/components/ui/button'
import { CreatorDashboardButton } from '@/components/layout/creator-dashboard-button'

export function ExploreNav(): React.ReactElement {
  const { isSignedIn, isLoaded } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="page-container flex h-14 items-center gap-3">

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.webp" alt="Creonex" width={28} height={28} className="size-7 object-contain" priority />
          <span className="hidden text-base font-bold tracking-tight sm:block">
            creo<span className="text-primary">nex</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 md:max-w-xl">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="shrink-0 text-sm text-muted-foreground" />
          <input
            type="text"
            placeholder="Search creators, topics, niches..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Desktop auth — hidden on mobile (bottom nav handles it) */}
        <div className="hidden items-center gap-2 md:flex">
          {isLoaded && !isSignedIn && (
            <>
              <Link href="/sign-in" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                Login
              </Link>
              <Link href="/sign-up" className={buttonVariants({ variant: 'default', size: 'sm' })}>
                Sign Up
              </Link>
            </>
          )}
          {isLoaded && isSignedIn && (
            <>
              <CreatorDashboardButton />
              <UserButton />
            </>
          )}
        </div>

        {/* Mobile — only UserButton (bottom nav handles everything else) */}
        {isLoaded && isSignedIn && (
          <div className="flex items-center md:hidden">
            <UserButton />
          </div>
        )}

      </nav>
    </header>
  )
}
