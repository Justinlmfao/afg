# AI For Good — website

The website for **AI For Good (AFG)**, a student-led organisation in Hong Kong
with two pillars: a **policy think tank** that submits written recommendations
to lawmakers, and a **free tutoring programme** for underprivileged primary
students.

Built with [Astro](https://astro.build) as a fully static site — no server or
backend. The design rationale (palette, type, wireframes, and what was
deliberately cut) is in `DESIGN.md`; the content source of truth is
`AFG-website-brief.md`.

---

## Run it locally

Requires [Node.js](https://nodejs.org) 18+ (set up for Node 22).

```bash
npm install      # first time only
npm run dev      # dev server at http://localhost:4321
npm run build    # static build into dist/
npm run preview  # preview the built site
```

---

## Pages

| Route | What it is |
| --- | --- |
| `/` | Routes the reader to one of the two pillars |
| `/policy` | The think tank: record, method, filed submissions |
| `/teaching` | The tutoring programme: the 86% outcome, modules, partners, photos |
| `/team` | The five leads + 35+ members |
| `/get-involved` | Contact form + email |

Old URLs (`/research`, `/programs`, `/about`) redirect to the new ones.

## Editing content (no code needed)

| To add | Folder | Notes |
| --- | --- | --- |
| A policy submission | `src/content/submissions/` | Fields: `title`, `submittedTo`, `date`, **`for`**, **`against`**, **`recommendation`**, optional `pdf`. Copy `example-submission.md`, fill it in, set `draft: false`. **Real, filed submissions only** — while the folder has none, the Policy page shows "Submissions are published here after they are filed." |
| A teaching module | `src/content/programs/` | Markdown body is the description; `why` is the "closes the gap" line; `icon` names a glyph in `Icon.astro`. |
| A team member | `src/content/team/` | `name`, `role`, `order`. |

Set `draft: true` on any file to keep it as a hidden template.

### Photos

The Teaching page's gallery expects five files in `public/programs/` —
currently **labelled placeholders**. Replace each with the real photo, same
filename (see `public/programs/README.md` for which is which).

### PDFs

Put submission PDFs in `public/research/` and reference them from a
submission's `pdf:` field, e.g. `pdf: "/research/my-submission.pdf"`.

---

## The rules this site follows

From `AFG-website-brief.md`:

- **Every number is traceable to the brief**: founded June 2023 · 35+ members
  · ~20 recommendations/year · HK$50M commitment · Policy Address & Budget
  since 2024 · Five-Year Plan (2026–2030) · 350 children · 7 schools · 43
  tutors · 86% band promotion since 2024. If a figure isn't on that list, it
  doesn't go on a page.
- **No invented output.** The submissions collection ships empty; the
  for/against/recommendation template waits for real filings.
- **Never describe AFG as an official VSA club/ASA** — it is student-led and
  student-founded.
- Sentence case, active voice, no promotional adjectives.

## Deploy (free)

**Netlify (recommended — the contact form needs it):** import the repo;
`netlify.toml` sets the build (`npm run build` → `dist`). Form submissions
appear under **Forms** in the Netlify dashboard.

**Cloudflare Pages** also serves the static output, but the Netlify form won't
receive submissions there — swap in Formspree or rely on the published email.

Before launch: set the real domain in `astro.config.mjs` (`site:`).
