'use client'

import { useEffect, useRef, useState } from 'react'
import ReviewQuote from './ReviewQuote'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  WORDS_AUTO_ADVANCE_MS,
  WORDS_RESUME_AFTER_MS,
} from '@/lib/constants'
import type { Review } from '@/lib/types'

interface ReviewCarouselProps {
  reviews: Review[]
}

// Tick interval drives the progress bar smoothly without spamming
// re-renders. 50ms = 20 frames/sec, fine for a 1px-tall bar.
const PROGRESS_TICK_MS = 50

// Auto-advancing review carousel with dot navigation, counter, and
// progress bar. Pauses on any user interaction; resumes after
// WORDS_RESUME_AFTER_MS so the visitor isn't fighting the timer if
// they're mid-read. Reduced-motion users get no auto-advance and no
// transition between reviews — dots remain functional for manual nav,
// and the progress bar is hidden entirely (nothing to indicate when
// nothing is auto-advancing).
//
// The dormant-quote stack relies on the parent stage (in WordsFromSet)
// providing position:relative; ReviewQuote uses absolute positioning
// to layer all reviews on top of one another so opacity transitions
// don't trigger layout shift.
export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const prefersReduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset progress whenever the active index changes — including when
  // the user manually navigates via dots. This keeps the progress bar
  // honest about the current cycle.
  useEffect(() => {
    setProgress(0)
  }, [index])

  // Auto-advance loop. Skipped entirely when reduced-motion is on,
  // when there's only one review (nothing to rotate), or when paused.
  // Counting elapsed ticks instead of reading Date.now() keeps the cycle
  // deterministic under tab-throttling and keeps the tests independent
  // of system time.
  useEffect(() => {
    if (prefersReduced || paused || reviews.length <= 1) return

    let elapsed = 0
    const tick = setInterval(() => {
      elapsed += PROGRESS_TICK_MS
      const ratio = Math.min(elapsed / WORDS_AUTO_ADVANCE_MS, 1)
      setProgress(ratio)
      if (elapsed >= WORDS_AUTO_ADVANCE_MS) {
        // Clear ourselves so subsequent ticks don't fire before the
        // effect cleanup runs — without this, advancing fake time past
        // the threshold would multi-advance the index in a single batch.
        clearInterval(tick)
        setIndex((prev) => (prev + 1) % reviews.length)
      }
    }, PROGRESS_TICK_MS)

    return () => clearInterval(tick)
  }, [prefersReduced, paused, reviews.length, index])

  // Resume timer — clears on any new pause-trigger so consecutive
  // interactions reset the wait.
  useEffect(() => {
    if (!paused) return
    resumeTimerRef.current = setTimeout(() => {
      setPaused(false)
    }, WORDS_RESUME_AFTER_MS)
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = null
      }
    }
  }, [paused])

  function goTo(target: number) {
    setIndex(target)
    setPaused(true)
    setProgress(0)
  }

  if (reviews.length === 0) return null

  const currentLabel = String(index + 1).padStart(2, '0')
  const totalLabel = String(reviews.length).padStart(2, '0')
  const progressPct = prefersReduced ? 0 : Math.round(progress * 100)

  return (
    <div>
      {/* Stage. Min-height holds the layout open so the absolute-positioned
          quotes don't collapse the surrounding scene. Tightened in the
          2026-04-30 viewport-fit pass so the controls row sits inside a
          768px-tall viewport without scroll; longer quotes still wrap as
          their content needs (this is min-height, not max). */}
      <div className="relative min-h-[240px] @[1024px]/frame:min-h-[220px]">
        {reviews.map((review, i) => (
          <ReviewQuote
            key={review._id}
            review={review}
            active={i === index}
          />
        ))}
      </div>

      {/* Controls row — counter (left) + progress bar (center, flex-1) +
          dots (right). Progress bar hidden under reduced-motion since
          there's nothing auto-advancing for it to track. */}
      <div className="mt-12 flex items-center gap-6 border-t-[0.5px] border-[#1a1a1a] pt-6">
        <div className="font-mono text-[11px] tracking-[0.10em] text-[#888]">
          {currentLabel}
          <span className="text-[#444]">{` / ${totalLabel}`}</span>
        </div>

        {!prefersReduced && (
          <div className="relative h-px flex-1 bg-[#1a1a1a]">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
        {prefersReduced && <div className="flex-1" aria-hidden="true" />}

        <div
          role="tablist"
          aria-label="Select review"
          className="flex items-center gap-2.5"
        >
          {reviews.map((review, i) => {
            const isActive = i === index
            return (
              <button
                key={review._id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show review ${i + 1} of ${reviews.length}`}
                onClick={() => goTo(i)}
                className={
                  isActive
                    ? 'h-1.5 w-1.5 rounded-full bg-white motion-safe:transition-transform motion-safe:duration-200 scale-[1.3]'
                    : 'h-1.5 w-1.5 rounded-full bg-[#2a2a2a] motion-safe:transition-colors motion-safe:duration-200 hover:bg-[#555]'
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
