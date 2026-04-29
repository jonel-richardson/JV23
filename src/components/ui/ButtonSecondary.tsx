import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonSecondaryProps {
  href: string
  children: ReactNode
}

/* @container frame: padding widens slightly at the desktop breakpoint */
/* Hover border uses --color-text-quiet (#666) as the closest in-system token to */
/* the mockup-specified #555 hover state — kept token-driven per CLAUDE.md Rule 12. */
const CLASSES =
  'inline-flex items-center justify-center rounded-lg font-body text-[14px] leading-none text-[var(--color-text-primary)] bg-transparent border-[0.5px] border-[var(--color-border)] py-3.5 px-[22px] @[1024px]/frame:px-6 transition-colors hover:border-[var(--color-text-quiet)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent-primary)] focus-visible:outline-offset-2'

export default function ButtonSecondary({ href, children }: ButtonSecondaryProps) {
  if (href.startsWith('#')) {
    return (
      <a href={href} className={CLASSES}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={CLASSES}>
      {children}
    </Link>
  )
}
