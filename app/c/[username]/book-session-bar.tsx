'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

export function BookSessionBar({ name }: { name: string }): React.ReactElement {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return <></>

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div>
        <p className="text-[11px] text-gray-400 leading-none mb-0.5">{name}</p>
        <p className="text-[13px] font-semibold text-gray-900 leading-none">1:1 Session · ₹2,500</p>
      </div>
      <button className="bg-violet-600 text-white rounded-xl px-5 py-2.5 text-[13px] font-semibold hover:bg-violet-700 active:scale-95 transition-all flex items-center gap-2 shrink-0">
        <FontAwesomeIcon icon={faCalendarCheck} className="size-3.5" />
        Book Now
      </button>
    </div>
  )
}
