import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonPrimaryProps {
  href: string
  children: ReactNode
}

/* @container frame: padding widens slightly at the desktop breakpoint */
const CLASSES =
  'inline-flex items-center justify-center rounded-lg font-body font-medium text-[14px] leading-none text-white bg-[var(--color-accent-primary)] py-3.5 px-[22px] @[1024px]/frame:px-6 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2'

export default function ButtonPrimary({ href, children }: ButtonPrimaryProps) {
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
