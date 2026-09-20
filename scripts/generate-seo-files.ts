import fs from 'fs';
import path from 'path';
import { SITE_URL } from '../lib/site-config';
import { getAllRoutes } from '../lib/routes';

const routes = getAllRoutes();
const lastmod = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemapXml);
console.log(`[Sitemap] Generated sitemap.xml with ${routes.length} routes (${SITE_URL}) at ${publicPath}`);

// robots.txt lives alongside the sitemap and points at the same SITE_URL,
// so the two can never point at different domains.
const robotsTxt = `# User-agent directives for search engine crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml
`;
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt);
console.log(`[Robots] Generated robots.txt (${SITE_URL}) at ${robotsPath}`);
