'use client'

import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faStar } from '@fortawesome/free-solid-svg-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Purchase } from '@/types/learner'
import { formatCurrency } from '@/lib/utils'

interface SessionRowProps {
  purchase: Purchase
  index?: number
}

export function SessionRow({ purchase, index = 0 }: SessionRowProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-4 p-4 rounded-2xl border border-border/60 bg-card shadow-sm hover:bg-accent/20 transition-colors"
    >
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className="bg-muted text-xs font-medium">
          {purchase.creatorInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{purchase.offerTitle}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
          <span>{purchase.creatorName}</span>
          <span>·</span>
          <FontAwesomeIcon icon={faCalendar} className="size-3" />
          <span>{purchase.purchasedAt}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-medium">{formatCurrency(purchase.price)}</p>
        {purchase.rated && purchase.rating && (
          <p className="flex items-center justify-end gap-0.5 text-xs text-muted-foreground">
            <FontAwesomeIcon icon={faStar} className="size-3 text-amber-400" />
            {purchase.rating}
          </p>
        )}
      </div>
      <Badge
        variant={purchase.completed ? 'outline' : 'secondary'}
        className="text-[10px] px-1.5 py-0 h-4 shrink-0"
      >
        {purchase.completed ? 'Done' : 'Upcoming'}
      </Badge>
      {!purchase.rated && purchase.completed && (
        <Button size="sm" variant="outline" className="shrink-0">
          Rate
        </Button>
      )}
    </motion.div>
  )
}
