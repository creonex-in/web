'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { NICHE_OPTIONS } from '@/constants/onboarding'
import { cn } from '@/lib/utils'

interface Props {
  activeNiche: string | null
  onChange: (niche: string | null) => void
}

export function NichePillBar({ activeNiche, onChange }: Props): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.niche-pill', {
      opacity: 0,
      y: 6,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, { scope: ref })

  return (
    <div ref={ref} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {/* All pill */}
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          'niche-pill flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150',
          activeNiche === null
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-card text-foreground hover:border-primary/50',
        )}
      >
        <FontAwesomeIcon icon={faHashtag} className="size-3" />
        All
      </button>

      {NICHE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.label)}
          className={cn(
            'niche-pill flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150',
            activeNiche === opt.label
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card text-foreground hover:border-primary/50',
          )}
        >
          <FontAwesomeIcon icon={opt.icon} className="size-3" />
          {opt.label}
        </button>
      ))}
    </div>
  )
}
