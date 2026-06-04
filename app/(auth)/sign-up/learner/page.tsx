import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign Up as Learner — Creonex' }

export default function LearnerSignUpPage(): React.ReactElement {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
      {/* TODO: Clerk <SignUp> component, afterSignUpUrl="/onboarding/learner/step-1" */}
      <p className="text-center text-sm text-muted-foreground">Learner sign-up — Clerk component goes here.</p>
    </div>
  )
}
