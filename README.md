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
| An education program        | `src/content/programs/`       |
| A team member               | `src/content/team/`           |

The example files in each folder show every available field. Delete the
`example-…` files once you've added your real content.

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

## Before you publish — placeholder checklist

The copy ships with `[BRACKETED]` placeholders so nothing is silently
invented. **Don't launch with any of these still in place** — for an org doing
government work, one inflated claim costs more than ten modest true ones.

- [ ] Exact year AFG was founded (About → "Our story")
- [ ] Exact number of partner schools (Home stats, Programs)
- [ ] Submission titles, bodies, and dates (`src/content/submissions/`)
- [ ] Report titles + the actual PDF files (`src/content/publications/`, `public/research/`)
- [ ] Number of workshops / sessions delivered (Programs → Impact)
- [ ] One real anecdote (Programs → quote block)
- [ ] Team member names, roles, one line each (`src/content/team/`)
- [ ] Contact email + any social links (footer + Get Involved)
- [ ] Confirm "300+" is current and accurate (StatsBand, Programs)
- [ ] 3–5 real research areas (Research page)
- [ ] Set your real domain in `astro.config.mjs` (`site:`)

Tip: run a search for `[PLACEHOLDER]` and `[` across the project to catch them all.

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
