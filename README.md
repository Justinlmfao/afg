# AI For Good — website

The website for **AI For Good (AFG)**, a student-led organisation in Hong Kong
with two pillars: a **policy think tank** that submits written recommendations
to lawmakers, and a **free tutoring programme** for underprivileged primary
students.

Built with [Astro](https://astro.build) as a fully static site, with no server
or backend. The design (palette, type, the case format, and what was
deliberately removed) is recorded in `DESIGN.md`.

---

## Run it locally

Requires [Node.js](https://nodejs.org) 18+ (set up for Node 22).

```bash
npm install      # first time only
npm run dev      # dev server at http://localhost:4321
npm run build    # static build into dist/, then the design check
npm run check    # the design check alone (scripts/check-design.mjs)
npm run preview  # preview the built site
npm run zh-hans  # regenerate Simplified Chinese from Traditional
```

`npm run build` fails if a page contains placeholder ("sample") content, an
arrow character, or the old count-up and scroll animations. See "Samples"
below.

---

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero and figures, the Policy and Teaching doors, the AI for All case, who we are, recent proposals, how we teach, latest work |
| `/policy` | The record so far, AI for All in full, a ledger of every submission, how a proposal is written, two proposals |
| `/policy/<key>` | One page per proposal: its case, the argument in three lines, the paper |
| `/teaching` | The programme as a case, why we teach, the Think First steps and worksheet, modules, the sample lesson in full, promises, all the classroom photographs |
| `/teaching/sample-lesson` | The sample lesson, set up to print |
| `/about` | At a glance, why we do both, how it started, what we do and how, our impact, the people who lead it, what's next |
| `/get-involved` | Contact form and email |

Old URLs redirect: `/research` and `/programs` to the pages that replaced
them, and `/team` to `/about#people` (the Team page is now the People section
of About). The redirects are listed in `astro.config.mjs`.

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

That converts `src/pages/zh/` into `src/pages/zh-hans/`, makes the `.hans.md`
proposals, and fills in the `*_hans` fields in the content collections and the
`hans:` lines in `src/data/`. The output is committed so you can read it in
review, but it is regenerated from scratch each run: **fix the Traditional and
re-run rather than editing a `/zh-hans` file**, or your edit disappears.
Nothing in the site build depends on the script; it is a tool you run when the
Chinese changes.

| To change | File |
| --- | --- |
| A number (350 children, 43 tutors, 86%, HK$50 million…) | `src/data/facts.ts`. Every page reads from it. |
| The "Now" note on the home page | `now` in `src/data/facts.ts` (and its `updated` month) |
| The contact email address | `contactEmail` in `src/data/facts.ts` |
| The AI for All story (home and Policy) | `src/data/cases.ts` |
| Nav labels, footer text, labels such as "What we noticed" | `src/i18n.ts` (all three languages) |
| English page copy | `src/pages/*.astro` |
| The sample lesson's text (shown on Teaching and on its own page) | `src/pages/_lesson.astro` and `src/pages/zh/_lesson.astro` |
| Chinese page copy | `src/pages/zh/*.astro`, then `npm run zh-hans` |
| A submission, module or team member | `src/content/**` (see below), then `npm run zh-hans` |
| A Hong Kong word that should read differently on the mainland | the `TERMS` list in `scripts/generate-simplified.mjs` |
| Colours, type sizes, spacing | the `:root` block in `src/styles/global.css` |
| Which colour a page or section takes | `tone-policy` (navy) or `tone-teaching` (green) in its class; add `washed` for the pale ground or `band` for the solid colour |
| How a component looks | `src/styles/components.css` (one block per component) |
| How one page looks | `src/styles/pages/<page>.css` |
| The logo, favicon or share image | `src/assets/brand/`, `public/favicon*`, `public/og-default.jpg` |

In `src/data/*.ts` the three languages sit side by side as `en:`, `zh:` and
`hans:` lines. Edit `en:` and `zh:`; `npm run zh-hans` rewrites each `hans:`
line from the `zh:` line above it, so keep every `zh:` value on one line.

The Chinese pages are separate `.astro` files but they **import the same
stylesheet** as their English twin (`src/styles/pages/*.css`, applied through
the `pageClass` prop), so a design change lands in all three languages at once
and only the words are duplicated. Anything without a `*_zh` / `*_hans` value
falls back to English rather than going blank.

Three things to know when writing Chinese in these files:

- **Keep each Chinese paragraph on one source line.** Astro turns a line break
  inside a paragraph into a space, which is invisible in English and shows up
  as a gap between characters in Chinese. Put a space either side of Latin
  words and numbers sitting in a Chinese sentence.
- **Chinese headings only break after punctuation.** To allow a break inside
  a long heading, put `<wbr />` between two phrases, as the existing headings
  do.
- **Look a figure up by language, not by name.** In a Chinese page write
  `{f.aiForAll.amount[lang]}`, not `.zh`: the same file becomes the
  Simplified page.

## Editing content (no code needed)

| To add | Folder | Notes |
| --- | --- | --- |
| A submission | `src/content/submissions/` | One file per language: `name.en.md` and `name.zh.md`, sharing the same `key`. A file with only the fields at the top is **a row in the ledger** on the Policy page: `title`, `lang`, `key`, `date` (`"2025-12"`, `"2024"`, or `"2025/2026"` for a consultation spanning two years), `status` (`submitted`, `reflected` or `in-progress`), `ask` (one line), `order` (lower shows first, so give the newest the lowest number). Add the paper as the Markdown body, using `###` for its headings, and it also gets **its own page** at `/policy/<key>`; then fill in `case_title`, `noticed`, `did`, `changed`, `changed_status` (`changed` or `pending`) and the three lines `case_for`, `case_against`, `recommendation`. Copy `think-first.en.md` and `think-first.zh.md` as a starting point. Run `npm run zh-hans` to make the Simplified `name.hans.md`. **Real submissions only.** |
| A teaching module | `src/content/programs/` | `summary` is the one sentence always on show; the Markdown body opens beneath it; `why` is the "How it helps" line. Chinese goes in `title_zh`, `summary_zh`, `body_zh` and `why_zh`. |
| A team member | `src/content/team/` | `name`, `role`, `order`. The Markdown body is their bio, which opens under their name in the People section of About. `role_zh` and `bio_zh` are the Traditional Chinese (`bio_zh` is one quoted line per paragraph); run `npm run zh-hans` for the Simplified. A member with no bio is listed without the button. |

Set `draft: true` on any file to keep it as a hidden template.

### Samples (placeholders that must be replaced)

A few things were filled in so the layout could be built, and are **not real**:

1. What we asked for in the 2024 Policy Address and 2025–26 Budget
   consultations (`policy-address-2024.*.md` and `budget-2025-26.*.md` in
   `src/content/submissions/`).
2. How the 86% figure is counted (`bandUp.method` in `src/data/facts.ts`).

Each is marked `sample: true`. In `npm run dev` it shows with a small "Sample"
tag. On the built site it is left out: the two ledger rows keep their date,
title and status with no "ask", and the method note doesn't appear. To make
one real, replace the words and delete the `sample: true` line. The build
fails if sample content ever reaches a page.

### Photos

Photographs live in `src/assets/photos/`; the build makes AVIF and WebP
versions at several widths. To use one, drop the `.jpg` in that folder and
name it in a page with `<Photo name="file.jpg" … />`, in a `<Gallery>` (three
photos, one caption) or in a `<PhotoGrid>` (a whole set; each opens at full
size). See
`src/assets/photos/README.md` for which file shows what.

### PDFs

Put submission PDFs in `public/research/` and reference them from a
submission's `pdf:` field, e.g. `pdf: "/research/my-submission.pdf"`.

---

## The rules this site follows

- **Every number lives in `src/data/facts.ts`**:
  founded June 2023 · 35+ members · ~20 recommendations a year · HK$50 million
  allocated to AI for All in the 2026–27 Budget · 350 children · 7 schools ·
  43 tutors · 86% moved up a class band since 2024. If a figure isn't in that
  file, it doesn't go on a page.
- **Attribution on AI for All is deliberately limited.** AI for All is a
  government programme delivered by Cyberport, HKSTP and the Productivity
  Council. The site says we recommended it and the Budget went that way — it
  never says we caused it, secured it, or won it. Keep it that way unless
  there is a citable acknowledgement from a bureau; one unverifiable claim
  would put every other figure here in doubt.
- **No invented output.** Only real submissions go in the collection, and
  anything not yet confirmed is marked `sample: true` so it can't go live.
- **"Not yet" is shown.** A proposal that hasn't changed anything says so.
- **Never describe AFG as an official VSA club/ASA** — it is student-led and
  student-founded.
- Sentence case, active voice, no promotional adjectives.

## Deploy (free)

**Netlify (recommended — the contact form needs it):** import the repo;
`netlify.toml` sets the build (`npm run build` → `dist`). Form submissions
appear under **Forms** in the Netlify dashboard. After sending, visitors land
on `/thanks/` (or `/zh/thanks/`, `/zh-hans/thanks/`); unknown addresses show
`404.html`. Both are kept out of search results and the sitemap.

**Cloudflare Pages** also serves the static output, but the Netlify form won't
receive submissions there — swap in Formspree or rely on the published email.

The site's domain is **aiforgoodhk.org**, set as `site:` in `astro.config.mjs`.
Canonical URLs, the language links in each page's `<head>`, the sitemap
(`/sitemap-index.xml`) and `robots.txt` are all built from it, so if the domain
ever changes, change it there and in `public/robots.txt`.

After the first deploy, add the site to
[Google Search Console](https://search.google.com/search-console) and submit
`https://aiforgoodhk.org/sitemap-index.xml` so Google finds every page in all
three languages.
