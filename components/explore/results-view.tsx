import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass, faUserTie, faGraduationCap,
  faCalendarDays, faFileArrowDown, faUsers, faBullseye,
} from '@fortawesome/free-solid-svg-icons'
import { CardsGrid } from '@/components/explore/cards-grid'
import { CreatorCard } from '@/components/explore/cards/creator-card'
import { CourseCard } from '@/components/explore/cards/course-card'
import { WorkshopCard } from '@/components/explore/cards/workshop-card'
import { DigitalCard } from '@/components/explore/cards/digital-card'
import { CommunityCard } from '@/components/explore/cards/community-card'
import { CoachingCard } from '@/components/explore/cards/coaching-card'
import { ExploreSectionHeader } from '@/components/explore/section-header'
import type { Creator } from '@/types/creator'
import type { Course } from '@/types/course'
import type { Offer } from '@/types/offer'
import type { ExploreTab } from '@/types/explore'

interface Props {
  creators: Creator[]
  courses: Course[]
  offers: Offer[]
  activeTab: ExploreTab
  query: string
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="mb-4 size-10 text-muted-foreground/30" />
      <p className="text-lg font-semibold">No results for &ldquo;{query}&rdquo;</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Try a different keyword or clear your filters
      </p>
    </div>
  )
}

export function ResultsView({ creators, courses, offers, activeTab, query }: Props): React.ReactElement {
  const oneOnOneOffers = offers.filter((o) => o.type === '1:1')
  const workshopOffers = offers.filter((o) => o.type === 'workshop')
  const groupOffers = offers.filter((o) => o.type === 'group')
  const digitalOffers = offers.filter((o) => o.type === 'digital')
  const communityOffers = offers.filter((o) => o.type === 'community')
  const coachingOffers = offers.filter((o) => o.type === 'coaching_plan')

  const total =
    creators.length + courses.length + oneOnOneOffers.length +
    workshopOffers.length + groupOffers.length + digitalOffers.length +
    communityOffers.length + coachingOffers.length

  if (total === 0) return <EmptyState query={query} />

  const showSection = (tab: ExploreTab) => activeTab === 'all' || activeTab === tab

  return (
    <div className="space-y-10">

      {/* 1:1 creators */}
      {showSection('1:1') && creators.length > 0 && (
        <section>
          <ExploreSectionHeader icon={faUserTie} title="1:1 Experts" count={creators.length} />
          <CardsGrid>
            {creators.map((c) => <CreatorCard key={c.id} creator={c} />)}
          </CardsGrid>
        </section>
      )}

      {/* Courses */}
      {showSection('course') && courses.length > 0 && (
        <section>
          <ExploreSectionHeader icon={faGraduationCap} title="Courses" count={courses.length} />
          <CardsGrid>
            {courses.map((c) => <CourseCard key={c.id} course={c} />)}
          </CardsGrid>
        </section>
      )}

      {/* Workshops */}
      {showSection('workshop') && workshopOffers.length > 0 && (
        <section>
          <ExploreSectionHeader icon={faCalendarDays} title="Workshops" count={workshopOffers.length} />
          <CardsGrid>
            {workshopOffers.map((o) => <WorkshopCard key={o.id} offer={o} />)}
          </CardsGrid>
        </section>
      )}

      {/* Group sessions */}
      {showSection('group') && groupOffers.length > 0 && (
        <section>
          <ExploreSectionHeader icon={faUsers} title="Group Sessions" count={groupOffers.length} />
          <CardsGrid>
            {groupOffers.map((o) => <WorkshopCard key={o.id} offer={o} />)}
          </CardsGrid>
        </section>
      )}

      {/* Digital */}
      {showSection('digital') && digitalOffers.length > 0 && (
        <section>
          <ExploreSectionHeader icon={faFileArrowDown} title="Digital Products" count={digitalOffers.length} />
          <CardsGrid>
            {digitalOffers.map((o) => <DigitalCard key={o.id} offer={o} />)}
          </CardsGrid>
        </section>
      )}

      {/* Community */}
      {showSection('community') && communityOffers.length > 0 && (
        <section>
          <ExploreSectionHeader icon={faUsers} title="Communities" count={communityOffers.length} />
          <CardsGrid>
            {communityOffers.map((o) => <CommunityCard key={o.id} offer={o} />)}
          </CardsGrid>
        </section>
      )}

      {/* Coaching */}
      {showSection('coaching_plan') && coachingOffers.length > 0 && (
        <section>
          <ExploreSectionHeader icon={faBullseye} title="Coaching Programs" count={coachingOffers.length} />
          <CardsGrid>
            {coachingOffers.map((o) => <CoachingCard key={o.id} offer={o} />)}
          </CardsGrid>
        </section>
      )}

    </div>
  )
}
