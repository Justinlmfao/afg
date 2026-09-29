// Generate the Simplified Chinese pages from the Traditional ones.
//
//   npm run zh-hans
//
// Traditional Chinese (src/pages/zh/) is the source of the Chinese on this
// site. This script converts it to Simplified and writes src/pages/zh-hans/,
// plus the *_hans fields in the content collections. The output is committed,
// so you can read it in review and hand-edit a sentence if you need to — but a
// hand edit is overwritten the next time this runs, so prefer fixing the
// Traditional and regenerating.
//
// Conversion is opencc-js `hk` → `cn`, which is character-level and safe. Its
// Taiwanese-vocabulary mode is not used: it "corrects" 建立夥伴關係 to
// 创建伙伴关系 and 諮詢文件 to 咨询文档, which are wrong here. Vocabulary that
// genuinely differs between Hong Kong and the mainland is listed in TERMS
// below and applied afterwards.

import fs from 'node:fs';
import path from 'node:path';
import * as OpenCC from 'opencc-js';

const convert = OpenCC.Converter({ from: 'hk', to: 'cn' });

// Hong Kong usage → mainland usage. Applied after character conversion, so
// both sides are written in Simplified. Ordered longest-first at use, so a
// longer phrase wins over a shorter one inside it.
//
// Proper nouns are deliberately absent: 施政报告, 财政预算案, 数码港, 组别,
// 政策局, 天主教领岛学校 and 沪江维多利亚学校 are the names of Hong Kong
// things and keep their Hong Kong names.
const TERMS = {
  课室: '教室',
  手提电脑: '笔记本电脑',
  相片: '照片',
  电邮地址: '电子邮箱',
  电邮至: '发电子邮件至',
  影像辨识: '图像识别',
  辨识: '识别',
  投影片: '幻灯片',
  纾缓: '缓解',
  收窄: '缩小',
  拉阔: '拉大',
  扩阔: '扩大',
  复康: '康复',
  讯息: '留言',
  传媒查询: '媒体查询',
  水准: '水平',
  萤幕: '屏幕',
  有装置: '有设备',
  联络: '联系',
  营运: '运营',
  持份者: '利益相关方',
  透过: '通过',
  轮候名单: '候诊名单',
  // 著 as an aspect particle is 着 in mainland Simplified; opencc leaves it,
  // and a blanket swap would break 著作 and 显著, so list the actual uses.
  // Keys are the already-converted form (带著, not 帶著).
  看著: '看着',
  接著: '接着',
  跟著: '跟着',
  带著: '带着',
  写著: '写着',
  隔著: '隔着',
  沿著: '沿着',
  // Mainland Simplified sets quotations in “ ”, not 「 」.
  '「': '“',
  '」': '”',
  '『': '‘',
  '』': '’',
};

const termPairs = Object.entries(TERMS).sort((a, b) => b[0].length - a[0].length);

function toHans(text) {
  let out = convert(text);
  for (const [from, to] of termPairs) out = out.split(from).join(to);
  return out;
}

// --- Pages ---------------------------------------------------------------

const SRC = 'src/pages/zh';
const OUT = 'src/pages/zh-hans';

const BANNER = `---
// GENERATED FILE — do not edit by hand.
// Run \`npm run zh-hans\` to rebuild this from src/pages/zh/.
`;

fs.mkdirSync(OUT, { recursive: true });

for (const name of fs.readdirSync(SRC).filter((f) => f.endsWith('.astro'))) {
  const source = fs.readFileSync(path.join(SRC, name), 'utf8');

  let out = toHans(source)
    // Links point at the Simplified pages.
    .replaceAll('"/zh/', '"/zh-hans/')
    .replaceAll("'/zh/", "'/zh-hans/")
    .replaceAll('href="/zh"', 'href="/zh-hans"')
    // Collection fields come from the *_hans columns, not the Traditional ones.
    .replace(/\b(\w+)_zh\b/g, '$1_hans')
    // Carried-over code comments describe the Traditional page they came from.
    .replaceAll('Traditional Chinese', 'Simplified Chinese')
    .replaceAll('src/pages/zh/', 'src/pages/zh-hans/');

  // Replace the leading frontmatter fence with the generated-file banner.
  out = out.startsWith('---\n') ? BANNER + out.slice(4) : BANNER + '---\n' + out;

  fs.writeFileSync(path.join(OUT, name), out);
  console.log(`${OUT}/${name}`);
}

// --- Content collections -------------------------------------------------

// For each *_zh field in a collection file, write the Simplified twin beside
// it. Existing *_hans fields are replaced, so this is idempotent.
//
// A field is its key line plus any indented lines under it, so a list such as
//   bio_zh:
//     - "第一段"
//     - "第二段"
// is copied whole, the same way as a one-line `role_zh: "…"`.
const COLLECTIONS = ['src/content/programs', 'src/content/team', 'src/content/submissions'];

function splitFields(front) {
  const fields = [];
  for (const line of front.split('\n')) {
    if (/^\s/.test(line) && fields.length) fields[fields.length - 1].push(line);
    else fields.push([line]);
  }
  return fields;
}

for (const dir of COLLECTIONS) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const file = path.join(dir, name);
    const text = fs.readFileSync(file, 'utf8');
    const end = text.indexOf('\n---', 4);
    if (!text.startsWith('---\n') || end === -1) continue;

    const front = text.slice(4, end);
    const rest = text.slice(end);

    const fields = splitFields(front).filter(([first]) => !/^\w+_hans:/.test(first));
    const withHans = fields.flatMap((field) => {
      const m = field[0].match(/^(\w+)_zh:(.*)$/);
      if (!m) return [field];
      const twin = [`${m[1]}_hans:${toHans(m[2])}`, ...field.slice(1).map(toHans)];
      return [field, twin];
    });

    const next = '---\n' + withHans.flat().join('\n') + rest;
    if (next !== text) {
      fs.writeFileSync(file, next);
      console.log(file);
    }
  }
}
