// Policy papers (src/content/submissions/): their order and the labels on
// their cards, shared by the Policy page and the home page's "Latest work"
// in every language.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

type PaperData = CollectionEntry<'submissions'>['data'];

// The page runs in the order the government acted. A paper that isn't about a
// government measure (our own proposals) sorts by when we wrote it.
const sortKey = (p: PaperData) => p.measureDate ?? `${p.written}-01`;

/** Published papers in one language, oldest first. */
export async function getPapers(lang: Lang) {
  return (await getCollection('submissions'))
    .filter((s) => !s.data.draft && s.data.lang === lang)
    .sort((a, b) => sortKey(a.data).localeCompare(sortKey(b.data)));
}

/** The most recently written papers, newest first, for "Latest work". */
export async function getLatestPapers(lang: Lang, count: number) {
  return (await getPapers(lang))
    .sort(
      (a, b) =>
        b.data.written.localeCompare(a.data.written) ||
        sortKey(b.data).localeCompare(sortKey(a.data))
    )
    .slice(0, count);
}

/** "2026-10" or "2026-10-16" → "October 2026" / "2026 年 10 月". */
export function formatMonth(iso: string, lang: Lang) {
  const [year, month] = iso.split('-').map(Number);
  if (lang !== 'en') return `${year} 年 ${month} 月`;
  const name = new Date(Date.UTC(year, month - 1)).toLocaleString('en-GB', {
    month: 'long',
    timeZone: 'UTC',
  });
  return `${name} ${year}`;
}

/** Card labels; each date label runs straight into its date. Only a paper
    actually sent to a consultation is a submission. */
export const paperLabels = {
  en: {
    kind: { submission: 'Submission', brief: 'Brief', 'looking-back': 'Looking back' },
    announced: 'Measure announced ',
    written: 'Written ',
    builtOn: 'Builds on: ',
    ledTo: 'Led to: ',
  },
  zh: {
    kind: { submission: '已提交建議', brief: '研究簡報', 'looking-back': '回顧' },
    announced: '措施公布：',
    written: '撰寫：',
    builtOn: '延續自：',
    ledTo: '後續文章：',
  },
  hans: {
    kind: { submission: '已提交建议', brief: '研究简报', 'looking-back': '回顾' },
    announced: '措施公布：',
    written: '撰写：',
    builtOn: '延续自：',
    ledTo: '后续文章：',
  },
} as const;
