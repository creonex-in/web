import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { LearnerStep1Form } from '@/components/onboarding/learner/step-1-form'

export const metadata: Metadata = { title: 'Get Started — Creonex' }

export default async function LearnerStep1Page(): Promise<React.ReactElement> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  return <LearnerStep1Form />
}
