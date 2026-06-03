'use client'

import Link from 'next/link'
import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { CreatorCard } from '@/components/learner/creator-card'
import { CourseCard } from '@/components/learner/course-card'
import { WorkshopCard } from '@/components/learner/workshop-card'
import { LiveBanner } from '@/components/learner/live-banner'
import { ContinueLearning } from '@/components/learner/continue-learning'
import { SectionHeader } from '@/components/shared/section-header'
import { WelcomeHero } from '@/components/shared/welcome-hero'
import { QuickActions } from '@/components/shared/quick-actions'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserTie,
  faGraduationCap,
  faCalendarDays,
  faBookOpen,
  faCompass,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { mockCreators, liveCreators } from '@/data/mock-creators'
import { topCourses } from '@/data/mock-courses'
import { mockOffers } from '@/data/mock-offers'
import { continueLearning } from '@/data/mock-resources'

export default function LearnerHomePage(): React.ReactElement {
  const sessionCreators = mockCreators.slice(0, 3)
  const courses = topCourses.slice(0, 3)
  const workshops = mockOffers
    .filter((o) => o.type === 'workshop' || o.type === 'group')
    .slice(0, 3)

  return (
    <>
      <DashboardTopbar title="Discover" showSearch />
      <div className="space-y-10 p-4 sm:p-6">

        <WelcomeHero
          name="Arjun Kumar"
          initials="AK"
          subtitle="Pick up a course, book an expert, or join a live workshop today."
          stats={[
            { label: 'In progress', value: `${continueLearning.length} courses` },
            { label: 'Experts live now', value: liveCreators.length.toString() },
          ]}
          action={
            <Link href="/explore" className={cn(buttonVariants({ size: 'sm' }), 'text-xs')}>
              <FontAwesomeIcon icon={faCompass} className="mr-1 size-3.5" />
              Explore
            </Link>
          }
        />

        <QuickActions
          actions={[
            { label: 'Explore', description: 'Search everything', icon: faCompass, href: '/explore' },
            { label: 'Find experts', description: 'Book 1:1 mentorship', icon: faUserTie, href: '/search' },
            { label: 'Browse courses', description: 'Self-paced learning', icon: faGraduationCap, href: '/courses' },
            { label: 'My resources', description: 'PDFs, guides & more', icon: faFolderOpen, href: '/resources' },
          ]}
        />

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
              viewAllHref="/resources"
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
            viewAllHref="/search"
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
            viewAllHref="/courses"
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
            viewAllHref="/workshops"
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
