export const norlease = {
  name: 'Norlease',
  tagline: 'Rental listings, verified before they’re posted.',
  status: 'In development',
  url: 'https://northlease.ca',
  description:
    'A verified rental-housing platform launching in North Bay, Ontario. Built with two-step landlord & renter verification, real-time messaging, self-hosted geospatial maps, custom line-art feature illustrations, and production security hardening.',
  differentiators: [
    'Two-step user verification: automated phone check + human-reviewed photo ID & selfie, plus renter verification gate before first message',
    'Real-time tenant-landlord messaging infrastructure with verified user security controls',
    'Perceptual-hash duplicate photo detection catching reused or stolen listing photos across listings',
    'Self-hosted Protomaps & MapLibre GL tile pipeline delivering real Ontario map data without third-party load fees',
    'Distance-aware PostGIS search answering geographic queries ("how far is this from campus or downtown")',
    'Production-hardened deployment on Hetzner via Coolify with CSP, HSTS, X-Frame-Options, and automated CI/CD',
  ],
  stack: 'Next.js 16, React 19, Postgres 17 (Neon) with PostGIS & pg_trgm, Clerk auth, Telnyx SMS OTP, Cloudflare R2, MapLibre GL + Protomaps, Hetzner + Coolify.',
};

