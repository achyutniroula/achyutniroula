import { insuranceServices } from './insuranceServices';
import { accounts } from './accounts';

// Every public route the site serves, generated from the same data the
// pages themselves are built from (insuranceServices, accounts) plus the
// fixed top level pages. Shared by the sitemap generator and the IndexNow
// submit script so neither list can drift from the other or from the site.
export interface SiteRoute {
  path: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
}

const staticRoutes: SiteRoute[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/projects/', changefreq: 'monthly', priority: '0.8' },
  { path: '/resume/', changefreq: 'monthly', priority: '0.8' },
  { path: '/capstone/', changefreq: 'monthly', priority: '0.6' },
  { path: '/insurance/', changefreq: 'monthly', priority: '0.9' },
];

const productRoutes: SiteRoute[] = insuranceServices.map((service) => ({
  path: `/insurance/${service.slug}/`,
  changefreq: 'monthly',
  priority: '0.7',
}));

const accountRoutes: SiteRoute[] = accounts.map((account) => ({
  path: `/insurance/accounts/${account.slug}/`,
  changefreq: 'monthly',
  priority: '0.7',
}));

export function getAllRoutes(): SiteRoute[] {
  return [...staticRoutes, ...productRoutes, ...accountRoutes];
}
