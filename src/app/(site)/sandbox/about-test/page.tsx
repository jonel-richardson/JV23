import type { Metadata } from 'next'
import VariantAParagraphStagger from './VariantAParagraphStagger'
import VariantBColorGrade from './VariantBColorGrade'

// Sandbox route — NOT FOR PRODUCTION. Compares two About-scene movement
// options. Belt-and-braces noindex in case the branch ever ships to prod.
export const metadata: Metadata = {
  title: 'Sandbox — About Movement Comparison',
  robots: { index: false, follow: false },
}

export default function SandboxAboutMovementPage() {
  return (
    <div className="relative">
      {/* Sticky right under the Nav (Nav is sticky top-0 z-50 at NAV_HEIGHT_MOBILE/NAV_HEIGHT_DESKTOP = 52/72px). Using viewport-based md: here (not @[768px]/frame:) so this banner tracks the Nav's actual viewport breakpoint, since the Nav lives outside .frame. */}
      <div className="sticky top-[52px] md:top-[72px] z-50 bg-[#ff3333] text-black border-y-2 border-black px-6 py-2 @[768px]/frame:px-8 @[1024px]/frame:px-12">
        <div className="font-mono text-[10px] tracking-[0.18em] font-medium">
          // SANDBOX — ABOUT MOVEMENT COMPARISON
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] font-medium">
          // NOT FOR PRODUCTION — DELETE BEFORE MERGE
        </div>
      </div>

      <div className="px-6 pt-10 pb-2 @[768px]/frame:px-8 @[1024px]/frame:px-12">
        <div className="font-mono text-[10px] tracking-[0.20em] text-[#ff3333]">
          // SANDBOX A — PARAGRAPH STAGGER FADE
        </div>
      </div>
      <VariantAParagraphStagger />

      <div
        aria-hidden="true"
        className="mx-6 my-12 border-t border-dashed border-[#ff3333] @[768px]/frame:mx-8 @[1024px]/frame:mx-12"
      />

      <div className="px-6 pt-2 pb-2 @[768px]/frame:px-8 @[1024px]/frame:px-12">
        <div className="font-mono text-[10px] tracking-[0.20em] text-[#ff3333]">
          // SANDBOX B — COLOR GRADE TRANSITION
        </div>
      </div>
      <VariantBColorGrade />
    </div>
  )
}
