import type { Metadata } from 'next'
import Link from 'next/link'
import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { CreatorCard } from '@/components/learner/creator-card'
import { CourseCard } from '@/components/learner/course-card'
import { WorkshopCard } from '@/components/learner/workshop-card'
import { LiveBanner } from '@/components/learner/live-banner'
import { ContinueLearning } from '@/components/learner/continue-learning'
import { UpcomingAgenda, type AgendaItem } from '@/components/learner/upcoming-agenda'
import { SectionHeader } from '@/components/shared/section-header'
import { WelcomeHero } from '@/components/shared/welcome-hero'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserTie,
  faGraduationCap,
  faCalendarDays,
  faBookOpen,
  faCompass,
} from '@fortawesome/free-solid-svg-icons'
import { mockCreators, liveCreators } from '@/data/mock-creators'
import { topCourses } from '@/data/mock-courses'
import { mockOffers } from '@/data/mock-offers'
import { mockPurchases } from '@/data/mock-purchases'
import { continueLearning } from '@/data/mock-resources'

export const metadata: Metadata = {
  title: 'Dashboard — Creonex',
  description: 'Discover courses, book expert sessions, and continue learning.',
}

export default function LearnerHomePage(): React.ReactElement {
  const sessionCreators = mockCreators.slice(0, 3)
  const courses = topCourses.slice(0, 3)
  const workshops = mockOffers
    .filter((o) => o.type === 'workshop' || o.type === 'group')
    .slice(0, 3)

  const upcomingAgenda: AgendaItem[] = [
    ...mockPurchases
      .filter((p) => !p.completed)
      .map<AgendaItem>((p) => ({
        id: `s-${p.id}`,
        title: p.offerTitle,
        host: p.creatorName,
        hostInitials: p.creatorInitials,
        date: p.purchasedAt,
        kind: p.offerType === 'workshop' ? 'workshop' : 'session',
        href: '/learner/sessions',
      })),
    ...mockOffers
      .filter((o) => (o.type === 'workshop' || o.type === 'group') && o.date)
      .map<AgendaItem>((o) => {
        const host = mockCreators.find((c) =>
          c.tags.some((t) => o.title.toLowerCase().includes(t.toLowerCase()))
        )
        return {
          id: `w-${o.id}`,
          title: o.title,
          host: host?.name ?? 'Creonex Live',
          hostInitials: host?.initials ?? 'CL',
          date: o.date as string,
          duration: o.duration,
          kind: o.type as 'workshop' | 'group',
          href: '/learner/workshops',
          seatsLeft: o.seatsLeft,
        }
      }),
  ].slice(0, 6)

  return (
    <>
      <DashboardTopbar title="Discover" showSearch />
      <div className="space-y-10 p-4 sm:p-6 lg:p-8">

        <WelcomeHero
          name="Arjun Kumar"
          initials="AK"
          subtitle="Pick up a course, book an expert, or join a live workshop today."
          stats={[
            { label: 'In progress', value: `${continueLearning.length} courses` },
            { label: 'Experts live now', value: liveCreators.length.toString() },
          ]}
          action={
            <Link href="/learner/explore" className={cn(buttonVariants({ size: 'sm' }), 'text-xs')}>
              <FontAwesomeIcon icon={faCompass} className="mr-1 size-3.5" />
              Explore
            </Link>
          }
        />

        {/* Upcoming — sessions & workshops the learner must attend */}
        <section className="space-y-4">
          <SectionHeader
            icon={faCalendarDays}
            title="Upcoming Sessions & Workshops"
            description="Everything you've signed up for in the coming days — don't miss it."
            viewAllHref="/learner/sessions"
          />
          <UpcomingAgenda items={upcomingAgenda} />
        </section>

        {liveCreators.length > 0 && (
          <div className="space-y-2">
            {liveCreators.slice(0, 1).map((creator) => (
              <LiveBanner key={creator.id} creator={creator} />
            ))}
          </div>
        )}

        {/* Continue learning */}
        {continueLearning.length > 0 && (
          <section className="space-y-4">
            <SectionHeader
              icon={faBookOpen}
              title="Continue Learning"
              description="Pick up where you left off."
              viewAllHref="/learner/resources"
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {continueLearning.map((c, i) => (
                <ContinueLearning key={c.id} course={c} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* 1:1 mentorship */}
        <section className="space-y-4">
          <SectionHeader
            icon={faUserTie}
            title="Book a 1:1 Session"
            description="Personal mentorship with verified experts — billed per session."
            viewAllHref="/learner/search"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sessionCreators.map((creator, i) => (
              <CreatorCard key={creator.id} creator={creator} index={i} />
            ))}
          </div>
        </section>

        {/* Courses */}
        <section className="space-y-4">
          <SectionHeader
            icon={faGraduationCap}
            title="Courses by Top Experts"
            description="Self-paced, one-time payment, lifetime access. Learn anytime."
            viewAllHref="/learner/courses"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </section>

        {/* Workshops */}
        <section className="space-y-4">
          <SectionHeader
            icon={faCalendarDays}
            title="Live Workshops"
            description="Scheduled group sessions. Join live and learn with others."
            viewAllHref="/learner/workshops"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((offer, i) => {
              const creator = mockCreators.find((c) =>
                c.tags.some((t) => offer.title.toLowerCase().includes(t.toLowerCase()))
              )
              return <WorkshopCard key={offer.id} offer={offer} creator={creator} index={i} />
            })}
          </div>
        </section>
      </div>
    </>
  )
}
