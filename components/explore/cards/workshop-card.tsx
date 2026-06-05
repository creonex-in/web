import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { Offer } from '@/types/offer'
import type { Creator } from '@/types/creator'
import { formatCurrency } from '@/lib/utils'

interface Props {
  offer: Offer
  creator?: Creator
}

export function WorkshopCard({ offer, creator }: Props): React.ReactElement {
  const seatsPercent = offer.seats ? ((offer.seats - (offer.seatsLeft ?? 0)) / offer.seats) * 100 : 0
  const isFull = offer.seatsLeft === 0
  const isAlmostFull = (offer.seatsLeft ?? Infinity) <= 5

  return (
    <Link href={creator ? `/c/${creator.username}` : '/explore'} className="group block">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        {offer.image && (
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
            <Badge variant="secondary" className="absolute left-2 top-2 bg-background/90 px-2 text-[10px] capitalize backdrop-blur">
              {offer.type}
            </Badge>
            {isAlmostFull && !isFull && (
              <Badge variant="destructive" className="absolute right-2 top-2 h-5 px-2 text-[10px]">
                Almost full
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{offer.title}</p>
              {creator && (
                <div className="mt-1 flex items-center gap-1.5">
                  <Avatar className="size-5">
                    <AvatarFallback className="bg-muted text-[9px]">{creator.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{creator.name}</span>
                </div>
              )}
            </div>
            {!offer.image && isAlmostFull && !isFull && (
              <Badge variant="destructive" className="h-4 shrink-0 px-1.5 text-[10px]">Almost full</Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {offer.date && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendarDays} className="size-3" />
                {offer.date}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="size-3" />
              {offer.duration} min
            </span>
            {offer.seats && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUsers} className="size-3" />
                {offer.seatsLeft} seats left
              </span>
            )}
          </div>

          {offer.seats && (
            <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${seatsPercent}%` }} />
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <p className="text-sm font-semibold">{formatCurrency(offer.price)}</p>
            <span className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity group-hover:opacity-90 ${isFull ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>
              {isFull ? 'Full' : 'Register →'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
