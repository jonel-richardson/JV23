'use client'

import { useEffect, useState } from 'react'
import { useNavStore } from '@/stores/useNavStore'
import {
  NAV_HEIGHT_MOBILE,
  NAV_LINKS,
  NAV_CTA,
  NAV_TRANSITION_MS,
  MOBILE_MENU_STAGGER_MS,
  MOBILE_MENU_ID,
} from '@/lib/constants'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export default function MobileMenu() {
  const isOpen = useNavStore((s) => s.isMobileMenuOpen)
  const closeMenu = useNavStore((s) => s.closeMenu)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeMenu])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const fadeMs = NAV_TRANSITION_MS
  const itemMs = NAV_TRANSITION_MS

  const itemStyle = (i: number): React.CSSProperties => ({
    transition: reducedMotion
      ? `opacity ${itemMs}ms ease-out`
      : `opacity ${itemMs}ms ease-out, transform ${itemMs}ms ease-out`,
    transitionDelay: isOpen ? `${i * MOBILE_MENU_STAGGER_MS}ms` : '0ms',
    opacity: isOpen ? 1 : 0,
    transform: reducedMotion
      ? 'translateY(0)'
      : isOpen
        ? 'translateY(0)'
        : 'translateY(8px)',
  })

  const handleRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeMenu()
  }

  const drawerStyle = {
    '--nav-h': `${NAV_HEIGHT_MOBILE}px`,
    transition: `opacity ${fadeMs}ms ease-out`,
  } as React.CSSProperties

  return (
    <div
      id={MOBILE_MENU_ID}
      role="dialog"
      aria-modal={isOpen ? true : undefined}
      aria-hidden={!isOpen}
      aria-label="Site menu"
      inert={!isOpen}
      onClick={handleRootClick}
      style={drawerStyle}
      className={`md:hidden fixed inset-0 z-40 flex flex-col bg-[var(--color-bg-base)] pt-[var(--nav-h)] ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <nav
        aria-label="Mobile site links"
        className="flex flex-col px-6 pt-10 gap-7"
        onClick={(e) => e.stopPropagation()}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            style={itemStyle(i)}
            className="flex items-baseline gap-3 text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent-primary)] focus-visible:outline-offset-4 rounded"
          >
            <span className="font-mono text-[10px] tracking-[0.20em] text-[var(--color-text-quiet)]">
              // {link.number}
            </span>
            <span className="font-display text-[44px] tracking-[0.02em] leading-[0.92]">
              {link.label.toUpperCase()}
            </span>
          </a>
        ))}
      </nav>

      <div
        className="mt-auto px-6 pb-10 pt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={NAV_CTA.href}
          onClick={closeMenu}
          style={itemStyle(NAV_LINKS.length)}
          className="block bg-[var(--color-accent-primary)] text-white font-body font-medium text-[15px] rounded-lg py-3.5 px-5 text-center hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {NAV_CTA.label} →
        </a>

        <div
          className="mt-6 flex items-center justify-between"
          style={itemStyle(NAV_LINKS.length + 1)}
        >
          <span className="font-mono text-[10px] tracking-[0.20em] text-[var(--color-text-quiet)]">
            // EST. 2023
          </span>
          <span className="font-mono text-[10px] tracking-[0.20em] text-[var(--color-accent-secondary)]">
            TRINIDAD &amp; TOBAGO
          </span>
        </div>
      </div>
    </div>
  )
}
