'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserTie, faGraduationCap, faCalendarDays,
  faFileArrowDown, faUsers, faBullseye,
} from '@fortawesome/free-solid-svg-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { ExploreTab, SortOption } from '@/types/explore'
import { cn } from '@/lib/utils'

interface Props {
  activeTab: ExploreTab
  onTabChange: (t: ExploreTab) => void
  sortBy: SortOption
  onSortChange: (s: SortOption) => void
  counts: Record<ExploreTab, number>
}

const TABS: Array<{ value: ExploreTab; label: string; icon: typeof faUserTie }> = [
  { value: 'all',           label: 'All',        icon: faUserTie        },
  { value: '1:1',           label: '1:1 Calls',  icon: faUserTie        },
  { value: 'course',        label: 'Courses',    icon: faGraduationCap  },
  { value: 'workshop',      label: 'Workshops',  icon: faCalendarDays   },
  { value: 'digital',       label: 'Digital',    icon: faFileArrowDown  },
  { value: 'group',         label: 'Groups',     icon: faUsers          },
  { value: 'community',     label: 'Community',  icon: faUsers          },
  { value: 'coaching_plan', label: 'Coaching',   icon: faBullseye       },
]

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'relevance',  label: 'Relevance'          },
  { value: 'top_rated',  label: 'Top rated'           },
  { value: 'price_asc',  label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'newest',     label: 'Newest'             },
]

export function TabsAndSortBar({ activeTab, onTabChange, sortBy, onSortChange, counts }: Props): React.ReactElement {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => {
          const count = counts[tab.value]
          const active = activeTab === tab.value
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
              <span className={cn(
                'rounded-full px-1.5 text-[10px]',
                active ? 'bg-white/20 text-white' : 'bg-background text-muted-foreground',
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger className="h-9 w-44 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
