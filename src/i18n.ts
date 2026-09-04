// Bilingual routing and shared UI strings.
//
// English is the default and lives at the root (/, /about, /policy…).
// Traditional Chinese lives under /zh (/zh, /zh/about, /zh/policy…).
// Page prose lives in the page files themselves — only chrome and shared
// labels are here, so translating a page means editing that page.

export const languages = {
  en: 'English',
  zh: '繁體中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

/** Which language a URL is in. Anything not under /zh is English. */
export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/')[1];
  return first === 'zh' ? 'zh' : 'en';
}

/**
 * The same page in the given language.
 * localizePath('/policy', 'zh') -> '/zh/policy'
 * localizePath('/zh/policy', 'en') -> '/policy'
 */
export function localizePath(pathname: string, lang: Lang): string {
  const base = pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
  const clean = base.replace(/\/$/, '') || '/';
  if (lang === 'en') return clean;
  return clean === '/' ? '/zh' : `/zh${clean}`;
}

/** Nav and shared chrome, per language. */
export const ui = {
  en: {
    skip: 'Skip to content',
    nav: {
      about: 'About',
      policy: 'Policy',
      teaching: 'Teaching',
      team: 'Team',
      contact: 'Contact',
    },
    // The switcher always names the language it takes you to.
    switchTo: '繁體中文',
    switchLabel: 'Switch to Traditional Chinese',
    home: 'AI For Good — home',
    footerTagline:
      'A student-led and student-founded organisation in Hong Kong: policy research submitted to lawmakers, and free tutoring for underprivileged primary students.',
    footerMeta: 'Hong Kong · Founded June 2023',
  },
  zh: {
    skip: '跳至主要內容',
    nav: {
      about: '關於我們',
      policy: '政策研究',
      teaching: '教學計劃',
      team: '團隊',
      contact: '聯絡我們',
    },
    switchTo: 'English',
    switchLabel: '切換至英文版',
    home: 'AI For Good — 首頁',
    footerTagline:
      'AI For Good 是一個由香港學生創辦並營運的組織：向政府提交政策建議，並為基層小學生提供免費補習。',
    footerMeta: '香港 · 於 2023 年 6 月創立',
  },
} as const;

/** Nav items in display order, with their English (root) paths. */
export const navItems = [
  { key: 'about', path: '/about' },
  { key: 'policy', path: '/policy' },
  { key: 'teaching', path: '/teaching' },
  { key: 'team', path: '/team' },
  { key: 'contact', path: '/get-involved' },
] as const;
