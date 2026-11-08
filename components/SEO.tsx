import Head from 'next/head';
import { SITE_URL, SITE_NAME, AUTHOR_NAME, LOCALE } from '../lib/site-config';

export interface Breadcrumb {
  name: string;
  path: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'profile' | 'article';
  keywords?: string[];
  noindex?: boolean;
  /** Renders ProfilePage + Person + WebSite JSON-LD. Homepage only. */
  isProfilePage?: boolean;
  /** Renders BreadcrumbList JSON-LD for a nested page. */
  breadcrumbs?: Breadcrumb[];
}

const DEFAULT_TITLE = 'Achyut Niroula | Founder @NorLease';
const DEFAULT_DESCRIPTION =
  'Achyut Niroula is the founder of Norlease (operations and engineering), building verified rental infrastructure for Northern Ontario and Quebec. Based in North Bay, Ontario, and also a software engineer and licensed insurance advisor.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const DEFAULT_KEYWORDS = [
  'Achyut Niroula',
  'Achyut Niroula Software Engineer',
  'Achyut Niroula Nipissing University',
  'Achyut Niroula Ontario',
  'Achyut Niroula Insurance Advisor',
  'Achyut Niroula Norlease',
  'Software Engineer North Bay',
  'Insurance Advisor North Bay Ontario',
];

// Prevents a literal "</script>" inside JSON-LD data from breaking out of
// the script tag when injected via dangerouslySetInnerHTML.
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function resolveUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
  isProfilePage = false,
  breadcrumbs,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${AUTHOR_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = resolveUrl(canonical);
  const resolvedOgImage = resolveUrl(ogImage);
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Achyut Niroula',
    givenName: 'Achyut',
    familyName: 'Niroula',
    url: SITE_URL,
    image: `${SITE_URL}/profile.png`,
    jobTitle: ['Founder', 'Software Engineer', 'Insurance Advisor'],
    description: DEFAULT_DESCRIPTION,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Nipissing University',
      url: 'https://www.nipissingu.ca',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Norlease',
        url: 'https://northlease.ca',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/achyut-niroula',
      'https://github.com/achyutniroula',
      'https://instagram.com/achniroula',
    ],
    email: 'mailto:niroula.achyut17@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'North Bay',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    knowsAbout: [
      'Software Engineering',
      'Computer Vision',
      'Multimodal AI',
      'Distributed Systems',
      'Full-Stack Web Development',
      'Life Insurance',
    ],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: `${AUTHOR_NAME} Portfolio`,
    author: { '@id': PERSON_ID },
    inLanguage: 'en-CA',
  };

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: DEFAULT_TITLE,
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-CA',
  };

  const breadcrumbJsonLd = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: resolveUrl(crumb.path),
        })),
      }
    : null;

  return (
    <Head>
      {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
      )}
      {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
      )}

      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={AUTHOR_NAME} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Achyut Niroula, Founder @NorLease" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content="Achyut Niroula, Founder @NorLease" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webSiteJsonLd) }} />
      {isProfilePage && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(personJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(profilePageJsonLd) }} />
        </>
      )}
      {breadcrumbJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      )}
    </Head>
  );
}
