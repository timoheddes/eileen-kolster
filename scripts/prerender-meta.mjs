// Post-build step: write one HTML file per route with the right <title>,
// description, canonical URL and Open Graph / Twitter tags in the static
// markup. The site is a client-rendered SPA, so without this every URL ships
// the same head and link previews and crawlers see only the home page.
//
// Vercel serves a real file before applying the SPA rewrite, so
// dist/work/imom/index.html is what /work/imom returns. The React app still
// takes over in the browser as before.
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  existsSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'src/data/seo.json'), 'utf8'));

const escape = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const pages = [
  ...Object.entries(seo.pages).map(([path, p]) => ({ path, ...p })),
  // Drafts stay out of the build until they are published.
  ...Object.entries(seo.projects)
    .filter(([, p]) => !p.draft)
    .map(([slug, p]) => ({
      path: `/work/${slug}`,
      title: `${p.title} | ${seo.siteName}`,
      description: p.summary,
    })),
];

const template = readFileSync(join(dist, 'index.html'), 'utf8');
if (!template.includes('</head>')) {
  throw new Error('dist/index.html has no </head>; cannot inject meta tags');
}

const render = (page) => {
  const url = seo.siteUrl + (page.path === '/' ? '/' : page.path);
  const image = seo.siteUrl + seo.image;
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(seo.siteName)}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escape(seo.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(page.title)}" />`,
    `<meta name="twitter:description" content="${escape(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ');

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(page.description)}" />`,
    );
  return html.replace('</head>', `    ${tags}\n  </head>`);
};

for (const page of pages) {
  const out =
    page.path === '/'
      ? join(dist, 'index.html')
      : join(dist, page.path, 'index.html');
  const html = render(page);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  // Also write <path>.html: with `cleanUrls` Vercel serves /work/imom from
  // work/imom.html, so both /work/imom and /work/imom/ resolve to this file.
  if (page.path !== '/') writeFileSync(join(dist, `${page.path}.html`), html);
}

// Precompressed copies of the old index.html would now be stale.
for (const ext of ['gz', 'br']) {
  const f = join(dist, `index.html.${ext}`);
  if (existsSync(f)) rmSync(f);
}

// eslint-disable-next-line no-undef
console.log(`prerender-meta: wrote ${pages.length} pages`);
