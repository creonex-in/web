import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import Link from "next/link"
import type { Metadata } from "next"
import { AuthFormSkeleton } from "@/features/auth/components/auth-form-skeleton"

export const metadata: Metadata = { title: "Sign In — Creonex" }

export default function SignInPage(): React.ReactElement {
  return (
    <>
      <ClerkLoading>
        <AuthFormSkeleton />
      </ClerkLoading>

      <ClerkLoaded>
        <SignIn
          routing="hash"
          fallbackRedirectUrl="/sign-in/redirect"
          signUpUrl="/sign-up"
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
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Create one
          </Link>
        </p>
      </ClerkLoaded>
    </>
  )
}
