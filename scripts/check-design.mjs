// Checks the built site against the design rules. Runs after every build:
//
//   npm run build     (astro build, then this)
//   npm run check     (this alone, on the dist/ folder already there)
//
// The build FAILS if any page contains:
//   - an arrow character (→): links are words, not arrows
//   - class="eyebrow": no label above a heading
//   - data-count or data-reveal: no count-up, no scroll animation
//   - data-sample: placeholder content that must never go live
//     (see `sample: true` in src/data/facts.ts and src/content/submissions/)
//
// It WARNS, without failing, when one of our headline figures appears more
// than once in a page's main content. Each figure should be said once.

import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';

if (!fs.existsSync(DIST)) {
  console.error('check-design: no dist/ folder. Run `npm run build` first.');
  process.exit(1);
}

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

const BANNED = [
  { name: 'an arrow character (→)', test: /→/ },
  { name: 'class="eyebrow"', test: /class="[^"]*\beyebrow\b/ },
  { name: 'data-count', test: /\sdata-count[\s=>]/ },
  { name: 'data-reveal', test: /\sdata-reveal[\s=>]/ },
  { name: 'sample (placeholder) content', test: /\sdata-sample[\s=>]/ },
];

// The figures from src/data/facts.ts, in every form the three languages use.
const FIGURES = [
  { name: '350 children', test: /(?<![\d,.])350(?![\d,])/g },
  { name: '43 tutors', test: /(?<![\d,.])43(?![\d,%])/g },
  { name: '86%', test: /(?<!\d)86\s?%/g },
  { name: 'HK$50 million', test: /HK\$50 million|五千[萬万]港元/g },
  { name: '35+ members', test: /(?<!\d)35\+|more than 35|超過 ?35/g },
];

/** The words a reader sees in the page's main content. */
function mainText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  return main
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&');
}

const failures = [];
const warnings = [];

for (const file of htmlFiles(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const page = '/' + path.relative(DIST, file).replace(/index\.html$/, '');

  // Redirect stubs have no content of their own.
  if (/<meta http-equiv="refresh"/.test(html)) continue;

  for (const rule of BANNED) {
    if (rule.test.test(html)) failures.push(`${page}: contains ${rule.name}`);
  }

  const text = mainText(html);
  for (const figure of FIGURES) {
    const count = (text.match(figure.test) ?? []).length;
    if (count > 1) warnings.push(`${page}: ${figure.name} appears ${count} times`);
  }
}

for (const warning of warnings) console.warn(`check-design: warning: ${warning}`);

if (failures.length) {
  for (const failure of failures) console.error(`check-design: ${failure}`);
  console.error(`\ncheck-design: ${failures.length} problem(s). The site was built but should not be published.`);
  process.exit(1);
}

console.log(
  `check-design: passed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}. No arrows, eyebrows, count-ups or sample content.`
);
