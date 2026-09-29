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
| `/about` | What AFG is, why it does both, origin, method, impact, what's next |
| `/policy` | The think tank: record, method, filed submissions |
| `/teaching` | The tutoring programme: the 86% outcome, modules, partners, photos |
| `/team` | The five leads + 35+ members |
| `/get-involved` | Contact form + email |

Old URLs (`/research`, `/programs`) redirect to the new ones.

Every page also exists in Traditional Chinese under `/zh` and Simplified
Chinese under `/zh-hans`.

## Languages

Three: English (the default, at the root), Traditional Chinese (`/zh`) and
Simplified Chinese (`/zh-hans`). The switcher at the right of the header —
`EN · 繁體 · 简体` — marks the one you are reading and links the other two to
the same page, so `/policy` ⇄ `/zh/policy` ⇄ `/zh-hans/policy`.

**Traditional is the source of the Chinese.** Write it once in Traditional and
run:

```bash
npm run zh-hans
```

That converts `src/pages/zh/` into `src/pages/zh-hans/` and fills in the
`*_hans` fields beside every `*_zh` field in the content collections. The
output is committed so you can read it in review, but it is regenerated from
scratch each run — **fix the Traditional and re-run rather than editing a
`/zh-hans` file**, or your edit disappears. Nothing in the site build depends
on the script; it is a tool you run when the Chinese changes.

| To change | File |
| --- | --- |
| Nav labels, footer, skip link, the switcher | `src/i18n.ts` (all three languages) |
| Chinese page copy | `src/pages/zh/*.astro`, then `npm run zh-hans` |
| Chinese for a module, submission, or role | the `*_zh` fields in `src/content/**`, then `npm run zh-hans` |
| A Hong Kong word that should read differently on the mainland | the `TERMS` list in `scripts/generate-simplified.mjs` |

The Chinese pages are separate `.astro` files but they **import the same
stylesheet** as their English twin (`src/styles/pages/*.css`, applied through
the `pageClass` prop), so a design change lands in all three languages at once
and only the words are duplicated. Anything without a `*_zh` / `*_hans` value
falls back to English rather than going blank.

Two things to know when writing Chinese in these files:

- **Keep each Chinese paragraph on one source line.** Astro turns a line break
  inside a paragraph into a space, which is invisible in English and shows up
  as a gap between characters in Chinese. Put a space either side of Latin
  words and names sitting in a Chinese sentence.
- **A measure set in `ch` holds about half as many characters in Chinese.** A
  couple of them are widened for Chinese at the bottom of the Chinese block in
  `src/styles/global.css`; add to that block rather than changing the shared
  value.

## Editing content (no code needed)

| To add | Folder | Notes |
| --- | --- | --- |
| A policy submission | `src/content/submissions/` | Fields: `title`, `submittedTo`, `date`, **`for`**, **`against`**, **`recommendation`**, optional `pdf`. Copy `example-submission.md`, fill it in, set `draft: false`. **Real, filed submissions only** — while the folder has none, the Policy page shows "Submissions are published here after they are filed." |
| A teaching module | `src/content/programs/` | Markdown body is the description; `why` is the "closes the gap" line; `icon` names a glyph in `Icon.astro`. |
| A team member | `src/content/team/` | `name`, `role`, `order`. The Markdown body is their bio, which opens when you press their name on the Team page. `bio_zh` is the Traditional Chinese, one quoted line per paragraph; run `npm run zh-hans` for the Simplified. A member with no bio is listed without the toggle. |

Set `draft: true` on any file to keep it as a hidden template.

### Photos

Six real session photos fill the Teaching page's gallery grid exactly, and
three team photos sit on the home hero, the Team page, and the About origin
section. All live in `public/programs/` — see `public/programs/README.md` for
which file goes where, and how to swap or reorder them.

### PDFs

Put submission PDFs in `public/research/` and reference them from a
submission's `pdf:` field, e.g. `pdf: "/research/my-submission.pdf"`.

---

## The rules this site follows

From `AFG-website-brief.md`:

- **Every number is traceable to the brief**: founded June 2023 · 35+ members
  · ~20 recommendations/year · HK$50M allocated to AI for All in the 2026–27
  Budget · Policy Address & Budget since 2024 · Five-Year Plan (2026–2030) ·
  350 children · 7 schools · 43 tutors · 86% band promotion since 2024. If a
  figure isn't on that list, it doesn't go on a page.
- **Attribution on AI for All is deliberately limited.** AI for All is a
  government programme delivered by Cyberport, HKSTP and the Productivity
  Council. The site says we recommended it and the Budget went that way — it
  never says we caused it, secured it, or won it. Keep it that way unless
  there is a citable acknowledgement from a bureau; one unverifiable claim
  would put every other figure here in doubt.
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
