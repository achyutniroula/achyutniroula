// Single source of truth for the production site URL and related constants,
// used by both the React app (components/SEO.tsx, pages) and the sitemap
// build script (scripts/generate-sitemap.ts, run through tsx).
//
// achyut-niroula.web.app is the real, working Firebase Hosting domain.
// achyutniroula.com does not currently resolve, so it must not be used as
// the default here. Set NEXT_PUBLIC_SITE_URL once a custom domain is live
// and verified, and this updates everywhere automatically.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://achyut-niroula.web.app').replace(/\/+$/, '');

// The site is reachable on both web.app and firebaseapp.com (Firebase
// Hosting serves both by default for the same project). Canonicals must
// always point at one form so Google does not treat them as duplicates;
// web.app is chosen since it is what SITE_URL resolves to above.
export const ALTERNATE_HOSTS = ['achyut-niroula.firebaseapp.com'];

// IndexNow key. Must match the filename of the key file in public/ exactly
// (public/<INDEXNOW_KEY>.txt, containing just this string). Used by
// scripts/submit-indexnow.ts. Regenerate both together if this ever changes.
export const INDEXNOW_KEY = 'b8a90082281f7ec81bf3db5ece3c3b00';

export const SITE_NAME = 'Achyut Niroula';
export const AUTHOR_NAME = 'Achyut Niroula';
export const LOCALE = 'en_CA';
export const HTML_LANG = 'en-CA';
