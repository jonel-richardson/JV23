import type { CSSProperties, ReactNode } from 'react'
import { MARQUEE_DEFAULT_DURATION } from '@/lib/constants'

interface MarqueeProps {
  children: ReactNode
  duration?: number
  edgeFadeMobile?: number
  edgeFadeDesktop?: number
  fadeColor?: string
  ariaLabel?: string
}

// Reusable marquee track. Children are rendered twice in sequence so the
// duplicate set is already on-screen when the first set scrolls fully off
// to the left, creating an infinite loop with no visible jump. The track
// translates 0 → -50% over `duration` seconds (linear, infinite). Animation
// is wrapped in `motion-safe:` so reduced-motion users see the static
// children with no movement. Edge gradient masks fade content into the
// scene background so items don't pop in/out at the container edges.
export default function Marquee({
  children,
  duration = MARQUEE_DEFAULT_DURATION,
  edgeFadeMobile = 80,
  edgeFadeDesktop = 120,
  fadeColor = 'var(--color-bg-base)',
  ariaLabel,
}: MarqueeProps) {
  const trackStyle: CSSProperties = { animationDuration: `${duration}s` }
  const leftFadeMobile: CSSProperties = {
    width: `${edgeFadeMobile}px`,
    background: `linear-gradient(to right, ${fadeColor}, transparent)`,
  }
  const rightFadeMobile: CSSProperties = {
    width: `${edgeFadeMobile}px`,
    background: `linear-gradient(to left, ${fadeColor}, transparent)`,
  }
  const leftFadeDesktop: CSSProperties = {
    width: `${edgeFadeDesktop}px`,
    background: `linear-gradient(to right, ${fadeColor}, transparent)`,
  }
  const rightFadeDesktop: CSSProperties = {
    width: `${edgeFadeDesktop}px`,
    background: `linear-gradient(to left, ${fadeColor}, transparent)`,
  }

  return (
    <div
      role={ariaLabel ? 'group' : undefined}
      aria-label={ariaLabel}
      className="relative overflow-hidden"
    >
      {/* @container frame: track translates -50% over `duration` seconds; pauses on hover for readability */}
      <div
        className="flex w-max motion-safe:animate-scroll-marquee hover:[animation-play-state:paused]"
        style={trackStyle}
      >
        <div className="flex flex-shrink-0">{children}</div>
        <div className="flex flex-shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>

      {/* Edge fades — separate mobile/desktop overlays toggled via container query so prop-driven px widths can vary across breakpoints */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-10 pointer-events-none @[1024px]/frame:hidden"
        style={leftFadeMobile}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-10 pointer-events-none @[1024px]/frame:hidden"
        style={rightFadeMobile}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-10 pointer-events-none hidden @[1024px]/frame:block"
        style={leftFadeDesktop}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-10 pointer-events-none hidden @[1024px]/frame:block"
        style={rightFadeDesktop}
      />
    </div>
  )
}
