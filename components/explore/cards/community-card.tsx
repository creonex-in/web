import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faStar } from '@fortawesome/free-solid-svg-icons'
import { Badge } from '@/components/ui/badge'
import type { Offer } from '@/types/offer'
import type { Creator } from '@/types/creator'
import { formatCurrency } from '@/lib/utils'

interface Props {
  offer: Offer
  creator?: Creator
}

export function CommunityCard({ offer, creator }: Props): React.ReactElement {
  const cycleLabel = offer.billingCycle === 'monthly' ? '/mo' : offer.billingCycle === 'quarterly' ? '/qtr' : '/yr'

  return (
    <Link href={creator ? `/c/${creator.username}` : '/explore'} className="group block">
      <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10">
            <FontAwesomeIcon icon={faUsers} className="size-5 text-blue-500" />
          </div>
          <Badge variant="secondary" className="text-[10px]">Community</Badge>
        </div>

        <div className="flex-1 space-y-1.5">
          <p className="font-medium leading-snug">{offer.title}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">{offer.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faUsers} className="size-3" />
            {offer.memberCount ?? offer.bookings} members
          </span>
          {offer.rating > 0 && (
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="size-3 text-amber-400" />
              {offer.rating}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <p className="text-sm font-bold">{formatCurrency(offer.price)}<span className="text-xs font-normal text-muted-foreground">{cycleLabel}</span></p>
          </div>
          <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
            Join →
          </span>
        </div>
      </div>
    </Link>
  )
}
