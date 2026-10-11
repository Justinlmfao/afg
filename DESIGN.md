# AFG site — design plan

Written before building, per the brief ("write a short design plan… review it
against this brief and cut anything generic… then build").

## 1. Palette — 6 named values

| Name | Hex | Job |
| --- | --- | --- |
| Paper | `#FAF7F2` | Page ground. Warm, printable — the site reads as a document, not an app. |
| Ink | `#1C1B18` | Primary text. |
| Graphite | `#5A554C` | Secondary text, metadata. |
| Rule | `#E5DFD3` | Hairlines, table rules, borders. |
| Policy blue | `#2F5D93` | The think-tank's identity: links, rules, and marks on everything policy. |
| Vermilion | `#C2461E` | The teaching programme's identity: marks and accents on everything teaching. |

The two accents were **validated as a pair, not eyeballed** (dataviz skill's
`validate_palette.js`): CVD separation ΔE 17.9 protan / 30.4 tritan, normal-vision
ΔE 27.0, both ≥3:1 against the surface, both inside the mark lightness band. A
colour-blind reader can always tell which pillar they're on.

Each accent also has a 6–8% wash tint (derived, not named) for panel backgrounds:
policy wash ≈ `#EFF3F8`, teaching wash ≈ `#FAF0E9`.

## 2. Type — two faces, strict roles

- **Newsreader** (serif) — headings, proposal titles, the organisation's voice.
  Weights 400/500/600, italic only for sparing emphasis.
- **Inter** (sans) — body, UI, labels, and **every number**. Per the dataviz
  hero-figure spec, the big 86% is set in Inter, not the serif; large standalone
  numbers keep proportional figures, and only aligned columns get `tabular-nums`.
- **No third face.** Captions, eyebrows and small labels are Inter, in
  sentence case; nothing is set in capitals or monospace.
- **One size per heading role** (tokens in `global.css`): `--h2` for section
  headings, `--h3` for sub-sections and card or module titles, `--h4` for
  headings inside dense rows such as process steps.
- While the web fonts load, Arial and Times stand in, resized to Inter's and
  Newsreader's metrics (`Inter fallback`, `Newsreader fallback`), so the page
  doesn't reflow when the real fonts arrive.

## 3. Layout concept

The organising idea: **one paper, two inks.** A single shared grid, type scale,
and background; the two pillars are distinguished by accent colour, density, and
structure — policy is dense and ruled like a well-set policy paper; teaching is
airy and warm with photographs. A reader always knows which side they're on.

Home (the router — sends readers to a pillar instead of averaging them):

```
┌──────────────────────────────────────────────┐
│ AI For Good      Policy Teaching Team Contact │
├──────────────────────────────────────────────┤
│ One-sentence intro: student-led, Hong Kong,  │
│ founded June 2023. It does two things:       │
├──────────────────────┬───────────────────────┤
│ ▍POLICY (blue rule)  │ ▍TEACHING (verm rule) │
│ dense, ruled ledger  │ airy, warm wash       │
│ ~20 recs / yr        │ 86% moved up a band   │
│ HK$50M commitment    │ 350 children · 7 sch. │
│ → Read the policy    │ → See the teaching    │
├──────────────────────┴───────────────────────┤
│ quiet line: 35+ members · student-founded    │
│ short story + values (no ASA/club claims)    │
├──────────────────────────────────────────────┤
│ footer: nav · contact email · HK             │
└──────────────────────────────────────────────┘
```

Policy page — the boldness is spent on the **proposal template**, which makes
the for/against/recommendation method *visible* instead of described:

```
Policy
A student-led think tank that submits written
recommendations to Hong Kong lawmakers.
──────────────────────────────────────────────
~20        recommendations submitted per year
HK$50M     government AI course commitment ←weighted
2024–      Policy Address · Budget feedback
2026–30    First Five-Year Plan (current)
──────────────────────────────────────────────
How a proposal is made
1 Member interviews → 2 Research → 3 Drafting
┌─────────────────────────────────────────────┐
│ Every proposal, same shape:                  │
│ The case for      │ steel-manned arguments   │
│ The case against  │ the honest counter-case  │
│ ▍Recommendation   │ what we ask for (blue)   │
└─────────────────────────────────────────────┘
Submissions
"Submissions are published here after they are filed."
```

Teaching page — the boldness here is the **86% hero figure** (an outcome, not
an activity count); everything else stays quiet:

```
Teaching
Free tutoring for underprivileged primary students,
delivered by trained student tutors.

86%   ← Inter, huge, counted up once; vermilion mark
of our students have moved up at least one
class band since 2024.

350 children taught · 7 schools · 43 tutors trained   (one quiet line)

How we teach — four modules (ruled list, not cards)
Partners — "7 schools, including…" (text, no logo wall)
In the classroom — 6 real photos (lightbox)
A moment from the work — anecdote
```

Photographs belong to the teaching pillar only: the six real session photos
carry the gallery, and one of them heads the Teaching panel on the home page.
Policy stays entirely typographic and ruled. That asymmetry is the point — it
is how a reader knows which side of the organisation they are on before they
read a word.

## 4. Principles specific to this brief

1. **Every number is traceable to the brief**, appears once per page in one
   agreed form (350, 7 schools, 43 tutors, 86%, ~20/yr, HK$50M, 35+ members,
   June 2023), and the strongest figure on each pillar gets the weight: HK$50M
   on policy, 86% on teaching.
2. **The method is shown structurally.** The for/against/recommendation shape
   is rendered with marginal labels like a set document (the standing format
   on /policy), never three matching cards; each real proposal follows it in
   its full text.
3. **No invented output.** Only real proposals go in the submissions
   collection; each shows a summary card that opens to the full paper.
4. **Motion only where it carries meaning**: the 86% counts up once, photos
   open in a lightbox, links underline on hover, and a handful of entrances on
   the two pillar panels. Nothing ambient.
5. **Sentence case everywhere.** No all-caps eyebrow chips, no promotional
   adjectives; active voice, plain verbs.
6. **Headings in the margin, text in one column, spreads across.** On wide
   screens every section uses the **rail**: its heading (and any kicker) sits
   in a 15rem margin column, on the same baseline as the first line of text
   beside it, and stays pinned in view while a long section scrolls past. All
   running text shares the one column to its right, so a reader scans a
   single line of headings and reads from a single left edge. Rows inside a
   section that carry their own label (modules, cohort years) use
   `.rail-row` to put the label in the same margin column. Grids and photos
   (the two doors, the lesson cards, galleries, the two blocks on About,
   calls to action) are spreads: they span the full container. Sections are
   separated by a hairline, with generous padding around narrative sections
   and tight padding (`section-tight`) between short reference rows. Below
   60rem everything folds back to heading-above. The page title block
   (kicker, h1, lead) always starts at the container's left edge. Figures
   that sit under cards share the cards' columns and inset.

## 5. Review — what was cut, and why

Cut from the previous design because it would look the same on any student
nonprofit (or was banned by the brief):

- The particle-network canvas and floating gradient blobs (generic tech
  ambience, no connection to policy documents or tutoring).
- The dark "cinematic" heroes, film grain, and word-by-word headline animation
  (v5 — the mistakes the client flagged; also indistinguishable from an agency
  template).
- The auto-scrolling topic marquee (decorative breadth; the real breadth is the
  named consultations).
- Gradient text, gradient stat numbers, and the animated rainbow progress bar
  ("hero with a big gradient number" is called out by name in the brief).
- All-caps eyebrow pills above every heading → replaced by sentence-case
  accent-coloured section labels.
- Three identical "what we do" cards → replaced by the two differentiated
  pillar panels.
- Card tilt, magnetic buttons, cursor spotlight, fade-up on every section →
  replaced by the short list in principle 4.
- The illustrative submissions, reports, and the "4 recommendations reflected
  in the Policy Address" figure — not in the verified-facts list, so they do
  not appear.

Kept from v4 because it serves this subject: the warm paper ground, the
Newsreader/Inter pairing, the classroom photo gallery + lightbox, and the
count-up treatment (now reserved for the one hero figure).
