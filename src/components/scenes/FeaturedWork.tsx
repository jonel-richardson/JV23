import Link from 'next/link'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import ProjectCard from '@/components/ui/ProjectCard'
import { client, FEATURED_PROJECTS_QUERY } from '@/lib/sanity'
import {
  FEATURED_EMPTY_STATE,
  FEATURED_VIEW_ALL_HREF,
  FEATURED_VIEW_ALL_LABEL,
} from '@/lib/constants'
import type { Project } from '@/lib/types'

export default async function FeaturedWork() {
  const projects = await client.fetch<Project[]>(FEATURED_PROJECTS_QUERY)

  return (
    <section
      id="work"
      /* @container frame: standard scene padding (mobile/768/1024) per DESIGN-GUIDELINES — asymmetric vertical (lighter top, full bottom) so scene content sits closer to the nav */
      className="relative bg-[var(--color-bg-secondary)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <SceneMeta scene="03" label="FEATURED WORK" />

      <EyebrowLabel number="03" label="SELECTED PROJECTS" className="mb-5" />

      <h2
        /* @container frame: section title scales smoothly within the 48px–96px range from DESIGN-GUIDELINES */
        className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-10 text-[clamp(48px,8cqw,96px)]"
      >
        RECENT WORK
      </h2>

      {projects.length === 0 ? (
        <p className="font-body text-[var(--color-text-body)]">{FEATURED_EMPTY_STATE}</p>
      ) : (
        <>
          {/* @container frame: mobile = horizontal scroll-snap carousel, tablet+ = grid */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] @[768px]/frame:grid @[768px]/frame:grid-cols-2 @[768px]/frame:gap-6 @[768px]/frame:mx-0 @[768px]/frame:px-0 @[768px]/frame:overflow-visible @[768px]/frame:snap-none @[1024px]/frame:grid-cols-3 @[1024px]/frame:gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="flex-shrink-0 w-[80vw] snap-center @[768px]/frame:w-auto @[768px]/frame:flex-shrink @[768px]/frame:snap-align-none"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="flex justify-center gap-2 mt-6 @[768px]/frame:hidden"
          >
            {projects.map((p) => (
              <span
                key={p._id}
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-quiet)]"
              />
            ))}
          </div>

          <div className="mt-10 @[1024px]/frame:mt-12">
            <Link
              href={FEATURED_VIEW_ALL_HREF}
              className="inline-block font-mono text-[12px] tracking-[0.15em] uppercase text-[var(--color-text-primary)] motion-safe:transition-colors motion-safe:duration-150 hover:text-[var(--color-accent-primary)]"
            >
              {FEATURED_VIEW_ALL_LABEL}
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
