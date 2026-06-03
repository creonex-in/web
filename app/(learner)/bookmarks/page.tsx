'use client'

import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { ResourceRow } from '@/components/learner/resource-row'
import { CreatorCard } from '@/components/learner/creator-card'
import { EmptyState } from '@/components/shared/empty-state'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { mockResources } from '@/data/mock-resources'
import { featuredCreators } from '@/data/mock-creators'

export default function BookmarksPage(): React.ReactElement {
  const bookmarked = mockResources.filter((r) => r.bookmarked)

  return (
    <>
      <DashboardTopbar title="Bookmarks" showSearch />
      <div className="space-y-8 p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">Everything you&apos;ve saved for later.</p>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Saved resources</h3>
          {bookmarked.length === 0 ? (
            <EmptyState
              icon={faBookmark}
              title="No bookmarks yet"
              description="Bookmark resources to find them here."
            />
          ) : (
            <div className="space-y-2">
              {bookmarked.map((r, i) => (
                <ResourceRow key={r.id} resource={r} index={i} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Saved experts</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCreators.map((c, i) => (
              <CreatorCard key={c.id} creator={c} index={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
