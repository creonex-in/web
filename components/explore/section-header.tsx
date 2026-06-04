import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: IconDefinition
  title: string
  description?: string
  count?: number
  viewAllHref?: string
}

export function ExploreSectionHeader({ icon, title, description, count, viewAllHref }: Props): React.ReactElement {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <FontAwesomeIcon icon={icon} className="size-3.5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold tracking-tight">{title}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {count !== undefined && !description && (
            <p className="text-[11px] text-muted-foreground">{count} result{count !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>
      {viewAllHref && (
        <Link href={viewAllHref} className="shrink-0 text-sm text-primary hover:underline">
          See all →
        </Link>
      )}
    </div>
  )
}
