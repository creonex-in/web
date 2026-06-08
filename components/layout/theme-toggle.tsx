'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'

export function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Render a same-size placeholder until mounted to prevent layout shift
  if (!mounted) return <div className="size-9" />

  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <FontAwesomeIcon
        icon={isDark ? faSun : faMoon}
        className="size-4 text-muted-foreground transition-colors hover:text-foreground"
      />
    </Button>
  )
}
