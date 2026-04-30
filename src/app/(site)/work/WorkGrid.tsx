'use client'

import ProjectCard from '@/components/ui/ProjectCard'
import { useWorkFilterStore } from '@/stores/useWorkFilterStore'
import type { Project } from '@/lib/types'

interface WorkGridProps {
  projects: Project[]
}

export default function WorkGrid({ projects }: WorkGridProps) {
  const activeCategory = useWorkFilterStore((s) => s.activeCategory)

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  if (filtered.length === 0) {
    const message =
      activeCategory === 'All'
        ? 'No projects yet.'
        : `No ${activeCategory} projects yet.`
    return (
      <p className="font-body text-[var(--color-text-body)] mt-10">{message}</p>
    )
  }

  return (
    /* @container frame: 1-col mobile / 2-col tablet / 3-col desktop */
    <div className="mt-10 grid grid-cols-1 gap-6 @[768px]/frame:grid-cols-2 @[768px]/frame:gap-6 @[1024px]/frame:grid-cols-3 @[1024px]/frame:gap-8">
      {filtered.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  )
}
