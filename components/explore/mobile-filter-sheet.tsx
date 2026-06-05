'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SidebarFilters } from '@/components/explore/sidebar-filters'
import type { ExploreFilters } from '@/types/explore'
import { DEFAULT_FILTERS } from '@/types/explore'
import { computeActiveFilterCount } from '@/lib/explore-utils'

interface Props {
  open: boolean
  onClose: () => void
  filters: ExploreFilters
  onChange: (f: ExploreFilters) => void
}

export function MobileFilterSheet({ open, onClose, filters, onChange }: Props): React.ReactElement {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (open && contentRef.current) {
      gsap.from(contentRef.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power3.out' })
    }
  }, [open])

  const count = computeActiveFilterCount(filters)

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl overflow-y-auto p-0">
        <div ref={contentRef} className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-semibold">Filters {count > 0 && `(${count})`}</span>
            <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <FontAwesomeIcon icon={faXmark} className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <SidebarFilters filters={filters} onChange={onChange} activeFilterCount={count} />
          </div>

          <div className="flex gap-3 border-t border-border px-5 py-4">
            <Button variant="outline" className="flex-1" onClick={() => onChange(DEFAULT_FILTERS)}>
              Clear all
            </Button>
            <Button className="flex-1" onClick={onClose}>
              Apply filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
