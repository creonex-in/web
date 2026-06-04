import type { Metadata } from 'next'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CreatorStep1Form } from '@/components/onboarding/creator/step-1-form'

export const metadata: Metadata = { title: 'Creator Onboarding — Creonex' }

export default async function CreatorStep1Page(): Promise<React.ReactElement> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()
  const defaultName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()

  return <CreatorStep1Form defaultName={defaultName} />
}
