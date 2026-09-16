import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  noindex?: boolean;
}

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://achyutniroula.com';
const DEFAULT_TITLE = 'Achyut Niroula — Software Engineer & Licensed Insurance Advisor';
const DEFAULT_DESCRIPTION =
  'Official portfolio of Achyut Niroula — Founder & CEO of Norlease, building verified rental infrastructure for Northern Ontario. Computer Science Honours graduate from Nipissing University with expertise in distributed AI systems, and a licensed LLQP insurance advisor in Ontario.';
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE_URL}/profile.png`;

const DEFAULT_KEYWORDS = [
  'Achyut Niroula',
  'Achyut Niroula LinkedIn',
  'Achyut Niroula GitHub',
  'Achyut Niroula Instagram',
  'Achyut Niroula Software Engineer',
  'Achyut Niroula Nipissing University',
  'Achyut Niroula Ontario',
  'Achyut Niroula Insurance Advisor',
  'Achyut Niroula Norlease',
  'Achyut Niroula Portfolio',
  'Software Engineer North Bay',
  'Licensed Insurance Advisor Ontario',
  'Multimodal AI',
  'Computer Vision',
];

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | Achyut Niroula` : DEFAULT_TITLE;
  const canonicalUrl = canonical
    ? `${DEFAULT_SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : DEFAULT_SITE_URL;
  const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${DEFAULT_SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${DEFAULT_SITE_URL}/#person`,
    name: 'Achyut Niroula',
    givenName: 'Achyut',
    familyName: 'Niroula',
    url: DEFAULT_SITE_URL,
    image: `${DEFAULT_SITE_URL}/profile.png`,
    jobTitle: ['Software Engineer', 'Licensed Insurance Advisor'],
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
    telephone: '+1-249-358-0947',
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
      'LLQP Licensing',
    ],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DEFAULT_SITE_URL}/#website`,
    url: DEFAULT_SITE_URL,
    name: 'Achyut Niroula Portfolio',
    author: {
      '@id': `${DEFAULT_SITE_URL}/#person`,
    },
    inLanguage: 'en-US',
  };

  return (
    <Head>
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="wJ8hxhvNXrq5D3gVNoX1E8EN3m_Z98Sjq8d5TxaNS78" />

      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Achyut Niroula" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:site_name" content="Achyut Niroula" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:alt" content="Achyut Niroula — Software Engineer & Licensed Insurance Advisor" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
    </Head>
  );
}
