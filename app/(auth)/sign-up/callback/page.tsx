import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

type Roles = ('learner' | 'creator')[]

const MAX_RETRIES = 5

export default async function SignUpCallbackPage() {
  // Poll for a fresh JWT — the role-setting webhook is async, so publicMetadata.roles
  // may not be present in the session token immediately after sign-up. Routing is based
  // only on publicMetadata.roles from the JWT (never client-writable unsafeMetadata).
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const { getToken, sessionClaims } = await auth()

    // Force a fresh JWT each attempt. (Server getToken types omit skipCache, but it
    // is honored at runtime — cast to keep the cache-busting behavior.)
    await getToken({ skipCache: true } as unknown as Parameters<typeof getToken>[0])

    const roles = (sessionClaims as { publicMetadata?: { roles?: Roles } } | null)
      ?.publicMetadata?.roles

    if (roles && roles.length > 0) {
      if (roles.includes('creator')) redirect('/onboarding/creator/step-1')
      redirect('/onboarding/learner/step-1')
    }

    // Roles not propagated yet — wait and retry.
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  // JWT never carried roles — send the user to sign in fresh for a valid session.
  redirect('/sign-in?error=session_not_ready')

  return null
}
