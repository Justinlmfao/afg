// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Static output by default — no server needed, deploys free to Netlify
// or Cloudflare Pages. MDX is enabled so content pages can use components
// if you ever want to, but plain Markdown works everywhere too.
export default defineConfig({
  // Set this to your final domain before launch (used for canonical URLs,
  // sitemaps, and absolute links). Safe to leave as-is during development.
  site: 'https://aiforgood.example',
  integrations: [mdx()],
});
