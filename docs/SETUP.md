# SETUP.md — Jack Visuals 2.0
> External Accounts, Deployment & Embedding Guide
> For: Jonel (Developer)
> Last updated: April 2026 · v2.0

---

## Overview — What Needs to Be Set Up and When

```
PHASE 1: Local Development (NOW)
  ✅ GitHub repo exists — jonel-richardson/JV23
  ✅ Sanity account exists — project ID: yqj0dj48
  ✅ Cloudflare account exists (no domain yet — that's fine)
  □ Set up Cloudflare Turnstile site (works on localhost during dev)
  □ Run locally at localhost:3000

PHASE 2: Pre-Launch Accounts (Before deploying)
  □ Vercel — hosting + auto-deploy from GitHub
  □ Vimeo Pro OR YouTube — video hosting (Nathan picks at Phase 9)
  □ Formspree — contact form (Nathan's account)
  □ Sanity write token — for review submissions

PHASE 3: Launch (When Nathan is ready)
  □ Nathan buys jackvisuals23.com domain
  □ Connect domain to Vercel
  □ Add domain to Cloudflare Turnstile site config
  □ Deploy Sanity Studio
  □ Invite Nathan to Sanity as editor
```

---

## PHASE 1 — Local Development

Repo and Sanity project already exist. Clone and run:

```bash
git clone https://github.com/jonel-richardson/JV23.git
cd JV23
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

To share with Nathan for review without deploying:
```bash
npx localtunnel --port 3000
```
Gives a temporary public URL. No domain or deployment required.

---

## PHASE 2 — Pre-Launch Accounts

---

### 1. Sanity CMS ✅ Already Set Up

**Account:** Jonel's account
**Project ID:** `yqj0dj48`
**Purpose:** Nathan's content editing interface. He logs into the Studio to manage projects, services, trusted-by, kit, and reviews without touching code.

**Five document types (locked in DESIGN-GUIDELINES):**
- **project** — title, category (enum), videoUrl, description, date, featured
- **service** — title, description, order
- **trustedBy** — name, logo (image), order
- **kit** — name, description, image, order
- **review** — clientName, role, project (reference), reviewText, email, submittedAt, approved

**Initialize Sanity in the project (embedded studio pattern — no Sanity CLI):**

The Sanity Studio is embedded directly inside this Next.js app at `/studio`. We do NOT use `npx sanity init`, which scaffolds a standalone studio in its own directory. Instead, we install `next-sanity` and hand-write the config + route file.

```bash
npm install next-sanity sanity @sanity/vision @sanity/client @sanity/image-url
```

Then create three files by hand:

1. `sanity.config.ts` at the **repo root** — defines projectId, dataset, plugins, and registers the five schema types. Imports schemas from `src/sanity/schemas/index.ts`.
2. `src/sanity/schemas/*.ts` — one file per document type (`project`, `service`, `trustedBy`, `kit`, `review`) plus an `index.ts` barrel.
3. `src/app/studio/[[...tool]]/page.tsx` — mounts the studio using `NextStudio` from `next-sanity/studio`, passing the root `sanity.config.ts`. This makes the studio available at `localhost:3000/studio` (and `jackvisuals23.com/studio` once the domain is connected).

No separate `sanity-studio/` directory. No Sanity CLI scaffold. Single Next.js app, single deploy.

**Sanity client config:**
```ts
// lib/sanity.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'yqj0dj48',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Server-side write client for review submissions ONLY
// SANITY_WRITE_TOKEN must NEVER be imported into a client component
export const writeClient = createClient({
  projectId: 'yqj0dj48',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // server env var only
})
```

**GROQ queries** — full set in DESIGN-GUIDELINES section "Sanity Schemas".

**Generate the Sanity write token (needed for review submissions):**
1. Go to sanity.io/manage → select the Jack Visuals project (yqj0dj48)
2. API → Tokens → Add API token
3. Name it: `JV23 review submissions (server only)`
4. Permissions: **Editor** (write access to all documents)
5. Copy the token. Add to `.env.local` as `SANITY_WRITE_TOKEN=...`
6. **Never commit this token. Never import it into a component file. It lives only in the API route at `app/api/reviews/route.ts`.**

**Deploy Sanity Studio** (Phase 8):

The primary access path for Nathan is the embedded studio at **`jackvisuals23.com/studio`** — it ships automatically with every Vercel deploy of the Next.js app, no separate deploy step. This is what we want him using day-to-day.

The standalone Sanity-hosted studio (`*.sanity.studio`) is optional and only used as a fallback before the production domain is connected. If we need it during Phase 8 development:

```bash
npx sanity deploy
# Choose studio hostname — e.g. jack-visuals-studio.sanity.studio
```

Once the production domain is live, point Nathan at `jackvisuals23.com/studio` and the standalone hostname can be retired or left dormant.

**Invite Nathan as editor** (Phase 8 / launch):
1. Go to sanity.io/manage → select the project
2. Members → Invite → enter `nathan@rjaonline.com`
3. Role: **Editor** (can manage content, cannot change schemas)
4. Nathan receives an email invite, sets his own password
5. Login URL after launch: `jackvisuals23.com/studio`

---

### 2. Cloudflare Turnstile (NEW for v2)

**Account:** ✅ Jonel's Cloudflare account exists
**Cost:** Free, unlimited
**Purpose:** Spam protection on the public review submission form at `/review`. Invisible to users most of the time, no CAPTCHA puzzles.

**Why Turnstile and not reCAPTCHA:** Free, privacy-respecting, no Google dependency, simpler integration.

**Steps:**
1. Go to dash.cloudflare.com → Turnstile (in the left sidebar)
2. Click "Add site"
3. **Site name:** `Jack Visuals JV23`
4. **Domain (during development):** `localhost`
5. **Widget mode:** Managed (Cloudflare decides when to challenge — this is the invisible default)
6. Save → Cloudflare gives you a **Site Key** and a **Secret Key**
7. Add to `.env.local`:
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=<the site key>
   TURNSTILE_SECRET_KEY=<the secret key>
   ```

**No domain yet — does Turnstile still work?** Yes. `localhost` is a valid domain for Turnstile during development. When Nathan buys `jackvisuals23.com`, just go back to the same Turnstile site config and add the new domain. No code changes needed.

**Adding the production domain later (Phase 10):**
1. Cloudflare → Turnstile → click your site
2. Add `jackvisuals23.com` to the domains list
3. Save. The same site key now works on both localhost and production.

**How Turnstile flows in the review form:**
- The widget renders client-side using `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public, safe to expose)
- User submits the form → Turnstile generates a token
- Server route (`/api/reviews`) calls Cloudflare's verify endpoint with `TURNSTILE_SECRET_KEY` to confirm the token is valid
- If valid → Sanity write goes through. If invalid → 403 returned to client.

---

### 3. Vercel

**When to set up:** Phase 9 onward, when ready to deploy a preview.
**Cost:** Free tier is enough.
**Purpose:** Hosts the live site. Auto-deploys from GitHub.

**Whose account:** Jonel — Nathan does not need a Vercel account.

**Steps:**
1. Go to vercel.com → Sign up with GitHub
2. "Add New Project" → Import `jonel-richardson/JV23`
3. Build settings (Next.js auto-detected):
   - Build command: `npm run build`
   - Output directory: `.next`
4. **Add environment variables:**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=yqj0dj48
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=<from Cloudflare>
   TURNSTILE_SECRET_KEY=<from Cloudflare>
   SANITY_WRITE_TOKEN=<from Sanity API tokens>
   FORMSPREE_ENDPOINT=<Nathan's Formspree URL>
   ```
5. Deploy

Every push to `main` auto-deploys. Feature branches get preview URLs automatically.

**Verify environment variable scoping:**
- `NEXT_PUBLIC_*` variables are exposed to the browser. Anything secret must NOT use this prefix.
- `TURNSTILE_SECRET_KEY` and `SANITY_WRITE_TOKEN` are server-only. Verify in Vercel that they are NOT marked as `NEXT_PUBLIC_*`.

---

### 4. Vimeo Pro OR YouTube (Decision deferred to Phase 9)

**When to confirm with Nathan:** Phase 9 decision gate.
**Why deferred:** The schema uses a generic `videoUrl` field. The embed component auto-detects the platform from the URL, so the choice doesn't affect any earlier phase.

**Vimeo Pro option:**
- Cost: ~$20/mo, Nathan's account
- Removes Vimeo branding, allows domain-restricted embeds
- Better aesthetic match for cinematic work

**YouTube option:**
- Free
- Better discoverability (YouTube search, suggested videos)
- More aggressive branding (logo, end screens)
- Requires Nathan to disable suggested videos via embed parameters

**Setup (whichever Nathan picks):**

**For Vimeo Pro:**
1. Sign up at vimeo.com as Nathan → upgrade to Pro
2. Upload videos
3. Per-video privacy: "Only on sites I choose" → add `jackvisuals23.com`
4. Copy URLs into Sanity (e.g., `https://vimeo.com/123456789`)

**For YouTube:**
1. Sign up at youtube.com as Nathan → upload videos
2. Set each video to "Unlisted" or "Public" depending on Nathan's preference
3. Copy URLs into Sanity (e.g., `https://www.youtube.com/watch?v=abc123`)

The `VideoEmbed.tsx` component built in Phase 9 handles both URL formats automatically.

---

### 5. Formspree

**When to set up:** Phase 8.
**Cost:** Free (50 submissions/month).
**Purpose:** Contact/inquire form. No backend needed.

**Whose account:** Nathan's — submissions go to him.

**Steps:**
1. formspree.io → Sign up as Nathan
2. New Form → "Jack Visuals Contact"
3. Destination email: `nathan@rjaonline.com`
4. Copy endpoint URL (looks like `https://formspree.io/f/xabcdefg`)
5. Add to `.env.local` as `FORMSPREE_ENDPOINT=...`

---

## PHASE 3 — Domain & Launch

**Whose account:** Nathan's — he buys the domain.

**Steps:**
1. Nathan buys `jackvisuals23.com` at Namecheap or similar (~$12/yr)
2. Vercel → Project settings → Domains → Add `jackvisuals23.com`
3. Vercel provides nameservers or CNAME record
4. Nathan updates DNS at his registrar
5. DNS propagates 24–48 hours
6. Vercel auto-provisions SSL (HTTPS)
7. **Add `jackvisuals23.com` to the Cloudflare Turnstile site config** (see Turnstile section above)

---

## Quick Reference — Account Status

| Account | Whose | Status | Cost |
|---|---|---|---|
| GitHub (jonel-richardson/JV23) | Jonel | ✅ Exists | Free |
| Sanity (yqj0dj48) | Jonel | ✅ Exists | Free |
| Cloudflare (Turnstile) | Jonel | ✅ Account exists, □ Site to be configured | Free |
| Sanity Editor (Nathan) | Nathan (invite) | □ Phase 8 | Free |
| Sanity write token | Jonel | □ Phase 7 (when API route is built) | Free |
| Vercel | Jonel | □ Phase 9 | Free |
| Vimeo Pro OR YouTube | Nathan | □ Phase 9 (decision gate) | $20/mo OR Free |
| Formspree | Nathan | □ Phase 8 | Free |
| Domain | Nathan | □ Pre-launch | ~$12/yr |

---

## Environment Variables — Full List

```bash
# .env.local (gitignored)

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=yqj0dj48
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=                    # server only — for review submissions

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=        # public, exposed to browser
TURNSTILE_SECRET_KEY=                  # server only — verify endpoint

# Formspree (Phase 8)
FORMSPREE_ENDPOINT=
```

```bash
# .env.example (committed — placeholder values only)

NEXT_PUBLIC_SANITY_PROJECT_ID=yqj0dj48
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_write_token_here
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key_here
TURNSTILE_SECRET_KEY=your_turnstile_secret_key_here
FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

---

## Local vs Live — What Works Where

| Feature | Local (localhost) | Vercel Preview | Live (domain) |
|---|---|---|---|
| See the site | ✅ | ✅ | ✅ |
| Nathan reviews design | Share localtunnel URL | ✅ | ✅ |
| Vimeo/YouTube embeds | ✅ (if domain whitelisted on Vimeo) | ✅ | ✅ |
| Sanity content reads | ✅ | ✅ | ✅ |
| Nathan edits content | ✅ (via Studio URL) | ✅ | ✅ |
| Contact form | ✅ | ✅ | ✅ |
| Review form + Turnstile | ✅ (localhost domain in Turnstile config) | ✅ (Vercel preview URL needs to be added to Turnstile) | ✅ |
| Custom domain | ❌ | ❌ | ✅ |

**Heads up on Vercel preview URLs and Turnstile:** Each Vercel preview gets a unique URL like `jv23-abc123.vercel.app`. To test review submissions on a preview, you need to add the preview domain to the Turnstile site config OR use a wildcard like `*.vercel.app` (looser security but easier for testing).

---

*End of SETUP.md — v2.0*
