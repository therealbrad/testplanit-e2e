const URLS = {
  home:         '/',
  pricing:      '/pricing',
  contact:      '/contact',
  values:       '/values',
  privacyFirst: '/values/privacy-first',
  transparency: '/values/transparency',
  access:       '/values/access',
  sovereignty:  '/values/sovereignty',
  openSource:   '/values/open-source',
};

const VALUE_PAGES = [
  { label: 'Privacy First',              slug: URLS.privacyFirst },
  { label: 'Transparency Over Spin',     slug: URLS.transparency },
  { label: 'Access Without Gatekeeping', slug: URLS.access },
  { label: 'Your Data Your Control',     slug: URLS.sovereignty },
  { label: 'Open by Default',            slug: URLS.openSource },
];

const NAV_LINKS = ['Features', 'Pricing', 'Values', 'Docs', 'Blog'];

module.exports = { URLS, VALUE_PAGES, NAV_LINKS };
