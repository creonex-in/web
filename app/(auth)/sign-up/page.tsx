import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import Link from "next/link"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { AuthFormSkeleton } from "@/features/auth/components/auth-form-skeleton"

export const metadata: Metadata = { title: "Sign Up — Creonex" }

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ intent: "creator" | "learner"; redirect_url: string | undefined }>
}): Promise<React.ReactElement> {
  const { intent, redirect_url } = await searchParams
  const isCreator = intent === "creator"

  if (redirect_url) {
    const cookieStore = await cookies()
    cookieStore.set("creonex_redirect_url", redirect_url, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10,
      path: "/",
    })
  }

  return (
    <>
      <ClerkLoading>
        <AuthFormSkeleton />
      </ClerkLoading>

      <ClerkLoaded>
        <SignUp
          routing="hash"
          fallbackRedirectUrl="/sign-up/callback"
          unsafeMetadata={{ intent: isCreator ? "creator" : "learner" }}
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "w-full max-w-[27rem]",
              cardBox: "!shadow-none w-full",
              card: "!bg-transparent !shadow-none !border-0 !p-2 w-full",
              input: "!h-11 !text-sm",
              inputWrapper: "!h-11",
              footer: "!hidden",
            },
          }}
        />

        <p className="mt-8 w-full max-w-[26rem] text-center text-[0.8125rem] text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </ClerkLoaded>
    </>
  )
}
