// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Static output — no server needed, deploys free to Netlify or Cloudflare
// Pages. MDX is enabled so content files can use components if ever needed.
export default defineConfig({
  // Set this to the final domain before launch (canonical URLs, sitemaps).
  site: 'https://aiforgood.example',
  integrations: [mdx()],
  // The site was restructured around its two pillars; keep old URLs working.
  // (/about is a real page again, so it is no longer redirected.)
  redirects: {
    '/research': '/policy',
    '/programs': '/teaching',
  },
});
