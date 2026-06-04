import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Sign In — Creonex' }

export default function SignInPage(): React.ReactElement {
  return (
    <main className="relative flex min-h-screen flex-col items-center px-4 pt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,#00897B18,transparent)]" />

      <Link
        href="/"
        className="mb-5 flex items-center gap-2.5 transition-opacity hover:opacity-70"
      >
        <Image
          src="/logo.webp"
          alt="Creonex"
          width={36}
          height={36}
          className="size-9 object-contain"
          priority
        />
        <span className="text-xl font-bold tracking-tight">Creonex</span>
      </Link>

      <SignIn
        routing="hash"
        fallbackRedirectUrl="/sign-in/redirect"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-[26rem]',
            card: 'rounded-2xl border border-border shadow-sm',
            footer: 'hidden',
          },
        }}
      />
    </main>
  )
}
