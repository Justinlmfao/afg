// Content collections.
//
// Each collection is a folder of Markdown files. To add an item — a policy
// submission, a teaching module, a team member — copy the example file in the
// matching folder, edit the fields at the top, and the site rebuilds itself.
//
// Set `draft: true` on any file to keep it in the repo as a template without
// showing it on the live site. `order` sorts (lower first).

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Policy proposals (Policy page, and "Latest work" on the home page).
//
// One Markdown file per proposal per language, sharing a `key`:
//   think-first.en.md    English
//   think-first.zh.md    Traditional Chinese
//   think-first.hans.md  Simplified, generated from the .zh.md by
//                        `npm run zh-hans` (don't edit it by hand)
// The front matter holds what the summary card shows; the Markdown body is the
// full paper, which opens beneath it. Use #### for headings inside the body.
// Only real proposals belong here.
const submissions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/submissions' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'zh', 'hans']),
    // Shared across the language versions; also the link anchor on /policy,
    // e.g. /policy#think-first. (Not called `slug`: Astro would treat that as
    // the entry's ID, and the language versions would collide.)
    key: z.string(),
    // What the paper is. "submission": a proposal we actually sent to a
    // government consultation (only those). "brief": an AFG paper not yet
    // sent. "looking-back": a review, written later, of a measure the
    // government has already taken.
    kind: z.enum(['submission', 'brief', 'looking-back']).default('submission'),
    // When the government announced the measure the paper is about, as
    // "YYYY-MM-DD". The Policy page is sorted by it; a paper without one
    // (our own proposals) sorts by `written`.
    measureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    // When we wrote it, as "YYYY-MM". Shown on every card.
    written: z.string().regex(/^\d{4}-\d{2}$/),
    // Policy area as displayed, e.g. "Education & inequality".
    area: z.string(),
    // Pairs an earlier measure with the later paper it led to.
    thread: z.enum(['housing', 'tax-family', 'healthcare', 'ai-government']).optional(),
    // Keys of related papers. A link is shown only once that paper exists.
    builtOn: z.string().optional(),
    ledTo: z.string().optional(),
    // Two or three sentences for the card.
    summary: z.string(),
    // Optional PDF in /public/research/, referenced as "/research/file.pdf".
    pdf: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Teaching modules (Teaching page). The Markdown body is the description; the
// `why` line explains how the module closes the gap. `icon` names a glyph in
// src/components/Icon.astro (math, english, economics, science).
const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    icon: z.string().default('education'),
    why: z.string().optional(),
    // Traditional Chinese for the /zh pages. `body_zh` replaces the Markdown
    // body, which is English-only; it is a single paragraph. The _hans twins
    // are generated from these by `npm run zh-hans`.
    title_zh: z.string().optional(),
    body_zh: z.string().optional(),
    why_zh: z.string().optional(),
    title_hans: z.string().optional(),
    body_hans: z.string().optional(),
    why_hans: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Team members (Team page, where pressing a name opens the bio). The Markdown
// body is the English bio. `bio_zh` is the Traditional Chinese, one string per
// paragraph; `bio_hans` is generated from it by `npm run zh-hans`.
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    role_zh: z.string().optional(),
    role_hans: z.string().optional(),
    bio_zh: z.array(z.string()).optional(),
    bio_hans: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { submissions, programs, team };
