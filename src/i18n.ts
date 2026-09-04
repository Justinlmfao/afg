// Trilingual routing and shared UI strings.
//
// English is the default and lives at the root (/, /about, /policy…).
// Traditional Chinese lives under /zh, Simplified under /zh-hans.
// Page prose lives in the page files themselves — only chrome and shared
// labels are here, so translating a page means editing that page.
//
// Traditional is the source of the Chinese: the /zh-hans pages are generated
// from /zh by `npm run zh-hans`. See scripts/generate-simplified.mjs.

export const languages = {
  en: 'English',
  zh: '繁體中文',
  hans: '简体中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

/** The URL prefix each language sits under. English is the bare root. */
export const prefixes: Record<Lang, string> = {
  en: '',
  zh: '/zh',
  hans: '/zh-hans',
};

/** Display order of the language switcher — English first, as the default. */
export const langOrder: Lang[] = ['en', 'zh', 'hans'];

/** The `lang` attribute for each language. */
export const htmlLangs: Record<Lang, string> = {
  en: 'en',
  zh: 'zh-Hant-HK',
  hans: 'zh-Hans',
};

/** The hreflang each language is advertised under. */
export const hreflangs: Record<Lang, string> = {
  en: 'en',
  zh: 'zh-Hant',
  hans: 'zh-Hans',
};

/** Which language a URL is in. Anything outside a known prefix is English. */
export function getLangFromUrl(url: URL): Lang {
  const first = '/' + url.pathname.split('/')[1];
  if (first === prefixes.hans) return 'hans';
  if (first === prefixes.zh) return 'zh';
  return 'en';
}

/**
 * The same page in the given language.
 * localizePath('/policy', 'zh')        -> '/zh/policy'
 * localizePath('/zh/policy', 'hans')   -> '/zh-hans/policy'
 * localizePath('/zh-hans/policy', 'en') -> '/policy'
 */
export function localizePath(pathname: string, lang: Lang): string {
  // Strip whichever language prefix is on the path, longest first so that
  // /zh-hans isn't mistaken for /zh.
  let base = pathname;
  for (const prefix of ['/zh-hans', '/zh']) {
    if (base === prefix || base.startsWith(prefix + '/')) {
      base = base.slice(prefix.length);
      break;
    }
  }
  const clean = base.replace(/\/$/, '') || '/';
  const prefix = prefixes[lang];
  if (clean === '/') return prefix || '/';
  return `${prefix}${clean}`;
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
    langLabel: 'Language',
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
    langLabel: '語言',
    home: 'AI For Good — 首頁',
    footerTagline:
      'AI For Good 是一個由香港學生創辦並營運的組織：向政府提交政策建議，並為基層小學生提供免費補習。',
    footerMeta: '香港 · 於 2023 年 6 月創立',
  },
  hans: {
    skip: '跳至主要内容',
    nav: {
      about: '关于我们',
      policy: '政策研究',
      teaching: '教学计划',
      team: '团队',
      contact: '联系我们',
    },
    langLabel: '语言',
    home: 'AI For Good — 首页',
    footerTagline:
      'AI For Good 是一个由香港学生创办并运营的组织：向政府提交政策建议，并为基层小学生提供免费补习。',
    footerMeta: '香港 · 于 2023 年 6 月创立',
  },
} as const;

/**
 * Short labels for the switcher. Full names are too long to sit three abreast
 * in the header, and these read unambiguously to anyone who needs them.
 */
export const langShort: Record<Lang, string> = {
  en: 'EN',
  zh: '繁體',
  hans: '简体',
};

/** Accessible name for each switcher link, in the language you are leaving. */
export const switchLabels: Record<Lang, Record<Lang, string>> = {
  en: { en: 'English', zh: 'Switch to Traditional Chinese', hans: 'Switch to Simplified Chinese' },
  zh: { en: '切換至英文版', zh: '繁體中文', hans: '切換至簡體中文版' },
  hans: { en: '切换至英文版', zh: '切换至繁体中文版', hans: '简体中文' },
};

/** Nav items in display order, with their English (root) paths. */
export const navItems = [
  { key: 'about', path: '/about' },
  { key: 'policy', path: '/policy' },
  { key: 'teaching', path: '/teaching' },
  { key: 'team', path: '/team' },
  { key: 'contact', path: '/get-involved' },
] as const;
