import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Sign Up — Creonex' }

export default function SignUpPage(): React.ReactElement {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border border-border bg-card p-8">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Join Creonex</h1>
        <p className="text-sm text-muted-foreground">What best describes you?</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/sign-up/learner" className={buttonVariants({ variant: 'default', className: 'w-full' })}>
          I want to Learn
        </Link>
        <Link href="/sign-up/creator" className={buttonVariants({ variant: 'outline', className: 'w-full' })}>
          I want to Teach &amp; Earn
        </Link>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
