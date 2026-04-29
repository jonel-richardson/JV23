# [Project Name]

> [One sentence: what it does and who it's for.]

[Screenshot or demo GIF here — see notes below]

**Live:** [deployment URL] | **Demo:** [Loom or YouTube link, if applicable]

---

## The Problem

[2-3 sentences max. Name the real-world problem this solves. Quantify it if you can: how many people are affected, what data gap exists, what's broken in the current workflow. This is your hook.]

## What It Does

[2-3 sentences. Describe the solution from the user's perspective, not the developer's. What can someone DO with this tool? What do they see? What decision does it help them make?]

## Key Features

| Feature | What It Does |
|---------|-------------|
| [Feature 1] | [Brief description] |
| [Feature 2] | [Brief description] |
| [Feature 3] | [Brief description] |

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | [e.g., Next.js 16, TypeScript] | [1 sentence: why this choice] |
| Styling | [e.g., Tailwind CSS v4] | [1 sentence] |
| State | [e.g., Zustand] | [1 sentence] |
| Data/API | [e.g., Mapbox GL JS, FBI SHR dataset] | [1 sentence] |
| Backend | [e.g., FastAPI, Supabase] | [1 sentence] |
| Deployment | [e.g., Vercel, Railway] | [1 sentence] |

> The "Why" column is what separates this from a generic tech list.
> Hiring managers want to see that you made deliberate choices, not just followed a tutorial.

## Architecture

```
[Simple diagram showing data flow or component relationships.
Keep it minimal. 3-5 boxes with arrows is plenty.]

User → Frontend (Next.js) → API Layer → Database
                ↓
         Mapbox GL JS (map rendering)
```

## Technical Decisions

[This section is your differentiator. Pick 2-3 decisions you made and explain the tradeoff. Format:]

**[Decision]:** [What you chose] over [what you didn't choose]
**Why:** [1-2 sentences explaining the tradeoff]

Example:
> **State management:** Zustand over Redux
> **Why:** The app has 3 independent data domains (filters, map viewport, cluster data) that don't need centralized dispatch. Zustand's slice pattern kept each store focused without boilerplate.

## Getting Started

### Prerequisites
- Node.js 18+
- [Any other requirements]

### Installation
```bash
git clone [repo URL]
cd [project-name]
npm install
```

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
[OTHER_VARIABLE]=value
```

### Run Locally
```bash
npm run dev
# Open http://localhost:3000
```

## What I'd Build Next

[2-3 bullet points. This shows you think beyond the current scope and understand the product roadmap. Keep it concrete.]

- [Specific feature or improvement]
- [Specific feature or improvement]
- [Specific feature or improvement]

## About This Project

[1-2 sentences of context. Built as part of what program? Solo or team? If team, what was YOUR role specifically? Link to your portfolio or LinkedIn if relevant.]

**My role:** [What you owned. Be specific: "Full frontend owner" or "Led data pipeline and API design."]

---

Built by [Your Name](https://linkedin.com/in/your-profile)
