// Short lines from the children we teach, shown on the home page.
//
// Every line here must be something a child actually said, with their
// family's and school's permission, and no names. Lines marked
// `sample: true` are stand-ins: they appear only on the local preview
// (`npm run dev`), never on the built site, and the design check fails the
// build if one ever reaches it. Replace them with real lines and delete
// `sample: true`; while every line is a sample, the block doesn't appear
// on the live site at all.
//
// `hans:` lines are regenerated from the `zh:` line above by `npm run zh-hans`.
type Words = { en: string; zh: string; hans: string };
export interface Voice {
  text: Words;
  who: Words;
  sample?: boolean;
}

export const voices: Voice[] = [
  {
    text: {
      en: 'I asked it for a hint, not the answer. Then I got it myself.',
      zh: '我只叫它給我提示，不是答案。然後我自己做到了。',
      hans: '我只叫它给我提示，不是答案。然后我自己做到了。',
    },
    who: {
      en: 'Primary 5',
      zh: '小五學生',
      hans: '小五学生',
    },
    sample: true,
  },
  {
    text: {
      en: "My character is faster, but the other one does more damage. Now I can prove which one's better.",
      zh: '我的角色比較快，但另一個傷害比較高。現在我可以證明哪個比較好。',
      hans: '我的角色比较快，但另一个伤害比较高。现在我可以证明哪个比较好。',
    },
    who: {
      en: 'Primary 4',
      zh: '小四學生',
      hans: '小四学生',
    },
    sample: true,
  },
  {
    text: {
      en: "I'm going to show my little brother how to use it properly.",
      zh: '我要教細佬點樣正確咁用佢。',
      hans: '我要教细佬点样正确咁用佢。',
    },
    who: {
      en: 'Primary 6',
      zh: '小六學生',
      hans: '小六学生',
    },
    sample: true,
  },
];
