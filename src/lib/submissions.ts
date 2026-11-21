// Reading the submissions collection: the ledger rows in one language, and
// what each row links to.
import { getCollection, type CollectionEntry } from 'astro:content';
import { localizePath, ui, type Lang } from '../i18n';

export type Submission = CollectionEntry<'submissions'>['data'] & {
  /** True when the file has a paper under its fields, so it gets a page. */
  hasPaper: boolean;
  entry: CollectionEntry<'submissions'>;
};

/** Every published submission in one language, newest first. */
export async function getSubmissions(lang: Lang): Promise<Submission[]> {
  return (await getCollection('submissions'))
    .filter((s) => !s.data.draft && s.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({ ...entry.data, hasPaper: Boolean(entry.body?.trim()), entry }));
}

/** Where a submission's title links: its own page, or where it is told. */
export function submissionHref(s: Submission, lang: Lang): string | undefined {
  if (s.hasPaper) return localizePath(`/policy/${s.key}`, lang);
  if (s.link) return localizePath(s.link, lang);
  return undefined;
}

/** "Submitted", "In progress", or the row's own wording. */
export function statusText(s: Submission, lang: Lang): string {
  return s.status_label ?? ui[lang].status[s.status];
}
