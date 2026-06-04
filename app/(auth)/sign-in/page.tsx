import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign In — Creonex' }

export default function SignInPage(): React.ReactElement {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
      {/* TODO: Clerk <SignIn> component
          afterSignInUrl logic (via middleware or Clerk redirectUrl):
            creator + onboarding complete   → /dashboard
            creator + onboarding incomplete → /onboarding/creator/step-{n}
            learner + onboarding complete   → /explore
            learner + onboarding incomplete → /onboarding/learner/step-{n}
      */}
      <p className="text-center text-sm text-muted-foreground">Sign in — Clerk component goes here.</p>
    </div>
  )
}
