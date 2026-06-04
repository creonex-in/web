import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SignInRedirectPage(): Promise<never> {
  const { sessionClaims } = await auth()

  const meta = (sessionClaims as Record<string, unknown>)
    ?.metadata as {
      roles?: ('learner' | 'creator')[]
      onboarding_complete?: boolean
      onboarding_step?: number
    } | undefined

  const roles = meta?.roles ?? []
  const onboardingComplete = meta?.onboarding_complete ?? false
  const onboardingStep = meta?.onboarding_step ?? 1
  const isCreator = roles.includes('creator')

  if (roles.length === 0) redirect('/sign-up')

  if (!onboardingComplete) {
    if (isCreator) redirect(`/onboarding/creator/step-${onboardingStep}`)
    redirect(`/onboarding/learner/step-${onboardingStep}`)
  }

  if (isCreator) redirect('/dashboard')
  redirect('/explore')
}
