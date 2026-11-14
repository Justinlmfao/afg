// Every number on the site comes from here, so a figure is changed in one
// place and reads the same in all three languages.
//
// Lines that start with `hans:` are generated from the `zh:` line above them
// by `npm run zh-hans`. Edit the `zh:` line and re-run; don't edit `hans:`.
// Keep each `zh:` value on one line.
//
// SAMPLE: anything with `sample: true` is a placeholder for layout only. It
// shows in `npm run dev` with a "Sample" tag and is left out of the built
// site; scripts/check-design.mjs fails the build if one gets through.

export const facts = {
  founded: {
    en: 'June 2023',
    zh: '2023 年 6 月',
    hans: '2023 年 6 月',
  },
  founders: ['Justin Lo', 'Ka Hei Ng', 'Oscar Zheng'],
  members: { value: '35+', asOf: '2026-11' },
  recsPerYear: {
    value: '~20',
    since: 2024,
    word: {
      en: 'twenty',
      zh: '二十',
      hans: '二十',
    },
  },
  children: { value: 350, asOf: '2026-11' },
  schools: {
    value: 7,
    asOf: '2026-11',
    word: {
      en: 'seven',
      zh: '七',
      hans: '七',
    },
  },
  tutors: { value: 43, asOf: '2026-11' },
  modules: ['Mathematics', 'English', 'Economics', 'Science'],
  bandUp: {
    value: 86,
    unit: '%',
    since: 2024,
    // SAMPLE: replace with the real basis for the figure, then delete
    // `sample: true`. Until then the note is not shown on the built site.
    method: {
      sample: true,
      en: 'Based on class-band records for 112 of our students at four schools, comparing the term before they joined with their latest report.',
      zh: '根據四間學校共 112 名學生的組別紀錄，比較他們加入前一個學期與最近一份成績表。',
      hans: '根据四所学校共 112 名学生的组别纪录，比较他们加入前一个学期与最近一份成绩表。',
    },
  },
  aiForAll: {
    amount: {
      en: 'HK$50 million',
      zh: '五千萬港元',
      hans: '五千万港元',
    },
    budget: '2026–27',
    launched: '2026-06',
    reach: 50000,
    source: 'https://www.info.gov.hk/gia/general/202606/10/P2026061000476.htm',
  },
  now: {
    en: 'Working on our submission to the First Five-Year Plan (2026–2030), and going back to Ho Man Tin Ling To Catholic School next year with new tutors.',
    zh: '正在撰寫第一個五年規劃（2026–2030）的意見書；明年會帶新一批導師重返天主教領島學校。',
    hans: '正在撰写第一个五年规划（2026–2030）的意见书；明年会带新一批导师重返天主教领岛学校。',
    updated: '2026-11',
  },
};

// The address on the Contact page and in the footer. Change it here once
// hello@aiforgoodhk.org forwards to an inbox someone reads.
export const contactEmail = 'ps20153216@student.vsa.edu.hk';

/** True where placeholder content may be shown: `npm run dev` only. */
export const showSamples = import.meta.env.DEV;
