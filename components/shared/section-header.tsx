import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface SectionHeaderProps {
  icon: IconDefinition
  title: string
  description: string
  viewAllHref?: string
  viewAllLabel?: string
}

export function SectionHeader({
  icon,
  title,
  description,
  viewAllHref,
  viewAllLabel = 'View all',
}: SectionHeaderProps): React.ReactElement {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <FontAwesomeIcon icon={icon} className="size-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
        </div>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {viewAllLabel}
          <FontAwesomeIcon icon={faArrowRight} className="size-3" />
        </Link>
      )}
    </div>
  )
}
