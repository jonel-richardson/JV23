import Link from 'next/link'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import ReviewCarousel from '@/components/ui/ReviewCarousel'
import { client, WORDS_QUERY } from '@/lib/sanity'
import {
  WORDS_EYEBROW_LABEL,
  WORDS_EYEBROW_NUMBER,
  WORDS_SEE_ALL_HREF,
  WORDS_SEE_ALL_LABEL,
  WORDS_TITLE,
} from '@/lib/constants'
import type { Review } from '@/lib/types'

// Scene 07 — Words From Set. Server scene fetches the 5 most recent
// approved reviews and hands them to the client carousel. Background
// `#050505` (bg-base) per the Section Inventory; sits between Services
// (also bg-base) and Inquire (bg-secondary `#000`). Same-color back-to-back
// with Services is intentional — the carousel's center-stage composition
// reads as a natural extension of the Services marquee that precedes it.
export default async function WordsFromSet() {
  const reviews = await client.fetch<Review[]>(WORDS_QUERY)

  return (
    <section
      id="words"
      /* @container frame: tightened scene padding (48/64/80px) so the carousel + controls fit a 768px-tall viewport without scroll. Standard padding budget would push the controls below the fold at 1366×768. See DESIGN-GUIDELINES change log 2026-04-30. */
      className="relative bg-[var(--color-bg-base)] px-6 pt-12 pb-12 @[768px]/frame:px-8 @[768px]/frame:pt-16 @[768px]/frame:pb-16 @[1024px]/frame:px-12 @[1024px]/frame:pt-20 @[1024px]/frame:pb-20"
    >
      <SceneMeta scene="07" label="WORDS" />

      {/* Eyebrow row pairs the "// 07 — WHAT CLIENTS SAY" label with a
         "SEE ALL REVIEWS →" link aligned to the right. Top-of-section
         placement gives visitors who don't want to engage with the
         carousel an immediate path to the full /reviews archive,
         without a competing CTA below the carousel that would push
         the controls out of viewport. */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <EyebrowLabel
          number={WORDS_EYEBROW_NUMBER}
          label={WORDS_EYEBROW_LABEL}
        />
        <Link
          href={WORDS_SEE_ALL_HREF}
          className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888] motion-safe:transition-colors motion-safe:duration-150 hover:text-[var(--color-accent-secondary)] focus-visible:text-[var(--color-accent-secondary)] focus-visible:outline-none"
        >
          {WORDS_SEE_ALL_LABEL}
        </Link>
      </div>

      <h2
        /* @container frame: title scaled smaller than the standard 48–96px scene-title range so the full carousel (title + stage + controls) fits a 768px-tall viewport. See DESIGN-GUIDELINES change log 2026-04-30. */
        className="mb-10 font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] text-[clamp(40px,10cqw,64px)]"
      >
        {WORDS_TITLE.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      {reviews.length === 0 ? (
        <p className="font-body text-[var(--color-text-body)]">
          Reviews coming soon.
        </p>
      ) : (
        <ReviewCarousel reviews={reviews} />
      )}
    </section>
  )
}
