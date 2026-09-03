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

// Policy submissions (Policy page).
//
// Every proposal states the case for, then the case against, then the
// recommendation — so those are first-class fields, and the page renders all
// three in the standing proposal template. Only real, filed submissions
// belong here; while the folder holds none (drafts excluded), the page shows
// "Submissions are published here after they are filed."
const submissions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/submissions' }),
  schema: z.object({
    title: z.string(),
    // The body / consultation the submission was made to,
    // e.g. "the 2025–26 Budget consultation".
    submittedTo: z.string(),
    // Month + Year as you want it displayed, e.g. "February 2025".
    date: z.string(),
    // The three parts of every proposal.
    for: z.string(),
    against: z.string(),
    recommendation: z.string(),
    // Optional PDF in /public/research/, referenced as "/research/file.pdf".
    pdf: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
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
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { submissions, programs, team };
