'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { CreatorCard } from '@/components/learner/creator-card'
import { CourseCard } from '@/components/learner/course-card'
import { WorkshopCard } from '@/components/learner/workshop-card'
import { SectionHeader } from '@/components/shared/section-header'
import { EmptyState } from '@/components/shared/empty-state'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faClock,
  faXmark,
  faUserTie,
  faGraduationCap,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from '@/hooks/use-debounce'
import { mockCreators } from '@/data/mock-creators'
import { mockCourses } from '@/data/mock-courses'
import { mockOffers } from '@/data/mock-offers'

const LS_KEY = 'rc-recent-searches'
const MAX_RECENT = 6

function loadRecent(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as string[]
  } catch {
    return []
  }
}

function persistRecent(term: string, current: string[]): string[] {
  const t = term.trim().toLowerCase()
  if (!t) return current
  const next = [t, ...current.filter((s) => s !== t)].slice(0, MAX_RECENT)
  localStorage.setItem(LS_KEY, JSON.stringify(next))
  return next
}

function ExploreContent(): React.ReactElement {
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [recent, setRecent] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const debounced = useDebounce(query.trim().toLowerCase(), 250)

  useEffect(() => {
    // Client-only read of localStorage on mount (avoids SSR hydration mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecent(loadRecent())
    inputRef.current?.focus()
  }, [])

  // Persist a recent search once the user pauses on a non-empty query.
  useEffect(() => {
    if (!debounced) return
    const timer = setTimeout(() => setRecent((prev) => persistRecent(debounced, prev)), 900)
    return () => clearTimeout(timer)
  }, [debounced])

  const { experts, courses, workshops, total } = useMemo(() => {
    const q = debounced
    if (!q) return { experts: [], courses: [], workshops: [], total: 0 }

    const experts = mockCreators.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.niche.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    )
    const courses = mockCourses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.niche.toLowerCase().includes(q) ||
        c.expertName.toLowerCase().includes(q)
    )
    const workshops = mockOffers.filter(
      (o) =>
        (o.type === 'workshop' || o.type === 'group') &&
        (o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q))
    )
    return {
      experts,
      courses,
      workshops,
      total: experts.length + courses.length + workshops.length,
    }
  }, [debounced])

  const showRecent = !debounced && recent.length > 0
  const showResults = !!debounced

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="relative">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search experts, courses, workshops…"
          className="h-11 rounded-full pl-11 pr-10 text-sm"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1.5 top-1/2 size-8 -translate-y-1/2"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            aria-label="Clear"
          >
            <FontAwesomeIcon icon={faXmark} className="size-4" />
          </Button>
        )}
      </div>

      {showRecent && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Recent searches
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-[11px] text-muted-foreground"
              onClick={() => {
                setRecent([])
                localStorage.removeItem(LS_KEY)
              }}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recent.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs transition-colors hover:bg-accent"
              >
                <FontAwesomeIcon icon={faClock} className="size-3 text-muted-foreground" />
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {!showRecent && !showResults && (
        <EmptyState
          icon={faMagnifyingGlass}
          title="Search everything"
          description="Find 1:1 experts, self-paced courses, and live workshops — all in one place."
        />
      )}

      {showResults && total === 0 && (
        <EmptyState
          icon={faMagnifyingGlass}
          title="No results"
          description={`Nothing matched “${query.trim()}”. Try a different keyword.`}
        />
      )}

      {showResults && total > 0 && (
        <div className="space-y-10">
          {experts.length > 0 && (
            <section className="space-y-4">
              <SectionHeader
                icon={faUserTie}
                title="1:1 Experts"
                description={`${experts.length} expert${experts.length !== 1 ? 's' : ''} for personal mentorship`}
                viewAllHref="/search"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {experts.map((c, i) => (
                  <CreatorCard key={c.id} creator={c} index={i} />
                ))}
              </div>
            </section>
          )}

          {courses.length > 0 && (
            <section className="space-y-4">
              <SectionHeader
                icon={faGraduationCap}
                title="Courses"
                description={`${courses.length} self-paced course${courses.length !== 1 ? 's' : ''}`}
                viewAllHref="/courses"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((c, i) => (
                  <CourseCard key={c.id} course={c} index={i} />
                ))}
              </div>
            </section>
          )}

          {workshops.length > 0 && (
            <section className="space-y-4">
              <SectionHeader
                icon={faCalendarDays}
                title="Workshops"
                description={`${workshops.length} live workshop${workshops.length !== 1 ? 's' : ''}`}
                viewAllHref="/workshops"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {workshops.map((o, i) => {
                  const creator = mockCreators.find((c) =>
                    c.tags.some((t) => o.title.toLowerCase().includes(t.toLowerCase()))
                  )
                  return <WorkshopCard key={o.id} offer={o} creator={creator} index={i} />
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

export default function ExplorePage(): React.ReactElement {
  return (
    <>
      <DashboardTopbar title="Search" />
      <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading…</div>}>
        <ExploreContent />
      </Suspense>
    </>
  )
}
