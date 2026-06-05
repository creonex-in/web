'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCompass,
  faCalendarDays,
  faBagShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

const TABS = [
  { label: 'Explore',   href: '/explore',   icon: faCompass      },
  { label: 'Sessions',  href: '/sessions',  icon: faCalendarDays },
  { label: 'Purchases', href: '/purchases', icon: faBagShopping  },
  { label: 'Profile',   href: '/settings',  icon: faUser         },
]

export function LearnerBottomNav(): React.ReactElement {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-stretch border-t border-border bg-background md:hidden">
      {TABS.map(({ label, href, icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors',
              active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <FontAwesomeIcon icon={icon} className="size-5" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
