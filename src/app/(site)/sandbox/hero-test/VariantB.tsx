'use client'

import { useEffect, useRef } from 'react'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import { HERO_GLOW, HERO_STATS } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Stronger treatment: 3px line interval (denser), 0.05 white alpha, 80px / 6s pulse band, 0.1 blue center.
const SCAN_LINES_BG =
  'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)'
const PULSE_BAND_HEIGHT = 80
const PULSE_BAND_BG =
  'linear-gradient(180deg, transparent 0%, rgba(0,102,255,0.1) 50%, transparent 100%)'
const PULSE_BAND_DURATION_MS = 6000

export default function VariantB() {
  const pulseBandRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const el = pulseBandRef.current
    if (!el) return
    const animation = el.animate(
      [{ top: `-${PULSE_BAND_HEIGHT}px` }, { top: '100%' }],
      {
        duration: PULSE_BAND_DURATION_MS,
        iterations: Infinity,
        easing: 'linear',
      },
    )
    return () => animation.cancel()
  }, [reducedMotion])

  const heroGlowStyle: React.CSSProperties = {
    width: HERO_GLOW.width,
    height: HERO_GLOW.height,
    bottom: HERO_GLOW.bottom,
    left: HERO_GLOW.left,
    background: HERO_GLOW.gradient,
  }

  return (
    <section
      /* @container frame: matches production Hero padding/min-height verbatim. */
      className="relative min-h-screen overflow-hidden bg-[var(--color-bg-secondary)] px-6 pt-10 pb-12 flex flex-col justify-center @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-30 @[768px]/frame:min-h-0 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-[140px] @[1024px]/frame:min-h-[88vh]"
    >
      <SceneMeta scene="01" label="HERO" />

      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={heroGlowStyle}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: SCAN_LINES_BG,
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
            top: `-${PULSE_BAND_HEIGHT}px`,
            height: PULSE_BAND_HEIGHT,
            background: PULSE_BAND_BG,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      <div className="relative z-[2] w-full mx-auto max-w-[1440px]">
        <EyebrowLabel
          number="01"
          label="TRINIDAD & TOBAGO"
          className="mb-5"
        />

        <h1 className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-5 @[768px]/frame:mb-7 @[1024px]/frame:mb-8 text-[clamp(40px,13cqw,56px)] @[768px]/frame:text-[clamp(72px,11cqw,96px)] @[1024px]/frame:text-[clamp(96px,10cqw,132px)]">
          <span className="block">CINEMATIC</span>
          <span className="block">STORYTELLING</span>
        </h1>

        <p className="font-body text-[15px] @[768px]/frame:text-[16px] @[1024px]/frame:text-[17px] leading-[1.65] text-[var(--color-text-body)] max-w-[480px] mb-5">
          Where every frame tells a story.
        </p>

        <div className="flex flex-col gap-2.5 mb-9 @[768px]/frame:flex-row @[768px]/frame:gap-3">
          <ButtonPrimary href="#inquire">Start a project</ButtonPrimary>
          <ButtonSecondary href="/work">View work →</ButtonSecondary>
        </div>

        <dl className="grid grid-cols-3 gap-x-7 gap-y-4 pt-5 @[768px]/frame:gap-12 @[1024px]/frame:pt-6 border-t-[0.5px] border-[var(--color-surface-card)]">
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-[9px] tracking-[0.15em] text-[var(--color-text-quiet)] mb-1">
                {stat.label}
              </dt>
              <dd
                className={
                  stat.accent
                    ? 'font-mono text-[12px] text-[var(--color-accent-secondary)]'
                    : 'font-mono text-[12px] text-[var(--color-text-primary)]'
                }
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
