'use client'

import { useEffect, useRef } from 'react'
import { HERO_SCAN_LINES } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Pulse band uses Web Animations API rather than a CSS @keyframe so the
// animation lifecycle is scoped to this component and we don't add a
// hero-specific keyframe to globals.css. Static lines render via plain
// background-image — no JS involved for that layer.
export default function HeroScanLines() {
  const pulseBandRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const el = pulseBandRef.current
    if (!el) return
    const animation = el.animate(
      [
        { top: `-${HERO_SCAN_LINES.pulseHeight}px` },
        { top: '100%' },
      ],
      {
        duration: HERO_SCAN_LINES.pulseDurationMs,
        iterations: Infinity,
        easing: 'linear',
      },
    )
    return () => animation.cancel()
  }, [reducedMotion])

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: HERO_SCAN_LINES.staticBg,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {!reducedMotion && (
        <div
          ref={pulseBandRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `-${HERO_SCAN_LINES.pulseHeight}px`,
            height: HERO_SCAN_LINES.pulseHeight,
            background: HERO_SCAN_LINES.pulseBg,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
    </>
  )
}
