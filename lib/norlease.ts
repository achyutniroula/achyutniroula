export const norlease = {
  name: 'Norlease',
  tagline: 'Rental listings, verified before they’re posted.',
  status: 'Live',
  url: 'https://northlease.ca',
  description:
    'A verified rental-housing platform for Northern Ontario and Quebec, built with my co-founder. Landlords and renters both verify who they are before anyone sends a message, and the product now covers the whole path from search to application, offer and move-in. English and French throughout.',
  differentiators: [
    'Verification on both sides: phone OTP plus a human-reviewed photo ID and selfie for landlords, and a verified profile for renters, so every message has a real name behind it',
    'The full rental process in one place: applications, offers and a deal-in-progress board that let a landlord compare applicants and pick one, then agreements, move-in reports, past-landlord references and verified-tenant reviews',
    'Real-time landlord and renter messaging on a self-hosted Soketi WebSocket server, with Postgres as the source of truth and contact details stripped from first messages',
    'Perceptual-hash photo matching that catches reused or stolen listing photos across listings',
    'Self-hosted Protomaps and MapLibre tiles covering Ontario and all of Quebec, with PostGIS and pg_trgm powering map, distance and keyword search',
    'Bilingual by design: next-intl with self-hosted LibreTranslate, and listing and renter text translated once and stored',
    'Production hardening: CSP, HSTS and COOP headers, Turnstile and rate limiting on sensitive routes, a full-platform security audit, 50+ tracked database migrations, and CI/CD deploys to Hetzner through Coolify',
  ],
  stack:
    'Next.js 16, React 19, TypeScript, Tailwind 4, Postgres 17 (Neon) with PostGIS and pg_trgm, Drizzle ORM, pg-boss, Clerk, Telnyx SMS, Resend, Cloudflare R2 and Turnstile, Soketi, MapLibre GL and Protomaps, next-intl, Hetzner, Coolify and Docker.',
};
