'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// Reads prefers-reduced-motion via matchMedia and updates on change.
// Returns false during SSR / before hydration so server render and first
// client paint match (the post-hydration update flips it if the user
// actually prefers reduced motion).
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia(QUERY)
    setPrefersReduced(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}
