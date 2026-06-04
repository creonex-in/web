import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ExploreClientShell } from '@/components/explore/explore-client-shell'
import { mockCreators } from '@/data/mock-creators'
import { mockCourses } from '@/data/mock-courses'
import { mockOffers } from '@/data/mock-offers'

export const metadata: Metadata = {
  title: 'Explore — Creonex',
  description: "Discover India's best mentors, courses, and workshops.",
}

export default function ExplorePage(): React.ReactElement {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading…</div>}>
      <ExploreClientShell
        creators={mockCreators}
        courses={mockCourses}
        offers={mockOffers}
      />
    </Suspense>
  )
}
