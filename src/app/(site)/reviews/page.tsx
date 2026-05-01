import Link from 'next/link'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import ReviewsCategoryFilter from '@/components/ui/ReviewsCategoryFilter'
import ReviewsGrid from './ReviewsGrid'
import { client, REVIEWS_QUERY } from '@/lib/sanity'
import {
  REVIEWS_PAGE_BODY,
  REVIEWS_PAGE_EYEBROW,
  REVIEWS_PAGE_TITLE,
} from '@/lib/constants'
import type { Review } from '@/lib/types'

export const revalidate = 60

// /reviews — full archive of approved reviews. Lighter dark palette
// distinguishes the archive from the homepage scenes: page bg `#0d0d0d`,
// card bg `#1a1a1a` (in ReviewCard), body text `#e0e0e0`, borders at 30%
// white. Cohesive with the site's dark identity but visually loosens up
// to read as "long-form content" rather than "marketing scene".
//
// Page mirrors /work — orchestrates header + filter + grid inline; no
// scenes/ wrapper. See DESIGN-GUIDELINES change log entry of 2026-05-01.
export default async function ReviewsPage() {
  const reviews = await client.fetch<Review[]>(REVIEWS_QUERY)

  return (
    <main
      /* @container frame: standard scene padding mirrors /work, with the lighter `#0d0d0d` page bg locked in the change log */
      className="relative bg-[#0d0d0d] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <EyebrowLabel label={REVIEWS_PAGE_EYEBROW} className="mb-5" />

      <h1
        /* @container frame: title scales smoothly within the 48–96px range from DESIGN-GUIDELINES */
        className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-6 text-[clamp(48px,8cqw,96px)]"
      >
        {REVIEWS_PAGE_TITLE.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>

      <p className="mb-10 font-body text-[15px] leading-[1.7] text-[#e0e0e0] max-w-[60ch]">
        {REVIEWS_PAGE_BODY}
      </p>

      <ReviewsCategoryFilter />
      <ReviewsGrid reviews={reviews} />

      {/* Footer transition row. Both links use the editorial text-link
         pattern (mono uppercase, #888 → #00ffa3 on hover) — same shape
         as the Words From Set "see all reviews" link. Solid CTA buttons
         are reserved for primary actions inside scenes; transition
         rows between sections / pages stay quiet. */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t-[0.5px] border-[#1a1a1a] pt-6">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888] motion-safe:transition-colors motion-safe:duration-150 hover:text-[var(--color-accent-secondary)] focus-visible:text-[var(--color-accent-secondary)] focus-visible:outline-none"
        >
          ← BACK TO HOME
        </Link>
        <Link
          href="/leave-review"
          className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888] motion-safe:transition-colors motion-safe:duration-150 hover:text-[var(--color-accent-secondary)] focus-visible:text-[var(--color-accent-secondary)] focus-visible:outline-none"
        >
          LEAVE A REVIEW →
        </Link>
      </div>
    </main>
  )
}
