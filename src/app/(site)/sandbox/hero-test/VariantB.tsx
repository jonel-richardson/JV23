'use client'

import { useEffect, useRef, useState } from 'react'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import { HERO_GLOW, HERO_STATS } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const GLOW_SIZE = 360
const GLOW_HALF = GLOW_SIZE / 2
const DECAY_MS = 2500
const CURSOR_TRANSITION = 'transform 250ms ease-out, opacity 200ms ease-out'
const CURSOR_GLOW_BG =
  'radial-gradient(circle, rgba(0,102,255,0.4) 0%, transparent 65%)'

const SCAN_LINES_BG =
  'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)'
const PULSE_BAND_HEIGHT = 60
const PULSE_BAND_BG =
  'linear-gradient(180deg, transparent 0%, rgba(0,102,255,0.06) 50%, transparent 100%)'
const PULSE_BAND_DURATION_MS = 8000

export default function VariantB() {
  const sectionRef = useRef<HTMLElement>(null)
  const pulseBandRef = useRef<HTMLDivElement>(null)
  const decayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  )
  const [sectionSize, setSectionSize] = useState({ w: 0, h: 0 })
  const [canHover, setCanHover] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setCanHover(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    )
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      setSectionSize({ w: rect.width, h: rect.height })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Web Animations API for the pulse band — no global keyframe declaration,
  // animation re-attaches if reducedMotion flips.
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!canHover) return
    const rect = e.currentTarget.getBoundingClientRect()
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    if (decayTimerRef.current) clearTimeout(decayTimerRef.current)
    decayTimerRef.current = setTimeout(() => setCursorPos(null), DECAY_MS)
  }

  const handleMouseLeave = () => {
    if (decayTimerRef.current) clearTimeout(decayTimerRef.current)
    setCursorPos(null)
  }

  const glowX = cursorPos?.x ?? sectionSize.w / 2
  const glowY = cursorPos?.y ?? sectionSize.h / 2
  const isReady = sectionSize.w > 0
  const showCursorGlow = !reducedMotion && canHover
  const showScanLines = !reducedMotion

  const heroGlowStyle: React.CSSProperties = {
    width: HERO_GLOW.width,
    height: HERO_GLOW.height,
    bottom: HERO_GLOW.bottom,
    left: HERO_GLOW.left,
    background: HERO_GLOW.gradient,
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      /* @container frame: matches production Hero padding/min-height verbatim. */
      className="relative min-h-screen overflow-hidden bg-[var(--color-bg-secondary)] px-6 pt-10 pb-12 flex flex-col justify-center @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-30 @[768px]/frame:min-h-0 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-[140px] @[1024px]/frame:min-h-[88vh]"
    >
      <SceneMeta scene="01" label="HERO" />

      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={heroGlowStyle}
      />

      {showScanLines && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: SCAN_LINES_BG,
              pointerEvents: 'none',
            }}
          />
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
        </>
      )}

      {showCursorGlow && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: GLOW_SIZE,
            height: GLOW_SIZE,
            borderRadius: '50%',
            background: CURSOR_GLOW_BG,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: isReady ? 1 : 0,
            transform: `translate(${glowX - GLOW_HALF}px, ${glowY - GLOW_HALF}px)`,
            transition: CURSOR_TRANSITION,
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
