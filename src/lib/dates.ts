// Dates for the ledger and the case line.
//
// A date is written once, in a plain sortable form, and shown in whichever
// language the page is in:
//   '2024'              a year
//   '2025-08'           a month
//   '2026-02/2026-06'   a span of months
//   '2024/2026'         a span of years ('2025/2026' is shown as 2025–26)
import type { Lang } from '../i18n';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type Point = { year: number; month?: number };

function point(iso: string): Point {
  const [y, m] = iso.split('-');
  return { year: Number(y), month: m ? Number(m) : undefined };
}

/** The first moment a date covers: used to work out the time between stages. */
function start(iso: string): Point {
  return point(iso.split('/')[0]);
}

/** A date as readers see it. `long` spells the month out in English. */
export function formatDate(iso: string, lang: Lang, style: 'short' | 'long' = 'short'): string {
  const [a, b] = iso.split('/').map(point);
  const zh = lang !== 'en';
  const names = style === 'long' ? MONTHS_LONG : MONTHS_SHORT;
  const one = (p: Point) =>
    zh
      ? p.month ? `${p.year} 年 ${p.month} 月` : `${p.year} 年`
      : p.month ? `${names[p.month - 1]} ${p.year}` : `${p.year}`;

  if (!b) return one(a);

  // Months within one year: "Feb–Jun 2026"
  if (a.month && b.month && a.year === b.year) {
    return zh
      ? `${a.year} 年 ${a.month}–${b.month} 月`
      : `${names[a.month - 1]}–${names[b.month - 1]} ${a.year}`;
  }
  // Whole years: "2025–26" for consecutive years, otherwise "2024–2026"
  if (!a.month && !b.month) {
    const span = b.year === a.year + 1 ? `${a.year}–${String(b.year).slice(2)}` : `${a.year}–${b.year}`;
    return zh ? `${span} 年` : span;
  }
  return `${one(a)}–${one(b)}`;
}

/** The value for a <time datetime>. Spans have none. */
export function machineDate(iso: string): string | undefined {
  return iso.includes('/') ? undefined : iso;
}

/** The year a ledger row is filed under: the year its date ends in. */
export function ledgerYear(iso: string): number {
  return point(iso.split('/').pop()!).year;
}

const EN_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const ZH_WORDS = ['零', '一', '兩', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

/**
 * The time between two stages of a case, for the small label on the line:
 * "six months later", "the next year". Returns nothing when either date is
 * missing, so an unknown gap is simply left off.
 */
export function gapLabel(from: string | undefined, to: string | undefined, lang: Lang): string | undefined {
  if (!from || !to) return undefined;
  const a = start(from);
  const b = start(to);
  const zh = lang !== 'en';
  // Simplified is produced from the Traditional by `npm run zh-hans` for page
  // copy, but these few words are built here, so both are spelled out.
  const hans = lang === 'hans';
  const count = (n: number) => (zh ? ZH_WORDS[n] ?? String(n) : EN_WORDS[n] ?? String(n));

  if (a.month && b.month) {
    const months = (b.year - a.year) * 12 + (b.month - a.month);
    if (months <= 0) return undefined;
    if (months % 12 === 0) {
      const years = months / 12;
      if (zh) return years === 1 ? (hans ? '一年后' : '一年後') : `${count(years)}年${hans ? '后' : '後'}`;
      return years === 1 ? 'a year later' : `${count(years)} years later`;
    }
    if (zh) return `${count(months)}${hans ? '个月后' : '個月後'}`;
    return months === 1 ? 'a month later' : `${count(months)} months later`;
  }

  const years = b.year - a.year;
  if (years < 0) return undefined;
  if (years === 0) return zh ? (hans ? '同年稍后' : '同年稍後') : 'later that year';
  if (years === 1) return zh ? '翌年' : 'the next year';
  return zh ? `${count(years)}年${hans ? '后' : '後'}` : `${count(years)} years later`;
}

/** "Nov 2026" / "2026 年 11 月" for a Date, used for "Last updated". */
export function monthOf(date: Date, lang: Lang): string {
  const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  return formatDate(iso, lang);
}
