import type { Review } from '@/lib/types'

interface ReviewQuoteProps {
  review: Review
  active: boolean
}

// Single review rendered for the homepage carousel. Two surfaces share
// this component's stage — the active quote and the dormant ones — so
// transitions stay smooth without remounting nodes. Inactive copies sit
// on top of one another via `absolute inset-0`; the active copy gets
// opacity 1, inactives get opacity 0 and `pointer-events-none` so clicks
// fall through to the carousel controls.
//
// Mobile = single column (quote stacked over attribution); 768+ = two
// columns (quote left at 2fr, attribution right at 1fr) per the locked
// "Words / Reviews Card" pattern in DESIGN-GUIDELINES.
//
// Project-name accent uses the secondary `#00ffa3` per DESIGN-GUIDELINES
// (line 184: "project name uses accent green") — the same "alive" green
// the REC dot and `// PROJECT:` cinema-tech motif uses elsewhere.
export default function ReviewQuote({ review, active }: ReviewQuoteProps) {
  const trimmedReview = review.review.trim()
  const trimmedRoleCompany = review.roleCompany?.trim()
  const trimmedProject = review.project?.trim()

  return (
    <article
      aria-hidden={active ? undefined : true}
      aria-live={active ? 'polite' : undefined}
      className={`absolute inset-0 grid grid-cols-1 gap-8 motion-safe:transition-[opacity,transform] motion-safe:duration-[600ms] motion-reduce:transition-none @[768px]/frame:grid-cols-[2fr_1fr] @[768px]/frame:gap-16 @[768px]/frame:items-end ${
        active
          ? 'opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-2'
      }`}
    >
      <div>
        <div
          aria-hidden="true"
          className="mb-1 font-display text-[120px] leading-[0.7] text-[var(--color-accent-primary)]"
        >
          &ldquo;
        </div>
        <p className="font-body italic text-white text-[clamp(22px,4cqw,36px)] leading-[1.35] max-w-[22ch] @[768px]/frame:max-w-[18ch]">
          {trimmedReview}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 border-t-[0.5px] border-[#1a1a1a] pt-[18px] @[768px]/frame:self-end">
        <div className="font-body text-[14px] font-medium text-white">
          {review.name.trim()}
        </div>
        {trimmedRoleCompany && (
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#888]">
            {trimmedRoleCompany}
          </div>
        )}
        {trimmedProject && (
          <div className="mt-2 font-mono text-[10px] tracking-[0.15em] text-[#555]">
            {'// PROJECT: '}
            <span className="text-[var(--color-accent-secondary)]">
              {trimmedProject.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
