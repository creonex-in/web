import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faRepeat, faBolt } from '@fortawesome/free-solid-svg-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { Creator } from '@/types/creator'
import { formatCurrency } from '@/lib/utils'

interface Props {
  creator: Creator
  featured?: boolean
}

export function CreatorCard({ creator, featured }: Props): React.ReactElement {
  return (
    <Link href={`/c/${creator.username}`} className="group block">
      <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <Avatar className="size-12">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {creator.initials}
              </AvatarFallback>
            </Avatar>
            {creator.isLive && (
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-green-500" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="truncate text-sm font-semibold">{creator.name}</p>
              {creator.cqsTier === 'elite' && (
                <Badge className="h-4 px-1.5 text-[10px]">Elite</Badge>
              )}
              {creator.inBoost && (
                <Badge variant="secondary" className="h-4 bg-amber-50 px-1.5 text-[10px] text-amber-600 dark:bg-amber-950/30">
                  ⚡ New
                </Badge>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{creator.niche}</p>
          </div>
          <div className="shrink-0 text-center">
            <p className="text-xs font-bold text-primary">{creator.cqsScore}</p>
            <p className="text-[9px] text-muted-foreground">CQS</p>
          </div>
        </div>

        {/* Bio */}
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{creator.bio}</p>

        {/* Signals */}
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-2.5">
          <div className="flex flex-col items-center gap-0.5">
            <FontAwesomeIcon icon={faStar} className="size-3 text-amber-400" />
            <span className="text-xs font-semibold">{creator.rating}</span>
            <span className="text-[9px] text-muted-foreground">{creator.reviewCount} reviews</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 border-x border-border">
            <FontAwesomeIcon icon={faRepeat} className="size-3 text-primary" />
            <span className="text-xs font-semibold">{creator.rebookingRate}%</span>
            <span className="text-[9px] text-muted-foreground">rebook</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <FontAwesomeIcon icon={faBolt} className="size-3 text-muted-foreground" />
            <span className="text-xs font-semibold">{creator.responseTime.replace(' avg', '')}</span>
            <span className="text-[9px] text-muted-foreground">response</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {creator.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div>
            <p className="text-sm font-bold">{formatCurrency(creator.sessionPrice)}</p>
            <p className="text-[10px] text-muted-foreground">per session</p>
          </div>
          <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
            Book now →
          </span>
        </div>

      </div>
    </Link>
  )
}
