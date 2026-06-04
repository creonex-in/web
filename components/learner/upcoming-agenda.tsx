'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faClock,
  faVideo,
  faUsers,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'
import { cn } from '@/lib/utils'

export type AgendaKind = 'session' | 'workshop' | 'group'

export interface AgendaItem {
  id: string
  title: string
  host: string
  hostInitials: string
  date: string
  duration?: number
  kind: AgendaKind
  href: string
  seatsLeft?: number
}

const kindMeta: Record<AgendaKind, { label: string; icon: IconDefinition }> = {
  session: { label: '1:1 Session', icon: faVideo },
  workshop: { label: 'Workshop', icon: faCalendarDays },
  group: { label: 'Group', icon: faUsers },
}

interface UpcomingAgendaProps {
  items: AgendaItem[]
}

export function UpcomingAgenda({ items }: UpcomingAgendaProps): React.ReactElement {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={faCalendarDays}
        title="Nothing scheduled yet"
        description="Book a 1:1 session or register for a workshop to see it here."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => {
        const meta = kindMeta[item.kind]
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i, 5) * 0.04 }}
            className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <Badge variant="secondary" className="gap-1.5">
                <FontAwesomeIcon icon={meta.icon} className="size-3" />
                {meta.label}
              </Badge>
              {typeof item.seatsLeft === 'number' && item.seatsLeft <= 5 && (
                <Badge variant="destructive" className="text-[10px]">
                  {item.seatsLeft} seats left
                </Badge>
              )}
            </div>

            <p className="line-clamp-2 text-sm font-semibold leading-snug">{item.title}</p>

            <div className="flex items-center gap-2">
              <Avatar className="size-6 shrink-0">
                <AvatarFallback className="bg-muted text-[10px] font-medium">
                  {item.hostInitials}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-xs text-muted-foreground">{item.host}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCalendarDays} className="size-3" />
                {item.date}
              </span>
              {item.duration ? (
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faClock} className="size-3" />
                  {item.duration} min
                </span>
              ) : null}
            </div>

            <Link
              href={item.href}
              className={cn(buttonVariants({ size: 'sm' }), 'mt-auto w-full')}
            >
              {item.kind === 'session' ? 'Join session' : 'View details'}
              <FontAwesomeIcon icon={faArrowRight} className="ml-1.5 size-3.5" />
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
