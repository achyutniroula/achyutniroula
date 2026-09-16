import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://achyutniroula.com';

const routes = [
  '',
  '/projects',
  '/resume',
  '/capstone',
  '/insurance',
  '/insurance/segregated-funds',
  '/insurance/whole-life',
  '/insurance/critical-illness',
  '/insurance/disability',
  '/insurance/term-life',
  '/insurance/accounts/tfsa',
  '/insurance/accounts/rrsp',
  '/insurance/accounts/fhsa',
  '/insurance/accounts/resp',
  '/insurance/accounts/non-registered',
  '/insurance/accounts/rrif',
  '/insurance/accounts/lira-lif',
  '/insurance/accounts/rdsp',
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const url = `${SITE_URL}${route}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : route === '/projects' || route === '/resume' ? '0.8' : '0.7'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemapXml);
console.log(`[Sitemap] Successfully generated sitemap.xml with ${routes.length} routes at ${publicPath}`);
