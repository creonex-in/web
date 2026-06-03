'use client'

import { useMemo, useState } from 'react'
import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { ResourceRow } from '@/components/learner/resource-row'
import { ResourceCategoryCard } from '@/components/learner/resource-category-card'
import { ContinueLearning } from '@/components/learner/continue-learning'
import { EmptyState } from '@/components/shared/empty-state'
import { Input } from '@/components/ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { mockResources, resourceCategories, continueLearning } from '@/data/mock-resources'
import type { ResourceType } from '@/types/resource'

export default function ResourcesPage(): React.ReactElement {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<ResourceType | 'all'>('all')

  const counts = useMemo(() => {
    const map = {} as Record<ResourceType, number>
    for (const r of mockResources) map[r.type] = (map[r.type] ?? 0) + 1
    return map
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return mockResources.filter((r) => {
      const matchQuery =
        q === '' || r.title.toLowerCase().includes(q) || r.authorName.toLowerCase().includes(q)
      const matchType = type === 'all' || r.type === type
      return matchQuery && matchType
    })
  }, [query, type])

  return (
    <>
      <DashboardTopbar title="Resources" showSearch />
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">All Learning Resources</h2>
          <p className="text-sm text-muted-foreground">
            Access guides, templates, and materials from experts you&apos;ve learned with.
          </p>
        </div>

        <div className="relative max-w-md">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources…"
            className="h-10 rounded-full pl-11"
          />
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {resourceCategories.map((cat, i) => (
            <ResourceCategoryCard
              key={cat.type}
              type={cat.type}
              label={cat.label}
              count={counts[cat.type] ?? 0}
              active={type === cat.type}
              index={i}
              onClick={() => setType((t) => (t === cat.type ? 'all' : cat.type))}
            />
          ))}
        </div>

        {/* Continue learning */}
        {continueLearning.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-sm font-medium">Continue Learning</h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {continueLearning.map((c, i) => (
                <ContinueLearning key={c.id} course={c} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Resource list */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              {type === 'all' ? 'Recent Resources' : `${resourceCategories.find((c) => c.type === type)?.label}`}
            </h3>
            {type !== 'all' && (
              <button
                onClick={() => setType('all')}
                className="cursor-pointer text-xs font-medium text-primary hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon={faFolderOpen}
              title="No resources found"
              description="Try a different keyword or category."
            />
          ) : (
            <div className="space-y-2">
              {results.map((r, i) => (
                <ResourceRow key={r.id} resource={r} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
