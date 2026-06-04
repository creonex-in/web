'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { getCQSTier, getCQSColor } from '@/lib/cqs'
import { cn } from '@/lib/utils'

interface CQSRingProps {
  score: number
  size?: number
  showLabel?: boolean
}

export function CQSRing({ score, size = 96, showLabel = true }: CQSRingProps): React.ReactElement {
  const circleRef = useRef<SVGCircleElement>(null)
  const tier = getCQSTier(score)
  const colorClass = getCQSColor(tier)

  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const targetDash = (score / 100) * circumference

  useEffect(() => {
    if (!circleRef.current) return
    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      { strokeDashoffset: circumference - targetDash, duration: 1.4, ease: 'power3.out', delay: 0.3 }
    )
  }, [score, circumference, targetDash])

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: size, height: size }} className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={6}
          />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold tabular-nums">{score}</span>
          <span className="text-[10px] text-muted-foreground">/100</span>
        </div>
      </div>
      {showLabel && (
        <span className={cn('text-xs font-medium capitalize', colorClass)}>{tier}</span>
      )}
    </div>
  )
}
