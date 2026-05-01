import Link from 'next/link'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import CategoryFilter from '@/components/ui/CategoryFilter'
import WorkGrid from './WorkGrid'
import { ALL_PROJECTS_QUERY, client } from '@/lib/sanity'
import type { Project } from '@/lib/types'

export const revalidate = 60

export default async function WorkPage() {
  const projects = await client.fetch<Project[]>(ALL_PROJECTS_QUERY)

  return (
    <main
      /* @container frame: standard scene padding (mobile/768/1024) per DESIGN-GUIDELINES — asymmetric vertical (lighter top, full bottom) so page content sits closer to the nav */
      className="relative bg-[var(--color-bg-base)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <EyebrowLabel label="PORTFOLIO" className="mb-5" />

      <h1
        /* @container frame: section title scales smoothly within the 48px–96px range from DESIGN-GUIDELINES */
        className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-10 text-[clamp(48px,8cqw,96px)]"
      >
        THE WORK
      </h1>

      <CategoryFilter />
      <WorkGrid projects={projects} />

      {/* Back-to-home exit affordance. Same text-link pattern as
         /reviews and /leave-review for a consistent sub-page exit. */}
      <div className="mt-8 flex justify-center border-t-[0.5px] border-[#1a1a1a] pt-6">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888] motion-safe:transition-colors motion-safe:duration-150 hover:text-[var(--color-accent-secondary)] focus-visible:text-[var(--color-accent-secondary)] focus-visible:outline-none"
        >
          ← BACK TO HOME
        </Link>
      </div>
    </main>
  )
}
