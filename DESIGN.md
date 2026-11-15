# AFG site: design

The current design ("Statesman", v4, November 2026). It replaces the blue and
orange "one paper, two inks" design. It was built from the v4 redesign spec
of 15 November 2026, then revised the same week: every section and photograph
from the previous site was brought back into the new system, and Policy and
Teaching were given a colour each. This file records what was built.

## 1. The style

The logo sets the tone: a civic, documentary voice. Think of a well-set
policy paper and a school notice board, not a startup landing page.

- **Serif for the voice, sans for the facts.** Headings and the few big
  figures are Newsreader, matching the logo. Everything read in paragraphs,
  plus dates, labels and buttons, is Source Sans 3.
- **White paper, black ink, and the logo's two colours.** Policy is the
  logo's navy and Teaching its green: a page or section in either half takes
  that colour for its links, buttons, case line, a solid band and a pale
  ground. Pages that belong to neither (Home's hero, About, Contact) use
  green. The logo's near-black is the footer; the highlighter yellow is also
  the chalk colour of the margin titles on a band.
- **Ruled, not boxed.** Content is separated by white space and thin rules,
  like a printed document. Colour comes in whole bands and grounds that run
  the width of the window, not in cards. A grey box is kept for the one thing
  that must stand apart on a page: the "What we can claim" note, or the
  three-line argument on a proposal page.
- **Documents and photographs are the decoration.** Real classroom photos
  with captions, real submission titles, real sources, and the odd small
  chart drawn from a cited figure. Long pages are broken up with full-width
  photographs, a photograph beside each teaching module, and solid bands for
  a quotation or a short list. No illustrations, icons, gradients, textures
  or emoji, and no pictures we don't hold the rights to.
- **Asymmetric on purpose.** Left-aligned headings, an 8/3 split in the home
  hero, rails with the heading on the left. Nothing is centred except the
  text inside a button.

## 2. Logo

| Version | Use |
| --- | --- |
| Wordmark | Site header on every page. 22px tall on desktop, 19px on phones. |
| Full lockup (dark) | Footer, on the dark ground. Up to 380px wide. |
| Full lockup (light) | Print, PDFs. At least 240px wide; below that use the wordmark. |
| Avatar (`public/brand/`) | Social profile pictures. Not used on pages. |
| Favicon | Browser tab and home-screen icon. |

- `Logo.astro` inlines the SVG and sets its fill to the text colour, so it is
  ink on white and cream on the footer.
- Don't recolour, stretch, outline or re-type the wordmark in live text.
- The spaced capitals of HONG KONG exist only inside the logo. Nothing else on
  the site is set in capitals or letter-spaced.
- Files: `src/assets/brand/` (logos), `public/og-default.jpg` (1200×630
  share image), and the site icon. The icon is `public/favicon.svg`; every
  other size (`favicon.ico`, 32, 48 and 96px PNGs, the touch icon, and the
  192 and 512px icons listed in `site.webmanifest`) is made from it by
  `npm run icons`. The touch icon and the "maskable" icon are full squares,
  because phones round the corners themselves.

## 3. Tokens (`src/styles/global.css`)

### Colour

| Token | Hex | Job | Contrast on paper |
| --- | --- | --- | --- |
| `--paper` | `#FFFFFF` | Page | |
| `--surface` | `#F4F4F1` | The one boxed note per page | |
| `--ink` | `#16171B` | Headings, logo | 17.9:1 |
| `--text` | `#2B2D30` | Body | 13.8:1 |
| `--muted` | `#5B5F5E` | Dates, captions, labels | 6.5:1 (5.9:1 on surface) |
| `--rule` | `#DCDFDB` | Hairlines (decorative) | |
| `--green` | `#1A563E` | Teaching, and the default accent | 8.6:1 |
| `--green-hover` | `#13442F` | | |
| `--navy` | `#1D395E` | Policy, and the AFG marks | 11.9:1 |
| `--navy-hover` | `#152B49` | | |
| `--policy-wash` | `#EAF0F7` | Pale ground behind a Policy section | |
| `--teaching-wash` | `#EAF3EC` | Pale ground behind a Teaching section | |
| `--band-muted` | `#CFD6D2` | Secondary text on a solid band | 5.7:1 on green, 8.2:1 on navy |
| `--night` | `#16171B` | Footer background | |
| `--cream` | `#F5F2EB` | Text on night | 16.0:1 |
| `--night-muted` | `#B9B6AE` | Secondary text on night | 8.8:1 |
| `--night-rule` | `#3A3B3F` | | |
| `--mark` | `#FFE27A` | Highlighter behind ink text | 14.0:1 |
| `--field` | `#868A87` | Form field borders | 3.5:1 |

**Tone.** `.tone-policy` or `.tone-teaching` on a page's `<main>` or on a
section sets `--accent`, `--accent-hover` and `--wash`. Components only ever
use `--accent`, so anything placed inside takes the right colour. `.washed`
puts a section on its tone's pale ground; `.band` makes it a solid band with
cream type. The top of every Policy and Teaching page is a band.

No gradients, no shadows. `<mark>` appears once per page at most, on the
phrase that matters most.

### Type

| Role | Face |
| --- | --- |
| Headings, big figures, ledger titles, step names | Newsreader 500, optical sizing on |
| Body, UI, dates, captions, tables, buttons | Source Sans 3 400 / 600 / 700, 400 italic |
| The paper on a proposal page | Newsreader at text size |
| Chinese body and UI | The system face (PingFang, Microsoft JhengHei), then Noto Sans |
| Chinese headings | The system Song/Ming face, then Noto Serif |

- Both Latin families are served from the site (`public/fonts/`, Latin only),
  not from Google, so the body face can be preloaded and no third party is
  contacted. No Chinese web font is downloaded, except two 4 KB files holding
  only the characters of the vertical margin titles.
- Arial and Times stand in while the fonts load, resized to match. The sizes
  were measured by setting this site's own copy in both faces.
- Seven sizes, nothing else: `--step--1` (14→15px: dates, captions, notes),
  `--step-0` (17→19px: body), `--step-1` (lead, ledger titles), `--step-2`
  (h3, stage names, steps, rail headings), `--step-3` (h2), `--step-4`
  (inner-page h1, the big figure), `--step-5` (home h1 only). They grow with
  the window from 360 to 1240px.
- Weights: body 400; headings 500; labels, nav and buttons 600; 700 only for
  run-in labels such as **Now** and **What we can claim:**.
- Line height 1.6 in English, 1.85 in Chinese; headings 1.15 and 1.4.
- Italic only for the time-gap labels on the case line and for publication
  titles. Tabular figures in the ledger and case dates. No capitals.
- Chinese: `text-autospace`, `text-spacing-trim` and `line-break: strict`
  where the browser supports them. Chinese headings break after punctuation
  or at a `<wbr>`, never in the middle of a word.

### Space, shape, motion

- Spaces: `--space-3` 1rem, `--space-4` 1.5rem, `--space-5` (inside
  sections), `--space-6` (between sections), `--space-7` (top of page).
  Container `--wide` 74rem; reading column `--text-w` 36rem.
- Radius 0 everywhere except buttons and form fields (4px) and the dots on
  the case line.
- No shadows. No animation on load or on scroll. Hover changes colour and
  underline thickness over 120ms.
- Focus: a 3px green outline, 2px off the element (cream in the footer).

## 4. The signature: the case

Every piece of work is told the same way: **What we noticed → What we did →
What changed.** It is the first real content on the home page and the top of
every proposal page. It shows cause, action and result with dates and
evidence, and says so when the result isn't in yet.

`Case.astro`:

- **Wide (the component is at least 60rem wide):** a 2px green line across
  the top with three dots. Under each: the date, the stage name, the text,
  then the evidence. Columns are `1fr 1fr 1.35fr`, so "What changed" has the
  most room. No boxes or icons.
- **Narrow:** the line runs down the left and the stages stack.
- **Time between stages** is worked out from the dates and set in small
  italic on the line: "six months later", "the next year". Unknown: left off.
- **The last dot is filled** when something changed. When it hasn't
  (`status: 'pending'`), the dot is hollow, the last stretch of line is
  dashed and the stage is named "What's changed so far".
- **Evidence:** a photo thumbnail with a caption, a document by name and
  date, or a source link. Real items only.
- **One big figure at most,** inside "What changed", and not repeated in the
  title.
- **The claim note** sits under the case on `--surface`.

Where it is used: Home (AI for All), Policy (AI for All in full, then each
proposal in brief with `CaseBrief.astro`), every `/policy/<key>` page, and
Teaching (the programme itself). Not on About or Contact: used everywhere it
would become a template.

## 5. Layout

- **Navigation:** About · Policy · Teaching · Team · Contact. Each proposal
  has its own page; so does the sample lesson, which prints.
- **Header:** 60px (56px on phones), sticky, white, hairline below. On
  phones: the wordmark, one visible language link (中文, or EN on the Chinese
  pages) and a Menu button. The menu opens as a full-width sheet with large
  serif links and the three languages.
- **Footer:** also every page's closing call to action. Dark ground, the
  full logo, one column for schools and organisations and one for students,
  each with a cream button; then email, nav, languages and "Last updated".
  No page has a separate closing section.
- **Hero (home):** the heading across the full width; below it the
  standfirst and actions in eight columns and the "Now" note in three.
- **Rail:** from 56rem a section's heading sits in a 17rem left column and
  its content on the right, and the heading stays in view under the header
  while a long section scrolls past. Below 56rem they stack.
- **Inner pages:** from 64rem the page's Chinese name is set vertically in
  the left margin (政策, 教學, 關於我們, 團隊, 聯絡), like the subject names on the
  chalkboard in our classroom photographs: chalk yellow on the navy and green
  bands. It is decoration, hidden from screen readers; the `<h1>` is the
  title.
- **The two halves:** where Policy and Teaching sit side by side (the doors
  and outcomes on Home, "What we do" and the outcomes on About), each half
  runs to its edge of the window in its own colour. On phones they stack.
- **Margin notes:** a caveat or source sits in a right-hand column beside the
  sentence it supports from 64rem, and follows it below that. No toggles, no
  numbered footnotes.
- **Phones:** nothing scrolls sideways at 320px. Every link or button that
  stands on its own is at least 44×44px. Photographs are cropped per image so
  faces stay in frame. A three-photo gallery shows one photograph; a photo
  grid shows them all, two across.

## 6. Components

| Component | Purpose |
| --- | --- |
| `Case`, `CaseBrief` | The case, in full and in brief |
| `Ledger` | Every submission as a dated list; a table when wide, stacked rows when narrow |
| `Steps` | Real sequences only: the four Think First steps, the three steps of a proposal |
| `ThreePart` | The case for, the case against, what we recommend |
| `MarginNote` | A caveat beside the text it supports |
| `SummaryList` | Key and value list, used once on About |
| `Annotated`, `Worksheet` | The Think First worksheet as HTML, with numbered notes |
| `Gallery` | One large photograph and two small (or a pair), with one caption for all |
| `PhotoGrid` | A whole set of photographs in a grid; each opens at full size |
| `FigureRow` | A row of figures: under the home hero, and AI for All in numbers on Policy |
| `MeterList` | A few percentages on aligned bars, each with its value printed and its source named |
| `Now` | The "Now" note in the home hero, from `facts.now` |
| `PageTop`, `VerticalTitle` | The top of an inner page and its margin title |
| `Photo` | A photograph from `src/assets/photos/`, as AVIF and WebP at four widths |
| `ProposalPage` | The layout of `/policy/<key>` |
| `Logo`, `Header`, `Footer`, `OnThisPage` | Site furniture |

The only JavaScript is the phone menu, and the contact form's "Sending…"
state. Everything else works without it.

## 7. Rules that keep it honest

1. **Every figure comes from `src/data/facts.ts`.** A figure may appear more
   than once on a page (the previous site's sections were all kept), but it
   is always the same number from the same place.
2. **Placeholders never go live.** Anything marked `sample: true` shows with
   a "Sample" tag in `npm run dev` and is left out of the built site.
   `scripts/check-design.mjs` runs after every build and fails it if sample
   content, an arrow character, an eyebrow label, a count-up or a scroll
   reveal is found.
3. **Attribution on AI for All stays limited.** We recommended it and the
   Budget went that way. It is a government programme; we didn't fund it and
   we don't run it.
4. **"Not yet" is shown.** A proposal that hasn't changed anything says so.
5. **Sentence case, active voice, no promotional adjectives.**

## 8. What was kept, and what was removed

Kept from the previous site, restyled: every section and every sentence, the
four figures under the hero, the two doors and the two outcome panels, "Who
we are", "What we're working on", "Latest work", the full sample lesson on
the Teaching page, all eighteen classroom photographs, the separate Team
page, and the closing calls to action. The v4 pieces (the case, the ledger, the proposal pages, the
worksheet, the summary list) were added on top.

Removed:

- The warm off-white ground, blue and orange blocks, rounded cards and soft
  shadows: now the look AI tools produce when told to look less like AI.
- The count-up on 86% (screenshots caught it mid-count), scroll reveals and
  the hero entrance.
- Every arrow after a link, the pill-shaped "On this page" chips, the
  three-bar logo, the icon set, and the photo lightbox (each photograph in a
  grid is now a plain link to its full-size version).
