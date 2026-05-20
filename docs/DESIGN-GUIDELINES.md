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

The portrait card is framed as a director's monitor over Nathan's photo. The photo is the persistent visual content; the viewfinder overlays are cinematic framing layered on top. The portrait card stands as the final v2 visual — the camera-pan animation that was originally planned for the About scene moved to the Kit scene per the 2026-04-30 change log.

- Image: `next/image` with `fill`, `object-cover object-top`, `priority` (above-the-fold on desktop). Card background gradient (`#0a0a0a` → `#050505`) shows briefly while the image loads.
- Top-left label: `// SHOT 01 · PORTRAIT` in mono `#00ffa3`
- Top-right: pulsing `#00ffa3` dot (custom `pulse-rec` keyframe, 1.5s) + `REC` text in mono `#00ffa3`. Pulse wrapped in `motion-safe:` so reduced-motion users see a static dot.
- Glow: radial gradient at 30% 30%, `rgba(0,102,255,0.18)` → transparent at 65%, layered above the image (z-10) for atmosphere
- Fade: bottom-half linear gradient transparent → `#050505`, layered above the image (z-10) for cinematic gravitas
- Corner brackets: 14×14px, 1px solid `#333`, two-edge L-shapes at each card corner (z-20)
- Border: 0.5px solid `#1a1a1a`, rounded 12px, aspect 4/5

This is one of the strongest aesthetic motifs. Reuse the same pattern (REC indicator + corner timecode) for any other "live" element — never introduce a different "live" treatment.

### Words / Reviews Card (homepage carousel — `<ReviewQuote>`)

```html
<article class="words-quote is-active">
  <div class="words-mark">"</div>           <!-- Oversized opening quote -->
  <p class="words-text">[review text]</p>
  <div class="words-attr">
    <div class="who">[name]</div>
    <div class="role">[roleCompany]</div>
    <div class="project">// PROJECT: <span class="accent">[PROJECT NAME]</span></div>
  </div>
</article>
```

- One review visible at a time, others stack hidden via `absolute inset-0` + opacity. Inactive copies set `pointer-events-none` so clicks fall through to controls.
- Carousel controls: numbered counter (`01 / 03`), progress bar, dot navigation
- The `// PROJECT:` line uses mono; project name uses accent green `#00ffa3` and is uppercased on render
- Pull quote uses Bebas Neue 120px for the opening `"` mark (oversized), Inter italic for the review text body
- Stage at 768+ uses `grid-cols-[2fr_1fr]` with attribution self-aligned to the bottom; mobile stacks to single column.

### Review Carousel (`<ReviewCarousel>`)

The client-side wrapper that hosts `<ReviewQuote>` cards on the homepage Words From Set scene.

- Auto-advances every `WORDS_AUTO_ADVANCE_MS` (7s); on user interaction (any dot click) auto-advance pauses and resumes after `WORDS_RESUME_AFTER_MS` (30s) of no further interaction.
- Progress bar is 1px tall, fills `0 → 100%` over each cycle on a `#1a1a1a` track. Reset on each advance and on manual nav.
- Dots: 6px round, gap-2.5; inactive `#2a2a2a`, active white scaled `1.3×`.
- Counter: `01 / 03` in mono; current in `#888`, separator + total in `#444`.
- `prefers-reduced-motion` collapse: auto-advance loop is skipped, transition between active/inactive `<ReviewQuote>` becomes instant (`motion-reduce:transition-none`), progress bar is hidden entirely (nothing to indicate when nothing is moving), dots remain functional for manual nav, and the carousel defaults to showing the first review on load.
- Internal timer counts elapsed ticks (50ms each) rather than reading `Date.now()` so the cycle is deterministic under tab-throttling and unit tests don't depend on system time. The interval clears itself on advance to prevent multi-advance under fast-forwarded fake timers.

### Reviews Archive Card (`<ReviewCard>`)

The grid-tile variant of a review for the `/reviews` archive page. Uses the lighter dark palette locked for the page (see Section Inventory).

- Container: `bg-[#1a1a1a]`, border `0.5px rgba(255,255,255,0.3)`, `rounded-2xl`, padding `p-6` mobile / `p-8` at 768+.
- Top: large quote mark `"` — Bebas Neue 96px, `var(--color-accent-primary)` (`#0066ff`), line-height 0.7, mb-6.
- Body: review text — Inter italic, `#e0e0e0`, 16px, line-height 1.5, mb-8.
- Bottom row: `flex items-end justify-between gap-4`. Left holds the attribution stack (name in Inter 14px medium white; roleCompany in mono 10px tracking 0.18em uppercase `#888`). Right holds the brand logo when available — a plain `<img>` from `/images/trusted-by/{slug}.png`, `h-8 w-auto brightness-0 invert opacity-50` (slightly less opaque than the Trusted By marquee since the archive context is quieter).
- Brand logo gating: the slug derives from `review.brand` via `getBrandLogoSlug()`; if the brand doesn't match a known Trusted By slug, the right side renders nothing. No placeholder, no broken-image icon — the asymmetric attribution row reads as natural editorial layout.
- Optional project tag below the bottom row: `// PROJECT: <accent>{PROJECT NAME}</accent>` — mono 10px tracking 0.15em, project name in `var(--color-accent-secondary)` (`#00ffa3`) uppercased. Renders only when `review.project` is present.

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

### Forms — form-card pattern (Inquire + Review submission)

The Inquire and Review forms share one container shape so the cinema-tech motif stays consistent across both submission flows. Reviews in Phase 8 will reuse the same primitives.

- **form-card** wrapper: `bg-[#0a0a0a]`, border `0.5px var(--color-surface-card)` (`#1a1a1a`), `rounded-[14px]`, padding `p-6` mobile / `p-8` at 1024+
- **form-head** (mb-5, pb-3.5, border-bottom 0.5px dashed `#222`): justify-between row with two mono labels — left `text-[10px] tracking-[0.15em] var(--color-accent-secondary)`, right `text-[9px] tracking-[0.10em] #444`. Left label fits the `// X.FORM` shape (e.g. `// NEW_INQUIRY.FORM`); right label is a status annotation (e.g. `SECURE · FORMSPREE`).
- **form-stack**: `flex flex-col gap-[18px]` between field blocks
- **form-label**: mono `text-[9px] tracking-[0.15em] var(--color-text-quiet)` (`#666`), `mb-2` between label and input
- **form-field** (input + textarea): `bg-[var(--color-bg-base)]` (`#050505`), border `0.5px var(--color-surface-card-raised)` (`#2a2a2a`), `rounded-md`, padding `py-[14px] px-4`, `text-[13px] text-white`, placeholder `#555`. Focus shifts the border to `var(--color-accent-primary)` (`#0066ff`). Textarea uses the same shape with `min-h-[100px]` and `resize-y`.
- **form-pills** (single-select chip group): `flex flex-wrap gap-2`. Selected state `bg-[var(--color-accent-primary)] text-white border-transparent`; unselected state `border-[0.5px] var(--color-surface-card-raised) text-[var(--color-text-muted)] bg-transparent` with hover lifting border + text. Padding `px-3.5 py-1.5`, `rounded-full`, mono 11px tracking 0.10em. **Always one selected** — clicking the active pill is a no-op so the field value is never undefined.
- **form-foot**: `mt-2 flex flex-wrap items-center justify-between gap-3`. Left holds a mono annotation (e.g. `RESPONSE WITHIN 24H` at `text-[9px] tracking-[0.15em] #555`), right holds the form-button.
- **form-button** (primary submit): mirrors ButtonPrimary tokens — `bg-[var(--color-accent-primary)] text-white rounded-lg py-3 px-[22px] font-body font-medium text-[13px]`, `hover:opacity-90`, `disabled:opacity-60 disabled:cursor-not-allowed`. Slightly smaller than ButtonPrimary (13px vs 14px, py-3 vs py-3.5) because it sits in the form context, not the hero.
- **Inline error message** (validation): mono `text-[10px] tracking-[0.10em] #ff8080`, `mt-1.5` below the failing input. `aria-invalid` + `aria-describedby` wired so screen readers announce the error.
- **Submission error banner** (network/Formspree failure): mono-free, `bg-[#1a0a0a]`, border `0.5px #ff3b3b`, text `#ff8080 text-[13px]`, `rounded-md px-4 py-3`, sits above the form-stack. Form fields preserve their values on error so the visitor can retry without re-typing.
- **Honeypot field**: hidden `<input type="text" name="website">` with `tabIndex={-1}`, `aria-hidden="true"`, `autoComplete="off"`, positioned at `left: -9999px` via inline style. Any non-empty value at submit means a bot scraped the markup — handler silently drops the submission and shows the success state to discourage retries.
- **Success state**: replaces the entire form (terminal state, no retry button). Same form-card container with `// INQUIRY_RECEIVED`-style mono header, oversized Bebas Neue heading using the visitor's submitted name (e.g. `THANKS,<br>{NAME}.`), and a brief body paragraph.

#### LeaveReviewForm additions (Phase 8)

The Phase 8 review-submission form reuses every primitive above and adds three things specific to the moderation flow:

- **Field-level helper text**: mono `text-[10px] tracking-[0.10em] text-[#666]` set `mt-1.5` below the input. Used on the BRAND field to explain why it's separate from ROLE / COMPANY ("Just the brand name. We'll show the logo if we've worked with them."). Reach for it whenever a field's purpose isn't obvious from its label alone.
- **Character counter**: paired with the REVIEW textarea to surface the 280-character schema limit. Right-aligned mono 10px under the textarea, sharing the inline-error row. Counter color flips to `#ff8080` on overrun, matching the inline-error palette so visitors get one visual cue for "this is over the limit."
- **Turnstile slot**: rendered between the last input field and the form-foot. `<Turnstile>` from `@marsidev/react-turnstile` with `options={{ theme: 'dark' }}` to match the form-card surface. Token state lives in `useState<string | null>`; submit blocks until a token exists. On error/expire the token resets, so a stale challenge can't be reused. Server-side, `/api/submit-review` re-validates the token via Cloudflare's `siteverify` endpoint before any Sanity write.
- **Honeypot defense-in-depth**: the form keeps the Phase 7 client-side silent-drop pattern (any value in `website` → fake the success state without firing fetch). The API route also accepts a `honeypot` field and silently returns 200 if it sees one — covers attackers who bypass the form entirely. In practice the layered defense is Turnstile (cryptographic) + honeypot (naive bots) + server-side field validation (last line).
- **Success-state copy variant**: `// REVIEW_RECEIVED` header + `THANKS,<br>{NAME}.` heading + body explaining the moderation gate ("Nathan reviews each submission personally and approves them within a day or two."). Same form-card container as the Inquire success state.

## Section Inventory (8 scenes, locked order)

| # | Scene | Background | Sanity-driven? | Notes |
|---|---|---|---|---|
| 01 | Hero | `#000` | Stats hardcoded | 100vh min-height. Blue glow bottom-left. |
| 02 | About | `#050505` | Bio + portrait static | Two-column desktop, single-column mobile. REC card on portrait. |
| 03 | Featured Work | `#000` | Yes (3 featured projects) | 3-column grid desktop, horizontal scroll mobile. Category tags color-coded. |
| 04 | Trusted By | `#050505` | Yes (metadata only — logos local) | Infinite-scroll marquee of brand logos (30s cycle). All logos rendered uniformly white-on-dark via `brightness-0 invert opacity-60`; opacity 1 on hover. Logo files live at `/public/images/trusted-by/{slug}.png`. |
| 05 | Kit | `#000` | Yes (kit items) | "THE GEAR BEHIND THE SHOTS." Dual composition driven by container queries. Order at every viewport: title → LOADOUT → 3 pills (Editorial-grade gear · Owned outright · Insured), pills as film-credit footer. **Mobile + Tablet (<1024px):** camera hero at top (full content width, h-[280px], object-cover) → title (centered) → LOADOUT → pills. Tablet uses the mobile composition because at narrow desktop widths the camera's right:12% offset would overlap the text column. **Desktop (1024px+):** camera floats absolutely on the right at z-0 (`top: 0, right: 12%, w: 320px, max-h: 400px` — top values intentionally above the geometric headline top so the camera's visual mass pairs with the headline; aspect-ratio overridden by the dual cap, video uses object-cover and crops ~89px from top + bottom of the source); title constrained to `max-w-[60%]` so it doesn't wrap under the camera; full-width terminal-styled `<Loadout>` at `relative z-10` so it covers the camera where they overlap (magazine editorial pattern, video keeps animating in the unhidden portion); pills below LOADOUT with `mt-8` flat at every breakpoint. Camera video replaces the original Phase 9 scroll-driven plan with a continuous HTML5 video loop (boomerang re-encoded for seamless loop). |
| 06 | Services | `#050505` | Yes (services) | Horizontal-scroll marquee of service cards (4 offerings, 40s cycle). Slower than Trusted By so card copy is readable. Numbers (01–04) derived from sort position, not stored. |
| 07 | Words From Set | `#050505` | Yes (5 most recent approved reviews) | Carousel of client testimonials. Server scene `WordsFromSet.tsx` fetches `WORDS_QUERY` (capped `[0...5]`) and hands the result to client `ReviewCarousel`. Stage holds layout open at `min-h-[380px]` mobile / `[320px]` at 1024+ so absolute-positioned `ReviewQuote` cards don't collapse the section. Bottom controls row: counter (`01 / 03`) + progress bar + dot nav, separated from the stage by a 0.5px `#1a1a1a` divider with `mt-12 pt-6` spacing. Auto-advance + reduced-motion behavior documented under "Review Carousel" above. Same-color back-to-back with Services (also `#050505`) is intentional — the carousel's center-stage composition reads as a natural extension of the Services marquee preceding it. |
| 08 | Inquire | `#000` | No (Formspree only) | Two-column at 768+ (intro + contact list left flex-1, form right flex-[1.3]); single-column under 768. Background carries two decorative radial glows positioned outside the section bounds (top-right blue 13%, bottom-left green 7%) — `overflow-hidden` on the section clips them so they bleed in from the corners without spilling onto the previous scene. Eyebrow → headline → body → contact list (email → location → availability → Instagram) on the left; form-card with mono header, four fields, and a foot row on the right. **No site footer** — contact lives inside this scene and there's no value in repeating it below. |

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
    { name: 'name',         type: 'string', validation: Rule => Rule.required(), description: "Reviewer's name as displayed on the site" },
    { name: 'roleCompany',  type: 'string', description: 'Combined attribution shown beneath the name, e.g. "Brand Director, Grey Goose Caribbean"' },
    { name: 'brand',        type: 'string', description: 'Brand or organization name only, e.g. "Grey Goose". Used to map the review to a Trusted By logo at /public/images/trusted-by/{slug}.png. Separate from roleCompany so the logo lookup is unambiguous.' },
    { name: 'project',      type: 'string', description: 'Free-text project name (e.g. "Grey Goose Launch 2025"). Optional context line; not tied to a Sanity Project document so off-site / NDA / unpublished work can be reviewed.' },
    { name: 'projectType',  type: 'string', options: { list: ['Brand Films', 'Event Coverage', 'Drone Cinematography', 'Music Videos', 'Other'], layout: 'radio' }, description: 'Used by the /reviews archive filter. Vocabulary mirrors the Inquire form pills.' },
    { name: 'review',       type: 'text', validation: Rule => Rule.required().max(280), description: 'Max 280 characters — keep it pull-quote sized' },
    { name: 'email',        type: 'string', description: 'For verification only. Never displayed.' },
    { name: 'slug',         type: 'slug', options: { source: 'name', maxLength: 96 }, description: 'Auto-generated from name. Reserved for future review detail pages; unused at launch.' },
    { name: 'submittedAt',  type: 'datetime', readOnly: true },
    { name: 'approved',     type: 'boolean', initialValue: false, description: 'Toggle ON to publish on the site.' }
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

// Approved reviews — homepage Words scene (5 most recent)
*[_type == "review" && approved == true] | order(submittedAt desc)[0...5] { _id, name, roleCompany, brand, project, projectType, review }

// Approved reviews — /reviews archive (full set, client-side filterable by projectType)
*[_type == "review" && approved == true] | order(submittedAt desc) { _id, name, roleCompany, brand, project, projectType, review }
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
- Eliminates the planned camera-animation phase work entirely (originally on the Phase 9 list at the time of this decision; the video + SEO work the camera-animation removal made room for now lives in Phase 10 after the 2026-05-01 phase renumber)

**Performance:** native `<video autoplay loop muted playsInline preload="metadata">` is GPU-decoded by the browser; iPhone 14 holds 60fps without scroll-listener overhead.

## Change Log

| Date | What Changed | Old Value | New Value | Why |
|---|---|---|---|---|
| 2026-05-01 | About headline copy + composition | "MEET" / "NATHAN." — two-line composition with Bebas Neue stacked words, per Phase 5 spec | "MEET JACK." — single-line composition, retains Bebas Neue display sizing | Nathan requested the rename to align the About section with the brand's actual identity. The Jack Visuals brand uses "Jack" across every other surface — domain (jackvisuals23.com), Instagram (@jackvisuals23), legal email (jackltd23@gmail.com), and Nathan's own client-facing voice. The About scene was the only place still using "Nathan," which created a personal/brand voice mismatch. Single-line composition was a follow-on design call: with the shorter character count of "JACK" vs "NATHAN," the two-line stack felt thin and the headline read stronger as one line at the same Bebas Neue display size. Visual smoke at 390/768/1280 confirmed the spacing below the headline still composes correctly after the collapse from two lines to one. |
| 2026-05-01 | Cross-link placement architecture | No documented pattern; cross-links lived wherever each scene's author placed them (Featured Work footer, Words From Set inline-with-eyebrow per Phase 8 viewport-fit fix, sub-route page footers). | Two-pattern split documented. **Sub-routes** (/work, /reviews) place cross-links inline-with-eyebrow at top-right, at all viewports — sub-route page headers carry structural authority that absorbs the placement, and there's no competing scene below. **Homepage scenes** (Featured Work, Words From Set) use responsive placement: eyebrow-inline at 1024px+, footer position below 1024px — homepage scene eyebrows compete with the section headline directly underneath at narrow viewports, so the cross-link returns to footer where it has room to breathe. /reviews specifically supports two top-right cross-links (BACK TO HOME ← + LEAVE A REVIEW →) because the universal back-link pattern from Phase 8 is older than the single-cross-link pattern that emerged from other routes. Mobile (<768px) on /reviews stacks the two right-side links vertically with `flex-col items-end gap-2`. | Pattern emerged across multiple Phase 9 polish commits as the cross-link work was iterated on real viewports. Prior state was a mix of placements without an explicit reason for any one — making future scene additions or new sub-routes a guessing exercise. Documenting the split prevents the next route's cross-link from being placed by accident. |
| 2026-05-01 | Bebas Neue oversized glyph leading rule | No documented rule; vertical spacing fixes for large display glyphs defaulted to adjusting `mb-*` on the glyph element. | For Bebas Neue glyphs at `text-6xl` or larger (especially decorative quote marks, drop caps, or single-character display elements), the visible gap below the glyph is line-box phantom whitespace, NOT margin. Fix by tightening `leading-[0.4]` to `leading-[0.5]` on the element itself. `mb-0` won't help because the gap lives inside the line-box, not between elements. `leading-none` is `1.0`, looser than already-tight values like `leading-[0.7]` — don't reach for it as a "tighter" option. | Discovered while diagnosing the ReviewQuote carousel quote-to-body gap (commit ef9f876). The quote mark wrapper at `font-display text-[120px] leading-[0.7]` produced an 84px line-box for a glyph occupying only ~30px of visible height. Tightening to `leading-[0.4]` shrunk the line-box to 48px without clipping the glyph. Generalizable across any oversized Bebas display element — worth filing rather than rediscovering each time. |
| 2026-05-01 | Review schema | `clientName` / `role` / `reviewText` / `project` (required reference to a published Sanity Project) / `email` / `submittedAt` / `approved` | `name` / `roleCompany` / `brand` / `project` (optional, free-text string) / `projectType` (optional, controlled vocab matching Inquire pills: Brand Films · Event Coverage · Drone Cinematography · Music Videos · Other) / `review` / `email` / `slug` (auto from name, reserved for future detail pages) / `submittedAt` / `approved` | Original schema was designed before public submission existed and assumed every review tied to a published Sanity Project. Public reviews need broader semantics — NDA work, ongoing client relationships, off-site projects, brands Nathan has shot for that don't have a project page. Restricting reviews to published projects misses real testimonial value. The split between `roleCompany` (combined attribution like "Brand Director, Grey Goose Caribbean") and `brand` ("Grey Goose") keeps the display string flexible while making the logo lookup unambiguous — no parsing of the combined string, which is fragile when reviewers use different separators. `projectType` reuses the Inquire form's vocabulary so the two surfaces stay coupled (one source of truth for project categorization across the site). Schema rewrite confirmed by Jo with explicit Rule-12 approval; no data migration needed because no review documents exist yet. The previous locked GROQ query also rewrites to project the new field names, with the homepage variant gaining `[0...5]` to cap the carousel at 5 most recent. |
| 2026-05-01 | Words From Set scene composition | None — Phase 8 was always going to add Scene 07 | Server scene `WordsFromSet.tsx` fetches `WORDS_QUERY`, mounts client `ReviewCarousel`. Auto-advance every 7s, paused on user interaction with 30s resume. Counter (`01 / 03`) + 1px progress bar + 6px round dots in the controls row; controls separated from the stage by a 0.5px `#1a1a1a` divider. Reduced-motion: auto-advance off, transitions instant, progress bar hidden, dots remain functional for manual nav. Same-bg-as-Services (`#050505`) is intentional — the carousel's center-stage composition reads as a natural extension of the Services marquee preceding it, rather than asking the alternation rule to dictate aesthetics. | The 7s/30s cadence is paced for a 280-character pull quote at typical reading speed, with a long-enough resume window that a visitor who pauses to read isn't fighting the timer. Self-clearing the auto-advance interval when it fires (rather than relying on the React effect cleanup to clear it) prevents multi-advance under fake-timer fast-forward in tests, and is also the right behavior under tab-throttling where setInterval callbacks can backlog. Counting elapsed ticks (50ms each) instead of reading `Date.now()` keeps the timer deterministic and unit tests independent of system time. |
| 2026-05-01 | /reviews archive page | None — full archive route did not exist | New `/reviews` page (lighter dark palette: page bg `#0d0d0d`, card bg `#1a1a1a`, body text `#e0e0e0`, borders at `rgba(255,255,255,0.3)`). Mirrors the /work pattern: `app/(site)/reviews/page.tsx` orchestrates header + `ReviewsCategoryFilter` + `ReviewsGrid` inline; no `scenes/ReviewsArchive.tsx` wrapper. `ReviewsGrid` is co-located with the page (mirrors `WorkGrid.tsx`). Filter pills: "All" + the five Inquire project-type values, single-select via `useReviewsFilterStore` (Zustand). Footer row hosts a primary CTA back to `/leave-review` and a mono link back to home. | Lighter palette communicates "long-form content" rather than "marketing scene," distinguishing the archive from the homepage scenes without forking into a true light theme. Mirroring /work's architectural pattern keeps the codebase coherent — there's one way archive pages are built, and that way is reused. The CTA back to `/leave-review` from the bottom of the archive closes the loop: visitors who read all the way through the archive are the most qualified pool for asking for a review next. |
| 2026-05-01 | /leave-review naming | Considered: `/review` (singular) | Verb-based URL `/leave-review` ships instead of the singular `/review` | Singular `/review` would have crowded the plural `/reviews` archive route in URL space — the difference between "look at all reviews" and "submit one" should be obvious from the URL alone. Verb-based submit URLs (e.g. `/sign-up`, `/contact-us`, `/join-the-list`) are a well-established pattern; no extra learning curve for visitors. Internal routing has zero collision risk. SEO benefits modestly because the URL itself answers the searcher's intent. |
| 2026-05-01 | Brand logo derivation | None — review schema didn't have a logo concept | `getBrandLogoSlug(brand)` helper slugifies the brand string (lowercase, strip diacritics, dash separators) and gates the result against `TRUSTED_BY_LOGO_SLUGS` (a hardcoded list of the seven current PNGs in `/public/images/trusted-by/`). Returns null when the brand doesn't match — `<ReviewCard>` then renders no logo and no placeholder, leaving the bottom row asymmetric. Adding a new brand requires updating the constant; the new-brand workflow is owned by Jonel (NATHAN_GUIDE has the message-Jonel pattern from Phase 6). | Two failure modes the helper has to avoid: (a) rendering a `<img>` for a slug that doesn't exist on disk → broken-image icon at the user, (b) over-matching by silently rendering a similar-looking-slug logo for the wrong brand. The hardcoded list makes both impossible — a brand either matches or it doesn't, with zero ambiguity. The cost is that adding a brand is a code change rather than a CMS toggle, but Trusted By logos are already curated by Jonel (Phase 6 decided this) and the cadence is low. The slugifier strips diacritics so "Patrón" maps to `patron.png` correctly, and trims whitespace so reviewer typos don't break matching. |
| 2026-05-01 | Review submission flow | None — public submission did not exist | `LeaveReviewForm` (`'use client'`) hand-rolled with `useState`, mirrors the Phase 7 `InquireForm` shape (form-card / form-label / form-field / form-pills / form-foot / form-button). Adds three primitives: field-level helper text (mono `#666` below the input), 280-character counter on the REVIEW textarea (flips to `#ff8080` on overrun), and the Turnstile widget slot between the last field and the form-foot. Submit POSTs JSON to `/api/submit-review`, which re-validates the Turnstile token server-side via Cloudflare's `siteverify` endpoint before any Sanity write. `submittedAt` is set on the server (not on the client) so the Sanity readOnly constraint stays honored and reviews sort by their real submission time. Honeypot defense-in-depth: client-side silent-drop pattern from Phase 7, plus a redundant server-side check that returns 200 silently if it sees a `honeypot` field. | Separating client validation (UX) from server validation (security) is the right factoring even when the rules overlap — the client is for fast feedback to a real visitor, the server is for trust under adversarial conditions. Turnstile handles the cryptographic challenge; honeypot catches naive bots that fill every named input; server-side field validation is the last-line check that the Sanity document we're about to create matches the schema's allowed values (e.g. `projectType` must come from the locked vocabulary). The 280-char counter exposes the schema validation rule (`Rule.required().max(280)`) so visitors don't write a 600-character review only to be told it's too long after submit — surfacing the limit live keeps the form honest. |
| 2026-05-01 | Project-name accent in review surfaces | The "Words / Reviews Card" doc said green `#00ffa3` (DESIGN-GUIDELINES line 184). Phase 8 prompt initially proposed blue `#0066ff`. | Locked: green `#00ffa3` (`var(--color-accent-secondary)`) used on both the homepage `ReviewQuote` and the archive `ReviewCard` for the `// PROJECT:` line's project-name span. Project name is uppercased on render. | DESIGN-GUIDELINES is the authoritative source per CLAUDE.md Section 13, so the green wins over the blue prompt suggestion. Green also fits the "live state" semantic the secondary accent owns (REC dot, status indicators) — a project name marked in the "alive" green reads as "this engagement is real, this is from set," whereas blue would feel like a generic call-to-action accent. Uppercasing on render matches the cinema-tech mono motif used elsewhere in the project (scene meta, eyebrow labels) and is the same treatment the locked HTML mockup specified. |
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
| 2026-04-30 | Nav navigation + universal back-to-home + carousel quote spacing | (a) Nav anchor hrefs (#work, #about, #inquire) failed silently from non-homepage routes — clicks fired but went nowhere because anchors don't exist on /reviews, /work, /leave-review. Same bug in MobileMenu. (b) Logo not clickable to return home — convention violation; #top anchor only resolved on home, broken everywhere else. (c) Words From Set quote mark to review text gap excessive (`mb-4` between mark div and italic body). (d) /leave-review and /work pages lacked back-to-home exit affordance. | (a) NAV_LINKS + NAV_CTA hrefs prefixed with `/` for absolute navigation (`/#work`, `/#about`, `/#inquire`) so they navigate home AND scroll. Both Nav.tsx and MobileMenu.tsx converted from `<a>` to `next/link`'s `<Link>` for soft client-side transitions instead of full reloads. (b) Logo wrapped in `<Link href="/">` with `aria-label="Jack Visuals — home"`; `#top` anchor dropped (the page-load default scroll position IS the top, so `/` reaches the same place). (c) `words-mark` margin tightened `mb-4 → mb-1` so the quote mark visually attaches to the text it's quoting. (d) `← BACK TO HOME` text-link footer added to /leave-review (centered, below the two-column layout) and /work (centered, below the WorkGrid). Both use the same mono uppercase 11px tracking-0.15em #888 → #00ffa3 pattern as /reviews so the exit affordance reads identically across all three sub-pages. `scroll-padding-top` was already in place from the prior iteration — no change needed. | Anchor-only nav hrefs are a critical bug for any non-SPA site with sub-pages — silent failure (no console error, no click feedback) makes it especially hard to catch in QA. Browser tries to scroll to a nonexistent fragment, finds nothing, no-ops. The fix is mechanical: prefix anchors with `/` and use `next/link` for soft nav. Universal back-to-home pattern across all three sub-pages establishes a consistent exit affordance — visitors always have a clear path back to homepage regardless of which leaf page they're on. Quote mark gap was the original mockup's spec carried over, but the visual relationship between mark and text reads better when they're tighter — the mark frames the quote, doesn't float above it. |
| 2026-04-30 | /reviews footer spacing + sticky nav anchor offset | (a) /reviews page bottom padding created excessive gap between cards grid and footer links — visually disconnected, (b) Sticky nav covered top ~60-80px of destination pages on cross-page nav — titles cut off below the fold of nav | (a) Tightened /reviews footer row from `mt-16 / @[1024px]/frame:mt-20 + pt-8` to `mt-6 + pt-6` — 48px visible gap between the cards grid and the link row (was ~96px mobile / ~112px desktop). The dominant contributor was the footer row's top margin, not the page's bottom padding (page `pb` sits below the footer, not between cards and footer). (b) Added responsive `scroll-padding-top` to the `html` element in globals.css (70px under 768px, 90px at 768+). Single CSS rule fixes site-wide anchor scroll behavior so destination titles render below the sticky nav. Values are nav height (52 / 72) plus an 18px buffer; breakpoint matches the `md:` token Nav.tsx uses to swap heights. | Footer spacing: visual rhythm needs proportional gap to grid above. Diagnosis showed the gap was 100% the footer row's `mt + pt`, not the page `pb` — `pb` controls space below the footer, which is fine. Nav anchor: sticky nav requires `scroll-padding-top` to prevent destination content from rendering behind the nav. Standard CSS pattern, applied once at html level fixes every anchor target on the site (homepage `#about` / `#work` / `#kit` / `#inquire`, cross-page `Link` clicks that scroll to anchors, browser back/forward fragment navigation). Single-value 80px would have left only 8px clearance at desktop (72 + 8 buffer); responsive 70/90 keeps consistent 18px clearance at both viewports. |
| 2026-04-30 | ReviewCard layout + /leave-review composition + button redesign + SEE ALL REVIEWS placement | (a) Brand logo at bottom-right of card competing with attribution, (b) /leave-review single-column with title stacked above form, (c) email field labeled "(optional)" without privacy indicator, (d) Solid blue button + text link mismatch on /reviews footer, (e) SEE ALL REVIEWS as separate row below carousel | (a) Logo top-right of card, attribution gets full width below, cleaner visual hierarchy, (b) Two-column 768+ matching Inquire pattern (flex-1 / flex-[1.3] split, decorative blue + green glows), consistent form rhythm across site, (c) Email labeled "(private)" with explicit "Never displayed publicly. Only used if Nathan needs to verify your review." helper text, (d) Both footer links as text-link pattern matching SEE ALL REVIEWS treatment (mono 11px tracking 0.15em uppercase #888 → #00ffa3 hover, justify-between layout), editorial subtlety, (e) SEE ALL REVIEWS inline with eyebrow at top of section (eyebrow row becomes flex justify-between), immediate discoverability without disrupting carousel flow | Card hierarchy: logo as visual anchor at top reads cleaner than competing with attribution at bottom — the bottom row is name-and-context, the top row is brand-and-pull-quote-frame. Form composition: two-column rhythm consistency across all submission forms (Inquire + Leave Review). Email treatment: explicit privacy indicator builds trust without losing Nathan's verification recourse — the helper text answers the visitor's silent question ("will my email be displayed?") before they ask. Button consistency: text-link pattern is the established editorial transition style for between-section nav; solid CTA buttons reserved for primary actions inside scenes. CTA placement: top-of-section discoverability for visitors who don't want to engage with carousel, and removing the bottom CTA row also reclaims ~50px of vertical so the carousel sits more comfortably in the 768px-tall viewport. |
| 2026-04-30 | Words From Set "see all" CTA | No exit point from carousel — visitors who wanted to read more reviews had no path to /reviews from the homepage | Added "SEE ALL REVIEWS →" link below carousel controls, JetBrains Mono uppercase styled to match cinema-tech aesthetic, links to /reviews archive | Carousel showed 5 most recent reviews but had no path to the full archive. Visitors who got engaged and wanted more had to manually type the URL. Editorial scene completion: visitor reads quotes → sees option to read more → can navigate to /reviews. |
| 2026-04-30 | Words From Set viewport fit | Title clamp(48px,14cqw,96px), stage min-h 380/320, scene padding 80/100/120 — section ~878px tall at 1366×768 viewport, exceeded available height by ~110px requiring scroll to see full carousel | Title clamp(40px,10cqw,64px), stage min-h 240/220, scene padding 48/64/80 — section ~652px fits in viewport with breathing room | Carousel functional and editorial but visitors couldn't see attribution + controls without scrolling. Editorial impact is undermined when the visitor has to scroll mid-quote to find who said it. Tightening title scale + stage minimum + scene padding lets the whole scene be a single visual unit — visitor scrolls into Words, reads the quote with attribution and controls visible, then scrolls past. |
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
| 2026-05-01 | Phase 7/8 order | Phase 7 = Words/reviews, Phase 8 = Inquire | Phase 7 = Inquire, Phase 8 = Words/reviews + Studio deploy + Nathan invite | Inquire has no Sanity dependencies and a Formspree-only flow — the simpler scene to land first. Reviews requires public form submission, server-side Turnstile validation, IP rate-limiting, moderation flow, and Nathan's onboarding to Studio for approval. Shipping Inquire first lets the homepage feel complete (Hero through Inquire) while the moderation infra spins up in Phase 8. CLAUDE.md phase table + acceptance lists rewritten in the same branch as the Phase 7 implementation. |
| 2026-05-01 | Inquire scene composition | Section Inventory row 08 carried "Two-column desktop. Form + footer." (one-line summary; mockup spec hadn't been transferred) | Section Inventory row 08 rewritten with the full composition: two-column at 768+ (intro + contact list left flex-1, form right flex-[1.3]), single-column under 768, decorative radial glows, no site footer. Inquire scene built per spec. | The placeholder row was a Phase 0 stub. Lifting the mockup's actual spec into the inventory means the row matches the implementation, including the decision to drop the site footer (contact lives inside the scene; a footer below would either repeat the same data or introduce dead links). |
| 2026-05-01 | Forms section | Single bullet list describing transparent inputs with bottom-only borders (the v1 cinema-form aesthetic, never built in v2) | Full form-card pattern: `#0a0a0a` card container with dashed-underline header, boxed inputs (`bg-#050505 border-#2a2a2a rounded-md`), pill chip group, foot row, form-button mirroring ButtonPrimary tokens, honeypot, success state. Reviews form in Phase 8 will reuse the same primitives. | The transparent-input pattern was carried over from the v1 design and was never actually built in this codebase. The mockup's Inquire form uses a fully-bounded card with proper input boxes — closer to the cinema-tech "control panel" motif than the bare input lines. Locking it now as a reusable pattern means Phase 8's Reviews form can drop into the same shape with no second design pass. |
| 2026-05-01 | Honeypot pattern | None — Phase 8 was going to introduce honeypot for Reviews | Honeypot pattern locked at the form-card level in Phase 7: hidden `<input name="website">` positioned `left: -9999px`, any value at submit = silent drop (UI shows success without POSTing) | Bot decoy. Real users never see or tab into the field; scrapers fill any input they can see in the markup. Silent drop avoids tipping off the bot that we caught it (returning an error would give the bot something to optimize against). The success state shown to a bot is harmless — no record reaches Formspree, no notification reaches Nathan. Reviews form in Phase 8 uses the same field name + position; Turnstile sits on top as the second layer for the moderation flow that actually writes to Sanity. |
| 2026-05-01 | Inquire contact list order | Mockup ordered: email → Instagram → Trinidad → Available for travel | Final order: email → Trinidad → Available for travel → Instagram | Email is the action — it leads. Geography signals scope (Caribbean-region work). "Available for travel" removes a common objection ("but you're not local to me?"). Instagram is the warm-pool fallback for visitors who'd rather lurk than email — moving it to last keeps the social proof from competing with the primary CTA. |
| 2026-05-01 | Inquire background glow flourish | None on prior scenes | Two decorative radial gradients positioned outside the section with negative offsets: top-right blue 13% (400×400), bottom-left green 7% (500×500). `overflow-hidden` on the section clips them so only the feathered edge bleeds in. | The Hero has its own glow flourish (blue bottom-left). Inquire is the bookend scene — same accent-color pair (primary blue + secondary green), inverted positioning (blue top-right instead of bottom-left), bigger softer green to read as ambient atmosphere. Keeps the visual rhythm balanced: the sequence opens and closes on glow-lit scenes. |
| 2026-05-01 | Project-type pill behavior | Implicit "default selected, click to toggle" pattern | Locked: always one pill selected. Clicking the active pill is a no-op. Default = first entry ("Brand Films"). projectType state is therefore always defined, and the form submission always carries a value. | The alternative (toggle-off + empty state) introduces an edge case where the visitor could submit without a project type. Either we'd need to validate it (adding error UI for a field that has no natural empty state), or accept blank submissions (giving Nathan less context). Forcing a default is the simplest correct choice — and the default is the most common case anyway, so most visitors don't have to interact with the pills at all. Same pattern will apply to any future single-select pill groups (Reviews form rating, etc.). |
| 2026-05-01 | Hero drone asset | Inline SVG component (`src/components/scenes/HeroDrone.tsx`) per 2026-04-29 entry | Removed entirely. Hero ships as typography + bottom-left glow + stats grid + scene meta only. | Drone illustration was carrying visual weight in the top-right but at the cost of a locked decorative element that didn't pull narrative weight. Considered swapping SVG for a real drone video clip but the mobile data cost on Digicel plans (typical 1–3GB/month for primary T&T audience) made even an aggressively compressed 500KB hero asset hard to justify against zero-payload alternatives. Removing both the SVG and the video idea lets typography (Bebas Neue display headline, mono eyebrow, mono stats grid) carry the cinematic register on its own — which is honest for a portfolio site where the work is the work, not the chrome. The bottom-left blue glow stays as the single decorative anchor. Drone concept parked for a future iteration; no Phase 9 video work needed. |

> After logging a change here, update the relevant section above so the current spec is always accurate.

---

*End of DESIGN-GUIDELINES — v1.0*
