'use client'

import { useEffect, useRef, useState } from 'react'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import AboutPortraitCard from '@/components/scenes/AboutPortraitCard'
import {
  ABOUT_BODY_PARAGRAPHS,
  ABOUT_LOCATION,
  ABOUT_TITLE,
} from '@/lib/constants'

const STAGGER_MS = 600
const FADE_DURATION_MS = 700
const TRANSLATE_PX = 14
const TRIGGER_THRESHOLD = 0.2

export default function VariantAParagraphStagger() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: TRIGGER_THRESHOLD },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const paragraphStyle = (idx: number): React.CSSProperties => {
    if (reducedMotion) return {}
    const delay = idx * STAGGER_MS
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${TRANSLATE_PX}px)`,
      transition: `opacity ${FADE_DURATION_MS}ms ease-out ${delay}ms, transform ${FADE_DURATION_MS}ms ease-out ${delay}ms`,
    }
  }

  return (
    <section
      ref={sectionRef}
      /* @container frame: matches production About scene padding (mobile/768/1024) verbatim. */
      className="relative bg-[var(--color-bg-base)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <SceneMeta scene="02" label="ABOUT" />

      <div className="flex flex-col gap-8 @[768px]/frame:flex-row @[768px]/frame:items-center @[768px]/frame:gap-12 @[1024px]/frame:gap-20">
        <div className="@[768px]/frame:flex-[1.1]">
          <EyebrowLabel number="02" label="ABOUT" />

          <h2 className="font-display tracking-[0.02em] leading-[0.95] text-[var(--color-text-primary)] mt-3.5 mb-5 text-[clamp(44px,14cqw,64px)] @[768px]/frame:text-[72px] @[1024px]/frame:text-[88px]">
            {ABOUT_TITLE.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="font-body text-[15px] @[1024px]/frame:text-[16px] leading-[1.7] text-[var(--color-text-body)]">
            {ABOUT_BODY_PARAGRAPHS.map((paragraph, idx) => (
              <p
                key={paragraph}
                style={paragraphStyle(idx)}
                className={
                  idx < ABOUT_BODY_PARAGRAPHS.length - 1 ? 'mb-3.5' : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-4 font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-quiet)]">
            {ABOUT_LOCATION}
          </div>
        </div>

        <div className="@[768px]/frame:flex-1">
          <AboutPortraitCard />
        </div>
      </div>
    </section>
  )
}
