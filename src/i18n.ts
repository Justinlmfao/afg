// Trilingual routing and shared UI strings.
//
// English is the default and lives at the root (/, /about, /policy…).
// Traditional Chinese lives under /zh, Simplified under /zh-hans.
// Page prose lives in the page files themselves; only the header, footer
// and the labels shared components print are here.
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

/**
 * Nav, footer and the labels shared components print, per language.
 * Page prose is not here: it lives in the page files. The Simplified block
 * is written by hand (it is short); keep it in step with the Traditional.
 */
export const ui = {
  en: {
    skip: 'Skip to content',
    siteName: 'AI For Good Hong Kong',
    nav: {
      policy: 'Policy',
      teaching: 'Teaching',
      about: 'About',
      contact: 'Contact',
    },
    langLabel: 'Language',
    home: 'AI For Good Hong Kong, home',
    menu: 'Menu',
    close: 'Close',
    navPrimary: 'Main',
    navFooter: 'Footer',
    sending: 'Sending…',
    shareImageAlt:
      'A tutoring session at Ho Man Tin Ling To Catholic School, beside the AI For Good Hong Kong logo.',
    onThisPage: 'On this page',
    now: { label: "What we're doing now", title: 'Now', updated: 'Updated' },
    stage: {
      noticed: 'What we noticed',
      did: 'What we did',
      changed: 'What changed',
      soFar: "What's changed so far",
      claim: 'What we can claim:',
    },
    ledger: {
      date: 'Date',
      submission: 'Submission',
      ask: 'Ask',
      status: 'Where it stands',
    },
    status: {
      submitted: 'Submitted',
      reflected: 'Reflected',
      'in-progress': 'In progress',
    },
    sample: 'Sample',
    proposal: {
      caseFor: 'The case for',
      caseAgainst: 'The case against',
      recommendation: 'What we recommend',
      threeLines: 'The argument in three lines',
      paper: 'The full proposal',
      paperNote: 'As we sent it.',
      paperChip: 'The full proposal, below',
      pdf: 'Download the PDF',
      cite: 'How to cite',
      citeSubmitted: 'Submitted',
      back: 'All our submissions',
      read: 'Read the full proposal',
    },
    footer: {
      blurb:
        'Students in Hong Kong writing policy recommendations for the government and running free tutoring for primary school children. Founded June 2023.',
      schoolsTitle: 'Schools and organisations',
      schoolsText:
        "If you work with children from underprivileged families, we'll bring the lessons, the tutors and the equipment.",
      schoolsAction: 'Work with us',
      studentsTitle: 'Students',
      studentsText:
        "We're recruiting at Victoria Shanghai Academy. If you're interested in policy, economics or AI, we'd love to hear from you.",
      studentsAction: 'Join us',
      place: 'Hong Kong',
      updated: 'Last updated',
    },
  },
  zh: {
    skip: '跳至主要內容',
    siteName: 'AI For Good 香港',
    nav: {
      policy: '政策研究',
      teaching: '教學計劃',
      about: '關於我們',
      contact: '聯絡我們',
    },
    langLabel: '語言',
    home: 'AI For Good Hong Kong，首頁',
    menu: '選單',
    close: '關閉',
    navPrimary: '主要導覽',
    navFooter: '頁尾導覽',
    sending: '傳送中…',
    shareImageAlt: '天主教領島學校的一節補習課，旁邊是 AI For Good Hong Kong 的標誌。',
    onThisPage: '本頁內容',
    now: { label: '我們現在在做的事', title: '現在', updated: '更新於' },
    stage: {
      noticed: '我們看到的',
      did: '我們做了什麼',
      changed: '帶來的改變',
      soFar: '目前的進展',
      claim: '我們能說的：',
    },
    ledger: {
      date: '日期',
      submission: '意見書',
      ask: '我們的要求',
      status: '進展',
    },
    status: {
      submitted: '已提交',
      reflected: '已反映',
      'in-progress': '進行中',
    },
    sample: '示例',
    proposal: {
      caseFor: '支持的理由',
      caseAgainst: '反對的理由',
      recommendation: '我們的建議',
      threeLines: '三句話說明這份建議',
      paper: '建議書全文',
      paperNote: '與我們提交的版本相同。',
      paperChip: '建議書全文，見下文',
      pdf: '下載 PDF',
      cite: '引用格式',
      citeSubmitted: '提交於',
      back: '所有意見書',
      read: '閱讀建議書全文',
    },
    footer: {
      blurb: '一群香港學生，為政府撰寫政策建議，也為小學生提供免費補習。於 2023 年 6 月創立。',
      schoolsTitle: '學校與機構',
      schoolsText: '如果你服務基層家庭的孩子，課程、導師和器材都由我們負責。',
      schoolsAction: '和我們合作',
      studentsTitle: '學生',
      studentsText: '我們正在滬江維多利亞學校招募成員。如果你對政策、經濟或人工智能有興趣，歡迎找我們。',
      studentsAction: '加入我們',
      place: '香港',
      updated: '最後更新：',
    },
  },
  hans: {
    skip: '跳至主要内容',
    siteName: 'AI For Good 香港',
    nav: {
      policy: '政策研究',
      teaching: '教学计划',
      about: '关于我们',
      contact: '联系我们',
    },
    langLabel: '语言',
    home: 'AI For Good Hong Kong，首页',
    menu: '菜单',
    close: '关闭',
    navPrimary: '主导航',
    navFooter: '页脚导航',
    sending: '发送中…',
    shareImageAlt: '天主教领岛学校的一节补习课，旁边是 AI For Good Hong Kong 的标志。',
    onThisPage: '本页内容',
    now: { label: '我们现在在做的事', title: '现在', updated: '更新于' },
    stage: {
      noticed: '我们看到的',
      did: '我们做了什么',
      changed: '带来的改变',
      soFar: '目前的进展',
      claim: '我们能说的：',
    },
    ledger: {
      date: '日期',
      submission: '意见书',
      ask: '我们的要求',
      status: '进展',
    },
    status: {
      submitted: '已提交',
      reflected: '已反映',
      'in-progress': '进行中',
    },
    sample: '示例',
    proposal: {
      caseFor: '支持的理由',
      caseAgainst: '反对的理由',
      recommendation: '我们的建议',
      threeLines: '三句话说明这份建议',
      paper: '建议书全文',
      paperNote: '与我们提交的版本相同。',
      paperChip: '建议书全文，见下文',
      pdf: '下载 PDF',
      cite: '引用格式',
      citeSubmitted: '提交于',
      back: '所有意见书',
      read: '阅读建议书全文',
    },
    footer: {
      blurb: '一群香港学生，为政府撰写政策建议，也为小学生提供免费补习。于 2023 年 6 月创立。',
      schoolsTitle: '学校与机构',
      schoolsText: '如果你服务基层家庭的孩子，课程、导师和器材都由我们负责。',
      schoolsAction: '和我们合作',
      studentsTitle: '学生',
      studentsText: '我们正在沪江维多利亚学校招募成员。如果你对政策、经济或人工智能有兴趣，欢迎找我们。',
      studentsAction: '加入我们',
      place: '香港',
      updated: '最后更新：',
    },
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
  { key: 'policy', path: '/policy' },
  { key: 'teaching', path: '/teaching' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/get-involved' },
] as const;
