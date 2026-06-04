'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBolt,
  faCheck,
  faClone,
  faImage,
  faLink,
  faRocket,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'

export default function CreatorCompletePage(): React.ReactElement {
  const router = useRouter()
  const circleRef = useRef<SVGCircleElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const urlBoxRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [username, setUsername] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('creonex_ob_complete')
      if (raw) {
        const { username: u } = JSON.parse(raw) as { username: string }
        setUsername(u)
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline()

    if (circleRef.current) {
      tl.fromTo(
        circleRef.current,
        { strokeDashoffset: 125.66 },
        { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' },
      )
    }
    if (headlineRef.current) {
      tl.from(headlineRef.current, { opacity: 0, y: 12, duration: 0.35 }, '-=0.1')
    }
    if (urlBoxRef.current) {
      tl.from(urlBoxRef.current, { opacity: 0, y: 8, duration: 0.3 }, '-=0.05')
    }
    tl.from('.action-card', { opacity: 0, y: 10, stagger: 0.1, duration: 0.3 }, '-=0.05')
    if (ctaRef.current) {
      tl.from(ctaRef.current, { opacity: 0, y: 8, duration: 0.3 }, '-=0.05')
    }
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://creonex.in/c/${username}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 py-8">
      {/* Checkmark ring */}
      <div className="relative mx-auto flex size-16 items-center justify-center">
        <svg viewBox="0 0 64 64" fill="none" className="absolute inset-0 size-full -rotate-90">
          <circle
            ref={circleRef}
            cx="32"
            cy="32"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary"
            strokeDasharray="125.66"
            strokeDashoffset="125.66"
            strokeLinecap="round"
          />
        </svg>
        <FontAwesomeIcon icon={faCheck} className="size-6 text-primary" />
      </div>

      <h1 ref={headlineRef} className="text-center text-2xl font-bold tracking-tight">
        Your profile is live! 🚀
      </h1>

      {/* Profile URL */}
      <div ref={urlBoxRef} className="flex items-center justify-between gap-3 rounded-lg bg-muted px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <FontAwesomeIcon icon={faLink} className="size-4 shrink-0 text-muted-foreground" />
          <span className="truncate font-mono text-sm">creonex.in/c/{username}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faClone} className="size-4" />
        </button>
      </div>

      {/* Action cards */}
      <div className="space-y-2">
        <Link href="/edit-profile" className="action-card flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent">
          <FontAwesomeIcon icon={faImage} className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Add a profile photo</p>
            <p className="text-xs text-muted-foreground">Profiles with photos get 3× more bookings</p>
          </div>
        </Link>
        <Link href="/dashboard" className="action-card flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent">
          <FontAwesomeIcon icon={faStar} className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Complete your first session</p>
            <p className="text-xs text-muted-foreground">Accept bookings and start earning</p>
          </div>
        </Link>
        <div className="action-card flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <FontAwesomeIcon icon={faBolt} className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Respond within 1 hour</p>
            <p className="text-xs text-muted-foreground">Fast responses boost your ranking in discovery</p>
          </div>
        </div>
      </div>

      <div ref={ctaRef}>
        <Button className="w-full gap-2" onClick={() => router.push('/dashboard')}>
          <FontAwesomeIcon icon={faRocket} className="size-4" />
          Go to my creator dashboard
          <FontAwesomeIcon icon={faArrowRight} className="size-4" />
        </Button>
      </div>
    </div>
  )
}
