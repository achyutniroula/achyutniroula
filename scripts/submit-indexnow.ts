// Submits every public URL to IndexNow (used by Bing, and other IndexNow
// participants) so they can be crawled faster than waiting for the next
// scheduled crawl. Not run automatically by npm run build or deploy; run it
// by hand after a deploy with real content changes: npm run indexnow
import { SITE_URL, INDEXNOW_KEY } from '../lib/site-config';
import { getAllRoutes } from '../lib/routes';

async function main() {
  const host = new URL(SITE_URL).host;
  const urlList = getAllRoutes().map((route) => `${SITE_URL}${route.path}`);

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  console.log(`[IndexNow] Submitting ${urlList.length} URLs for ${host}...`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    console.log(`[IndexNow] Submitted successfully (status ${res.status}).`);
  } else {
    const text = await res.text().catch(() => '');
    console.error(`[IndexNow] Submission failed (status ${res.status}). ${text}`);
    process.exitCode = 1;
  }
}

main();
