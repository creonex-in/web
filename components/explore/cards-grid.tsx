'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  columns?: 'auto' | 2 | 3
}

export function CardsGrid({ children, className, columns = 'auto' }: Props): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const items = containerRef.current.children
    if (!items.length) return
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out', clearProps: 'all' },
    )
  }, { scope: containerRef })

  const gridClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 3
      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'

  return (
    <div ref={containerRef} className={cn(`grid gap-4 ${gridClass}`, className)}>
      {children}
    </div>
  )
}
