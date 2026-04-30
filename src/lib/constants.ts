export const BRAND_COLORS = {
  bgBase: 'var(--color-bg-base)',
  bgSecondary: 'var(--color-bg-secondary)',
  surfaceRaised: 'var(--color-surface-raised)',
  surfaceCard: 'var(--color-surface-card)',
  surfaceCardRaised: 'var(--color-surface-card-raised)',
  border: 'var(--color-border)',
  textPrimary: 'var(--color-text-primary)',
  textBody: 'var(--color-text-body)',
  textMuted: 'var(--color-text-muted)',
  textQuiet: 'var(--color-text-quiet)',
  textBarelyVisible: 'var(--color-text-barely-visible)',
  accentPrimary: 'var(--color-accent-primary)',
  accentSecondary: 'var(--color-accent-secondary)',
} as const

export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
} as const

export const SOCIAL_URLS = {
  instagram: 'https://instagram.com/jackvisuals23',
  emailNathan: 'mailto:nathan@rjaonline.com',
  emailSupport: 'mailto:jonelrichardson@gmail.com',
} as const

// --- Phase 2: Nav + Mobile Menu ------------------------------------------

export const NAV_HEIGHT_MOBILE = 52
export const NAV_HEIGHT_DESKTOP = 72

// Logo PNG has ~30% transparent padding baked in. Container height is
// roughly 1.5× the desired visible artwork height. When Nathan provides
// a tighter-cropped PNG, reduce these values back to ~24/30px.
export const LOGO_HEIGHT_MOBILE = 36
export const LOGO_HEIGHT_DESKTOP = 44
export const LOGO_INTRINSIC_WIDTH = 500
export const LOGO_INTRINSIC_HEIGHT = 499

// Logo PNG currently ships as solid black ink on a transparent canvas.
// The nav background is rgba(5,5,5,0.92), so black ink would render
// near-invisible. CSS inversion is a temporary measure until Nathan
// provides a white-variant PNG. To swap to the real white logo: replace
// /public/images/jack-visuals-logo.png and set LOGO_FILTER to 'none'.
export const LOGO_FILTER = 'invert(1)'

export const MOBILE_MENU_ID = 'jv-mobile-menu'

export const SCROLL_FADE_THRESHOLD = 120

export const NAV_BG_DEFAULT = 'rgba(5, 5, 5, 0.92)'
export const NAV_BG_SCROLLED = 'rgba(5, 5, 5, 0.85)'
export const NAV_BLUR_DEFAULT_PX = 10
export const NAV_BLUR_SCROLLED_PX = 14

export const NAV_TRANSITION_MS = 200
export const MOBILE_MENU_STAGGER_MS = 60

export interface NavLink {
  label: string
  href: string
  number: string
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Work', href: '#work', number: '01' },
  { label: 'About', href: '#about', number: '02' },
  { label: 'Inquire', href: '#inquire', number: '03' },
] as const

export const NAV_CTA = {
  label: 'Start a project',
  href: '#inquire',
} as const

// --- Phase 3: Hero Scene -------------------------------------------------

export interface HeroStat {
  label: string
  value: string
  accent?: boolean
}

export const HERO_STATS: readonly HeroStat[] = [
  { label: 'EST.', value: '2023', accent: true },
  { label: 'PROJECTS', value: '47+' },
  { label: 'REGION', value: 'CARIBBEAN' },
] as const

export interface HeroDronePosition {
  width: number
  top: number
  right: number
  opacity: number
}

// Authoritative spec for the drone's three breakpoint positions.
// Mobile and opacity values verbatim from docs/mockup.html .hero-drone CSS;
// 768px+ and 1024px+ position values per Phase 3 prompt approval (the mockup's
// own desktop positions were superseded). HeroDrone.tsx mirrors these values
// as Tailwind utility classes since Tailwind cannot statically detect runtime
// values in arbitrary-value class strings — keep this constant and the
// component classes in sync if either changes.
export const HERO_DRONE_SIZE = {
  mobile: { width: 180, top: 100, right: -40, opacity: 0.5 },
  tablet: { width: 220, top: 130, right: 32, opacity: 0.7 },
  desktop: { width: 280, top: 140, right: 60, opacity: 0.85 },
} as const satisfies Record<'mobile' | 'tablet' | 'desktop', HeroDronePosition>

// rgba(0,102,255,...) is --color-accent-primary at 12% alpha. Position
// values are pixel-exact from the mockup. Single-state (no breakpoint
// changes) so the component applies these via inline style.
export const HERO_GLOW = {
  width: 400,
  height: 400,
  bottom: -150,
  left: -100,
  gradient: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)',
} as const

// --- Phase 4: Featured Work + /work archive -----------------------------

export const WORK_FILTER_CATEGORIES = [
  'All',
  'Brand',
  'Event',
  'Music',
  'Drone',
  'Commercial',
] as const

export type WorkFilterCategory = (typeof WORK_FILTER_CATEGORIES)[number]

export const FEATURED_PROJECTS_LIMIT = 3

export const FEATURED_VIEW_ALL_LABEL = 'All Projects →'
export const FEATURED_VIEW_ALL_HREF = '/work'

export const FEATURED_EMPTY_STATE = 'Featured work coming soon.'

// --- Phase 5: About Scene -----------------------------------------------

// Display headline rendered one line per array entry — block layout in JSX
// avoids <br> in the source content per typography rules.
export const ABOUT_TITLE: readonly string[] = ['MEET', 'NATHAN.'] as const

// Locked literal copy from docs/mockup.html. Two paragraphs, plain Inter
// body, no inline styling. Edits go through DESIGN-GUIDELINES change log.
export const ABOUT_BODY_PARAGRAPHS: readonly string[] = [
  'A Trinidad-based cinematographer building cinematic stories for brands and events across the Caribbean. Single drone, small team, sharp eye for the moment.',
  'Nine years behind the lens. Self-taught. Trained on weddings, refined on commercials, currently focused on brand films that move at the speed of a story.',
] as const

export const ABOUT_LOCATION = '// PORT OF SPAIN · TRINIDAD & TOBAGO'

// Portrait card photo. Phase 9 will add a scroll-driven camera-pan
// animation as a one-time intro flourish layered ON TOP of this image —
// the photo is the persistent visual.
export const ABOUT_PORTRAIT_PHOTO = {
  src: '/images/nathan-portrait.jpg',
  alt: 'Nathan, cinematographer, Trinidad & Tobago',
} as const

export const ABOUT_PORTRAIT_TIMECODE = '// SHOT 01 · PORTRAIT'
export const ABOUT_PORTRAIT_REC_LABEL = 'REC'
