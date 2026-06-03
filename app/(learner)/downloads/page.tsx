'use client'

import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { ResourceRow } from '@/components/learner/resource-row'
import { EmptyState } from '@/components/shared/empty-state'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { mockResources } from '@/data/mock-resources'

export default function DownloadsPage(): React.ReactElement {
  const downloaded = mockResources.filter((r) => r.downloaded)

  return (
    <>
      <DashboardTopbar title="Downloads" showSearch />
      <div className="space-y-4 p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">
          Files you&apos;ve downloaded. Available offline anytime.
        </p>
        {downloaded.length === 0 ? (
          <EmptyState
            icon={faDownload}
            title="No downloads yet"
            description="Resources you download will appear here."
          />
        ) : (
          <div className="space-y-2">
            {downloaded.map((r, i) => (
              <ResourceRow key={r.id} resource={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
