import { getBrandLogoSlug } from '@/lib/getBrandLogoSlug'
import { TRUSTED_BY_LOGO_PATH } from '@/lib/constants'
import type { Review } from '@/lib/types'

interface ReviewCardProps {
  review: Review
}

// Magazine pull-quote card used on the /reviews archive grid. Lighter
// dark palette than the homepage carousel — bg `#1a1a1a` instead of
// `#0a0a0a`, border at 30% white instead of opaque `#1a1a1a`, body text
// `#e0e0e0` instead of `#aaa` — see DESIGN-GUIDELINES change log entry
// of 2026-05-01 for the page-level rationale.
//
// Brand logo renders only when review.brand resolves to a known Trusted
// By slug (see getBrandLogoSlug). Unknown brands render no logo and no
// placeholder — better than a broken-image icon, and the lopsided
// attribution row reads as natural editorial layout.
//
// Project line uses the green secondary accent per DESIGN-GUIDELINES
// "Words / Reviews Card" pattern, kept consistent with the homepage
// ReviewQuote so a visitor sees the same accent in both surfaces.
export default function ReviewCard({ review }: ReviewCardProps) {
  const trimmedReview = review.review.trim()
  const trimmedRoleCompany = review.roleCompany?.trim()
  const trimmedProject = review.project?.trim()
  const logoSlug = getBrandLogoSlug(review.brand)

  return (
    <article
      className="rounded-2xl border-[0.5px] border-white/30 bg-[#1a1a1a] p-6 @[768px]/frame:p-8"
    >
      {/* Top row: oversized quote mark left, brand logo right (when
          available). Logo aligned to the visual top of the quote mark
          via mt-2.5 so it doesn't sit at the absolute top of the line
          box and instead pairs with the glyph optically. When no logo
          matches, the row simply renders the quote mark with empty
          right-side space — better than a placeholder. */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div
          aria-hidden="true"
          className="font-display text-[96px] leading-[0.7] text-[var(--color-accent-primary)]"
        >
          &ldquo;
        </div>
        {logoSlug && (
          <img
            src={`${TRUSTED_BY_LOGO_PATH}/${logoSlug}.png`}
            alt={`${review.brand} logo`}
            loading="lazy"
            className="mt-2.5 h-8 w-auto flex-shrink-0 brightness-0 invert opacity-50"
          />
        )}
      </div>

      <p className="mb-8 font-body italic text-[16px] leading-[1.5] text-[#e0e0e0]">
        {trimmedReview}
      </p>

      <div>
        <div className="font-body text-[14px] font-medium text-white">
          {review.name.trim()}
        </div>
        {trimmedRoleCompany && (
          <div className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-[#888]">
            {trimmedRoleCompany}
          </div>
        )}
      </div>

      {trimmedProject && (
        <div className="mt-3 font-mono text-[10px] tracking-[0.15em] text-[#555]">
          {'// PROJECT: '}
          <span className="text-[var(--color-accent-secondary)]">
            {trimmedProject.toUpperCase()}
          </span>
        </div>
      )}
    </article>
  )
}
