import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CreatorStep3Form } from '@/components/onboarding/creator/step-3-form'

export const metadata: Metadata = { title: 'Creator Onboarding — Creonex' }

export default async function CreatorStep3Page(): Promise<React.ReactElement> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  return <CreatorStep3Form />
}
