import type { Service } from '@/lib/types'

interface ServiceCardProps {
  service: Service
  number: string
}

// One offering in the Services marquee. Numbered badge top, title +
// description below. Cards aren't clickable in Phase 6 (no service detail
// page exists yet), so they intentionally render no nav affordance — no
// arrow, no link wrapper. Hover still lifts the border and the card
// itself for a hint of life, kept deliberately subtle.
export default function ServiceCard({ service, number }: ServiceCardProps) {
  return (
    <article
      /* @container frame: 280px fixed card width keeps the marquee rhythm consistent across breakpoints; min-height ensures variable description lengths don't shrink the card below a readable size */
      className="flex w-[280px] min-h-[220px] flex-shrink-0 flex-col rounded-2xl border-[0.5px] border-[var(--color-surface-card-raised)] bg-[linear-gradient(180deg,#1a1a1a_0%,#0a0a0a_100%)] p-6 motion-safe:transition-all motion-safe:duration-[250ms] motion-safe:ease-out hover:border-[var(--color-accent-primary)] motion-safe:hover:-translate-y-0.5"
    >
      <span className="block font-mono text-[11px] tracking-[0.15em] text-[var(--color-accent-primary)]">
        {number}
      </span>

      <div className="mt-7 flex flex-1 flex-col">
        <h3 className="font-display text-[24px] leading-[1] tracking-[0.02em] text-[var(--color-text-primary)] uppercase">
          {service.title}
        </h3>
        {service.description && (
          <p className="mt-3 font-body text-[14px] leading-[1.5] text-[var(--color-text-body)]">
            {service.description}
          </p>
        )}
      </div>
    </article>
  )
}
