import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faStar, faCalendarDays, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Badge } from '@/components/ui/badge'
import type { Offer } from '@/types/offer'
import type { Creator } from '@/types/creator'
import { formatCurrency } from '@/lib/utils'

interface Props {
  offer: Offer
  creator?: Creator
}

export function CoachingCard({ offer, creator }: Props): React.ReactElement {
  return (
    <Link href={creator ? `/c/${creator.username}` : '/explore'} className="group block">
      <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-violet-500/10">
            <FontAwesomeIcon icon={faBullseye} className="size-5 text-violet-500" />
          </div>
          <div className="flex flex-col items-end gap-1">
            {offer.programDuration && (
              <Badge variant="secondary" className="text-[10px]">{offer.programDuration}</Badge>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          <p className="font-medium leading-snug">{offer.title}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">{offer.description}</p>
        </div>

        <div className="space-y-1.5 rounded-lg bg-muted/50 p-3">
          {offer.sessionCount && (
            <div className="flex items-center gap-2 text-xs">
              <FontAwesomeIcon icon={faCheck} className="size-3 text-primary" />
              <span>{offer.sessionCount} sessions included</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs">
            <FontAwesomeIcon icon={faCalendarDays} className="size-3 text-primary" />
            <span>Structured weekly schedule</span>
          </div>
          {offer.rating > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <FontAwesomeIcon icon={faStar} className="size-3 text-amber-400" />
              <span>{offer.rating} · {offer.bookings} enrolled</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <p className="text-base font-bold">{formatCurrency(offer.price)}</p>
            <p className="text-[10px] text-muted-foreground">full programme</p>
          </div>
          <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
            View programme →
          </span>
        </div>
      </div>
    </Link>
  )
}
