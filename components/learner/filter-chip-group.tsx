'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface FilterChip {
  label: string
  value: string
}

interface FilterChipGroupProps {
  chips: FilterChip[]
  value: string
  onChange: (value: string) => void
}

export function FilterChipGroup({ chips, value, onChange }: FilterChipGroupProps): React.ReactElement {
  return (
    <div className="flex gap-2 flex-wrap">
      {chips.map((chip) => (
        <motion.button
          key={chip.value}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(chip.value)}
          className={cn(
            'cursor-pointer rounded-full border border-transparent px-3.5 py-1.5 text-xs font-medium transition-colors',
            value === chip.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          {chip.label}
        </motion.button>
      ))}
    </div>
  )
}
