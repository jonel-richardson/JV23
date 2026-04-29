/**
 * Decorative quadcopter (top-down view) for the Hero scene.
 *
 * SVG markup is verbatim from docs/mockup.html SCENE_01 · HERO. Hex accents
 * map to design tokens:
 *   #0066ff → --color-accent-primary  (camera lens dot)
 *   #00ffa3 → --color-accent-secondary (antenna lights + signal pulse)
 * CSS variables in SVG fill attributes are inconsistent across browsers
 * (notably Safari iOS for inline SVG), so raw hex is used here as a
 * documented exception to CLAUDE.md Rule 12. The remaining grays
 * (#1a1a1a, #2a2a2a, #444, #555, etc.) are illustration-internal values
 * not part of the design token table.
 *
 * Position/size driven by HERO_DRONE_SIZE in lib/constants.ts. The Tailwind
 * utility classes below mirror those values literally — keep them in sync
 * with the constant if either changes.
 */
export default function HeroDrone() {
  return (
    <div
      aria-hidden="true"
      /* @container frame: drone shifts in-frame and grows at 768px+, fully anchored at 1024px+ */
      className="absolute pointer-events-none top-[100px] -right-[40px] w-[180px] h-[180px] opacity-50 @[768px]/frame:top-[90px] @[768px]/frame:right-0 @[768px]/frame:w-[220px] @[768px]/frame:h-[220px] @[768px]/frame:opacity-70 @[1024px]/frame:top-[80px] @[1024px]/frame:right-[40px] @[1024px]/frame:w-[280px] @[1024px]/frame:h-[280px] @[1024px]/frame:opacity-[0.85]"
    >
      <svg
        viewBox="0 0 320 320"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <ellipse cx="80" cy="80" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(35 80 80)" />
        <ellipse cx="80" cy="80" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(125 80 80)" />
        <circle cx="80" cy="80" r="5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
        <ellipse cx="240" cy="80" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(-20 240 80)" />
        <ellipse cx="240" cy="80" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(70 240 80)" />
        <circle cx="240" cy="80" r="5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
        <ellipse cx="80" cy="240" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(60 80 240)" />
        <ellipse cx="80" cy="240" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(150 80 240)" />
        <circle cx="80" cy="240" r="5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
        <ellipse cx="240" cy="240" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(15 240 240)" />
        <ellipse cx="240" cy="240" rx="36" ry="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" transform="rotate(105 240 240)" />
        <circle cx="240" cy="240" r="5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
        <rect x="100" y="78" width="40" height="4" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="180" y="78" width="40" height="4" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="100" y="238" width="40" height="4" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="180" y="238" width="40" height="4" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="78" y="100" width="4" height="40" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="238" y="100" width="4" height="40" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="78" y="180" width="4" height="40" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="238" y="180" width="4" height="40" rx="1" fill="#222" stroke="#3a3a3a" strokeWidth="0.5" />
        <rect x="120" y="120" width="80" height="80" rx="8" fill="#0f0f0f" stroke="#444" strokeWidth="0.5" />
        <rect x="128" y="128" width="64" height="40" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
        {/* Camera lens — #0066ff is --color-accent-primary */}
        <circle cx="160" cy="148" r="3" fill="#0066ff" opacity="0.6" />
        <rect x="148" y="180" width="24" height="18" rx="3" fill="#050505" stroke="#555" strokeWidth="0.5" />
        <circle cx="160" cy="189" r="6" fill="#000" stroke="#666" strokeWidth="0.5" />
        <circle cx="160" cy="189" r="3" fill="#1a1a1a" />
        <line x1="135" y1="120" x2="130" y2="110" stroke="#555" strokeWidth="0.8" />
        {/* Antenna light — #00ffa3 is --color-accent-secondary */}
        <circle cx="130" cy="110" r="1.5" fill="#00ffa3" />
        <line x1="185" y1="120" x2="190" y2="110" stroke="#555" strokeWidth="0.8" />
        {/* Antenna light — #00ffa3 is --color-accent-secondary */}
        <circle cx="190" cy="110" r="1.5" fill="#00ffa3" />
        {/* Signal pulse (dot + ring) — #00ffa3 is --color-accent-secondary */}
        <circle cx="160" cy="200" r="2.2" fill="#00ffa3" />
        <circle cx="160" cy="200" r="6" fill="none" stroke="#00ffa3" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
  )
}
