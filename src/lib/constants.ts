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
