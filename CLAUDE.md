# CLAUDE.md — Jack Visuals 2.0

> Instructions for Claude Code when building this project.
> Read `docs/PRD.md` and `docs/DESIGN-GUIDELINES.md` before writing any code.
> Operational checklist (what Jo does between phases) lives outside the repo — Jo manages it personally.

## 1. Project Overview
- **Name:** Jack Visuals 2.0
- **One-liner:** Cinematic video production portfolio for Nathan — Trinidad & Tobago. Director's monitor aesthetic, not a marketing page.
- **Stack:** Next.js 16, Tailwind CSS v4, Zustand, TypeScript, Sanity CMS, Formspree, Cloudflare Turnstile
- **Deployment:** Vercel (frontend + serverless API routes)
- **Repo:** https://github.com/jonel-richardson/JV23
- **Branch strategy:** Feature branches only. Never merge to main until complete.
- **Branch naming:** `phase-N/short-description` (e.g., `phase-2/nav-mobile-menu`)
- **Domain:** jackvisuals23.com
- **Sanity Project ID:** yqj0dj48 (carried over from v1, do not regenerate)

## 2. Confidence Rule
**Do not write or change any code until you reach 95% confidence in what needs to be built.**
- Ask follow-up questions until you hit that threshold.
- State your confidence level and what is unclear before proceeding.
- If a requirement is ambiguous, stop and ask. Never guess.
- Never mock data or fabricate endpoints. If you don't know, ask.
- If a Sanity field, Vimeo/YouTube ID, or environment variable is not set up yet, use clearly labeled placeholder content (e.g., `PLACEHOLDER_VIDEO_URL`). Never invent fake URLs or IDs.

## 3. File Index

Claude reads ONLY the files it needs. Update this index as files are added.

```
src/
├── app/
│   ├── layout.tsx              — Root layout, font loading, global providers
│   ├── page.tsx                — Homepage (8 scenes assembled here)
│   ├── globals.css             — Design tokens, container query setup, font variables
│   ├── work/page.tsx           — /work archive page with category filter
│   ├── review/page.tsx         — Public review submission form
│   ├── studio/[[...tool]]/page.tsx — Embedded Sanity Studio
│   ├── api/
│   │   └── reviews/route.ts    — POST endpoint: validate Turnstile + write to Sanity
│   ├── sitemap.ts              — Sitemap generation (see SEO.md)
│   └── robots.ts               — Robots config (see SEO.md)
├── components/
│   ├── Nav.tsx                 — Sticky nav + mobile menu
│   ├── scenes/
│   │   ├── Hero.tsx            — Scene 01
│   │   ├── About.tsx           — Scene 02
│   │   ├── FeaturedWork.tsx    — Scene 03
│   │   ├── TrustedBy.tsx       — Scene 04
│   │   ├── Kit.tsx             — Scene 05
│   │   ├── Services.tsx        — Scene 06
│   │   ├── Words.tsx           — Scene 07 (reviews carousel)
│   │   └── Inquire.tsx         — Scene 08
│   ├── ui/
│   │   ├── SceneMeta.tsx       — Top-right corner label (`SCENE_XX · LABEL`)
│   │   ├── EyebrowLabel.tsx    — `// XX — SECTION` mono label
│   │   ├── ButtonPrimary.tsx
│   │   ├── ButtonSecondary.tsx
│   │   ├── ProjectCard.tsx     — Used in FeaturedWork and /work
│   │   ├── CategoryTag.tsx     — Color-coded category pill
│   │   └── VideoEmbed.tsx      — Auto-detects Vimeo vs YouTube from URL
│   ├── animations/
│   │   ├── CameraScan.tsx      — Scroll-driven camera animation (Phase 8 decision gate)
│   │   └── IntroAnimation.tsx  — First-load intro sequence (Phase 9)
│   └── forms/
│       ├── InquireForm.tsx     — Formspree-backed contact form
│       └── ReviewForm.tsx      — Public review submission with Turnstile
├── lib/
│   ├── constants.ts            — All magic numbers, URLs, config values
│   ├── sanity.ts               — Sanity client + GROQ queries
│   ├── types.ts                — Shared TypeScript types/interfaces
│   ├── videoEmbed.ts           — URL parser: detects platform, extracts ID
│   └── utils.ts                — Shared utility functions
├── stores/
│   ├── useNavStore.ts          — Mobile menu open/closed, scroll-based nav fade
│   └── useWorkFilterStore.ts   — Category filter state for /work page
├── sanity/
│   ├── schemas/
│   │   ├── project.ts
│   │   ├── service.ts
│   │   ├── trustedBy.ts
│   │   ├── kit.ts
│   │   ├── review.ts
│   │   └── index.ts
│   └── sanity.config.ts
└── public/
    ├── images/
    │   ├── jack-nathan.jpg     — Static portrait (do not move to Sanity)
    │   ├── drone-hero.png      — Hero drone image
    │   └── og-cover.jpg        — 1200×630 social share image
    └── videos/
        └── camera-pan-viewfinder.mp4  — From v1, see Phase 8
```

> Update this map when you add a new file or directory.

## 4. Build & Dev Commands
```bash
npm install                 # Install dependencies
npm run dev                 # Start dev server (localhost:3000)
npm run build               # Production build
npm run lint                # ESLint check
npx tsc --noEmit            # Type check (must pass before merge)
npx playwright test         # E2E tests
npm test                    # Unit + integration (Jest + RTL)
```

## 5. Coding Conventions

### Architecture
- **Separation of concerns:** No business logic in components. Components render; hooks/stores manage state; lib handles logic.
- **No inline handlers:** Extract all event handlers to named functions.
- **Centralize constants:** Every magic number, URL, scroll threshold, animation duration, and config value lives in `lib/constants.ts`.
- **One Zustand store per domain:** `useNavStore`, `useWorkFilterStore`. Never cross-contaminate.
- **Scenes are isolated.** Each scene component contains all its own scoped styles. CSS for one scene must never affect another. If a class name like `.scene-meta` exists in two scenes, scope it via the section ID or use CSS Modules.

### Styling
- **Tailwind utility classes only.** No inline styles for layout. No CSS modules unless a scene's animation needs them.
- Design tokens (colors, fonts, spacing) defined in `globals.css` as CSS variables and exposed in `tailwind.config.ts`.
- **Container queries for scene-internal layout, viewport media queries outside the frame.** When you write a container query, add a brief inline comment on first use in each component (e.g. `/* @container frame: when scene container is 768px+ */`) so Jo can read along during review.
- **Responsive: mobile-first.** Base styles target mobile. Use container queries (`@container frame (min-width: 768px)` and `(min-width: 1024px)`) for tablet/desktop overrides inside scenes.
- **Color tokens are non-negotiable.** Never hardcode a hex value in a component. If a color is needed and not in DESIGN-GUIDELINES, stop and ask.

### Error Handling
- Every async function gets try/catch. No exceptions.
- No silent failures. Every catch block surfaces a meaningful message (`console.error` at minimum, user-facing toast/inline error when appropriate).
- API calls return `{ data, error }` or throw with descriptive messages.
- **Sanity fetches:** if a query returns empty, render a placeholder/empty state. Never blank-page the user.
- **Vimeo/YouTube embed fails:** show the project thumbnail as fallback, hide play button gracefully.
- **Formspree submission fails:** show error message inline, do NOT clear the form.
- **Turnstile token invalid:** reject the review submission with a clear error message, log the IP for rate-limit tracking.

### TypeScript
- No `any`. Use `unknown` and narrow, or define a proper type.
- Shared types live in `lib/types.ts` (e.g., `Project`, `Service`, `Review`, `TrustedBy`, `Kit`). Component-specific types live in the component file.
- All props get an interface. No inline prop typing.
- Sanity document types: define once in `lib/types.ts`, import everywhere.

### Git
- Commit messages: `type(scope): description` (e.g., `feat(words): add reviews carousel with autoplay`)
- Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- One logical change per commit. No "WIP" commits on main.
- Use "I" voice in commit message bodies when explaining decisions (assessment feedback).

## 6. Phase Protocol

### Structure
Each project is built in numbered phases. A phase is not complete until:
1. All acceptance criteria for that phase are met
2. `npm run build` passes with zero errors
3. `npx tsc --noEmit` passes
4. Tests for that phase pass (unit + integration; E2E from Phase 4 onward)
5. Jo confirms the phase is done

**Never start Phase N+1 until Phase N is confirmed complete.**

Reference `PROJECT-CHECKLIST.md` for the operational steps Jo runs between phases.

### Phases for This Project

| Phase | Goal | Status |
|---|---|---|
| 0 | Docs locked: PRD, DESIGN-GUIDELINES, CLAUDE.md, SETUP, SEO, NATHAN_GUIDE | In progress |
| 1 | Scaffold: Next.js 16 + Tailwind v4 + Sanity init + design tokens + font loading | Not started |
| 2 | Nav component + mobile menu | Not started |
| 3 | Hero scene (Scene 01) | Not started |
| 4 | Featured Work scene + `/work` archive page | Not started |
| 5 | About scene (Scene 02) | Not started |
| 6 | Trusted By + Kit + Services scenes (Scenes 04, 05, 06) | Not started |
| 7 | Words scene + public `/review` form + API route + Turnstile + moderation toggle | Not started |
| 8 | Inquire scene + Sanity Studio deploy + Nathan invite + camera animation decision gate | Not started |
| 9 | Video hosting decision (Vimeo vs YouTube confirmed with Nathan) → embed component → SEO + intro animation | Not started |
| 10 | QA + launch | Not started |

### Phase 1 — Scaffold
- [ ] Next.js 16 project initialized with TypeScript and App Router
- [ ] Tailwind CSS v4 configured
- [ ] DESIGN-GUIDELINES color tokens added to `globals.css` as CSS variables
- [ ] Three fonts loaded via `next/font/google`: Bebas Neue, Inter, JetBrains Mono — exposed as `--font-display`, `--font-body`, `--font-mono`
- [ ] Font variables wired into `tailwind.config.ts` as `font-display`, `font-body`, `font-mono`
- [ ] Container query setup on the root layout `.frame` element
- [ ] Sanity initialized with project ID `yqj0dj48`, dataset `production`
- [ ] All five schemas created: `project`, `service`, `trustedBy`, `kit`, `review` (specs in DESIGN-GUIDELINES section "Sanity Schemas")
- [ ] Schemas registered in `sanity.config.ts`
- [ ] `lib/constants.ts` with brand colors, breakpoints, social URLs
- [ ] `lib/types.ts` with TypeScript interfaces matching every Sanity schema
- [ ] `lib/sanity.ts` with client and all GROQ queries from DESIGN-GUIDELINES
- [ ] `.env.local` and `.env.example` set up with Sanity vars + Turnstile keys + Formspree endpoint
- [ ] All docs committed to repo: `CLAUDE.md` and `claude.local.md` at root, `docs/PRD.md`, `docs/DESIGN-GUIDELINES.md`, `docs/SETUP.md`, `docs/SEO.md`, `docs/NATHAN_GUIDE.md`

### Phase 2 — Nav Component
- [ ] `Nav.tsx` built — logo left, links + Inquire CTA right
- [ ] Sticky overlay, fades opacity slightly on scroll
- [ ] Inquire button scrolls to `#inquire`
- [ ] Mobile: 52px height with hamburger → full-screen menu drawer
- [ ] Desktop: 72px height with inline links
- [ ] `useNavStore` for mobile menu open/closed state
- [ ] Tested at 375 / 390 / 430 / 768 / 1280 / 1440 / 1920

### Phase 3 — Hero Scene
- [ ] `Hero.tsx` built — full viewport (`min-height: 100vh`)
- [ ] `#000` background
- [ ] Drone image floating top-right, blue glow bottom-left
- [ ] Eyebrow: `// 01 — TRINIDAD & TOBAGO` in mono
- [ ] Display headline: "CINEMATIC STORYTELLING" in Bebas Neue, line-height 0.92
- [ ] Body: "Where every frame tells a story."
- [ ] Two CTAs: "Start a project" (primary) → scrolls to Inquire; "View work →" (secondary) → links to `/work`
- [ ] Stats grid (3 columns mono): EST. 2023 / PROJECTS 47+ / REGION CARIBBEAN — hardcoded
- [ ] Container query: stats grid expands gap, headline scales up at 768px+ and 1024px+

### Phase 4 — Featured Work + `/work` Page
- [ ] `FeaturedWork.tsx` built (Scene 03)
- [ ] Fetches 3 projects where `featured == true` ordered by date desc from Sanity
- [ ] Mobile: horizontal scroll carousel with dot indicators
- [ ] Desktop: 3-column grid, hover reveals info + play button
- [ ] `CategoryTag.tsx` reusable — Brand = `#0066ff`, all others = `#888`
- [ ] "All Projects →" links to `/work`
- [ ] **Embed strategy: PLACEHOLDER POSTERS ONLY.** Real video embed component is built in Phase 9 after Nathan confirms Vimeo vs YouTube. For now, render the project thumbnail with a play icon overlay; clicking does nothing yet.
- [ ] `/work` page: fetches all projects ordered by date desc
- [ ] Filter tabs: All · Brand · Event · Music · Drone · Commercial (matches the fixed enum from DESIGN-GUIDELINES)
- [ ] `useWorkFilterStore` for filter state
- [ ] Filtering works without page reload
- [ ] Empty state per category if no projects
- [ ] Mobile: single column · Desktop: 3-column grid
- [ ] E2E test: filter changes, project count updates correctly

### Phase 5 — About Scene
- [ ] `About.tsx` built (Scene 02)
- [ ] Two-column desktop (sticky text left, portrait card right), single-column mobile
- [ ] Eyebrow: `// 02 — ABOUT`
- [ ] Display headline: "MEET<br>NATHAN."
- [ ] Body bio (static, hardcoded — Nathan can update via PR for v2)
- [ ] Portrait card uses `/public/images/jack-nathan.jpg`
- [ ] REC overlay on portrait: green dot + "REC" mono label top-right
- [ ] `// SHOT 01 · PORTRAIT` mono label top-left of portrait
- [ ] `// PORT OF SPAIN · TRINIDAD & TOBAGO` location footer
- [ ] Camera animation NOT included here yet — that's Phase 8

### Phase 6 — Trusted By + Kit + Services
- [ ] `TrustedBy.tsx` (Scene 04) — fetches all `trustedBy` ordered, renders logo grid
- [ ] Logo container: aspect-ratio 16/9, `#0a0a0a` background, 0.5px `#1a1a1a` border
- [ ] Logo image: `object-fit: contain`, max 75% container width
- [ ] Grayscale by default, full color on hover
- [ ] Grid: 2 cols mobile / 3 cols tablet / 4-5 cols desktop
- [ ] Alt text from `name` field on schema
- [ ] `Kit.tsx` (Scene 05) — fetches all `kit` ordered
- [ ] Display headline: "THE GEAR<br>BEHIND<br>THE SHOTS."
- [ ] Equipment grid with image, name, description per item
- [ ] `Services.tsx` (Scene 06) — fetches all `service` ordered
- [ ] Display headline: "SERVICES"
- [ ] Each service: title + description, simple list/grid layout

### Phase 7 — Words Scene + Review Submission Flow
- [ ] `Words.tsx` (Scene 07) — fetches `*[_type == "review" && approved == true]` ordered by submittedAt desc
- [ ] Carousel: one review visible at a time, dot navigation, progress bar, counter (`01 / 03`)
- [ ] Card structure: oversized `"` mark (Bebas Neue), review text (Inter), attribution block (clientName / role / project line)
- [ ] Project line uses mono with `#00ffa3` accent on project name
- [ ] Auto-advance every 7s, pause on hover
- [ ] Keyboard arrow navigation, `aria-live="polite"` on active quote
- [ ] **Public review form at `/review`:**
  - [ ] `ReviewForm.tsx` — fields: clientName, role, project (dropdown of published Sanity projects), reviewText (max 280 chars with counter), email (not displayed), Turnstile widget, honeypot field
  - [ ] Project dropdown queries `*[_type == "project"]` ordered by date desc
  - [ ] Form posts to `/api/reviews` route
- [ ] **API route `/api/reviews/route.ts`:**
  - [ ] Validates Turnstile token server-side via Cloudflare API
  - [ ] Rejects if honeypot field is filled
  - [ ] Rate-limits by IP (Vercel built-in or simple in-memory if cold-starts allow)
  - [ ] Writes to Sanity using `SANITY_WRITE_TOKEN` (server-side env var ONLY, never client)
  - [ ] Sets `approved: false`, `submittedAt: now()`
  - [ ] Returns `{ ok: true }` on success, descriptive error otherwise
- [ ] Success state: thank-you message, no redirect
- [ ] Sanity: `approved` toggle visible to Nathan as Editor; he flips ON to publish
- [ ] **Spam test before phase complete:** submit with honeypot filled → rejected. Submit without Turnstile token → rejected.

### Phase 8 — Inquire + Studio Deploy + Camera Animation Decision
- [ ] `Inquire.tsx` (Scene 08) — Formspree form
- [ ] Mobile: eyebrow → headline → form → footer stack
- [ ] Desktop: two columns (headline+sub left, form+button right)
- [ ] Fields: name (required), email (required), message
- [ ] Submit button: "Start a Conversation" with `clip-path` shape
- [ ] Footer: Instagram + email links
- [ ] **Sanity Studio deploy:**
  - [ ] `/studio` route embedded in app
  - [ ] Studio deployed at `jackvisuals23.com/studio` (after domain connect, see SETUP.md)
  - [ ] Nathan invited via `nathan@rjaonline.com` with Editor role
  - [ ] Featured project validation warning works (>3 featured triggers warning)
  - [ ] Nathan tested adding a project, service, trustedBy, kit, and review approval
- [ ] **Camera animation decision gate (criteria in DESIGN-GUIDELINES):**
  - [ ] Implement camera scan-wipe animation in About → Featured Work transition
  - [ ] Test on iPhone 14 — must hold 60fps
  - [ ] Subjective check: does it match cinema-tech aesthetic, or feel like leftover ornament?
  - [ ] Decision logged in DESIGN-GUIDELINES change log: KEEP or DROP
  - [ ] If DROP: replace with static photo + simple fade transition
  - [ ] `prefers-reduced-motion` always respected

### Phase 9 — Video Hosting Decision + Embed + SEO + Intro Animation
- [ ] **Decision gate: confirm Vimeo vs YouTube with Nathan.** Decision logged in DESIGN-GUIDELINES change log.
- [ ] `lib/videoEmbed.ts` — parser detects platform from URL pattern, extracts video ID
- [ ] `VideoEmbed.tsx` — renders correct iframe (Vimeo or YouTube) based on detected platform
- [ ] Vimeo URLs: `https://player.vimeo.com/video/{id}?title=0&byline=0&portrait=0`
- [ ] YouTube URLs: `https://www.youtube.com/embed/{id}?modestbranding=1&rel=0`
- [ ] Plug into `ProjectCard.tsx` (replaces Phase 4 placeholder)
- [ ] Test: paste a Vimeo URL → embed renders. Paste a YouTube URL → embed renders. Bad URL → fallback poster.
- [ ] **SEO (full spec in SEO.md):**
  - [ ] `app/layout.tsx` metadata export configured
  - [ ] OG image at `/public/images/og-cover.jpg` (1200×630, under 200KB)
  - [ ] `StructuredData.tsx` JSON-LD on homepage
  - [ ] `app/sitemap.ts` and `app/robots.ts`
  - [ ] Canonical tags
  - [ ] Bebas Neue preloaded
  - [ ] Sanity fetches use `next: { revalidate: 3600 }`
  - [ ] All images have descriptive alt text
- [ ] **Intro animation (`IntroAnimation.tsx`):**
  - [ ] First-load only (sessionStorage flag prevents re-trigger)
  - [ ] Real camera photo sliced via CSS clip-path layers
  - [ ] Layers drift apart, fly off screen, hero revealed
  - [ ] Skipped if `prefers-reduced-motion`

### Phase 10 — QA + Launch
- [ ] All unit + integration tests passing
- [ ] All E2E tests passing (Playwright)
- [ ] Lighthouse Performance > 80 on mobile
- [ ] Lighthouse SEO > 90
- [ ] OG tested at developers.facebook.com/tools/debug
- [ ] Structured data tested at search.google.com/test/rich-results
- [ ] Sitemap accessible at /sitemap.xml
- [ ] /studio/ blocked in robots.txt
- [ ] All sections tested at all target breakpoints (375 / 390 / 430 / 768 / 1280 / 1440 / 1920)
- [ ] Form submits → email arrives at nathan@rjaonline.com
- [ ] Review form submits → review lands in Sanity unapproved → Nathan approves → appears on site
- [ ] Spam test: honeypot-filled submission rejected; Turnstile-failed submission rejected
- [ ] Vimeo/YouTube embeds playing correctly
- [ ] Error states tested (embed fail, form fail, empty Sanity)
- [ ] Real iPhone + Android tested
- [ ] Domain connected, SSL active
- [ ] Nathan published a real project end-to-end without help

## 7. Read Before Write

Before editing any file:
1. Read its current contents first.
2. After any successful edit, the previous view is stale. Re-read before making another edit to the same file.
3. Never assume file state from memory or earlier context.
4. When editing a Sanity schema, also check `lib/types.ts` — schema and TS interface must stay in sync.

## 8. Change Protocol

When a direction change or update is needed:
1. Jo describes the change.
2. You confirm understanding and list affected files.
3. Jo approves the direction.
4. You update all affected files (code, CLAUDE.md phase table, DESIGN-GUIDELINES change log if visual, any other docs).
5. You provide a summary of every change made.
6. You provide a detailed commit message at the end of the summary.

**No commit happens without a summary first.**

## 9. Summary & Commit Format

After every meaningful update, provide:

```
### Summary
- What changed and why
- Files added/modified/deleted
- Any open questions or follow-ups

### Commit
git add [files]
git commit -m "type(scope): concise description

- Detail 1
- Detail 2
- Detail 3"
```

## 10. Compaction Protocol

- **After 4 compactions:** write a session summary capturing current phase, completed, in progress, blockers, decisions, next step. Then alert Jo to `/clear`.
- **Storage:** Jo pastes session summary into `claude.local.md` Session Log. Read that log first on next session.
- **Session summary format:**
  ```
  ## Session Summary — [Date]
  **Phase:** N
  **Completed:** [list]
  **In progress:** [list]
  **Decisions:** [list]
  **Blockers:** [list]
  **Next step:** [specific next action]
  ```
- **Between tasks:** Jo runs `/clear` to drop stale context.
- **Keep responses tight:** No preamble, no restating the question, no filler paragraphs.

## 11. Quality Checklist (Pre-Merge)

Before any branch merges to main:
- [ ] `npm run build` passes (zero errors, zero warnings)
- [ ] `npx tsc --noEmit` passes
- [ ] No `console.log` left in production code (`console.error` is fine for error handlers)
- [ ] No hardcoded values (everything in `constants.ts`)
- [ ] No `any` types
- [ ] Error handling on all async operations
- [ ] Responsive at mobile / tablet / desktop breakpoints (verified at 390 / 768 / 1280 minimum)
- [ ] All scenes pass keyboard navigation
- [ ] `prefers-reduced-motion` respected on animation phases
- [ ] README updated if public-facing behavior changed

## 12. Rules (Enforcement Layer)

These are non-negotiable. If any rule conflicts with a request, flag it.

1. Never mock data or guess at endpoints. Use clearly labeled placeholders.
2. Never merge to main until a branch is complete and confirmed.
3. Never skip error handling, even on "simple" functions.
4. Never use `any` in TypeScript.
5. Always separate concerns: components render, hooks/stores manage state, lib handles logic.
6. Always centralize constants.
7. Always ask before making changes you are not 95% confident about.
8. Always provide a summary and commit message after updates.
9. Always read a file before editing it.
10. Prefer targeted fixes over full rebuilds.
11. **Design changes require a change log entry in DESIGN-GUIDELINES.md before updating code.**
12. **Sanity schemas are locked. Schema changes require Jo's explicit approval AND a change log entry.**
13. **The `SANITY_WRITE_TOKEN` only ever appears in server-side code (API routes, never imported into a component). If you find yourself needing it client-side, stop and ask.**
14. **Scene components are isolated.** A class name in one scene cannot affect another. Use scoped IDs or CSS Modules.
15. **Container queries are used for scene-internal layout.** Comment the first container query block in each component so Jo can review.

## 13. Documentation Cross-References

- **`docs/PRD.md`** — Why we're building this, success metrics, scope, risks
- **`docs/DESIGN-GUIDELINES.md`** — Visual system, component patterns, Sanity schemas (the visual + data spec)
- **`docs/SETUP.md`** — External accounts, deployment, environment variables
- **`docs/SEO.md`** — Meta tags, OG, structured data, performance rules
- **`docs/NATHAN_GUIDE.md`** — Nathan-facing CMS instructions
- **`README.md`** — Public-facing project description (root)
- **`claude.local.md`** — Session logs, machine-specific notes (gitignored, root)

When in doubt, check in this order: `CLAUDE.md` → `docs/PRD.md` → `docs/DESIGN-GUIDELINES.md` → `docs/SETUP.md` / `docs/SEO.md` → ask Jo.

---

*End of CLAUDE.md — v1.0*
