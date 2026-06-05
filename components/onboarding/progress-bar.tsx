'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface Props {
  currentStep: number
  totalSteps: number
  label: string
}

export function OnboardingProgressBar({
  currentStep,
  totalSteps,
  label,
}: Props): React.ReactElement {
  const fillRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!fillRef.current) return
    gsap.to(fillRef.current, {
      width: `${(currentStep / totalSteps) * 100}%`,
      duration: 0.55,
      ease: 'power2.out',
    })
  }, [currentStep, totalSteps])

  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {currentStep} / {totalSteps}
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-primary"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}
