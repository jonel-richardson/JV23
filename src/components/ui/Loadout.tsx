import {
  KIT_LOADOUT_HEADER,
  KIT_LOADOUT_VERSION,
} from '@/lib/constants'
import type { Kit } from '@/lib/types'

interface LoadoutProps {
  items: Kit[]
}

// Terminal-styled gear list. Reads as a manifest, not a feature card —
// borrows the shape of a CLI tool's output (filename header, version
// stamp, monospaced rows) so the kit feels like an inventory rather than
// a product showcase. Items with `accent: true` render in the secondary
// accent color.
export default function Loadout({ items }: LoadoutProps) {
  return (
    <div
      /* @container frame: padding scales up at 1024px+; rounded-2xl + 0.5px border match the cinema-tech card pattern from REC overlays */
      className="rounded-2xl border-[0.5px] border-[var(--color-surface-card)] bg-[#0a0a0a] p-6 @[1024px]/frame:p-8"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--color-accent-secondary)]">
          {KIT_LOADOUT_HEADER}
        </span>
        <span className="font-mono text-[11px] tracking-[0.10em] text-[var(--color-text-quiet)]">
          {KIT_LOADOUT_VERSION}
        </span>
      </div>

      <ul>
        {items.map((kit, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li
              key={kit._id}
              className={`flex items-baseline justify-between py-3 ${
                isLast ? '' : 'border-b-[0.5px] border-[var(--color-surface-card)]'
              }`}
            >
              <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--color-text-quiet)]">
                {kit.category}
              </span>
              <span
                className={`font-mono text-[13px] ${
                  kit.accent
                    ? 'text-[var(--color-accent-secondary)]'
                    : 'text-[var(--color-text-primary)]'
                }`}
              >
                {kit.item}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
