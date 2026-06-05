'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface HeroStat {
  label: string
  value: string
}

interface WelcomeHeroProps {
  name: string
  initials: string
  subtitle: string
  stats?: HeroStat[]
  action?: React.ReactNode
}

export function WelcomeHero({
  name,
  initials,
  subtitle,
  stats,
  action,
}: WelcomeHeroProps): React.ReactElement {
  const [greeting, setGreeting] = useState('Welcome back')

  useEffect(() => {
    const h = new Date().getHours()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening')
  }, [])

  const firstName = name.split(' ')[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-6"
    >
      {/* soft brand glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-12 ring-2 ring-primary/20">
            <AvatarFallback className="bg-primary/15 text-sm font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {greeting}, {firstName} 👋
            </p>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
          </div>
        </div>

        {action && <div className="flex shrink-0 flex-wrap gap-2">{action}</div>}
      </div>

      {stats && stats.length > 0 && (
        <div className="relative mt-5 grid grid-cols-2 gap-3 sm:flex sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="sm:border-l sm:border-border sm:pl-6 sm:first:border-0 sm:first:pl-0">
              <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{s.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
