# PRD — Jack Visuals 2.0

> Cinematic video production portfolio site for Nathan (Trinidad & Tobago)
> Owner: Jonel Richardson · Client: Nathan · Last updated: April 2026 · v1.3

---

## 1. Problem & Goal

Nathan runs Jack Visuals, a cinematic video production company in Trinidad & Tobago. His current discovery channel is Instagram (@jackvisuals23), but Instagram does not convert. Visitors who tap the bio link land on a portfolio that does not match the cinematic quality of his work, and there is no clear path from "I like this" to "I want to inquire."

**Goal:** A portfolio site that does three things, in order:
1. Make a first impression that matches the production value of his videos
2. Move Instagram visitors to inquiry within 90 seconds
3. Let Nathan publish new work without touching code

This is v2. v1 is being archived. The new repo is `jonel-richardson/JV23`.

---

## 2. Users

**Primary visitor — Brand or event organizer (Caribbean region):**
Lands from Instagram. Is on mobile. Has 30 seconds of patience. Wants to know: is this person legit, what have they shot, can I hire them.

**Secondary visitor — Music artist or production company:**
Lands from a referral or search. Is on desktop. Wants to scrub through the portfolio quickly.

**Content owner — Nathan:**
Edits projects, services, and trusted-by clients through Sanity Studio. Does not write code. Needs the editing flow to be obvious enough that he does not call me at midnight.

---

## 3. Scope

### In scope (v2)

- Single-page homepage with 8 scenes in this locked order: Hero → About → Featured Work → Trusted By → Kit → Services → Words (Reviews) → Inquire
- Standalone `/work` page with full project archive and category filtering
- Sanity-driven content for: projects, services, trusted-by (with logo upload), kit, reviews
- Video embeds with platform-agnostic `videoUrl` field (works with Vimeo or YouTube). Final hosting choice deferred to a Phase 9 decision gate, confirmed with Nathan before launch. Schema does not change either way.
- Public review submission flow at `jackvisuals23.com/review` — single generic URL, form includes a project dropdown referencing Nathan's published Sanity projects
- Review form collects every field the displayed review card needs (no hardcoded data on the front end), plus email + Turnstile token for verification only
- Auto-publish with moderation gate: review lands in Sanity with `approved: false`, Nathan toggles `approved: true` in Studio to publish
- Free spam protection: Cloudflare Turnstile (free, unlimited, invisible) + honeypot field + IP rate-limit via Vercel serverless
- Formspree contact form routed to `nathan@rjaonline.com`
- `/studio` route for Nathan's CMS access
- SEO baseline (meta, OG, structured data, sitemap, robots) — see `SEO.md`
- Mobile-first responsive at 375 / 390 / 430 / 768 / 1280 / 1440 / 1920
- Adapt the camera scan-wipe animation (reusing v1's `camera-pan-viewfinder.mp4`) to the new aesthetic IF it works visually. Photo-only fallback if not. Decision gate at Phase 8.

### Out of scope (v2)

- Blog, journal, or written content beyond project descriptions
- Client login / project preview portal
- Booking calendar or payment processing
- Email newsletter signup
- Multi-language (English only at launch; Caribbean audience reads English)
- Analytics dashboard for Nathan (Vercel Analytics is enough)

### Explicit deferrals (potential v3)

- Behind-the-scenes video log
- Per-project case study pages
- Equipment rental inquiry flow

---

## 4. Success Metrics

These are KPIs I will measure in the first 60 days post-launch, not vanity metrics. Each has a data source named.

| Metric | Target | Source |
|---|---|---|
| Time from Instagram bio tap to Inquire scroll | < 90 sec median | Vercel Analytics + scroll-depth event |
| Inquiry form submissions per month | 5+ | Formspree dashboard |
| Lighthouse Performance score | > 80 | Lighthouse CI on Vercel preview |
| Lighthouse SEO score | > 90 | Lighthouse CI on Vercel preview |
| Largest Contentful Paint (mobile) | < 2.5s | Vercel Speed Insights |
| Bounce rate from `/` | < 60% | Vercel Analytics |
| Nathan publishes a project unassisted | Yes | Self-reported, tested in Phase 7 |

---

## 5. Constraints

**Locked:**
- Sanity Project ID `yqj0dj48` — keep, do not regenerate
- Domain `jackvisuals23.com` — Nathan owns it
- Nathan's editor email `nathan@rjaonline.com`
- Vimeo Pro budget (~$20/mo, Nathan's account)
- Free tier hosting (Vercel)

**Hard rules:**
- No autoplay video with sound on first load
- No splash screen that blocks the hero
- No popup asking for email or cookies on first visit
- `/studio/` blocked from search indexing
- Vimeo embeds must be domain-restricted to `jackvisuals23.com`

**Tech stack (locked unless I have a real reason to deviate):**
Next.js 16 · Tailwind CSS v4 · Zustand · TypeScript · Sanity CMS · Formspree · Vimeo · Vercel

---

## 6. Risks & Open Questions

### Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Camera animation does not adapt cleanly to new aesthetic | Medium | Photo-only fallback decided at Phase 8 gate. Do not block earlier phases on this. |
| Nathan's video account (Vimeo or YouTube) not set up by Phase 4 | Medium | Use clearly labeled placeholder video URLs, swap at Phase 7. Schema is platform-agnostic so this does not block. |
| Sanity schema needs change mid-build | Low | Document changes in DESIGN-GUIDELINES change log, never silently. |
| Nathan finds Sanity Studio confusing | Medium | NATHAN_GUIDE.md walkthrough, optional 15-min Loom |
| Review form receives spam or abuse | High if unprotected | Cloudflare Turnstile + honeypot + rate limit by IP. Reviews land in Sanity as unapproved by default — Nathan must toggle `approved=true` to publish. |
| Sanity write token leaks to client bundle | High if mishandled | Token lives ONLY in server-side env var. All review submissions go through Next.js API route, never direct from browser. |
| Logo uploads break layout (varying aspect ratios, transparency missing) | Medium | NATHAN_GUIDE.md specifies PNG with transparent background, max 200KB, recommended dimensions. Schema enforces with image hotspot. |
| Design changes on a locked decision | Medium | CLAUDE.md rule 11 enforces change-log entry before code change |

### Open questions to resolve before DESIGN-GUIDELINES

None remaining. Schemas are fully locked. Moving to DESIGN-GUIDELINES.

### Resolved (locked into the build)

- ✅ Scene order: Hero → About → Featured Work → Trusted By → Kit → Services → Words → Inquire
- ✅ Hero stats hardcoded (`EST. 2023`, `PROJECTS 47+`, `REGION CARIBBEAN`)
- ✅ Scene meta labels hardcoded, decorative only
- ✅ Portrait image stays static at `/public/images/jack-nathan.jpg`
- ✅ Camera animation reuses v1's `camera-pan-viewfinder.mp4`
- ✅ Kit section is a Sanity document type (Nathan can add gear)
- ✅ Trusted By logos uploaded to Sanity. Image field accepts any format. NATHAN_GUIDE recommends transparent PNG or SVG, ~240px wide, under 500KB. No URL field for v2.
- ✅ Video hosting decision deferred to Phase 9 — schema is platform-agnostic so build is not blocked
- ✅ Review URL: `jackvisuals23.com/review` (generic, single link)
- ✅ Review form fields match the displayed card 1:1 (clientName, role, project reference, reviewText) plus email + Turnstile token for verification
- ✅ Reviews auto-publish with `approved: false` default, Nathan toggles to publish
- ✅ Reviews are sent AFTER project is published — no "project not yet uploaded" edge case
- ✅ Spam protection: Cloudflare Turnstile (free) + honeypot + IP rate-limit
- ✅ Categories: fixed enum — Brand · Event · Music · Drone · Commercial

---

## 7. Build Phases (high-level — full checklist lives in CLAUDE.md)

| Phase | Goal | Status |
|---|---|---|
| 0 | Docs locked: PRD, DESIGN-GUIDELINES, CLAUDE.md, SETUP, SEO, NATHAN_GUIDE | In progress |
| 1 | Scaffold: Next.js 16, Tailwind v4, Sanity init, design tokens in globals.css | Not started |
| 2 | Nav + mobile menu | Not started |
| 3 | Hero scene | Not started |
| 4 | Featured Work + `/work` page (placeholder embeds — real player swapped in Phase 9) | Not started |
| 5 | About scene | Not started |
| 6 | Trusted By + Kit + Services scenes (with logo upload, Sanity-driven kit) | Not started |
| 7 | Words scene + public review form at `/review` + Sanity API route + Turnstile + moderation toggle | Not started |
| 8 | Inquire + Sanity Studio deploy + Nathan invite + camera animation decision gate | Not started |
| 9 | **Decision gate: confirm Vimeo vs YouTube with Nathan** → build the video embed component → SEO + intro animation | Not started |
| 10 | QA + launch | Not started |

---

## 8. Definition of Done (v2 ships when)

- All 10 phases complete and signed off
- Lighthouse Performance > 80, SEO > 90 on mobile
- Nathan has logged into Sanity Studio, added a real project, and seen it appear on the live site without my help
- Nathan has uploaded a Trusted By logo and seen it render correctly
- Review submission flow tested end-to-end: client submits via public form → review lands in Sanity as unapproved → Nathan toggles approved → review appears on live site
- Spam protection verified: a submission with the honeypot field filled is rejected
- Form submission test from real device → email arrives at `nathan@rjaonline.com`
- Domain `jackvisuals23.com` is live with HTTPS
- All 7 metrics in section 4 have a measurement plan in place (not all hit on day one — but measurable)

---

*End of PRD — v1.3*
