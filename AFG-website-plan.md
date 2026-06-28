# AI For Good — Website Content Plan & Build Brief

This document has everything you need to build the site:

1. Positioning & site map
2. Full page copy (ready to use, with `[PLACEHOLDERS]` for facts only you know)
3. Design direction
4. A placeholder checklist (fill these in before publishing)
5. A copy-paste prompt for Claude Code

## 1. Positioning

**One-line description:** AI For Good is a student-led think tank in Hong Kong
working at the intersection of technology, policy, and education — producing
research, engaging government, and teaching AI literacy to underserved
communities.

**Who the site is for (in priority order):**

1. Government / policy contacts and institutions assessing your credibility
2. Schools, NGOs, and partners considering working with you
3. Students who want to join
4. Press, donors, and the public

**The one thing a visitor should leave knowing:** A group of students built a
credible, three-year body of real policy work and reached 300+ children — this
is substance, not a school club.

**Tone:** Measured, evidence-based, confident without overselling. Think
understated institutional, not startup hype. Short sentences. Let the work
speak.

## 2. Site Map

```
Home
About        (mission, story, what makes AFG different)
Research     (publications, submissions, policy work — the credibility page)
Programs     (outreach teaching, AI literacy education)
Team         (people + structure)
Get Involved (join / partner / contact)
```

Six pages. Don't add more until you have a reason to.

## 3. Page Copy

Replace anything in `[BRACKETS]`. Everything else is ready to use.

### HOME

**Hero headline:** Technology should serve everyone. We do the work to make
sure it does.

**Hero subhead:** AI For Good is a student-led think tank in Hong Kong. We
produce policy research, engage with government, and teach AI literacy to
communities that are too often left out of the conversation.

**Primary button:** Read our research → /research
**Secondary button:** Get involved → /get-involved

**Stats band (three numbers, high-impact — confirm exact figures):**

- 3+ years building from a school club into a working think tank
- 300+ children taught across [NUMBER] Hong Kong schools
- [NUMBER] submissions to government consultations and policy bodies

**Section — What we do (three short cards):**

- **Research & Policy** — We publish research on how AI affects society and
  submit evidence-based recommendations to government consultations and public
  bodies.
- **Education & Outreach** — We run hands-on AI literacy programs for
  underprivileged students across Hong Kong, because access to understanding
  technology shouldn't depend on where you're born.
- **Public Engagement** — We bring students, educators, and policymakers into
  the same conversation about building technology that works for people.

**Section — Closing line:** We're students. We think that's the point — the
people who will live longest with these decisions should have a hand in shaping
them.

### ABOUT

**Page heading:** About AI For Good

**Mission statement:** AI For Good exists to ensure that artificial
intelligence develops in a way that serves the public good — especially for
communities with the least power to shape it. We do this through rigorous
research, direct policy engagement, and education that reaches the people
technology usually overlooks.

**Our story:** AI For Good began as a student club at Victoria Shanghai
Academy. Over [THREE] years it grew into something larger: a student-led think
tank producing original policy research, making formal submissions to
government, and running AI literacy programs across Hong Kong.

What stayed constant was a belief that students shouldn't wait for permission
to do serious work. The questions raised by AI — about fairness, access, and
accountability — will define our generation more than any other. We decided to
start answering them now.

**What makes us different:**

- **Evidence over opinion.** Every position we take is grounded in research.
  We'd rather be careful and right than loud and wrong.
- **We do, not just discuss.** A think tank that only talks is a debate club.
  We translate research into submissions, programs, and measurable outreach.
- **Access is the mission.** Most conversations about AI happen among people
  who already have power and resources. We deliberately work with those who
  don't.

**Our values (short list):**

- Intellectual humility — we hold our views openly and revise them with evidence
- Service before recognition — impact matters more than titles
- Civil, evidence-based discourse — we make arguments, not noise

### RESEARCH

This is your most important page for credibility. Make it real and specific —
placeholders here matter most.

**Page heading:** Research & Policy

**Intro:** We produce research on the social, economic, and ethical dimensions
of artificial intelligence, and we put that research to work — through formal
submissions to government consultations and recommendations to public bodies.

**Subsection — Government & Policy Submissions:** For each submission, use this
format:

> [Title of submission] — Submitted to [body / consultation name], [Month
> Year]. [One or two sentences on what it argued and what it recommended.]
> [Link to PDF →]

(Repeat for each. If you have even one or two real ones, that's powerful — list
them prominently.)

**Subsection — Publications & Reports:**

> [Report title] — [Month Year] · [X-page report]. [One-sentence summary of the
> finding or argument.] [Download PDF →]

**Subsection — Research Areas (if you want to show breadth):**

- [e.g. AI and educational equity]
- [e.g. Algorithmic accountability in public services]
- [e.g. AI governance in the Hong Kong / Greater Bay Area context]

**Note to self:** host the actual PDFs in the site repo (a `/public/research/`
folder) so the download links are permanent.

### PROGRAMS

**Page heading:** Education & Outreach

**Intro:** Understanding AI shouldn't be a privilege. We run hands-on programs
that teach AI literacy to students who don't usually get access to it —
reaching 300+ children across [NUMBER] schools in Hong Kong.

**Subsection — [Program name, e.g. "AI Literacy Workshops"]:** [What it is, who
it serves, what students actually do and learn. 2–3 sentences. Be concrete:
"Students build their first model," not "students gain exposure."]

**Subsection — Impact:**

- 300+ students reached
- [NUMBER] partner schools
- [NUMBER] workshops / sessions delivered
- [Any other measurable outcome — surveys, feedback, returning students]

**A line of human texture (optional but effective):** [One short, specific
anecdote — a moment from a session, a student's question, something real. This
is what people remember.]

### TEAM

**Page heading:** Our Team

**Intro:** AI For Good is run entirely by students, organized into [research,
education, and operations] teams.

**Structure (describe briefly, then list people):**

- Leadership — [President, VPs, etc.]
- Research team — [what they do]
- Education & outreach team — [what they do]

**Per-person card:**

> [Name] — [Role] — [One line — focus area or a sentence of substance, not
> fluff.]

(For yourself, keep it understated — your record speaks. Something like:
"Founder and President. Leads research and policy; interested in development and
financial economics.")

### GET INVOLVED

**Page heading:** Get Involved

**Three paths:**

- **Students** — Want to do real research or teach? We're looking for people
  who care more about the work than the title. [How to apply / email.]
- **Schools & Partners** — If you run a school or program serving underserved
  students, we'd like to work with you. [Contact.]
- **Everyone else** — Press, collaboration, or just questions — get in touch.

**Contact:** Email: [contact@email] · [Optional: Instagram / LinkedIn] · Based
in Hong Kong.

**Contact form fields:** Name · Email · Organization (optional) · Message
(Netlify handles form submissions free — no backend needed.)

## 4. Design Direction

Aim for editorial and restrained — the visual language of a serious
publication, not a tech startup.

- **Typography:** a clean serif for headings (e.g. Source Serif, Newsreader, or
  Spectral) paired with a quiet sans-serif for body (e.g. Inter or IBM Plex
  Sans). Generous line spacing.
- **Palette:** mostly off-white / warm grey background, near-black text, one
  restrained accent color (a deep blue or muted green). No gradients, no neon.
- **Layout:** lots of whitespace, a narrow readable text column, content that
  breathes. Slow and unhurried, not busy.
- No stock photos of robots or glowing brains. If you use imagery, use real
  photos of your programs (with permission) or simple typographic/graphic
  elements.
- Mobile-first and accessible: proper heading hierarchy, alt text, good
  contrast, keyboard-navigable.

## 5. Placeholder Checklist — fill before publishing

- [ ] Exact year AFG was founded
- [ ] Exact number of partner schools
- [ ] Exact number of submissions / their titles, bodies, and dates
- [ ] Report/publication titles + the actual PDF files
- [ ] Number of workshops/sessions delivered
- [ ] One real anecdote for the Programs page
- [ ] Team member names, roles, one line each
- [ ] Contact email + any social links
- [ ] Confirm "300+" is current and accurate
- [ ] Research areas (3–5 real ones)

> ⚠️ Don't publish with bracketed placeholders or rounded-up numbers still in
> place. For an org doing government work, one inflated claim costs you more
> than ten modest true ones.
