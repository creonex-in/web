import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCompass, faUsers } from '@fortawesome/free-solid-svg-icons'

export const metadata: Metadata = { title: 'Welcome to Creonex!' }

export default async function LearnerCompletePage(): Promise<React.ReactElement> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="w-full max-w-[28rem] space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
          <FontAwesomeIcon icon={faCompass} className="size-6 text-primary" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">You&apos;re all set!</h1>
        <p className="text-sm text-muted-foreground">
          Explore creators and book your first session
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
          <FontAwesomeIcon icon={faCompass} className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Browse experts</p>
            <p className="text-xs text-muted-foreground">Find 1:1 mentors in your niche</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
          <FontAwesomeIcon icon={faUsers} className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Join live workshops</p>
            <p className="text-xs text-muted-foreground">Learn with peers in group sessions</p>
          </div>
        </div>
      </div>

      <Link
        href="/explore"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Explore Creonex
        <FontAwesomeIcon icon={faArrowRight} className="size-4" />
      </Link>
    </div>
  )
}
