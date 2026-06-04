import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CreatorStep2Form } from '@/components/onboarding/creator/step-2-form'

export const metadata: Metadata = { title: 'Creator Onboarding — Creonex' }

export default async function CreatorStep2Page(): Promise<React.ReactElement> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  return <CreatorStep2Form />
}
