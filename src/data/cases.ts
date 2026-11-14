// The AI for All story, told the way every piece of our work is told:
// what we noticed, what we did, what changed. It appears in full on the home
// page and on the Policy page, so the words live here once.
//
// Lines that start with `hans:` are generated from the `zh:` line above them
// by `npm run zh-hans`. Edit the `zh:` line and re-run; don't edit `hans:`.
// Keep each `zh:` value on one line.
//
// Attribution is deliberately limited. AI for All is a government programme;
// we say we recommended it and the Budget went that way, and nothing
// stronger. Don't strengthen the wording without a citable acknowledgement.
import { facts } from './facts';
import type { Lang } from '../i18n';

type Words = { en: string; zh: string; hans: string };

export const aiForAll = {
  period: {
    en: 'AI for All, 2024–2026',
    zh: 'AI for All，2024–2026 年',
    hans: 'AI for All，2024–2026 年',
  },
  title: {
    en: 'From what we saw in class to the 2026–27 Budget.',
    zh: '從課室所見，到 2026–27 年度財政預算案。',
    hans: '从教室所见，到 2026–27 年度财政预算案。',
  },
  noticed: {
    date: '2024',
    text: {
      en: 'We were teaching in schools with no AI lessons and no money to start any. The children picked things up fast. What they were missing was access.',
      zh: '我們在一些沒有人工智能課堂、也沒有資源開辦的學校教書。孩子學得很快，缺的是接觸的機會。',
      hans: '我们在一些没有人工智能课堂、也没有资源开办的学校教书。孩子学得很快，缺的是接触的机会。',
    },
    photo: 'teaching-chalkboard-maths.jpg',
    caption: {
      en: 'In class, where most of our proposals start.',
      zh: '課堂上：我們大部分建議的起點。',
      hans: '课堂上：我们大部分建议的起点。',
    },
  },
  did: {
    date: '2025-08',
    text: {
      en: 'We interviewed our tutors, checked what public support already existed and who it missed, and wrote the case for, the case against, and our recommendation. We sent it to the Policy Address consultation, then made the same case in our Budget submission.',
      zh: '我們訪問了自己的導師，研究現有的公共支援幫到誰、漏了誰，然後寫下支持的理由、反對的理由和我們的建議。我們把它提交到施政報告諮詢，之後在財政預算案的意見書中再次提出同一論點。',
      hans: '我们访问了自己的导师，研究现有的公共支援帮到谁、漏了谁，然后写下支持的理由、反对的理由和我们的建议。我们把它提交到施政报告咨询，之后在财政预算案的意见书中再次提出同一论点。',
    },
    document: {
      en: 'Policy Address submission',
      zh: '施政報告意見書',
      hans: '施政报告意见书',
    },
  },
  changed: {
    date: '2026-02/2026-06',
    figure: facts.aiForAll.amount,
    // The one highlighted phrase on the page: who the programme is aimed at.
    text: {
      en: "The 2026–27 Budget allocated it to AI for All, which launched in June 2026. Cyberport's part is aimed at <mark>students, parents, older people and underprivileged communities</mark>, the groups we said a general push on AI skills would reach last.",
      zh: '2026–27 年度財政預算案把這筆款項撥給 AI for All，計劃在 2026 年 6 月啟動。數碼港的部分以<mark>學生、家長、長者和基層社群</mark>為對象，正是我們指出一般人工智能技能推廣最遲才會照顧到的人。',
      hans: '2026–27 年度财政预算案把这笔款项拨给 AI for All，计划在 2026 年 6 月启动。数码港的部分以<mark>学生、家长、长者和基层社群</mark>为对象，正是我们指出一般人工智能技能推广最迟才会照顾到的人。',
    },
    source: {
      en: 'Government press release, 10 June 2026',
      zh: '政府新聞公報，2026 年 6 月 10 日',
      hans: '政府新闻公报，2026 年 6 月 10 日',
    },
    sourceHref: facts.aiForAll.source,
  },
  claim: {
    en: "We recommended it, and the Budget went that way. AI for All is a government programme, paid for and run by public bodies. We didn't fund it and we don't run it.",
    zh: '我們提出了這項建議，而預算案朝這個方向走。AI for All 是政府的計劃，由公營機構出資和推行。我們沒有出資，也沒有參與營運。',
    hans: '我们提出了这项建议，而预算案朝这个方向走。AI for All 是政府的计划，由公营机构出资和推行。我们没有出资，也没有参与运营。',
  },
  more: {
    en: 'The full story and sources',
    zh: '完整經過和資料來源',
    hans: '完整经过和资料来源',
  },
} satisfies Record<string, unknown>;

/** The AI for All case in one language, shaped for Case.astro. */
export function aiForAllCase(lang: Lang, links: { document: string }) {
  const w = (words: Words) => words[lang];
  const c = aiForAll;
  return {
    period: w(c.period),
    title: w(c.title),
    noticed: {
      date: c.noticed.date,
      text: w(c.noticed.text),
      evidence: { kind: 'photo' as const, photo: c.noticed.photo, label: w(c.noticed.caption) },
    },
    did: {
      date: c.did.date,
      text: w(c.did.text),
      evidence: { kind: 'document' as const, label: w(c.did.document), date: c.did.date, href: links.document },
    },
    changed: {
      date: c.changed.date,
      status: 'changed' as const,
      figure: w(c.changed.figure),
      text: w(c.changed.text),
      evidence: { kind: 'source' as const, label: w(c.changed.source), href: c.changed.sourceHref },
    },
    claim: w(c.claim),
    more: w(c.more),
  };
}
