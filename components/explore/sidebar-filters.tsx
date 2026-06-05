'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import type { ExploreFilters, ResponseTimeFilter } from '@/types/explore'
import { DEFAULT_FILTERS } from '@/types/explore'
import { cn } from '@/lib/utils'

interface Props {
  filters: ExploreFilters
  onChange: (f: ExploreFilters) => void
  activeFilterCount: number
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 border-b border-border pb-4 last:border-0 last:pb-0">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}

export function SidebarFilters({ filters, onChange, activeFilterCount }: Props): React.ReactElement {
  const set = <K extends keyof ExploreFilters>(key: K, value: ExploreFilters[K]) =>
    onChange({ ...filters, [key]: value })

  const ratingOptions: Array<{ value: number | null; label: string }> = [
    { value: null, label: 'Any' },
    { value: 4, label: '4★+' },
    { value: 4.5, label: '4.5★+' },
  ]

  const responseOptions: Array<{ value: ResponseTimeFilter; label: string }> = [
    { value: 'any', label: 'Any' },
    { value: 'under_1hr', label: '< 1 hour' },
    { value: 'under_6hrs', label: '< 6 hours' },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faSlidersH} className="size-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => onChange(DEFAULT_FILTERS)}>
            Clear
          </Button>
        )}
      </div>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₹</span>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => set('priceMin', parseInt(e.target.value) || 0)}
              className="h-8 w-full rounded-lg border border-input bg-background pl-6 pr-2 text-xs outline-none focus-visible:border-primary"
              placeholder="0"
              step={100}
              min={0}
            />
          </div>
          <span className="text-xs text-muted-foreground">—</span>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₹</span>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => set('priceMax', parseInt(e.target.value) || 10000)}
              className="h-8 w-full rounded-lg border border-input bg-background pl-6 pr-2 text-xs outline-none focus-visible:border-primary"
              placeholder="10000"
              step={100}
              min={0}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[{ label: 'Under ₹500', min: 0, max: 500 }, { label: '₹500–₹1k', min: 500, max: 1000 }, { label: 'Any', min: 0, max: 10000 }].map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange({ ...filters, priceMin: p.min, priceMax: p.max })}
              className={cn(
                'rounded-full border px-2.5 py-1 text-[11px] transition-colors',
                filters.priceMin === p.min && filters.priceMax === p.max
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/50',
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Minimum Rating">
        <div className="flex gap-1.5">
          {ratingOptions.map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => set('minRating', opt.value)}
              className={cn(
                'flex-1 rounded-full border py-1.5 text-[11px] font-medium transition-colors',
                filters.minRating === opt.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/50',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="flex items-center justify-between">
          <span className="text-sm">Live sessions today</span>
          <Switch checked={filters.liveToday} onCheckedChange={(v) => set('liveToday', v)} />
        </div>
      </FilterSection>

      <FilterSection title="Response Time">
        <div className="flex gap-1.5">
          {responseOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set('responseTime', opt.value)}
              className={cn(
                'flex-1 rounded-full border py-1.5 text-[11px] font-medium transition-colors',
                filters.responseTime === opt.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/50',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Discovery">
        <div className="flex items-center justify-between">
          <span className="text-sm">New & boosted creators</span>
          <Switch checked={filters.inBoost} onCheckedChange={(v) => set('inBoost', v)} />
        </div>
      </FilterSection>
    </div>
  )
}
