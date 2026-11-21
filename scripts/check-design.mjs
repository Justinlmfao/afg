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

const failures = [];

for (const file of htmlFiles(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const page = '/' + path.relative(DIST, file).replace(/index\.html$/, '');

  // Redirect stubs have no content of their own.
  if (/<meta http-equiv="refresh"/.test(html)) continue;

  for (const rule of BANNED) {
    if (rule.test.test(html)) failures.push(`${page}: contains ${rule.name}`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`check-design: ${failure}`);
  console.error(`\ncheck-design: ${failures.length} problem(s). The site was built but should not be published.`);
  process.exit(1);
}

console.log('check-design: passed. No arrows, eyebrows, count-ups or sample content.');
