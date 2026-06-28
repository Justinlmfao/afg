# AI For Good — website

The website for **AI For Good**, a student-led think tank in Hong Kong working
at the intersection of technology, policy, and education.

Built with [Astro](https://astro.build) as a fully static site — no server or
backend needed. Content for the Research, Programs, and Team pages lives in
Markdown files, so you can add new items without touching any code.

---

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer (this project is set up for
Node 22).

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:4321
```

Other commands:

```bash
npm run build    # build the static site into dist/
npm run preview  # preview the built site locally
```

---

## Editing content (no coding needed)

Most of what you'll want to change lives in two places: **Markdown content
files** and a handful of clearly-marked spots in the page files.

### Adding research, programs, or team members

Each of these is a folder of Markdown files under `src/content/`. To add an
item, copy an existing file in the matching folder, rename it, and edit the
fields at the top (the "frontmatter" between the `---` lines).

| What you want to add        | Folder                        |
| --------------------------- | ----------------------------- |
| A government submission     | `src/content/submissions/`    |
| A publication / report      | `src/content/publications/`   |
| A teaching module           | `src/content/programs/`       |
| A team member               | `src/content/team/`           |

Open any existing file in a folder to see every available field. Teaching
modules also take an `icon` (math, english, economics, science, education,
research, engagement…), a `variant` colour (cool, warm, teal, amber, pink,
violet), and a `why` line ("Why it closes the gap").

Set `draft: true` on any file to keep it in the repo as a hidden template that
won't appear on the live site (the `example-…` files use this).

### Adding a PDF

Put the file in `public/research/` and reference it from a content file's
`pdf:` field, e.g. `pdf: "/research/my-report.pdf"`. See
`public/research/README.md`.

### Editing fixed page copy

Copy that isn't in a content collection (the home page, about page, stats,
footer, contact details) lives in `src/pages/*.astro`, `src/components/`, and
is clearly commented. Search the codebase for `[PLACEHOLDER]` to find every
spot that still needs real information before launch.

---

## Before you publish — remaining checklist

Confirmed facts are in place. The six policy submissions and three reports are
written from your brief but are **checkable factual claims** — verify each
before launch. For an org doing government work, one inflated claim costs more
than ten modest true ones. Still to do:

- [ ] Verify every submission's title, body, date, and what it argued against
  the real documents (`src/content/submissions/` — each file is flagged)
- [ ] Verify the three reports and add their PDFs to `public/research/`
  (`src/content/publications/`)
- [ ] Confirm the impact numbers — children, institutions, the 60+ sessions,
  and the "invited back for a second year" claim (`src/pages/programs.astro`)
- [ ] Confirm the team bios are accurate (focus areas + roles)
  (`src/content/team/`)
- [ ] Add the contact email when ready — set `email` in both
  `src/pages/get-involved.astro` and `src/components/Footer.astro`
- [ ] Set your real domain in `astro.config.mjs` (`site:`)

Already confirmed and in place: founding date (June 2023 / 3 years), 350
children, 10 institutions, ~20 submissions a year, 4 recommendations a year in
the Policy Address, the Five-Year Plan callout, the four teaching modules,
research areas, and the team roster.

## Design & animation

The site is intentionally colourful and motion-rich: an animated gradient hero
with floating shapes, scroll-reveal on most elements, count-up statistics,
cards that tilt toward the cursor and magnify on hover, gradient text, a
scroll-progress bar, and a deep-gradient stats band and footer.

- **All of it lives in two places:** the design tokens, palette, gradients, and
  animation utilities in `src/styles/global.css`, and the small animation
  engine (scroll-reveal, count-up, tilt, progress bar, parallax) in the
  `<script>` at the bottom of `src/layouts/BaseLayout.astro`.
- **Accessibility:** every animation is disabled for visitors who set
  "reduce motion" in their OS, via `prefers-reduced-motion`. Numbers still show
  their final value, content still appears — just without the movement.
- **To tone it down or recolour,** edit the `:root` custom properties (palette
  and gradients) and the `[data-reveal]` / `.magnify` rules in `global.css`.

---

## Deploy (free)

### Netlify (recommended — the contact form needs it)

The contact form on **Get Involved** uses [Netlify
Forms](https://docs.netlify.com/forms/setup/), which requires Netlify to
capture submissions (they appear in your Netlify dashboard under **Forms**).

1. Push this repo to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Netlify reads `netlify.toml` automatically — build command `npm run build`,
   publish directory `dist`. Just click deploy.

### Cloudflare Pages (also works)

Static output deploys fine, but the Netlify contact form won't receive
submissions there. If you deploy to Cloudflare, swap the form for a service
like [Formspree](https://formspree.io) or a `mailto:` link. Build command:
`npm run build`, output directory: `dist`.

---

## Project structure

```
public/
  research/        PDFs you add (served at /research/…)
  favicon.svg
src/
  components/      Header, Footer, Card, StatsBand
  content/         Markdown content collections (see table above)
  content.config.ts  Schema for the content collections
  layouts/
    BaseLayout.astro   Shared <head>, fonts, header/footer shell
  pages/           One file per page (Home, About, Research, …)
  styles/
    global.css     Design tokens + typography (edit colours/fonts here)
astro.config.mjs
netlify.toml
AFG-website-plan.md  The original content & design brief
```

## Design notes

Editorial and restrained by intent: Newsreader (serif) headings + Inter (sans)
body, a warm off-white background, near-black text, and one muted-blue accent.
To re-theme, edit the custom properties at the top of `src/styles/global.css`.
