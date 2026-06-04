'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function CreatorDashboardButton(): React.ReactElement | null {
  const { user } = useUser()
  const roles = (user?.publicMetadata?.roles ?? []) as string[]

  if (!roles.includes('creator')) return null

  return (
    <Link href="/dashboard" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
      Creator Dashboard
    </Link>
  )
}
