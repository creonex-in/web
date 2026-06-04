import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign Up as Creator — Creonex' }

export default function CreatorSignUpPage(): React.ReactElement {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
      {/* TODO: Clerk <SignUp> component, unsafeMetadata: { intent: "creator" }, afterSignUpUrl="/onboarding/creator/step-1" */}
      <p className="text-center text-sm text-muted-foreground">Creator sign-up — Clerk component goes here.</p>
    </div>
  )
}
