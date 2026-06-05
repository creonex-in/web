import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faStar, faDownload } from '@fortawesome/free-solid-svg-icons'
import { Badge } from '@/components/ui/badge'
import type { Offer } from '@/types/offer'
import type { Creator } from '@/types/creator'
import { formatCurrency } from '@/lib/utils'

interface Props {
  offer: Offer
  creator?: Creator
}

export function DigitalCard({ offer, creator }: Props): React.ReactElement {
  return (
    <Link href={creator ? `/c/${creator.username}` : '/explore'} className="group block">
      <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <FontAwesomeIcon icon={faFileArrowDown} className="size-5 text-primary" />
        </div>

        <div className="flex-1 space-y-1.5">
          <p className="font-medium leading-snug">{offer.title}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">{offer.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faDownload} className="size-3" />
            {offer.bookings} downloads
          </span>
          {offer.rating > 0 && (
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="size-3 text-amber-400" />
              {offer.rating}
            </span>
          )}
          <Badge variant="secondary" className="px-2 text-[10px]">Digital</Badge>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <p className="text-sm font-bold">{formatCurrency(offer.price)}</p>
          <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
            Buy now →
          </span>
        </div>
      </div>
    </Link>
  )
}
