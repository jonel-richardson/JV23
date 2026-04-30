import type { ProjectCategory } from '@/lib/types'

interface CategoryTagProps {
  category: ProjectCategory
  className?: string
}

export default function CategoryTag({ category, className }: CategoryTagProps) {
  const isBrand = category === 'Brand'
  const base =
    'inline-block font-mono text-[10px] tracking-[0.15em] uppercase rounded-full px-2 py-1 leading-none'
  const tone = isBrand
    ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-primary)]'
    : 'bg-[var(--color-text-muted)] text-[var(--color-bg-secondary)]'
  const merged = className ? `${base} ${tone} ${className}` : `${base} ${tone}`
  return <span className={merged}>{category}</span>
}
