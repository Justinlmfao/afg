// Content collections.
//
// Each collection is a folder of Markdown files. To add an item (a
// submission, a teaching module, a team member), copy an existing file in the
// matching folder and edit the fields at the top; the site rebuilds itself.
//
// Set `draft: true` on any file to keep it in the repo without showing it on
// the site. `order` sorts (lower first).

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Submissions to the government: the ledger on the Policy page, and a page of
// its own for each one that has a paper.
//
// One Markdown file per submission per language, sharing a `key`:
//   think-first.en.md    English
//   think-first.zh.md    Traditional Chinese
//   think-first.hans.md  Simplified, generated from the .zh.md by
//                        `npm run zh-hans` (don't edit it by hand)
//
// A file with only the fields at the top is a row in the ledger. Add the
// paper as the Markdown body (use ### for its headings) and it also gets a
// page at /policy/<key>, opening with its case: what we noticed, what we did,
// what changed.
//
// Real submissions only. If part of a row is a placeholder, mark it
// `sample: true`: see `sample` below.
const submissions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/submissions' }),
  schema: z.object({
    title: z.string(),
    // A shorter name for lists. Defaults to the title.
    short: z.string().optional(),
    lang: z.enum(['en', 'zh', 'hans']),
    // Shared across the language versions; also the page address,
    // /policy/<key>. (Not called `slug`: Astro would treat that as the
    // entry's ID, and the language versions would collide.)
    key: z.string(),
    // When it was sent, in the plain form src/lib/dates.ts reads:
    // "2025-12", "2024", or "2025/2026" for a consultation spanning two years.
    date: z.string(),
    // Policy area, e.g. "Education & inequality".
    area: z.string().optional(),
    // Where it stands. `status_label` replaces the standard wording, e.g.
    // "Reflected in the 2026–27 Budget".
    status: z.enum(['submitted', 'reflected', 'in-progress']).default('submitted'),
    status_label: z.string().optional(),
    // What we asked for, in one line.
    ask: z.string().optional(),
    // The ask above is a placeholder. It shows with a "Sample" tag in
    // `npm run dev` and is left off the built site.
    sample: z.boolean().default(false),
    // For a row that is told elsewhere on the site, where its title links,
    // e.g. "/policy#ai-for-all".
    link: z.string().optional(),

    // The case: what we noticed, what we did, what changed.
    case_title: z.string().optional(),
    noticed: z.string().optional(),
    noticed_date: z.string().optional(),
    did: z.string().optional(),
    changed: z.string().optional(),
    changed_date: z.string().optional(),
    // "pending" is an honest "not yet".
    changed_status: z.enum(['changed', 'pending']).default('pending'),

    // The argument in three lines, shown above the paper.
    case_for: z.string().optional(),
    case_against: z.string().optional(),
    recommendation: z.string().optional(),

    // Two or three sentences: the page's description in search results.
    summary: z.string().optional(),
    // Optional PDF in /public/research/, referenced as "/research/file.pdf".
    pdf: z.string().optional(),
    draft: z.boolean().default(false),
    // Lower first; the newest submission gets the lowest number.
    order: z.number().default(0),
  }),
});

// Teaching modules (Teaching page). `summary` is the one sentence always on
// show; the Markdown body is the fuller description that opens beneath it;
// `why` is the "How it helps" line.
const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    why: z.string().optional(),
    // Traditional Chinese for the /zh pages. `body_zh` replaces the Markdown
    // body, which is English-only; it is a single paragraph. The _hans twins
    // are generated from these by `npm run zh-hans`.
    title_zh: z.string().optional(),
    summary_zh: z.string().optional(),
    body_zh: z.string().optional(),
    why_zh: z.string().optional(),
    title_hans: z.string().optional(),
    summary_hans: z.string().optional(),
    body_hans: z.string().optional(),
    why_hans: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// The people who lead AFG (the People section of the About page, where each
// name opens a bio). The Markdown body is the English bio. `bio_zh` is the
// Traditional Chinese, one string per paragraph; `bio_hans` is generated from
// it by `npm run zh-hans`.
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
