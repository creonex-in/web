'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import type { ExploreFilters } from '@/types/explore'
import { DEFAULT_FILTERS } from '@/types/explore'
import { Button } from '@/components/ui/button'

interface Props {
  filters: ExploreFilters
  onRemove: (key: keyof ExploreFilters, value: ExploreFilters[keyof ExploreFilters]) => void
  onClearAll: () => void
}

interface Chip {
  key: keyof ExploreFilters
  label: string
  resetValue: ExploreFilters[keyof ExploreFilters]
}

export function ActiveFilterChips({ filters, onRemove, onClearAll }: Props): React.ReactElement {
  const chips: Chip[] = []

  if (filters.priceMin > 0 || filters.priceMax < 10000) {
    chips.push({ key: 'priceMin', label: `₹${filters.priceMin}–₹${filters.priceMax}`, resetValue: DEFAULT_FILTERS.priceMin })
  }
  if (filters.minRating !== null) {
    chips.push({ key: 'minRating', label: `${filters.minRating}★+`, resetValue: null })
  }
  if (filters.liveToday) {
    chips.push({ key: 'liveToday', label: 'Live today', resetValue: false })
  }
  if (filters.inBoost) {
    chips.push({ key: 'inBoost', label: 'New & boosted', resetValue: false })
  }
  if (filters.responseTime !== 'any') {
    const label = filters.responseTime === 'under_1hr' ? '< 1 hour response' : '< 6 hours response'
    chips.push({ key: 'responseTime', label, resetValue: 'any' })
  }

  if (!chips.length) return <></>

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onRemove(chip.key, chip.resetValue)}
          className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium transition-colors hover:border-primary/50"
        >
          {chip.label}
          <FontAwesomeIcon icon={faXmark} className="size-2.5 text-muted-foreground" />
        </button>
      ))}
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  )
}
