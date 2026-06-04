import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Sign Up — Creonex' }

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ intent: "creator" | "learner", redirect_url: string | undefined }> }): Promise<React.ReactElement> {
  const { intent, redirect_url } = await searchParams
  const isCreator = intent === 'creator'

  // Store redirect_url in cookie for after onboarding
  if (redirect_url) {
    const cookieStore = await cookies()
    cookieStore.set('creonex_redirect_url', redirect_url, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10,
      path: '/',
    })
  }


  return (
    <main className="relative flex min-h-screen flex-col items-center px-4 pt-14 ">

      {/* Subtle teal radial at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,#00897B18,transparent)]" />

      {/* Logo */}
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

      {/* Clerk form */}
      <SignUp
        routing="hash"
        fallbackRedirectUrl="/sign-up/callback"
        unsafeMetadata={{ intent: isCreator ? "creator" : "learner" }}
        appearance={{
          elements: {
            rootBox: 'w-full max-w-[26rem]',
            card: 'rounded-2xl border border-border shadow-sm',
            footer: 'hidden',
          },
        }}
        signInUrl='/sign-in'
      />

    </main>
  )
}
