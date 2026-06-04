'use client'
import { useMemo, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { ExploreSearchBar } from '@/components/explore/explore-search-bar'
import { NichePillBar } from '@/components/explore/niche-pill-bar'
import { SidebarFilters } from '@/components/explore/sidebar-filters'
import { MobileFilterSheet } from '@/components/explore/mobile-filter-sheet'
import { ActiveFilterChips } from '@/components/explore/active-filter-chips'
import { TabsAndSortBar } from '@/components/explore/tabs-and-sort-bar'
import { StatsStrip } from '@/components/explore/stats-strip'
import { DefaultView } from '@/components/explore/default-view'
import { ResultsView } from '@/components/explore/results-view'
import { sortCreators, matchesCreator, computeActiveFilterCount, parseResponseMinutes } from '@/lib/explore-utils'
import type { ExploreFilters, ExploreTab, SortOption } from '@/types/explore'
import { DEFAULT_FILTERS } from '@/types/explore'
import type { Creator } from '@/types/creator'
import type { Course } from '@/types/course'
import type { Offer } from '@/types/offer'

interface Props {
  creators: Creator[]
  courses: Course[]
  offers: Offer[]
}

export function ExploreClientShell({ creators, courses, offers }: Props): React.ReactElement {
  const router = useRouter()
  const params = useSearchParams()

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [activeNiche, setActiveNiche] = useState<string | null>(params.get('niche'))
  const [activeTab, setActiveTab] = useState<ExploreTab>((params.get('tab') as ExploreTab) ?? 'all')
  const [sortBy, setSortBy] = useState<SortOption>((params.get('sort') as SortOption) ?? 'relevance')
  const [filters, setFilters] = useState<ExploreFilters>(DEFAULT_FILTERS)
  const [mobileOpen, setMobileOpen] = useState(false)

  const syncUrl = useCallback((q: string, niche: string | null, tab: ExploreTab, sort: SortOption) => {
    const p = new URLSearchParams()
    if (q) p.set('q', q)
    if (niche) p.set('niche', niche)
    if (tab !== 'all') p.set('tab', tab)
    if (sort !== 'relevance') p.set('sort', sort)
    router.replace(`/explore${p.toString() ? '?' + p.toString() : ''}`, { scroll: false })
  }, [router])

  const handleQuery = (v: string) => { setQuery(v); syncUrl(v, activeNiche, activeTab, sortBy) }
  const handleNiche = (v: string | null) => { setActiveNiche(v); syncUrl(query, v, activeTab, sortBy) }
  const handleTab = (v: ExploreTab) => { setActiveTab(v); syncUrl(query, activeNiche, v, sortBy) }
  const handleSort = (v: SortOption) => { setSortBy(v); syncUrl(query, activeNiche, activeTab, v) }

  const handleRemoveFilter = (key: keyof ExploreFilters, value: ExploreFilters[keyof ExploreFilters]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredCreators = useMemo(() => {
    return creators.filter((c) => {
      if (activeNiche && !c.niche.toLowerCase().includes(activeNiche.toLowerCase())) return false
      if (query && !matchesCreator(c, query)) return false
      if (filters.minRating && c.rating < filters.minRating) return false
      if (c.sessionPrice < filters.priceMin || c.sessionPrice > filters.priceMax) return false
      if (filters.liveToday && !c.isLive) return false
      if (filters.inBoost && !c.inBoost) return false
      if (filters.responseTime === 'under_1hr' && parseResponseMinutes(c.responseTime) > 60) return false
      if (filters.responseTime === 'under_6hrs' && parseResponseMinutes(c.responseTime) > 360) return false
      return true
    })
  }, [creators, query, activeNiche, filters])

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (activeNiche && !c.niche.toLowerCase().includes(activeNiche.toLowerCase())) return false
      if (query && !c.title.toLowerCase().includes(query.toLowerCase()) && !c.expertName.toLowerCase().includes(query.toLowerCase())) return false
      if (c.price < filters.priceMin || c.price > filters.priceMax) return false
      if (filters.minRating && c.rating < filters.minRating) return false
      return true
    })
  }, [courses, query, activeNiche, filters])

  const filteredOffers = useMemo(() => {
    return offers.filter((o) => {
      if (activeTab !== 'all' && activeTab !== 'course' && o.type !== activeTab) return false
      if (query && !o.title.toLowerCase().includes(query.toLowerCase()) && !o.description.toLowerCase().includes(query.toLowerCase())) return false
      if (o.price < filters.priceMin || o.price > filters.priceMax) return false
      if (filters.minRating && o.rating > 0 && o.rating < filters.minRating) return false
      return true
    })
  }, [offers, query, activeTab, filters])

  const hasActiveSearch = query.trim().length > 0 || activeNiche !== null
  const activeFilterCount = computeActiveFilterCount(filters)
  const sortedCreators = sortCreators(filteredCreators, sortBy)

  const counts: Record<ExploreTab, number> = {
    all: filteredCreators.length + filteredCourses.length + filteredOffers.length,
    '1:1': filteredCreators.length + filteredOffers.filter((o) => o.type === '1:1').length,
    workshop: filteredOffers.filter((o) => o.type === 'workshop').length,
    group: filteredOffers.filter((o) => o.type === 'group').length,
    digital: filteredOffers.filter((o) => o.type === 'digital').length,
    course: filteredCourses.length,
    community: filteredOffers.filter((o) => o.type === 'community').length,
    coaching_plan: filteredOffers.filter((o) => o.type === 'coaching_plan').length,
  }

  return (
    <div className="min-h-screen">
      {/* Sticky search + niche strip */}
      <div className="sticky top-14 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="page-container space-y-3 py-3">
          <ExploreSearchBar value={query} onChange={handleQuery} />
          <NichePillBar activeNiche={activeNiche} onChange={handleNiche} />
        </div>
      </div>

      <div className="page-container py-6">
        <div className="flex gap-6">
          {/* Sidebar — desktop */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <div className="sticky top-[148px]">
              <SidebarFilters filters={filters} onChange={setFilters} activeFilterCount={activeFilterCount} />
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1 space-y-5">
            <StatsStrip />

            {activeFilterCount > 0 && (
              <ActiveFilterChips
                filters={filters}
                onRemove={handleRemoveFilter}
                onClearAll={() => setFilters(DEFAULT_FILTERS)}
              />
            )}

            {hasActiveSearch && (
              <TabsAndSortBar
                activeTab={activeTab}
                onTabChange={handleTab}
                sortBy={sortBy}
                onSortChange={handleSort}
                counts={counts}
              />
            )}

            {hasActiveSearch ? (
              <ResultsView
                creators={sortedCreators}
                courses={filteredCourses}
                offers={filteredOffers}
                activeTab={activeTab}
                query={query}
              />
            ) : (
              <DefaultView creators={creators} courses={courses} offers={offers} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter FAB */}
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
        >
          <FontAwesomeIcon icon={faSliders} className="size-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <MobileFilterSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        filters={filters}
        onChange={setFilters}
      />
    </div>
  )
}
