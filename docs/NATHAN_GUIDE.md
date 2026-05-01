# How to Update Your Portfolio — Jack Visuals

> Your guide to managing the Jack Visuals website.
> Last updated: April 2026 · v2.0

---

## Logging In

**During development:**
Go to `https://jack-visuals-studio.sanity.studio` (or whatever URL Jonel sends you)

**After the site launches:**
Go to `https://jackvisuals23.com/studio`

1. Click **Login with Google**
2. Use the email address we invited: `jackltd23@gmail.com`

---

## What You Can Manage

The Studio gives you five sections in the left sidebar:

1. **Project** — your video work
2. **Service** — what you offer (Event Videography, Brand Films, etc.)
3. **Trusted By** — client and brand logos that appear in the "Trusted By" section
4. **Kit** — the camera and equipment you use, shown in "The Gear Behind The Shots"
5. **Review** — client testimonials submitted via your review link

Each section works the same way: click the **+** button to add, click an existing item to edit, click **Publish** to save.

---

## Adding a New Project

1. Click **Project** in the left sidebar
2. Click the **+** button at the top
3. Fill in the fields:
   - **Title:** The name of the project (e.g., "Grey Goose Launch Event")
   - **Category:** Pick one — **Brand · Event · Music · Drone · Commercial**
   - **Video URL:** Paste your Vimeo or YouTube link (e.g., `https://vimeo.com/123456789` or `https://youtube.com/watch?v=abc`)
   - **Description (optional):** A brief description of the project
   - **Date:** The date of the project or shoot
   - **Featured on homepage:** Toggle ON if you want this on the homepage. Maximum 3 featured projects allowed.
4. Click **Publish** at the bottom

Your project will appear on the site within 1 minute.

---

## Editing or Deleting a Project

**To edit:**
1. Click **Project** in the sidebar
2. Click the project you want to edit
3. Make your changes → click **Publish**

**To delete:**
1. Open the project
2. Click the **three dots menu** (⋯) at the top right
3. Select **Delete** → confirm
4. **Important:** Publish the deletion (you'll see a deleted draft to publish)

---

## Featured Projects — How It Works

- Maximum 3 projects can be featured on the homepage at any time
- If you try to feature a 4th project, you'll see this message:
  *"There are already 3 featured projects. Un-feature another project first."*
- To swap: open a currently featured project → toggle **Featured** OFF → publish. Then feature the new one.

---

## Managing Services ("What We Offer")

1. Click **Service** in the left sidebar
2. Click **+** to add a new service
3. Enter:
   - **Title:** Name of the service (e.g., "Event Videography")
   - **Description:** Short paragraph
   - **Order:** A number — lower numbers appear first (1 = first, 2 = second, etc.)
4. Click **Publish**

---

## Managing "Trusted By" Logos

This is where client and brand logos appear on the homepage.

**Adding a new brand is a two-step process — you don't upload the logo yourself.** Brand logos need quality control (transparent backgrounds, consistent sizing, optimization), so I process them and ship them with the code. You then create the matching record in the Studio.

### How to add a new brand

1. **Message me with the brand name and logo** (any format — PNG, SVG, even a screenshot). I clean it up, save it as a transparent PNG in the right size, commit, and push. Auto-deploy makes the file available within a minute.
2. **In the Studio, click Trusted By → +** to create a new record.
3. Fill in:
   - **Client / Brand Name:** The exact brand name (e.g., "Grey Goose"). This is the alt text screen readers announce.
   - **Slug:** Auto-generates from the name. **Verify it matches the filename I gave you** (e.g., `grey-goose`). If your brand has accents (e.g., "Patrón") or punctuation, the auto-slug may need a manual edit — I'll tell you what to enter when I send the file.
   - **Order:** A number — lower numbers appear first.
4. Click **Publish**. The logo appears on the homepage within a minute.

### Why no upload field?

Brand logos arrive in unpredictable formats and need real cleanup work — transparent backgrounds, even sizing, sharp edges at small dimensions. Asking you to handle that in the browser is a recipe for inconsistent walls. The "message Jonel, I commit, you publish" flow keeps the wall sharp without putting photo editing on your plate.

### Editing or removing a brand

- **Reorder:** Open the brand, change the **Order** number, Publish.
- **Rename:** Open the brand, edit **Client / Brand Name**. Don't touch the slug — that ties to the file on disk.
- **Remove:** Three-dot menu (⋯) → Delete → Publish.

---

## Managing Kit ("The Gear Behind The Shots")

This is where you manage your equipment list. The site renders the kit as a terminal-style loadout — one row per item, category on the left, item name on the right.

1. Click **Kit** in the left sidebar
2. Click **+** to add a new piece of gear
3. Fill in:
   - **Category:** A short, all-caps key shown on the left of the row (e.g., `CAMERA`, `LENS`, `DRONE`, `AUDIO`, `RECORDER`, `FILTERS`). Reuse existing categories so the loadout reads consistent.
   - **Item:** The gear name shown on the right of the row (e.g., "Sony FX3", "24-70mm f/2.8 GM II").
   - **Accent:** Toggle ON to highlight this item with the green secondary color. Use sparingly — one or two items max — to draw attention to a recent or signature piece of kit.
   - **Order:** Lower numbers appear first. Group by category in the order field (cameras 10–19, lenses 20–29, etc.) so additions slot in cleanly.
4. Click **Publish**

Treat this like a working list. Add new gear when you buy it, remove gear when you sell it.

---

## Managing Reviews — Auto-Publish with Approval Gate

Reviews work differently from everything else. Clients submit their own reviews through a public form, but **nothing goes live until you approve it.**

### How the flow works

1. **You finish a project and publish it in the Studio** (Project section, fully filled out, Featured ON or OFF, doesn't matter)
2. **You send your client this link:** `jackvisuals23.com/review`
3. **The client fills out the form:**
   - Their name
   - Their role and company (e.g., "Brand Director · Grey Goose Caribbean")
   - Which project they're reviewing — they pick from a dropdown of your published projects
   - Their review text (up to 280 characters — keep it punchy)
   - Their email (used for verification only, never displayed)
   - A spam check (Cloudflare Turnstile — usually invisible to them)
4. **The review lands in your Studio under Reviews, marked "Not Approved"**
5. **You read it. If you like it, you toggle "Approved" ON and Publish.**
6. **It appears on your homepage in the "Words From Set" section.**

### How to approve a review

1. Click **Review** in the left sidebar
2. Open the review you want to approve
3. Read it carefully
4. Toggle **Approved** ON
5. Click **Publish**

The review is now live on the homepage.

### How to reject or delete a review

If a review is spam, hostile, or just not great:

1. Open the review
2. Click the three dots menu (⋯) → Delete
3. Confirm deletion
4. Publish the deletion

You're not obligated to approve every review you receive. Be picky — your homepage is your highlight reel.

### Rules of thumb for sending the review link

- **Send it AFTER the project is published** in your Studio. The client needs to be able to pick the project from the dropdown.
- **Send it within a week of project delivery** while the experience is fresh
- **A short personal message helps:** "Hey [client], thanks for trusting us with [project]. If you're up for it, mind dropping a quick line on jackvisuals23.com/review? It really helps."
- **You're in full control.** No review goes live without you approving it.

---

## Content Limits — Quick Reference

| Section | Limit | Why |
|---|---|---|
| Featured Projects | 3 max | Homepage layout supports 3 |
| Review text | 280 characters | Keeps reviews pull-quote sized for the carousel |
| Kit items | No limit | Add as much gear as you want |
| Trusted By logos | No limit (but ~6-12 looks best) | Visual rhythm |
| Services | No limit | But aim for 4-6 distinct offerings |

---

## Need Help?

Contact **Jonel Richardson** at **jonelrichardson@gmail.com**
Response time: 24 hours.

For urgent issues (site down, data missing): text Jonel directly.

---

*Last updated: April 2026*
