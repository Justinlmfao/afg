// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// The old URLs below only redirect, so they stay out of the sitemap.
const redirects = {
  '/research': '/policy/',
  '/programs': '/teaching/',
  // Traditional Chinese lives at /zh; catch the explicit script code too.
  '/zh-hant': '/zh/',
};

// Static output — no server needed, deploys free to Netlify or Cloudflare
// Pages. MDX is enabled so content files can use components if ever needed.
export default defineConfig({
  // The live domain. Canonical URLs, the language links in every page's
  // <head>, the sitemap and robots.txt are all built from this.
  site: 'https://aiforgoodhk.org',
  integrations: [
    mdx(),
    // sitemap-index.xml, listing every page with its other-language versions
    // so search engines can pair them up.
    // Redirects and the noindex thank-you pages are left out.
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return (
          !Object.keys(redirects).some((from) => path === `${from}/`) &&
          !path.endsWith('/thanks/')
        );
      },
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-Hant', 'zh-hans': 'zh-Hans' },
      },
    }),
  ],
  // The site was restructured around its two pillars; keep old URLs working.
  // (/about is a real page again, so it is no longer redirected.)
  redirects,
});
