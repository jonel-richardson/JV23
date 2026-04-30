import Link from 'next/link'
import CategoryTag from './CategoryTag'
import { getThumbnailUrl } from '@/lib/videoEmbed'
import { formatProjectDate } from '@/lib/formatProjectDate'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const thumbnailUrl = getThumbnailUrl(project.videoUrl)
  const formattedDate = formatProjectDate(project.date)

  return (
    <Link
      href="#"
      data-testid="project-card"
      aria-label={`${project.title} — ${project.category}`}
      className="group block rounded-lg border-[0.5px] border-[var(--color-surface-card)] bg-[var(--color-bg-base)] overflow-hidden motion-safe:transition-colors motion-safe:duration-200 hover:border-[rgba(0,102,255,0.5)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-surface-card)]">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{
              background:
                'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            }}
          >
            <span className="font-display tracking-[0.02em] text-[var(--color-text-primary)] text-center text-[clamp(20px,4cqw,32px)] leading-[0.92]">
              {project.title}
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 z-[2]">
          <CategoryTag category={project.category} />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/40 opacity-0 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:group-hover:opacity-100"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center opacity-0 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:group-hover:opacity-100"
        >
          <div className="w-14 h-14 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5 3L17 10L5 17V3Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 @[1024px]/frame:p-5">
        <h3 className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] text-[clamp(24px,4cqw,32px)] uppercase">
          {project.title}
        </h3>
        {formattedDate && (
          <div className="mt-2 font-mono text-[11px] tracking-[0.15em] text-[var(--color-text-quiet)]">
            {formattedDate}
          </div>
        )}
        {project.description && (
          <p
            className="mt-2 font-body text-[14px] leading-[1.65] text-[var(--color-text-body)] line-clamp-2 max-h-0 overflow-hidden opacity-0 motion-safe:transition-all motion-safe:duration-200 motion-safe:group-hover:max-h-24 motion-safe:group-hover:opacity-100"
          >
            {project.description}
          </p>
        )}
      </div>
    </Link>
  )
}
