'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Progress } from '@/components/ui/progress'

interface CQSSignalBarProps {
  label: string
  value: number
  displayValue: string
  index?: number
}

export function CQSSignalBar({ label, value, displayValue, index = 0 }: CQSSignalBarProps): React.ReactElement {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return
    gsap.from(barRef.current, { opacity: 0, x: -16, duration: 0.4, delay: index * 0.08, ease: 'power2.out' })
  }, [index])

  return (
    <div ref={barRef} className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-28 shrink-0">{label}</span>
      <Progress value={value} className="flex-1 h-1.5" />
      <span className="text-xs font-medium tabular-nums w-12 text-right">{displayValue}</span>
    </div>
  )
}
