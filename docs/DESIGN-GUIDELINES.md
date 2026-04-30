# Design Guidelines — Jack Visuals 2.0

> Visual and UX decisions for this project. Reference this before building any UI component.
> Hand this to Claude Code alongside CLAUDE.md so it builds to spec, not defaults.
> Source: `docs/mockup.html` (v2). Repo: `jonel-richardson/JV23`.

## Brand / Visual Direction

**Mood:** Cinematic editorial meets cinema-tech control room. The site reads like a director's monitor, not a marketing page. Frames are timecoded, scenes are labeled, and every element acknowledges the production craft behind the work. Premium without being precious.

**One-liner:** "Director's monitor, not a marketing page."

**References:**
- The mockup itself (`docs/mockup.html`) — single source of truth
- Aesthetic adjacent: A24 film studio sites, Apple's product launch microsites, professional camera UI (Blackmagic, ARRI)

**Anti-patterns (do not build like):**
- Generic creative agency templates (Squarespace defaults)
- Colorful, playful portfolio sites
- Wedding photographer templates (rose tones, script fonts)

## Colors

All values defined as CSS variables in `globals.css`. No hardcoded hex in components.

| Role | Value | Usage |
|---|---|---|
| Background — base | `#050505` | Page background, primary surface |
| Background — secondary | `#000000` | Hero, alternating dark scenes (Featured Work, Kit, Inquire) |
| Surface raised | `#141414` | Subtle scene-bottom borders |
| Surface card | `#1a1a1a` | Card backgrounds, work thumbnails (loaded state) |
| Surface card raised | `#2a2a2a` | Card hover states, button borders |
| Border | `#333333` | Default border color for buttons, outlined elements |
| Text — primary | `#ffffff` | Headlines, primary text |
| Text — body | `#aaaaaa` | Body copy, paragraph text |
| Text — muted | `#888888` | Stat labels, secondary metadata |
| Text — quiet | `#666666` | Mono labels (`// XX — SECTION`), tertiary text |
| Text — barely visible | `#2a2a2a` | Scene meta corner labels (`SCENE_01 · HERO`) |
| Accent — primary | `#0066ff` | Primary CTAs, "brand" category tag, hero glow, active states |
| Accent — secondary | `#00ffa3` | "Live" indicators, REC dot, toolbar status, project name highlight in reviews |

**Color rules:**
- The primary accent (`#0066ff`) carries the action — use it for the Inquire CTA, primary buttons, and the "brand" category tag only
- The secondary accent (`#00ffa3`) is reserved for "live" or "alive" states — REC dot, "// PROJECT:" inline highlight in reviews, status indicators. Never use it for buttons or large surface areas
- Scene meta labels (`SCENE_01 · HERO`) must use `#2a2a2a` — almost invisible on purpose, decorative texture
- Body text never goes below `#aaa` for accessibility (WCAG AA at 14px+)

## Typography

Three families. No more, no less.

| Family | Role | Weights | Loading |
|---|---|---|---|
| **Bebas Neue** | Display, hero, section titles | 400 | `next/font/google` with `display: swap`, preloaded for hero |
| **Inter** | Body text, nav, buttons | 400, 500 | `next/font/google` with `display: swap` |
| **JetBrains Mono** | Scene meta, labels, stats, timecode UI | 400, 500 | `next/font/google` with `display: swap` |

| Role | Font | Weight | Size (mobile → desktop) | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Display / Hero | Bebas Neue | 400 | clamp(40px, 13cqw, 56px) → clamp(96px, 10cqw, 132px) | 0.02em | 0.92 |
| Section title | Bebas Neue | 400 | 48px → 96px | 0.02em | 0.92 |
| Body | Inter | 400 | 15px → 17px | 0 | 1.65 |
| Nav links | Inter | 400 | 13px | 0 | 1 |
| CTA button | Inter | 500 | 14px | 0 | 1 |
| Mono label (`// XX — SECTION`) | JetBrains Mono | 400 | 10px | 0.20em | 1 |
| Mono — stat label | JetBrains Mono | 400 | 9px | 0.15em | 1 |
| Mono — stat value | JetBrains Mono | 400 | 12px | 0 | 1 |
| Scene meta (corner) | JetBrains Mono | 400 | 8px → 9px | 0.20em | 1 |

**Typography rules:**
- Display headlines always Bebas Neue, always uppercase via the source content (don't text-transform), always tight line-height (0.92)
- Mono labels are not optional decoration — they are the system's voice. Every scene has at least one (`// 01 — HERO`, `// PROJECT:`, etc.)
- Never use Bebas Neue for body or nav. It's a display font, not a workhorse.
- Letter-spacing on mono is critical — collapse it and the cinema-tech aesthetic dies

## Spacing System

Use Tailwind's default scale (4px base unit). Container queries are used inside the frame so scenes adapt to the viewport width, not the device width.

**Scene padding (standard scenes, non-Hero):** asymmetric vertical — lighter top so content sits closer to the nav, full bottom so scene-to-scene transitions retain breathing room.
- Mobile: `pt-10 pb-15 px-6` (40px top / 60px bottom / 24px sides)
- Tablet (`@container frame (min-width: 768px)`): `pt-14 pb-20 px-8` (56px / 80px / 32px)
- Desktop (`@container frame (min-width: 1024px)`): `pt-16 pb-24 px-12` (64px / 96px / 48px)

**Hero gets extra (asymmetric):** top padding aligns with standard scenes for consistent rhythm; bottom padding stays larger for breathing room before the next scene. Hero's distinctness comes from the drone illustration, glow effect, `min-h-screen` / `min-h-[88vh]`, and scene-meta label — top padding doesn't need to carry that weight.
- Mobile (default): `pt-10 pb-20 px-6` (40px top / 80px bottom / 24px sides), `min-h-screen` (100vh)
- Tablet (`@container frame (min-width: 768px)`): `pt-14 pb-30 px-8` (56px / 120px / 32px), auto-height (`min-h-0` overrides the mobile `min-h-screen`)
- Desktop (`@container frame (min-width: 1024px)`): `pt-16 pb-[140px] px-12` (64px / 140px / 48px), `min-h-[88vh]`

**Element gaps:**
- Between label and headline: `mb-5` (20px)
- Between headline and body: `mb-5` to `mb-7` (20-28px)
- Between body and CTAs: `mb-9` (36px)
- Stats grid gap: `gap-7` (28px) mobile, `gap-12` (48px) desktop

**Container queries:** Sections live inside a `.frame` container. Use container queries (`@container frame`) instead of viewport media queries for section-internal layout. This is non-negotiable — it makes the design portable and handles the iframe-style preview correctly.

## Component Patterns

### Buttons

**Primary** (e.g., "Start a project"):
- Background `#0066ff`, white text, 8px border-radius
- Padding: `py-3.5 px-5.5` mobile (14px / 22px), `py-3.5 px-6` desktop (13px / 24px)
- Font: Inter 500, 14px
- No hover lift, no shadow — flat, intentional

**Secondary** (e.g., "View work →"):
- Transparent background, `#333` border (0.5px), white text, 8px border-radius
- Same padding as primary
- Hover: border brightens to `#555`

**Mobile button stack:** vertical column with `gap-2.5` (10px). Desktop: horizontal row with `gap-3` (12px).

### Scene Meta Label (top-right corner of every scene)

```html
<div class="scene-meta">SCENE_01 · HERO</div>
```

- Position: absolute, top-3 right-4 mobile, top-4 right-5 desktop
- Font: JetBrains Mono, 8px mobile / 9px desktop
- Color: `#2a2a2a` (intentionally near-invisible)
- Letter-spacing: 0.20em
- Decorative only. Never make it tappable, never animate it.

### Section Eyebrow (`// XX — SECTION NAME`)

```html
<div class="label">// 01 — TRINIDAD &amp; TOBAGO</div>
```

- Font: JetBrains Mono 400, 10px, color `#666`
- Letter-spacing: 0.20em
- Always paired with the section's display headline below it
- The number portion can use `.num` class for slightly brighter color (`#888`)

### Cards

**Project card (Featured Work / Work page):**
- Background: `#050505` default → `#1a1a1a` when video loaded state
- Border: 0.5px solid `#1a1a1a`, hover → `rgba(0,102,255,0.5)` (blue glow)
- Border-radius: 8px
- Padding: 16px mobile, 20px desktop
- Tag (category) sits at top-left in mono, color-coded:
  - `.tag.brand` → `#0066ff`
  - `.tag.event` → `#888`
  - `.tag.music` → `#888`
  - `.tag.drone` → `#888`
  - `.tag.commercial` → `#888`

Only `brand` projects get the blue accent. Everything else is muted gray. This is a deliberate hierarchy — brand work is the highest-margin, most-pursued category.

### REC / Timecode UI (About portrait card)

The portrait card is framed as a director's monitor:
- Top-left label: `// SHOT 01 · PORTRAIT` in mono
- Top-right: red `#00ffa3` dot + "REC" text in mono
- Optional gradient overlay fading bottom edge to dark for text legibility
- Border: 0.5px solid `#1a1a1a`

This is one of the strongest aesthetic motifs. Reuse the same pattern (REC indicator + corner timecode) for any other "live" element — never introduce a different "live" treatment.

### Words / Reviews Card

```html
<article class="words-quote is-active">
  <div class="words-mark">"</div>           <!-- Oversized opening quote -->
  <p class="words-text">[Review text]</p>
  <div class="words-attr">
    <div class="who">[Client Name]</div>
    <div class="role">[Title · Company]</div>
    <div class="project">// PROJECT: <span class="accent">[PROJECT NAME]</span> · [YEAR]</div>
  </div>
</article>
```

- One review visible at a time, others stack hidden
- Carousel controls: numbered counter (`01 / 03`), progress bar, dot navigation
- The `// PROJECT:` line uses mono, project name uses accent green `#00ffa3`
- Pull quote uses Bebas Neue for the opening `"` mark (oversized), Inter for the review text body

### Trusted By (Logo Grid)

- Logos rendered inside fixed-aspect containers (`aspect-ratio: 16/9`)
- Container background: `#0a0a0a`, border 0.5px `#1a1a1a`
- Logo image: `object-fit: contain`, max 75% of container width
- Grayscale by default (`filter: grayscale(1) brightness(0.85)`), full color on hover
- Grid: 2 cols mobile, 3 cols tablet, 4-5 cols desktop

### Forms (Inquire + Review submission)

- Input background: transparent
- Border: 0.5px solid `#333` bottom only (input lines, not boxes)
- Padding: `py-3 px-0` (12px vertical, no horizontal — cinema-form aesthetic)
- Focus state: border color shifts to `#0066ff`
- Label: mono 10px `#666`, sits above input with `mb-2` (8px)
- Error state: border `#ff4d4d`, error text mono 11px below input

## Section Inventory (8 scenes, locked order)

| # | Scene | Background | Sanity-driven? | Notes |
|---|---|---|---|---|
| 01 | Hero | `#000` | Stats hardcoded | 100vh min-height. Drone image floating top-right. Blue glow bottom-left. |
| 02 | About | `#050505` | Bio + portrait static | Two-column desktop, single-column mobile. REC card on portrait. |
| 03 | Featured Work | `#000` | Yes (3 featured projects) | 3-column grid desktop, horizontal scroll mobile. Category tags color-coded. |
| 04 | Trusted By | `#050505` | Yes (logos) | Grid of client logos. Grayscale → color on hover. |
| 05 | Kit | `#000` | Yes (kit items) | "THE GEAR BEHIND THE SHOTS." Equipment grid. |
| 06 | Services | `#050505` | Yes (services) | List or grid of service offerings. |
| 07 | Words | `#050505` | Yes (approved reviews only) | Carousel of client testimonials. |
| 08 | Inquire | `#000` | No (Formspree only) | Two-column desktop. Form + footer. |

**Background alternation rule:** Scenes alternate between `#000` and `#050505` for visual rhythm. Do not change this without updating this doc.

### Scene-Anchor Pattern

Each scene renders with an HTML `id` attribute matching its nav target slug. The nav anchors point at these ids; in-page CTAs that navigate to a separate route use `<Link href="/route">` instead.

| Scene | `id` | Reached via |
|---|---|---|
| Hero | `top` | Logo click (Phase 2) |
| Featured Work | `work` | Nav "Work" anchor link (Phase 2) |
| About | `about` | Nav "About" anchor link (Phase 2) |
| Inquire | `inquire` | Nav "Inquire" CTA + Hero "Start a project" (Phase 2/3) |

`/work` is a separate route (the full archive) reached via the Hero "View work →" CTA and Featured Work's "All Projects →" link. Anchor links scroll within the homepage; route links navigate away. Two distinct paths intentionally — homepage teaser vs full archive.

When adding a new scene, give it an id matching its nav slug and document the entry here.

## Responsive Breakpoints

Container queries on `.frame`, not viewport media queries. The frame is the container, scenes respond to the frame's width.

| Breakpoint | Container query | Layout change |
|---|---|---|
| Mobile (default) | `< 768px` | Single column, vertical button stacks, 2-col logo grid, horizontal-scroll featured work. Hero is `min-h-screen`. |
| Tablet | `@container frame (min-width: 768px)` | 2-col about, 3-col featured grid, 3-col logos, horizontal buttons. Hero auto-heights (overrides mobile `min-h-screen`). |
| Desktop | `@container frame (min-width: 1024px)` | Full padding, larger type, 4-5 col logos, sticky about column. Hero caps at `min-h-[88vh]`. |

**Frame max-width cap:** The `.frame` element is capped at `max-width: 1280px` and centered with `mx-auto`. On viewports >1280px, content renders in a centered column with letterbox space on the sides — this matches the cinematic aesthetic and ensures every scene renders at its tested width regardless of viewport.

Viewport media queries are still used for things outside the frame (nav, mobile menu).

## Sanity Schemas (Final, Locked)

These are the schemas that will be created in Phase 1. Schema files live in `sanity/schemas/`.

### project
```js
{
  name: 'project',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string',  validation: Rule => Rule.required() },
    { name: 'category',    type: 'string',  options: { list: ['Brand', 'Event', 'Music', 'Drone', 'Commercial'] }, validation: Rule => Rule.required() },
    { name: 'videoUrl',    type: 'url',     description: 'Vimeo or YouTube URL — embed component auto-detects platform' },
    { name: 'description', type: 'text' },
    { name: 'date',        type: 'date',    validation: Rule => Rule.required() },
    { name: 'featured',    type: 'boolean', initialValue: false, description: 'Show on homepage. Max 3 enforced.' }
  ]
}
```

### service
```js
{
  name: 'service',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string', validation: Rule => Rule.required() },
    { name: 'description', type: 'text' },
    { name: 'order',       type: 'number', initialValue: 0, description: 'Lower numbers appear first' }
  ]
}
```

### trustedBy
```js
{
  name: 'trustedBy',
  type: 'document',
  fields: [
    { name: 'name',  type: 'string', validation: Rule => Rule.required(), description: 'Used as alt text and screen reader label' },
    { name: 'logo',  type: 'image',  options: { hotspot: true }, validation: Rule => Rule.required() },
    { name: 'order', type: 'number', initialValue: 0, description: 'Lower numbers appear first' }
  ]
}
```

### kit
```js
{
  name: 'kit',
  type: 'document',
  fields: [
    { name: 'name',        type: 'string', validation: Rule => Rule.required() },
    { name: 'description', type: 'text' },
    { name: 'image',       type: 'image',  options: { hotspot: true } },
    { name: 'order',       type: 'number', initialValue: 0 }
  ]
}
```

### review
```js
{
  name: 'review',
  type: 'document',
  fields: [
    { name: 'clientName',    type: 'string', validation: Rule => Rule.required() },
    { name: 'role',          type: 'string', description: 'Title · Company, e.g. "Brand Director · Grey Goose Caribbean"' },
    { name: 'project',       type: 'reference', to: [{ type: 'project' }], validation: Rule => Rule.required(), description: 'Must be a published project' },
    { name: 'reviewText',    type: 'text', validation: Rule => Rule.required().max(280), description: 'Max 280 characters — keep it pull-quote sized' },
    { name: 'email',         type: 'string', description: 'For verification only. Never displayed.' },
    { name: 'submittedAt',   type: 'datetime', readOnly: true },
    { name: 'approved',      type: 'boolean', initialValue: false, description: 'Toggle ON to publish on the site.' }
  ]
}
```

### GROQ queries
```js
// Featured projects — homepage
*[_type == "project" && featured == true] | order(date desc)[0...3]

// All projects — /work page
*[_type == "project"] | order(date desc)

// Services — ordered
*[_type == "service"] | order(order asc)

// Trusted By — ordered, with logo URL
*[_type == "trustedBy"] | order(order asc) { name, "logoUrl": logo.asset->url }

// Kit — ordered
*[_type == "kit"] | order(order asc)

// Approved reviews only — homepage Words scene
*[_type == "review" && approved == true] | order(submittedAt desc) { clientName, role, reviewText, "project": project->{ title, date } }

// Project list for review form dropdown — published projects only
*[_type == "project"] | order(date desc) { _id, title, date }
```

## Accessibility Baseline

- Color contrast minimum 4.5:1 for body text (white on `#050505` = 19:1 ✓; `#aaa` on `#050505` = 8.6:1 ✓; `#666` is below threshold but used for decorative mono labels only, never primary content)
- All interactive elements keyboard-accessible
- Logo images get descriptive alt text from the `name` field on the trustedBy schema
- Review carousel: arrow keys for prev/next, dot buttons keyboard-focusable, current quote announced via `aria-live="polite"`
- Focus rings visible on tab navigation — use `outline: 2px solid #0066ff; outline-offset: 2px`
- `prefers-reduced-motion` respected on all scroll animations and the camera scan-wipe

## Camera Animation Decision Gate (Phase 8)

The camera scan-wipe animation from v1 is being evaluated against the new aesthetic. Decision criteria:

**Keep the animation if:**
- It feels like part of the cinema-tech motif (REC indicators, scene meta, etc.)
- It enhances the About → Featured Work transition without slowing perceived load
- Mobile performance is acceptable (60fps on iPhone 14)

**Drop in favor of static photo if:**
- It feels like leftover ornament from the v1 Apple aesthetic
- It conflicts with the new design language
- Mobile performance suffers

The decision is logged in the change log below regardless of outcome.

## Change Log

| Date | What Changed | Old Value | New Value | Why |
|---|---|---|---|---|
| 2026-04-29 | Project initialized | — | DESIGN-GUIDELINES v1.0 created | Redesign of Jack Visuals site |
| 2026-04-29 | Color system | Single accent `#2997ff` (v1 Apple-inspired) | Dual accent: `#0066ff` primary, `#00ffa3` secondary | New cinema-tech aesthetic, "live" states need their own color |
| 2026-04-29 | Type stack | Bebas Neue + DM Sans | Bebas Neue + Inter + JetBrains Mono | Mono is required for scene meta, label, and stat treatments. Inter replaces DM Sans for sharper rendering at small sizes. |
| 2026-04-29 | Section count | 7 (Hero, About, Featured, Trusted, Kit, Services, Inquire) | 8 — Words scene added between Services and Inquire | Client reviews added to scope (PRD v1.1) |
| 2026-04-29 | Featured Work category | Free string | Fixed enum (Brand, Event, Music, Drone, Commercial) | Color-coded category tags require a known set |
| 2026-04-29 | Trusted By logos | Text-only client names | Logo image upload | Visual credibility, matches new design (PRD v1.1) |
| 2026-04-29 | Kit section | Hardcoded in component | Sanity document type | Nathan needs to add gear over time (PRD v1.1) |
| 2026-04-29 | Reviews | None | New `review` schema with auto-publish + approval gate | Social proof scene added to design |
| 2026-04-29 | Video field | `vimeoUrl` | `videoUrl` (platform-agnostic) | Hosting decision deferred to Phase 9, schema does not change either way |
| 2026-04-29 | Layout system | Viewport media queries | Container queries on `.frame` | Mockup uses container queries; portable, iframe-safe |
| 2026-04-29 | Hero drone asset | `public/images/drone-hero.png` (planned PNG) | Inline SVG component (`src/components/scenes/HeroDrone.tsx`) | Mockup ships the drone as detailed inline SVG — no PNG export exists, and inline SVG matches the cinema-tech motif while keeping the asset payload zero. Accent fills (`#0066ff`, `#00ffa3`) are raw hex per the SVG fill-attribute compatibility constraint, mapped to `--color-accent-primary` and `--color-accent-secondary` in inline comments. |
| 2026-04-29 | Frame max-width | None (frame stretched to viewport width) | `max-width: 1280px` on desktop, centered with `mx-auto` | The mockup specifies `vp-desktop max-width: 1280px`. Initial Phase 1 scaffold dropped this cap. Without it, all scenes drift proportionally at viewports >1280px. Restoring the cap means every scene renders at the design's tested width regardless of viewport size. Letterbox space at >1280px matches cinematic aesthetic. |
| 2026-04-29 | Hero breakpoint structure | 2 steps (mobile + 1024) | 3 steps (mobile + 768 + 1024) | Phase 3 implementation collapsed three mockup breakpoints to two. The intermediate 768px values aren't just "halfway" between mobile and desktop — they're tuned for the 768–1023 range specifically (tablet/small laptop). Restoring all three steps so layout matches design at every target device size. |
| 2026-04-29 | Hero min-height | 100vh at all sizes | 100vh mobile/tablet, 88vh at 1024+ | The mockup uses 88vh on desktop to leave the bottom edge ambiguous (visual cue that more content exists below the fold). 100vh on desktop creates rigid framing that doesn't match the cinematic aesthetic. |
| 2026-04-29 | Hero min-height (tablet) | `min-h-screen` at all sizes < 1024 | `min-h-screen` mobile, auto-height (`min-h-0`) at 768+, `88vh` at 1024+ | Tablet at 100vh creates excessive empty space below content. The drone is absolutely positioned from `top`, so vertical centering of content via `justify-center` created a visible gap between drone and content at narrower-but-tall viewports (820×1180). Auto-height at tablet eliminates the gap and matches the design's tested ranges. |
| 2026-04-30 | Featured projects max-3 enforcement | Documented in schema description only ("Max 3 enforced") | Async Rule.custom() validator on `featured` field that counts other published+draft featured projects and rejects toggle when count ≥ 3 | DESIGN-GUIDELINES + NATHAN_GUIDE both stated max 3 featured but the schema only had the rule in description text. Empty validator allowed silent over-feature in Studio. Validator added now (early — originally Phase 8 acceptance criterion) so Phase 4's Featured Work query doesn't risk returning more than 3 results from Sanity. |
| 2026-04-30 | Scene-anchor pattern documented | Pattern existed implicitly (Hero already had `id="top"`) but wasn't written down. | Documented as standard: each scene renders with an HTML `id` matching its nav target slug. Anchor links scroll within homepage; route links navigate away. | Phase 4 introduces FeaturedWork with `id="work"` matching Phase 2's nav link. Codifying the pattern now so future scenes (About `id="about"`, Inquire `id="inquire"`) follow the same rule without re-deciding each time. |
| 2026-04-30 | /work copy refinement | Eyebrow "// COMPLETE PORTFOLIO" + title "ALL WORK" | Eyebrow "// PORTFOLIO" + title "THE WORK" | "Complete" was filler; "Portfolio" alone is cleaner. "The Work" reads more editorial than "All Work" — definite article frames it as a body of work rather than a filtered category. Better fits cinema-tech aesthetic. |
| 2026-04-30 | Standard scene top padding | py-15 mobile / py-20 tablet / py-24 desktop (symmetric vertical) | pt-10 / pt-14 / pt-16 top, pb-15 / pb-20 / pb-24 bottom (asymmetric) | Symmetric vertical padding pushed scene content too far below the nav on every standard scene at every viewport. Top padding tightened across all three breakpoints. Bottom padding kept unchanged so scene-to-scene transitions retain breathing room. Hero scene unaffected — its bigger pattern is documented separately. |
| 2026-04-30 | Hero scene top padding | Symmetric with bottom (py-20 / py-30 / py-[140px]) | Asymmetric (pt-10 pb-20 / pt-14 pb-30 / pt-16 pb-[140px]) | After tightening standard scene top padding, Hero felt disproportionately top-heavy compared to other scenes. Aligning Hero's top padding with standard scenes (pt-10/pt-14/pt-16) restores consistent visual rhythm. Hero's distinctness still comes from drone illustration, glow effect, 88vh min-height, and scene-meta label — top padding doesn't need to carry that weight. |

> After logging a change here, update the relevant section above so the current spec is always accurate.

---

*End of DESIGN-GUIDELINES — v1.0*
