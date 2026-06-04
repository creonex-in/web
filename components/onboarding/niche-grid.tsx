'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import type { NicheOption } from '@/constants/onboarding'
import type { NicheValue } from '@/types/api'
import { cn } from '@/lib/utils'

interface Props {
  options: NicheOption[]
  selected: NicheValue[]
  onChange: (values: NicheValue[]) => void
  maxSelect: number
}

export function NicheGrid({ options, selected, onChange, maxSelect }: Props): React.ReactElement {
  const toggle = (value: NicheValue) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else if (selected.length < maxSelect) {
      onChange([...selected, value])
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value)
          const isDisabled = !isSelected && selected.length >= maxSelect

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              disabled={isDisabled}
              className={cn(
                'relative flex items-center gap-2.5 rounded-lg border p-3 text-left transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isSelected
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card text-foreground hover:border-primary/50',
                isDisabled && 'cursor-not-allowed opacity-40',
              )}
            >
              <FontAwesomeIcon
                icon={opt.icon}
                className={cn('size-4 shrink-0', isSelected ? 'text-primary' : 'text-muted-foreground')}
              />
              <span className="text-sm font-medium leading-tight">{opt.label}</span>
              {isSelected && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="absolute right-2 top-2 size-3 text-primary"
                />
              )}
            </button>
          )
        })}
      </div>

      {maxSelect > 1 && (
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {selected.length} / {maxSelect} selected
        </p>
      )}
    </div>
  )
}
