import type { ContactItem } from './types'

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
  emailNathan: 'mailto:jackltd23@gmail.com',
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

// Hrefs are absolute (`/#about`, not bare `#about`) so they navigate to
// the homepage AND scroll to the anchor when clicked from any sub-page
// (/reviews, /work, /leave-review). Bare `#about` only resolves on the
// homepage itself — silent no-op everywhere else. Paired with next/link
// in Nav.tsx so cross-page transitions are soft client-side nav rather
// than full reloads.
export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Work', href: '/#work', number: '01' },
  { label: 'About', href: '/#about', number: '02' },
  { label: 'Inquire', href: '/#inquire', number: '03' },
] as const

export const NAV_CTA = {
  label: 'Start a project',
  href: '/#inquire',
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

// --- Phase 6: Trusted By + Kit + Services ------------------------------

// Marquee animation durations (seconds for one full cycle). Slower duration
// = items pass more slowly = more readable. Both marquees pace at a
// readable speed; Services slightly slower since cards carry copy.
export const MARQUEE_DEFAULT_DURATION = 30
export const MARQUEE_TRUSTED_BY_DURATION = 30
export const MARQUEE_SERVICES_DURATION = 40

// Trusted By scene (Scene 04) ---------------------------------------------
export const TRUSTED_BY_TITLE = "BRANDS WE'VE SHOT FOR."

// Local-asset path for brand logos. Slug from Sanity must match the PNG
// filename (verified at data-entry time). See NATHAN_GUIDE for the
// new-brand workflow.
export const TRUSTED_BY_LOGO_PATH = '/images/trusted-by'

// Kit scene (Scene 05) ----------------------------------------------------
// Display headline rendered one line per array entry.
export const KIT_TITLE: readonly string[] = ['THE GEAR', 'BEHIND', 'THE SHOTS.'] as const

// Order is intentional: category descriptor first ("editorial-grade gear" —
// the credibility signal previously carried by the body paragraph), then
// ownership facts. Pills carry the headline-adjacent data; LOADOUT carries
// the specifics.
export const KIT_PILLS: readonly string[] = [
  'Editorial-grade gear',
  'Owned outright',
  'Insured',
] as const

export const KIT_LOADOUT_HEADER = '// LOADOUT.TXT'
export const KIT_LOADOUT_VERSION = 'v2.4 · 2026'

// Camera video. Decorative, autoplays + loops by default; reduced-motion
// users see the still first frame (browser-native poster behavior when
// autoplay is suppressed). Native dimensions 416×752 (boomerang re-encode,
// 12s loop). Sizing/aspect is governed by the parent wrapper in Kit.tsx
// — KitCameraVideo just fills its container with object-cover.
export const KIT_CAMERA_VIDEO = {
  src: '/videos/kit-camera.mp4',
} as const

// Services scene (Scene 06) -----------------------------------------------
export const SERVICES_TITLE = 'SERVICES'

// --- Phase 7: Inquire scene + contact form ------------------------------
// Scene number stays 08 (locked scene order); ships in Phase 7 because
// Inquire has no Sanity dependencies and a Formspree-only flow is simpler
// to land before the moderation/Turnstile work in Phase 8 (Words/Reviews).

export const INQUIRE_TITLE: readonly string[] = ['START A', 'CONVERSATION.'] as const

export const INQUIRE_BODY =
  'Tell us about your project. We respond within 24 hours, usually faster.'

// Contact list order: email → location → availability → Instagram. Order
// is intentional — the email is the action, the geography signals scope,
// availability removes a common objection, and Instagram is the warm-pool
// fallback for visitors who'd rather lurk than email. Mockup ordered
// Instagram second; we move it to last so the email lead doesn't compete
// with social proof in the most prominent slot.
export const INQUIRE_CONTACT_ITEMS: readonly ContactItem[] = [
  { icon: 'arrow', value: 'jackltd23@gmail.com' },
  { icon: 'arrow', value: 'Trinidad & Tobago' },
  { icon: 'arrow', value: 'Available for travel' },
  {
    icon: 'instagram',
    value: '@jackvisuals23 on Instagram',
    href: 'https://www.instagram.com/jackvisuals23',
  },
]

// Project-type pills. Vocabulary intentionally decoupled from Sanity
// service titles — these are inquiry-bucket labels, not catalog labels.
// Default selection is the first entry; clicking the active pill is a
// no-op so projectType is always defined.
export const INQUIRE_PROJECT_TYPES = [
  'Brand Films',
  'Event Coverage',
  'Drone Cinematography',
  'Music Videos',
  'Other',
] as const

export type InquireProjectType = (typeof INQUIRE_PROJECT_TYPES)[number]

// Form chrome copy. Header line is mono-prefixed to match the cinema-tech
// motif; the right-hand annotation reassures the visitor that the
// submission isn't going into a void.
export const INQUIRE_FORM_HEADER_LEFT = '// NEW_INQUIRY.FORM'
export const INQUIRE_FORM_HEADER_RIGHT = 'SECURE · FORMSPREE'
export const INQUIRE_FORM_FOOT_META = 'RESPONSE WITHIN 24H'

export const INQUIRE_SUBMIT_LABEL = 'Send inquiry →'
export const INQUIRE_SUBMIT_LABEL_SENDING = 'Sending...'

export const INQUIRE_SUCCESS_HEADER = '// INQUIRY_RECEIVED'
export const INQUIRE_SUCCESS_BODY =
  'Your message is in. Nathan responds personally, usually within 24 hours.'

export const INQUIRE_ERROR_MESSAGE =
  'Something went wrong. Email jackltd23@gmail.com directly or try again.'

// Honeypot field name. Hidden from real users via off-screen positioning;
// any non-empty value at submit time is a bot decoy and the submission is
// silently dropped (UI shows success to discourage retries).
export const INQUIRE_HONEYPOT_FIELD = 'website'

// --- Phase 8: Words From Set + /reviews + /leave-review --------------------

// Homepage carousel scene (Scene 07). Locked literal copy below; edits go
// through DESIGN-GUIDELINES change log.
export const WORDS_TITLE: readonly string[] = ['WORDS', 'FROM SET'] as const
export const WORDS_EYEBROW_NUMBER = '07'
export const WORDS_EYEBROW_LABEL = 'WHAT CLIENTS SAY'

// Auto-advance cadence for the review carousel. 7s gives a long-enough
// dwell to read a 280-character pull quote at typical reading speed.
// After any user interaction (dot click), advance pauses and resumes
// after RESUME_AFTER_MS so the visitor isn't fighting the timer.
export const WORDS_AUTO_ADVANCE_MS = 7000
export const WORDS_RESUME_AFTER_MS = 30000

// Cap the homepage carousel at 5 most recent. Full archive is on /reviews.
export const WORDS_HOMEPAGE_LIMIT = 5

// Carousel exit-point CTA. Mirrors FEATURED_VIEW_ALL_* shape — locked
// literal copy + locked href so the same constants drive the link.
export const WORDS_SEE_ALL_LABEL = 'SEE ALL REVIEWS →'
export const WORDS_SEE_ALL_HREF = '/reviews'

// /reviews archive page (Scene-adjacent, lighter-dark palette per the
// 2026-05-01 change log entry).
export const REVIEWS_PAGE_TITLE: readonly string[] = ['WORDS', 'FROM EVERY SET.'] as const
export const REVIEWS_PAGE_EYEBROW = 'COMPLETE REVIEWS'
export const REVIEWS_PAGE_BODY =
  'Real responses from real shoots. Filter by project type.'
export const REVIEWS_EMPTY_FOR_CATEGORY =
  'No reviews in this category yet. Try another filter.'
export const REVIEWS_EMPTY_ALL = 'Reviews coming soon.'

// /leave-review submission page. Verb-based URL so it doesn't collide
// with the /reviews archive in URL space.
export const LEAVE_REVIEW_TITLE: readonly string[] = ['LEAVE', 'A REVIEW.'] as const
export const LEAVE_REVIEW_EYEBROW = 'SHARE YOUR EXPERIENCE'
export const LEAVE_REVIEW_BODY =
  'Worked with Nathan on a shoot? Tell others what to expect. Reviews go live after a quick check.'

// Filter pill vocabulary for /reviews. "All" prepended to the Inquire
// project-type vocab; remaining values come from INQUIRE_PROJECT_TYPES so
// the two surfaces stay coupled — see types.ts ReviewProjectType alias.
export const REVIEW_FILTER_CATEGORIES = [
  'All',
  ...INQUIRE_PROJECT_TYPES,
] as const

export type ReviewFilterCategory = (typeof REVIEW_FILTER_CATEGORIES)[number]

// LeaveReviewForm chrome. Mirrors INQUIRE_FORM_HEADER_* shape.
export const LEAVE_REVIEW_FORM_HEADER_LEFT = '// NEW_REVIEW.FORM'
export const LEAVE_REVIEW_FORM_HEADER_RIGHT = 'SECURE · TURNSTILE'
export const LEAVE_REVIEW_FORM_FOOT_META = 'MODERATED · 24-48H'
export const LEAVE_REVIEW_SUBMIT_LABEL = 'Submit review →'
export const LEAVE_REVIEW_SUBMIT_LABEL_SENDING = 'Submitting...'
export const LEAVE_REVIEW_SUCCESS_HEADER = '// REVIEW_RECEIVED'
export const LEAVE_REVIEW_SUCCESS_BODY =
  'Your review is in. Nathan reviews each submission personally and approves them within a day or two.'
export const LEAVE_REVIEW_ERROR_MESSAGE =
  "Something went wrong. We didn't save your review. Try again, or email jackltd23@gmail.com directly."

// Field-level helper text. The brand field is the most-likely-to-confuse
// field — its purpose (logo lookup) isn't obvious without explanation.
// The email helper explicitly states the privacy treatment so the visitor
// has zero ambiguity about whether their email will appear on the site.
export const LEAVE_REVIEW_BRAND_HELPER =
  "Just the brand name. We'll show the logo if we've worked with them."

export const LEAVE_REVIEW_EMAIL_HELPER =
  'Never displayed publicly. Only used if Nathan needs to verify your review.'

// Max review length matches the schema validation (Rule.required().max(280))
// and the carousel's pull-quote sizing budget. Counter shown in the form.
export const LEAVE_REVIEW_MAX_LENGTH = 280

// Known Trusted By logo slugs. Source of truth is /public/images/trusted-by/
// — keep this list synced when Nathan adds a brand. getBrandLogoSlug()
// uses this to gate the logo lookup so we never render a broken-image
// icon for an unknown brand.
export const TRUSTED_BY_LOGO_SLUGS: readonly string[] = [
  'cantine-maschio',
  'diplomatico',
  'gin-mare',
  'grey-goose',
  'jp-chenet',
  'patron',
  'tribe',
] as const
