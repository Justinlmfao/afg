# AI For Good — website brief for Claude Code

Paste this whole file into Claude Code at the root of the `afg` repo.

---

## Context

You are working in `github.com/Justinlmfao/afg` — an Astro site for **AI For Good (AFG)**, a student-led organisation in Hong Kong founded in June 2023 by Justin Lo, a Year 12 IB student at Victoria Shanghai Academy. It began as a school club and now runs two distinct programmes. The site's job is to make both legible to three audiences at once: government officials who receive our submissions, schools deciding whether to host our tutors, and prospective student members.

There is an existing content plan at `AFG-website-plan.md` and content collections already configured for `research`, `programs`, and `team`. Read the plan before writing anything — it is the source of truth for module names and page structure. Where this brief and the plan conflict, this brief wins.

## Goal

Restructure the site around **two clearly separated pillars**, each with its own landing page and its own set of detail entries:

1. **Policy** — the think tank
2. **Teaching** — the tutoring programme

Right now these blur together. A reader should be able to tell within five seconds which one they are looking at, and the home page should send them to one or the other rather than averaging them into a single generic mission statement.

---

## Section 1 — Policy proposals

Maps to the `research` content collection.

### What it is

A student-led policy think tank that submits written recommendations to Hong Kong lawmakers. Roughly 20 recommendations submitted to government per year.

### Verified facts — use these exactly, do not round or embellish

- Founded June 2023
- 35+ members
- ~20 recommendations submitted to government per year
- HK$50M government AI course commitment — this is the flagship outcome
- Submissions to Hong Kong **Policy Address** consultations since 2024
- Submissions to **Budget** proposal feedback since 2024
- Currently submitting to the **First Five-Year Plan for Economic and Social Development (2026–2030)**

### Our process — give this its own block on the policy page

Member interviews → research → proposal drafting. **Every proposal states the case for, then the case against, then the recommendation.**

That structure is the most distinctive thing about the organisation and it should be visible in the design, not just described in a sentence. Consider expressing the for / against / recommendation shape structurally on the page — a proposal detail template that always shows all three, so a reader can see the method rather than being told about it. Do not turn this into three identical rounded cards.

### Hard constraint

The site currently contains **illustrative placeholder policy submissions**. Do not carry them over into the new build, and do not write new example submissions of your own. Build the proposal template and leave the collection populated only with real, verified submissions — or empty with a plain "Submissions are published here after they are filed" state if Justin has not yet supplied them. Inventing a think tank's output is the one failure mode that would discredit the whole page.

---

## Section 2 — Teaching kids

Maps to the `programs` content collection.

### What it is

Free tutoring for underprivileged primary students in Hong Kong, delivered by trained student tutors across partner schools and community organisations.

### Verified facts

- 300+ children taught across 7 schools *(see the open decision below — one number must be picked)*
- 43 tutors trained
- **86% of students promoted at least one class band since 2024**
- Four teaching modules — take the names and descriptions from `AFG-website-plan.md`, do not invent new ones

### Named partners

- Ho Man Tin Ling To Catholic School
- St. Barnabas' Home & Society
- Kennedy Town School
- "10% Organisation" (partner named in the AFG promo video)

Only 4 of the 7 schools are named. Either write it as "7 schools, including" and name these, or ask Justin for the remaining names. Do not pad the list.

### Emphasis

The 86% band-promotion figure is the strongest thing on this page because it is an outcome rather than an activity count. Give it more visual weight than the headcount numbers. Everything else on the teaching page can be quiet.

---

## Site-wide

**Team** (maps to the `team` collection):

| Name | Role |
|---|---|
| Justin Lo | Founder & President |
| Ka Hei Ng | Research |
| Jackie Xue | Research |
| Oscar Zheng | Partnerships |
| David Dong | Technical |

**Contact:** leave the email off the live site for now. Do not publish `dudequa3@gmail.com`. Instead build a contact route that a government office or a school principal could plausibly use — a simple form, or a clearly marked placeholder Justin can fill with a school-affiliated address. A think tank page with no way to reach it undercuts the claim that it submits to lawmakers, so flag this rather than silently omitting it.

**Tense and status:** AFG's official school-club (ASA) status at VSA is unresolved. Write the policy work and the tutoring in present tense — both are real and ongoing — but do **not** describe AFG anywhere as an official VSA club, ASA, or school-sanctioned society. Describe it as student-led and student-founded.

---

## Open decisions — ask Justin before building, do not guess

1. **Student count.** The site says 300+; the promo video caption says 350. Pick one and use it in every location, including any video captions and social copy in the repo.
2. **Real policy submissions.** Which filed submissions can be published, and can any be linked or attached as PDFs?
3. **The remaining 3 school names**, or approval to write "including".
4. **Contact route** — form, or an address he'll supply.

---

## Design direction

Do not reach for the default nonprofit template: hero with a big gradient number, three identical stat cards, a wall of logos, ALL-CAPS eyebrow labels above every heading, or a fade-and-slide-up on every section.

Ground the design in the actual subject matter. This is a Hong Kong student organisation that writes policy documents and teaches primary-school children — those two worlds look different from each other, and the design should acknowledge that rather than flattening both into one neutral house style. Consider whether the two pillars deserve distinguishable treatments within one coherent system (a shared type scale and grid, differentiated by density, palette weight, or structure) so a reader always knows which side of the organisation they're on.

Before writing code:

1. Write a short design plan — 4–6 named hex values, typefaces and their roles, a layout concept with ASCII wireframes, and the principles specific to this brief.
2. Review the plan against this brief and cut anything that would have come out the same for any other student nonprofit. Say what you changed and why.
3. Then build.

Spend boldness in one place — most likely the policy proposal template or the 86% figure — and keep everything around it disciplined.

## Quality floor

- Responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected, accessible contrast
- Copy in sentence case, active voice, plain verbs; no filler and no promotional adjectives
- Every number on the site traceable to this brief — if a figure is not listed here, it does not go on the page
- Content collections used properly so Justin can add a proposal or a programme without touching layout code
