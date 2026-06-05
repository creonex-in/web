import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserTie, faGraduationCap, faCalendarDays,
  faUsers, faBullseye, faBolt, faFire, faCompass,
} from '@fortawesome/free-solid-svg-icons'
import { CardsGrid } from '@/components/explore/cards-grid'
import { CreatorCard } from '@/components/explore/cards/creator-card'
import { CourseCard } from '@/components/explore/cards/course-card'
import { WorkshopCard } from '@/components/explore/cards/workshop-card'
import { CommunityCard } from '@/components/explore/cards/community-card'
import { CoachingCard } from '@/components/explore/cards/coaching-card'
import { ExploreSectionHeader } from '@/components/explore/section-header'
import { sortCreators, creatorsForNiche } from '@/lib/explore-utils'
import type { Creator } from '@/types/creator'
import type { Course } from '@/types/course'
import type { Offer } from '@/types/offer'

interface Props {
  creators: Creator[]
  courses: Course[]
  offers: Offer[]
}

const TRENDING_NICHES = ['UI/UX Design', 'DSA & Coding', 'Personal Finance', 'CAT Prep']

export function DefaultView({ creators, courses, offers }: Props): React.ReactElement {
  const topCreators = sortCreators(creators, 'relevance').slice(0, 6)
  const liveNow = creators.filter((c) => c.isLive)
  const topCourses = [...courses].sort((a, b) => b.students - a.students).slice(0, 3)
  const upcomingWorkshops = offers.filter(
    (o) => (o.type === 'workshop' || o.type === 'group') && o.status === 'scheduled',
  ).slice(0, 3)
  const communityOffers = offers.filter((o) => o.type === 'community')
  const coachingOffers = offers.filter((o) => o.type === 'coaching_plan')
  const boostedCreators = sortCreators(creators.filter((c) => c.inBoost), 'relevance').slice(0, 3)

  return (
    <div className="space-y-12">

      {/* Live right now banner */}
      {liveNow.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
            </span>
            <h3 className="font-semibold tracking-tight">Live right now</h3>
            <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-600">
              {liveNow.length} online
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-3">
            {liveNow.slice(0, 3).map((c) => (
              <div key={c.id} className="w-[280px] shrink-0 sm:w-auto">
                <CreatorCard creator={c} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Top creators this week */}
      <section>
        <ExploreSectionHeader
          icon={faFire}
          title="Top creators this week"
          description="Ranked by quality score — not follower count"
          viewAllHref="/explore?sort=top_rated"
        />
        <CardsGrid columns={3}>
          {topCreators.map((c) => <CreatorCard key={c.id} creator={c} featured />)}
        </CardsGrid>
      </section>

      {/* Trending by niche */}
      {TRENDING_NICHES.map((niche) => {
        const nicheCreators = creatorsForNiche(niche, creators).slice(0, 3)
        if (!nicheCreators.length) return null
        return (
          <section key={niche}>
            <ExploreSectionHeader
              icon={faCompass}
              title={niche}
              viewAllHref={`/explore?niche=${encodeURIComponent(niche)}`}
            />
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-3">
              {nicheCreators.map((c) => (
                <div key={c.id} className="w-[280px] shrink-0 sm:w-auto">
                  <CreatorCard creator={c} />
                </div>
              ))}
            </div>
          </section>
        )
      })}

      {/* Popular courses */}
      {topCourses.length > 0 && (
        <section>
          <ExploreSectionHeader
            icon={faGraduationCap}
            title="Popular courses"
            description="Self-paced · lifetime access"
            viewAllHref="/explore?tab=course"
          />
          <CardsGrid columns={3}>
            {topCourses.map((c) => <CourseCard key={c.id} course={c} />)}
          </CardsGrid>
        </section>
      )}

      {/* Upcoming workshops & groups */}
      {upcomingWorkshops.length > 0 && (
        <section>
          <ExploreSectionHeader
            icon={faCalendarDays}
            title="Upcoming workshops"
            description="Live sessions — limited seats"
            viewAllHref="/explore?tab=workshop"
          />
          <CardsGrid columns={3}>
            {upcomingWorkshops.map((o) => {
              const creator = creators.find((c) => c.tags.some((t) => o.title.toLowerCase().includes(t.toLowerCase())))
              return <WorkshopCard key={o.id} offer={o} creator={creator} />
            })}
          </CardsGrid>
        </section>
      )}

      {/* Community circles */}
      {communityOffers.length > 0 && (
        <section>
          <ExploreSectionHeader
            icon={faUsers}
            title="Community circles"
            description="Learn alongside peers — monthly membership"
            viewAllHref="/explore?tab=community"
          />
          <CardsGrid columns={3}>
            {communityOffers.map((o) => {
              const creator = creators.find((c) =>
                o.title.toLowerCase().includes(c.niche.split(' ')[0].toLowerCase())
              )
              return <CommunityCard key={o.id} offer={o} creator={creator} />
            })}
          </CardsGrid>
        </section>
      )}

      {/* Coaching programs */}
      {coachingOffers.length > 0 && (
        <section>
          <ExploreSectionHeader
            icon={faBullseye}
            title="Structured coaching programs"
            description="Accountability + curriculum — results guaranteed"
            viewAllHref="/explore?tab=coaching_plan"
          />
          <CardsGrid columns={3}>
            {coachingOffers.map((o) => {
              const creator = creators.find((c) =>
                o.title.toLowerCase().includes(c.niche.split(' ')[0].toLowerCase())
              )
              return <CoachingCard key={o.id} offer={o} creator={creator} />
            })}
          </CardsGrid>
        </section>
      )}

      {/* New & boosted */}
      {boostedCreators.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <FontAwesomeIcon icon={faBolt} className="size-3.5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold tracking-tight">New & boosted</h3>
              <p className="text-xs text-muted-foreground">Fresh talent in discovery mode</p>
            </div>
          </div>
          <CardsGrid columns={3}>
            {boostedCreators.map((c) => <CreatorCard key={c.id} creator={c} />)}
          </CardsGrid>
        </section>
      )}

      {/* Browse all CTA */}
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 py-10 text-center">
        <FontAwesomeIcon icon={faUserTie} className="size-8 text-muted-foreground/40" />
        <div>
          <p className="font-semibold">Explore all 2,400+ creators</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Use the search bar or filter by niche</p>
        </div>
        <Link
          href="/explore?sort=top_rated"
          className="mt-1 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Browse all creators →
        </Link>
      </div>

    </div>
  )
}
