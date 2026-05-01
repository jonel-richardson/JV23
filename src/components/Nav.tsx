'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useNavStore } from '@/stores/useNavStore'
import {
  NAV_HEIGHT_MOBILE,
  NAV_HEIGHT_DESKTOP,
  LOGO_HEIGHT_MOBILE,
  LOGO_HEIGHT_DESKTOP,
  LOGO_INTRINSIC_WIDTH,
  LOGO_INTRINSIC_HEIGHT,
  LOGO_FILTER,
  SCROLL_FADE_THRESHOLD,
  NAV_BG_DEFAULT,
  NAV_BG_SCROLLED,
  NAV_BLUR_DEFAULT_PX,
  NAV_BLUR_SCROLLED_PX,
  NAV_TRANSITION_MS,
  NAV_LINKS,
  NAV_CTA,
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

export default function Nav() {
  const isOpen = useNavStore((s) => s.isMobileMenuOpen)
  const scrollY = useNavStore((s) => s.scrollY)
  const setScrollY = useNavStore((s) => s.setScrollY)
  const toggleMenu = useNavStore((s) => s.toggleMenu)
  const tickingRef = useRef(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setScrollY(window.scrollY)
    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        tickingRef.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [setScrollY])

  const isScrolled = scrollY >= SCROLL_FADE_THRESHOLD
  const blurPx = isScrolled ? NAV_BLUR_SCROLLED_PX : NAV_BLUR_DEFAULT_PX
  const transitionDur = reducedMotion ? 0 : NAV_TRANSITION_MS

  const headerStyle = {
    '--nav-h': `${NAV_HEIGHT_MOBILE}px`,
    '--nav-h-md': `${NAV_HEIGHT_DESKTOP}px`,
    backgroundColor: isScrolled ? NAV_BG_SCROLLED : NAV_BG_DEFAULT,
    backdropFilter: `blur(${blurPx}px)`,
    WebkitBackdropFilter: `blur(${blurPx}px)`,
    transition: `background-color ${transitionDur}ms ease-out, backdrop-filter ${transitionDur}ms ease-out, -webkit-backdrop-filter ${transitionDur}ms ease-out`,
  } as React.CSSProperties

  const logoStyle = {
    '--logo-h': `${LOGO_HEIGHT_MOBILE}px`,
    '--logo-h-md': `${LOGO_HEIGHT_DESKTOP}px`,
    filter: LOGO_FILTER,
  } as React.CSSProperties

  return (
    <header
      id="site-nav"
      style={headerStyle}
      className="sticky top-0 z-50 w-full h-[var(--nav-h)] md:h-[var(--nav-h-md)] border-b-[0.5px] border-[var(--color-surface-raised)]"
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          aria-label="Jack Visuals — home"
          className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[var(--color-accent-primary)] focus-visible:outline-offset-4 rounded"
        >
          <Image
            src="/images/jack-visuals-logo.png"
            alt="Jack Visuals"
            width={LOGO_INTRINSIC_WIDTH}
            height={LOGO_INTRINSIC_HEIGHT}
            priority
            style={logoStyle}
            className="h-[var(--logo-h)] md:h-[var(--logo-h-md)] w-auto"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[13px] leading-none text-[var(--color-text-primary)] hover:text-[var(--color-text-body)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-accent-primary)] focus-visible:outline-offset-4 rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={NAV_CTA.href}
            className="font-body font-medium text-[14px] leading-none text-white bg-[var(--color-accent-primary)] rounded-lg px-5 py-2.5 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            {NAV_CTA.label}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-[var(--color-text-primary)] rounded focus-visible:outline-2 focus-visible:outline-[var(--color-accent-primary)] focus-visible:outline-offset-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <line
              x1="4"
              y1="8"
              x2="20"
              y2="8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transition: `transform ${transitionDur}ms ease-out`,
                transform: isOpen
                  ? 'translateY(4px) rotate(45deg)'
                  : 'translateY(0) rotate(0)',
              }}
            />
            <line
              x1="4"
              y1="12"
              x2="20"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transition: `opacity ${transitionDur}ms ease-out`,
                opacity: isOpen ? 0 : 1,
              }}
            />
            <line
              x1="4"
              y1="16"
              x2="20"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transition: `transform ${transitionDur}ms ease-out`,
                transform: isOpen
                  ? 'translateY(-4px) rotate(-45deg)'
                  : 'translateY(0) rotate(0)',
              }}
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
