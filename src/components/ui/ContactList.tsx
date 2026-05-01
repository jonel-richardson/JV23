import { INQUIRE_CONTACT_ITEMS } from '@/lib/constants'

const ITEM_BASE = 'inline-flex items-center font-mono text-[12px] text-[var(--color-text-muted)]'

function InstagramGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="mr-2 h-3.5 w-3.5 flex-shrink-0 text-[var(--color-accent-secondary)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

// Contact list rendered to the left of the form. Two item shapes share a
// row visually: text items prefixed with a green arrow glyph (email,
// location, availability) and a single Instagram link with the IG outline
// glyph. Order is dictated by INQUIRE_CONTACT_ITEMS — see the constants
// file for the ordering rationale.
export default function ContactList() {
  return (
    <ul className="flex flex-col gap-3">
      {INQUIRE_CONTACT_ITEMS.map((item) => (
        <li key={item.value}>
          {item.icon === 'instagram' ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ITEM_BASE} motion-safe:transition-colors hover:text-[var(--color-accent-secondary)] focus-visible:text-[var(--color-accent-secondary)] focus-visible:outline-none`}
            >
              <InstagramGlyph />
              {item.value}
            </a>
          ) : (
            <span className={ITEM_BASE}>
              <span aria-hidden="true" className="mr-2 text-[var(--color-accent-secondary)]">
                →
              </span>
              {item.value}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
