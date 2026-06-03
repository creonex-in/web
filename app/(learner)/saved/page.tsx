import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { CreatorCard } from '@/components/learner/creator-card'
import { EmptyState } from '@/components/shared/empty-state'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { featuredCreators } from '@/data/mock-creators'

export const metadata = { title: 'Saved — Creonex' }

export default function SavedPage(): React.ReactElement {
  const saved = featuredCreators

  return (
    <>
      <DashboardTopbar title="Saved" showSearch />
      <div className="p-4 sm:p-6">
        {saved.length === 0 ? (
          <EmptyState
            icon={faHeart}
            title="No saved creators"
            description="Bookmark creators you like and they'll appear here."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {saved.map((creator, i) => (
              <CreatorCard key={creator.id} creator={creator} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
