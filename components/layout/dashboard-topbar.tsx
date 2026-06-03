'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DashboardTopbarProps {
  title: string
  action?: React.ReactNode
  showSearch?: boolean
  searchPlaceholder?: string
}

export function DashboardTopbar({
  title,
  action,
  showSearch = false,
  searchPlaceholder = 'Search experts, courses, workshops…',
}: DashboardTopbarProps): React.ReactElement {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function submit(e: React.FormEvent): void {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-3 backdrop-blur sm:gap-3 sm:px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <h1 className="shrink-0 text-sm font-medium">{title}</h1>

      {showSearch && (
        <form onSubmit={submit} className="relative mx-auto hidden w-full max-w-md md:block">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 rounded-full pl-9"
          />
        </form>
      )}

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {action}
        {showSearch && (
          <Button
            variant="ghost"
            size="icon"
            className="size-8 md:hidden"
            onClick={() => router.push('/explore')}
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="size-8" aria-label="Notifications">
          <FontAwesomeIcon icon={faBell} className="size-4" />
        </Button>
      </div>
    </header>
  )
}
