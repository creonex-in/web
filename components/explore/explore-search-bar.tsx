'use client'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'

interface Props {
  value: string
  onChange: (v: string) => void
}

export function ExploreSearchBar({ value, onChange }: Props): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search creators, courses, workshops, topics…"
        className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-10 text-sm outline-none transition-[border-color] focus-visible:border-primary"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1.5 top-1/2 size-8 -translate-y-1/2"
          onClick={() => { onChange(''); inputRef.current?.focus() }}
          aria-label="Clear"
        >
          <FontAwesomeIcon icon={faXmark} className="size-4" />
        </Button>
      )}
    </div>
  )
}
