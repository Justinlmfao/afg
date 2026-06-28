// Content collections.
//
// Each collection is just a folder of Markdown files. To add a new item to
// the site — a government submission, a publication, a program, or a team
// member — copy an existing .md file in the matching folder, change the
// frontmatter at the top, and the site rebuilds itself. No component edits.
//
// `order` controls sort position (lower numbers appear first). Anything
// optional can simply be left out of the frontmatter.
//
// Set `draft: true` on any file to keep it in the repo as a template/example
// without showing it on the live site (the pages filter drafts out).

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Government & policy submissions (Research page)
const submissions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/submissions' }),
  schema: z.object({
    title: z.string(),
    // The body / consultation the submission was made to.
    submittedTo: z.string(),
    // Month + Year, e.g. "March 2025". Kept as a string so you control the
    // exact wording; not parsed as a real date.
    date: z.string(),
    summary: z.string(),
    // PDF lives in /public/research/. Reference it as "/research/file.pdf".
    pdf: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Publications & reports (Research page)
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    // e.g. "12-page report"
    detail: z.string().optional(),
    summary: z.string(),
    pdf: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Teaching modules (Programs page). The Markdown body is the description; the
// `why` line explains how the module closes the gap, and `icon`/`variant`
// colour the card. `icon` is an Icon name (math, english, economics, science…).
const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    icon: z.string().default('education'),
    variant: z.string().default('cool'),
    // The "Why it closes the gap" line shown at the foot of each module card.
    why: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Team members (Team page).
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    // One line of substance — focus area or a short sentence.
    bio: z.string(),
    // Which group they belong to, used to organise the page.
    // e.g. "Leadership", "Research", "Education & Outreach".
    group: z.string(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { submissions, publications, programs, team };
