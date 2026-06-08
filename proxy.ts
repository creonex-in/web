import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/creators',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/c/(.*)',
  '/top-creators/(.*)' 
])

const isCreatorRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/analytics(.*)',
  '/bookings(.*)',
  '/calendar(.*)',
  '/collaborate(.*)',
  '/cqs(.*)',
  '/offers(.*)',
  '/payouts(.*)',
  '/edit-profile(.*)',
  '/auto-dm(.*)',
  '/priority-dm(.*)',
  '/testimonials(.*)',
])

const isLearnerRoute = createRouteMatcher(['/learner(.*)'])

const isOnboardingRoute = createRouteMatcher(['/onboarding(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return NextResponse.next()

  const { userId, sessionClaims } = await auth()

  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  const metadata = (sessionClaims as Record<string, unknown>)
    ?.metadata as {
      roles?: ('learner' | 'creator')[]
      onboarding_complete?: boolean
      onboarding_step?: number
    } | undefined

  const roles = metadata?.roles ?? ['learner']
  const onboardingComplete = metadata?.onboarding_complete ?? false
  const onboardingStep = metadata?.onboarding_step ?? 1
  const isCreator = roles.includes('creator')
  const isLearner = roles.includes('learner')

  // ── Onboarding protection ──
  if (isOnboardingRoute(req)) {
    const isCreatorOnboarding = req.nextUrl.pathname.startsWith(
      '/onboarding/creator',
    )
    const isLearnerOnboarding = req.nextUrl.pathname.startsWith(
      '/onboarding/learner',
    )

    if (isCreatorOnboarding && !isCreator) {
      return NextResponse.redirect(new URL('/learner/dashboard', req.url))
    }
    if (isLearnerOnboarding && !isLearner) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    if (onboardingComplete) {
      return NextResponse.redirect(
        new URL(isCreator ? '/dashboard' : '/learner/dashboard', req.url),
      )
    }
    return NextResponse.next()
  }

  // ── Creator route protection ──
  if (isCreatorRoute(req)) {
    if (!isCreator) {
      return NextResponse.redirect(new URL('/learner/dashboard', req.url))
    }
    if (!onboardingComplete) {
      return NextResponse.redirect(
        new URL(`/onboarding/creator/step-${onboardingStep}`, req.url),
      )
    }
    return NextResponse.next()
  }

  // ── Learner route protection ──
  if (isLearnerRoute(req)) {
    if (!isLearner) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    if (!onboardingComplete) {
      return NextResponse.redirect(
        new URL(`/onboarding/learner/step-${onboardingStep}`, req.url),
      )
    }
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|mp3|wav)).*)',
    '/(api|trpc)(.*)',
  ],
}