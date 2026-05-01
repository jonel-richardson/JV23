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

**Hero gets extra (asymmetric):** top padding aligns with standard scenes for consistent rhythm; bottom padding stays larger on tablet/desktop for breathing room before the next scene. Mobile bottom padding is tighter (pb-12) so the Hero→About transition doesn't sit on a dead band — tablet/desktop don't need this trim because the 88vh min-height gives content vertical room to spread into. Hero's distinctness comes from the drone illustration, glow effect, `min-h-screen` / `min-h-[88vh]`, and scene-meta label — top padding doesn't need to carry that weight.
- Mobile (default): `pt-10 pb-12 px-6` (40px top / 48px bottom / 24px sides), `min-h-screen` (100vh)
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

The portrait card is framed as a director's monitor over Nathan's photo. The photo is the persistent visual content; the viewfinder overlays are cinematic framing layered on top. The portrait card stands as the final v2 visual — Phase 9's camera-pan animation moved to the Kit scene per the 2026-04-30 change log.

- Image: `next/image` with `fill`, `object-cover object-top`, `priority` (above-the-fold on desktop). Card background gradient (`#0a0a0a` → `#050505`) shows briefly while the image loads.
- Top-left label: `// SHOT 01 · PORTRAIT` in mono `#00ffa3`
- Top-right: pulsing `#00ffa3` dot (custom `pulse-rec` keyframe, 1.5s) + `REC` text in mono `#00ffa3`. Pulse wrapped in `motion-safe:` so reduced-motion users see a static dot.
- Glow: radial gradient at 30% 30%, `rgba(0,102,255,0.18)` → transparent at 65%, layered above the image (z-10) for atmosphere
- Fade: bottom-half linear gradient transparent → `#050505`, layered above the image (z-10) for cinematic gravitas
- Corner brackets: 14×14px, 1px solid `#333`, two-edge L-shapes at each card corner (z-20)
- Border: 0.5px solid `#1a1a1a`, rounded 12px, aspect 4/5

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

### Trusted By (Marquee)

- Infinite horizontal scroll via the shared `<Marquee>` primitive (see Marquee pattern below)
- 30s cycle duration — paced so logos can be recognized before leaving the visible window
- Per logo: fixed height 28px mobile / 36px desktop, width auto, `flex-shrink-0`
- Filter chain: `brightness-0 invert opacity-60` — converts every logo (regardless of native palette) to uniform white-on-dark; opacity 1 on hover
- 4px round separator dot (`#2a2a2a`) between every logo, mx-6 mobile / mx-8 desktop
- Edge fades: 80px mobile / 120px desktop, gradient from `var(--color-bg-base)` to transparent on each side
- Source: `<img src="/images/trusted-by/{slug}.png" alt={brand.name} loading="lazy">` — plain `<img>`, not Next.js `<Image>`. Slug from Sanity must match the local filename.
- No footer or header annotation — the marquee speaks for itself.

### Marquee (reusable primitive)

Used by Trusted By and Services. Shape:
- Track div with `flex w-max`, `motion-safe:animate-scroll-marquee`, `hover:[animation-play-state:paused]`
- Animation token `--animate-scroll-marquee` registered in `@theme` with default 30s; per-instance duration via inline `style={{ animationDuration }}`
- Children rendered twice in sequence so the duplicate set is on-screen when the first set scrolls fully off-left — keyframe shifts 0 → -50% for a seamless loop with no jump
- Second child set marked `aria-hidden="true"` so screen readers announce the content once
- Two pairs of edge-fade overlays (mobile + desktop), toggled via container query, so prop-driven px widths can vary per breakpoint without a CSS variable dance
- `prefers-reduced-motion`: `motion-safe:` prefix skips the animation; track sits at translateX(0) showing the original child set static

### Loadout (Kit gear list)

Terminal-styled card. The kit reads as a manifest, not a feature card.
- Container: `bg-[#0a0a0a]`, border 0.5px `#1a1a1a`, rounded-2xl, padding 24px mobile / 32px desktop
- Header row (mb-5): `// LOADOUT.TXT` in mono 11px `#00ffa3` (left) + version stamp `v2.4 · 2026` in mono 11px `#666` (right)
- Item rows: `flex justify-between py-3`, border-bottom 0.5px `#1a1a1a` (none on last row)
- Left of row: `category` in mono 11px `#666`, letter-spacing 0.15em
- Right of row: `item` in mono 13px `#fff` (or `#00ffa3` if `accent: true`)

### Service Card

One card per offering in the Services marquee.
- Container: 280px wide, min-height 220px, gradient `#1a1a1a` → `#0a0a0a`, border 0.5px `#2a2a2a`, rounded-2xl, padding 24px
- Hover: border `#0066ff`, `-translate-y-0.5`, transition 250ms ease-out
- Top: number badge `01` in mono 11px `#0066ff`. No arrow, no link affordance — cards aren't clickable until service detail pages exist (post-v2).
- Title: Bebas Neue 24px, line-height 1.0, letter-spacing 0.02em, uppercase
- Body: Inter 14px `#aaa`, line-height 1.5, mt-3
- Numbers derived from sort position (`String(idx + 1).padStart(2, '0')`), not stored on the schema

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
| 04 | Trusted By | `#050505` | Yes (metadata only — logos local) | Infinite-scroll marquee of brand logos (30s cycle). All logos rendered uniformly white-on-dark via `brightness-0 invert opacity-60`; opacity 1 on hover. Logo files live at `/public/images/trusted-by/{slug}.png`. |
| 05 | Kit | `#000` | Yes (kit items) | "THE GEAR BEHIND THE SHOTS." Dual composition driven by container queries. Order at every viewport: title → LOADOUT → 3 pills (Editorial-grade gear · Owned outright · Insured), pills as film-credit footer. **Mobile + Tablet (<1024px):** camera hero at top (full content width, h-[280px], object-cover) → title (centered) → LOADOUT → pills. Tablet uses the mobile composition because at narrow desktop widths the camera's right:12% offset would overlap the text column. **Desktop (1024px+):** camera floats absolutely on the right at z-0 (`top: 0, right: 12%, w: 320px, max-h: 400px` — top values intentionally above the geometric headline top so the camera's visual mass pairs with the headline; aspect-ratio overridden by the dual cap, video uses object-cover and crops ~89px from top + bottom of the source); title constrained to `max-w-[60%]` so it doesn't wrap under the camera; full-width terminal-styled `<Loadout>` at `relative z-10` so it covers the camera where they overlap (magazine editorial pattern, video keeps animating in the unhidden portion); pills below LOADOUT with `mt-8` flat at every breakpoint. Camera video replaces the original Phase 9 scroll-driven plan with a continuous HTML5 video loop (boomerang re-encoded for seamless loop). |
| 06 | Services | `#050505` | Yes (services) | Horizontal-scroll marquee of service cards (4 offerings, 40s cycle). Slower than Trusted By so card copy is readable. Numbers (01–04) derived from sort position, not stored. |
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
    { name: 'slug',  type: 'slug',   options: { source: 'name', maxLength: 96 }, validation: Rule => Rule.required(), description: 'Auto-generates from Name. Must match the PNG filename in /public/images/trusted-by/.' },
    { name: 'order', type: 'number', initialValue: 0, description: 'Lower numbers appear first' }
  ]
}
```

Brand logos live locally at `/public/images/trusted-by/{slug}.png`. Sanity stores only metadata. See NATHAN_GUIDE for the new-brand workflow.

### kit
```js
{
  name: 'kit',
  type: 'document',
  fields: [
    { name: 'category', type: 'string',  validation: Rule => Rule.required(), description: 'All-caps key shown left of the row, e.g. CAMERA, LENS, DRONE.' },
    { name: 'item',     type: 'string',  validation: Rule => Rule.required(), description: 'Gear name shown right of the row, e.g. Sony FX3.' },
    { name: 'accent',   type: 'boolean', initialValue: false, description: 'Highlight this item with the secondary accent color.' },
    { name: 'order',    type: 'number',  initialValue: 0 }
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

// Trusted By — ordered, slug unwrapped to flat string (logo file lives at /public/images/trusted-by/{slug}.png)
*[_type == "trustedBy"] | order(order asc) { _id, name, "slug": slug.current, order }

// Kit — ordered
*[_type == "kit"] | order(order asc) { _id, category, item, accent, order }

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

## Camera Animation Decision Gate (Resolved — Phase 6)

**Decision: KEEP**, but as a continuous HTML5 video loop rather than a 181-frame scroll-driven scene. Shipped in Phase 6 (not Phase 8/9 as originally planned).

The asset (`/public/videos/kit-camera.mp4`, ~6 sec, 416×752, ~1MB) auto-plays muted on a loop in the Kit scene's right column, opposite the title + body + pills. Reduced-motion users get the same `<video>` without autoplay/loop, so the browser shows the first frame natively — no separate poster image needed.

**Why a video loop instead of scroll-driven frames:**
- Same visual result with zero scroll-coupling complexity, no JavaScript scroll listener, no frame-by-frame asset
- Camera video sits beside the title + body, demonstrating "the gear, in use" rather than "the gear, on display" — the demonstrative purpose the change log called for
- Eliminates the Phase 9 camera-animation work entirely; Phase 9 becomes "video hosting decision + embed + SEO + intro animation" only

**Performance:** native `<video autoplay loop muted playsInline preload="metadata">` is GPU-decoded by the browser; iPhone 14 holds 60fps without scroll-listener overhead.

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
| 2026-04-30 | REC indicator pulse animation | Tailwind default `animate-pulse` (opacity 0.5 → 1 → 0.5, soft wash) | Custom `pulse-rec` keyframe (opacity 1 → 0.3 → 1, 1.5s ease-in-out) registered as `--animate-pulse-rec` in the @theme block of globals.css | Tailwind's default animate-pulse is tuned for skeleton loaders — its softer 0.5/1 range doesn't read as a deliberate cinema-tech "live" cue. The mockup specifies a sharper 1 → 0.3 → 1 fade so the REC dot looks like an active recording indicator, not a gentle wash. One custom keyframe is small overhead and identifies the REC pulse as part of the system's voice. Paired with motion-safe: modifier so prefers-reduced-motion shows a static dot. |
| 2026-04-30 | About portrait card content | Static cinema-tech card with placeholder copy "Camera intro animation reveals here." | Real photo of Nathan (`public/images/nathan-portrait.jpg`) filling the card with `object-top` anchoring, viewfinder-style overlays (corner brackets, REC indicator, top-left timecode, glow, fade) layered on top. No bottom info block. | Section title "MEET NATHAN." promises a person; visitors should actually see him. The viewfinder overlays serve as cinematic framing for the photo, not a replacement for it. The portrait card stands as the final v2 visual. Phase 9's camera intro animation moves to the Kit scene where it serves a demonstrative purpose (gear in use) rather than atmospheric purpose (cinematizing an already-cinematic photo). See dedicated change log entry on the animation move. |
| 2026-04-30 | Camera intro animation location | Phase 9 plan: scroll-driven camera-pan animation plays over Nathan's photo in About scene | Phase 9 plan: animation moves to Kit scene, plays over gear/production hero shot | The About photo (Nathan with camera) is already cinematic on its own, with viewfinder overlays providing cinema-tech framing. Adding scroll-driven motion on top would be three layers competing for attention. The camera-pan-viewfinder.mp4 source is named for and specifically evokes a viewfinder POV effect — that reads conceptually clean over gear (we see gear THROUGH the camera that uses it) rather than over a portrait (we see Nathan THROUGH a camera POV we don't physically have). Animation in Kit also serves portfolio purpose better — demonstrative (showing tools in use) rather than atmospheric (cinematizing what's already cinematic). |
| 2026-04-30 | Tailwind v4 content scanning | Default scan (all project files including Markdown) | Markdown excluded via `@source not "../../**/*.md"` in globals.css | Session logs and design docs reference Tailwind syntax as prose (e.g. literal `motion-safe:[animation:var(...)]`). Tailwind v4 picked these up as candidate classes and emitted malformed CSS rules that crashed the browser parser, blocking the Studio. Markdown should never drive emitted styles — explicitly excluded so future log entries can describe class shapes without breaking the build. |
| 2026-04-30 | REC dot animation class | `motion-safe:[animation:var(--animate-pulse-rec)]` (arbitrary-property syntax) | `motion-safe:animate-pulse-rec` (named utility from @theme token) | Tailwind v4 auto-generates `animate-X` utilities from `--animate-X` tokens registered in @theme. Named utility is the canonical form — cleaner, less brittle, and doesn't tempt content scanners to misparse the arbitrary-value variant. |
| 2026-04-30 | Kit schema | `name` (string) + `description` (text) + `image` (image) + `order` (number) | `category` (string, required) + `item` (string, required) + `accent` (boolean, default false) + `order` (number) | Phase 6 design renders kit as a terminal-styled loadout — one row per item with the category prefix on the left and item name on the right. The single `name` field couldn't carry the prefix/name split, and the `image` field was unused (loadout is text-only by design). Renamed `name` → `item` for clarity, added `category` and `accent`, dropped `description` and `image`. Field rename approved with explicit Rule 12 sign-off. |
| 2026-04-30 | TrustedBy schema | `name` (string) + `logo` (image upload) + `order` (number) | `name` (string) + `slug` (slug, source: name) + `order` (number) — image upload removed | Brand logos arrive in unpredictable formats and require real cleanup (transparent backgrounds, even sizing, sharp edges at small dimensions). Asking Nathan to handle that in the browser produces inconsistent walls. New workflow: Nathan messages Jonel, Jonel processes and commits to `/public/images/trusted-by/{slug}.png`, Nathan creates the matching Studio record. Slug ties the Sanity record to the local file. NATHAN_GUIDE updated with the new flow. |
| 2026-04-30 | Trusted By logo treatment | Per-logo grayscale → color on hover (preserved brand color) | All logos rendered through `brightness-0 invert opacity-60` (uniform white-on-dark, opacity 1 on hover) | A logo wall fights itself when each brand carries its own palette — the eye reads color before name. Forcing visual uniformity makes the wall read as a single texture (Trinidad's commercial brand network), with hover restoring opacity for individual recognition. Aligns with the "logo wall over individual brand fidelity" instinct that drives the cinema-tech aesthetic elsewhere. |
| 2026-04-30 | Marquee component | None (Phase 4 used static grids) | Reusable `<Marquee>` primitive in `components/ui/`, used by Trusted By and Services | Both scenes need infinite horizontal scroll with seamless looping, edge fades, hover-pause, and `prefers-reduced-motion` respect. Same shape, different content + duration — extract once. Track translates 0 → -50% over a duration prop (linear, infinite); children rendered twice for seamless loop; second copy is `aria-hidden` so screen readers announce content once. Animation registered as `--animate-scroll-marquee` token in @theme; per-instance duration via inline `animationDuration`. |
| 2026-04-30 | Kit scene composition | "Equipment grid with image, name, description per item" (Phase 1 PRD draft) | Top row: text-left (title + body + pills) / video-right (looping camera rotation). Bottom row: full-width terminal-styled `<Loadout>` gear list. | Grid-of-cards reads as a product showcase, which the kit isn't. Loadout-as-manifest reads as inventory — borrows the shape of CLI tool output (filename header, version stamp, monospace rows) and matches the cinema-tech motif. Camera video sits beside the title to demonstrate "the gear, in use" rather than "the gear, on display". Loadout is full-width below, not in a column, because it IS the demonstrative content — making it a sidebar afterthought would invert the hierarchy. |
| 2026-04-30 | Kit camera animation implementation | Phase 9 plan: 181-frame scroll-driven camera animation hooked to scroll progress | Continuous HTML5 video loop (`/public/videos/kit-camera.mp4`, autoPlay + loop + muted + playsInline). Reduced-motion users get the video without autoplay/loop — browser shows the still first frame natively via `preload="metadata"`. | The 181-frame scroll-driven plan was always overkill for what the asset is — a 6-second 416×752 vertical clip of a camera rotating. A native `<video>` loop ships in Phase 6 with zero scroll-coupling complexity, no JavaScript scroll listener, and the same visual result. Eliminates the Phase 9 camera-animation work entirely; Phase 9 becomes "video hosting decision + embed + SEO + intro animation" only. Reduced-motion fallback uses no separate poster image — suppressing autoplay leaves the video frozen on its first frame natively. |
| 2026-04-30 | Trusted By footer copy | `// SCROLLING MARQUEE · INFINITE LOOP` rendered below the marquee | Removed entirely | Mockup designer annotation, not visitor-facing copy. The line described the component's behavior to whoever was reading the mockup file, but on a live site it reads as either jargon or noise. Removed during Phase 6 smoke-test polish. |
| 2026-04-30 | Services header meta line | `// 4 OFFERINGS · DYNAMIC FROM SANITY` rendered to the right of the SERVICES title at desktop | Removed entirely | Same reasoning as the Trusted By footer — internal annotation describing the data source, not content for visitors. Removed during Phase 6 smoke-test polish. |
| 2026-04-30 | Trusted By marquee duration | 14s | 30s | 14s read as aggressive — logos passed faster than visitors could register them. 30s gives logos time to be recognized before they leave the visible window, while staying perceptibly faster than the Services marquee at 40s (which carries readable copy). |
| 2026-04-30 | Kit scene composition (revised) | Two-column top (text + camera) above a full-width loadout below | Two-column at 768+ with loadout nested inside the left column (under the pills) and the camera in a max-w-[320px] capped container in the right column. items-start aligns column tops. Mobile flow: title → body → pills → loadout → camera. | Original full-width-loadout-below structure produced two large dead zones at desktop: (1) eyebrow→title gap inflated by `items-center` shifting the short text column down to vertically center against the tall camera column (~317px offset); (2) pills→loadout gap inflated because the loadout sat below the flex container, which inherited the camera column's full ~1000px height. Capping the camera at max-w-[320px] tames its height to ~580px, and nesting the loadout inside the left column means the loadout flows directly under the pills with a clean mt-10 (40px) gap. Mobile order changes to end with the camera as a cinematic coda after the gear list. |
| 2026-04-30 | Kit loadout placement (final) | Nested inside the left column at all viewports (under the pills) | Full-width sibling row below the two-column flex (mt-10 = 40px from the bottom of whichever column extends lower) | Nesting the loadout in the left column made the gear list compete with the title for left-column real estate at desktop and pushed the camera into a vertically off-balance partner. The loadout deserves its own row — it's the demonstrative content of the scene, and a full-width row signals "the kit, in detail" rather than reading as a sidebar to the title. items-start (kept from prior fix) and the max-w-[320px] camera cap (also kept) still hold the eyebrow→title gap to mb-5 = 20px. Mobile flow returns to title → body → pills → camera → loadout. |
| 2026-04-30 | ServiceCard arrow | `→` rendered top-right of every card at 18px white opacity 0.5 | Removed entirely; only the number badge remains at the top of the card | Cards have no link target in Phase 6 — there are no service detail pages yet. The arrow promised navigation that didn't happen, which is a small visual lie. Removing it is honest. Hover still lifts the border + the card itself for a hint of interactivity, but doesn't promise anywhere to go. The arrow can come back in a future phase if service detail pages or modal interactions are added. |
| 2026-04-30 | Kit camera cap (final) | max-w-[320px] → camera ~320 × 580 | max-w-[244px] → camera ~244 × 441 | The 320×580 camera dominated its column (~580px tall vs the text column's ~370px), pushing the flex container's bottom 210px below the pills on the left side. Adding the loadout's mt-10 (40px) made the visible left-side gap from pills→Loadout read as ~250px — a dead zone. Target dimensions of 244×440 (cap by height was the spoken intent; expressed as max-w because `w-full` + `aspect-ratio` + `max-h` over-constrains both dimensions and breaks the aspect ratio — capping width lets the aspect-ratio derive height naturally). Camera still reads as a substantial cinema-tech specimen, but the right column is now only ~70px taller than the left, dropping the visible left-side gap to ~110px — natural editorial breathing room. |
| 2026-04-30 | Kit scene composition | Two-column flex layout (text-left, camera-right, items-start) with full-width LOADOUT below — caused asymmetric column heights creating ~110px dead space below the text column on desktop. | Absolute-positioned camera on desktop (no longer a flex column), full-width camera at top on mobile. Text and LOADOUT flow naturally with no dead space at narrow desktop widths. Two compositions, one component set, viewport-driven via container queries. KitCameraVideo simplified to fill its parent (parent governs size); KIT_CAMERA_VIDEO.aspectRatio constant dropped (orphaned after the refactor). KitSkeleton mirrored to the same dual structure to prevent layout shift on Suspense resolve. | Column-height matching is fundamentally fighting against asymmetric content (text content is ~370px tall, camera at 244×441 is taller). Absolute positioning takes the camera out of normal flow so it stops defining row height. Text + LOADOUT can then flow with their natural heights at narrow desktop widths (820–1024px), where text wraps long enough that LOADOUT lands below camera bottom naturally. At wider viewports (1280px+) text is shortest and LOADOUT would overlap the camera bottom — graduated `@[1280px]/frame:mt-16` (64px instead of 32px) provides the additional clearance only where the math demands it. Mobile gets a different composition entirely because horizontal space is too precious to share — camera-first hero pattern works better than constrained side-by-side. |
| 2026-04-30 | Kit camera dimensions + LOADOUT clearance (tuning) | Camera 244 × ~441 (width-driven via aspect); LOADOUT mt graduates to 64px at 1280+ | Camera 320 × 400 (width-fixed + max-h cap; aspect-ratio overridden so the source is cropped via object-cover ~89px top + ~89px bottom — black background mostly, camera body centered remains visible); LOADOUT mt graduates to 80px at 1280+ | The 244-wide camera read as a thumbnail rather than a focal element. 320 wide gives the camera presence on desktop. Capping height at 400px (rather than letting aspect derive ~578) keeps the camera close to the text-block height range so the layout stays balanced — the aspect mismatch is paid for in cropping (acceptable: source has black breathing room top + bottom that's safe to lose). LOADOUT mt bumped from 64px to 80px at 1280+ as buffer for edge cases where intermediate widths produce a slightly shorter text wrap; the math at 1280 (camera bottom 96+400=496 vs LOADOUT top 94+~348+80=522) gives ~26px clearance — comfortable but tight, the extra 16px is insurance. |
| 2026-04-30 | Kit body copy + pill set | Body paragraph + 2 pills (Owned outright, Insured) | 3 pills only (Editorial-grade gear, Owned outright, Insured) | Body paragraph was creating visual weight between headline and gear list. Consolidating "editorial-grade gear" into a pill preserves the credibility signal in the existing design pattern. Reduces scene height. Pills carry the data; LOADOUT carries the specifics; headline carries the punch. |
| 2026-04-30 | Kit desktop camera horizontal position | right:5% — camera floats near the section's outer right edge | right:12% — camera pulls horizontally closer to the text column | At 5% the camera read as drifting away from the text, especially at the wider frame widths (1280px) where the inset is largest in absolute px. 12% creates a tighter relationship between text and camera while preserving the desktop's "camera floats free" character. Doesn't affect the mobile composition. |
| 2026-04-30 | Kit pill placement + camera z-layering | Pills between title and LOADOUT; camera positioned to avoid overlap with LOADOUT via graduated margin-top | Pills below LOADOUT (footer pattern); camera positioned absolute z-0 with LOADOUT z-10 (camera bleeds behind LOADOUT where they overlap) | Pill-as-footer reads as a film-credit pattern — scene ends with metadata about the data above. Camera-behind-LOADOUT is a magazine editorial pattern (photo behind text block) — solves overlap problem permanently without fighting CSS margin math. Visual hierarchy: LOADOUT is foreground data, camera is background atmosphere. |
| 2026-04-30 | Kit camera vertical position + mobile centering + Hero mobile padding | Camera top:86px/96px (calibrated when body paragraph existed); headline left-aligned mobile; Hero pb-20 mobile (created excessive Hero→About gap) | Camera top recalculated to align with headline top after body paragraph removal (top:96px at 768+, top:104px at 1024+ — section pt + eyebrow + mb-5); headline centered on mobile only; Hero pb tightened to pb-12 mobile to reduce Hero→About transition gap | Camera position needs to track actual rendered headline position when content changes. Mobile-only headline centering improves visual hierarchy when scene is camera-first composition. Hero pb tightening targets a specific layout issue without affecting desktop where the larger bottom padding reads correctly. |
| 2026-04-30 | Kit camera vertical offset | Camera at top:96px/104px (mathematically aligned with headline top edge) but visually reads as middle of headline due to camera's visual mass distribution | Camera at top:64px/72px (mathematically above headline top, visually aligned with upper portion of headline) | Camera body/lens visual mass anchors low, so geometric top-edge alignment with headline reads as "camera lower than headline." Negative offset pushes camera up so visual mass aligns with headline rather than top edges. Cinema-tech atmospheric element should feel paired with the title, not floating below it. |
| 2026-04-30 | Kit camera vertical offset (further) | top:64px/72px still read as too low | top:24px/32px (additional -40px shift; camera top sits at or above the EyebrowLabel level) | First offset pass under-corrected. The camera's lens+body visual mass weighs heavier than estimated; pushing the top values to be near or above the eyebrow row lets the camera's center-of-mass sit at the headline mid-line, where the eye reads "camera and headline horizontal-aligned." If smoke test reveals collision with the eyebrow, back off to top:32/40. |
| 2026-04-30 | Kit camera vertical offset (final tuning) | top:24px/32px still read as slightly low | top:8px/16px (-16px) | Visual-mass offset still converging — camera nudged closer to the section's padding-box top edge so the lens+body weight aligns with the EyebrowLabel + headline composition. |
| 2026-04-30 | Kit camera vertical offset (final, top:0) | top:8px/16px still read low | top:0 — camera flush with the section's padding-box top at every desktop breakpoint | Final landed value. Camera's heavy lower mass now reads horizontally paired with the headline; further negative values would overlap the previous scene above. Single `top-0` class replaces the breakpoint-specific arbitrary values. |
| 2026-04-30 | Kit composition breakpoint | Desktop floating-camera composition activated at @[768px]/frame: causing horizontal overlap between camera (at right:12%) and text column (at max-w-[60%]) at 820px viewport | Desktop composition activated at @[1024px]/frame:; tablet falls back to mobile camera-first hero | At 820px viewport, right:12% percentage math puts camera left edge at ~402px while text right edge is at ~524px, creating ~120px horizontal overlap. Real desktop viewports (1024+) have enough horizontal room for both. Tablet doesn't, so it uses the simpler mobile composition. |
| 2026-04-30 | Kit mobile camera width cap at tablet | Mobile camera at full content width (h-[280px] w-full) — fine at 390px (~342px wide camera) but stretched awkwardly at 820px tablet (~756px wide × 280px tall, dominating the section) | Camera capped at max-w-[440px] centered at @[768px]/frame:; mobile (under 768) effectively unchanged since natural width fits | The mobile composition was designed for 390-580px viewports where full-width camera reads as hero. At tablet width the same composition produces an oversized camera that overwhelms the section. Capping width at tablet preserves the camera-first hero pattern at proportional size. |

> After logging a change here, update the relevant section above so the current spec is always accurate.

---

*End of DESIGN-GUIDELINES — v1.0*
