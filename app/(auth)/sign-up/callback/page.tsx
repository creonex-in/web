import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SignUpCallbackPage() {
    const { userId, sessionClaims } = await auth()
    if (!userId) redirect('/sign-up')

    // By this point webhook has already fired and set roles in Clerk
    // JWT may not have updated roles yet — webhook is async
    // So read intent from sessionClaims.unsafeMetadata as fallback
    const metadata = (sessionClaims as Record<string, unknown>)
        ?.metadata as {
            roles?: ('learner' | 'creator')[]
            onboarding_complete?: boolean
        } | undefined

    const unsafeMetadata = (sessionClaims as Record<string, unknown>)
        ?.unsafeMetadata as { intent?: string } | undefined

    const roles = metadata?.roles ?? []
    const isCreator =
        roles.includes('creator') || unsafeMetadata?.intent === 'creator'

    if (isCreator) redirect('/onboarding/creator/step-1')
    redirect('/onboarding/learner/step-1')
}