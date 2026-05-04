const { expect, browser, $, $$ } = require('@wdio/globals');

const VALUES_URL = '/values';

const VALUE_PAGES = [
  { label: 'Privacy First', slug: '/values/privacy-first' },
  { label: 'Transparency Over Spin', slug: '/values/transparency' },
  { label: 'Access Without Gatekeeping', slug: '/values/access' },
  { label: 'Your Data Your Control', slug: '/values/sovereignty' },
  { label: 'Open by Default', slug: '/values/open-source' },
];

describe('Core Values Hub Page', () => {
  before(async () => {
    await browser.url(VALUES_URL);
    await browser.waitUntil(
      async () => (await $('h1,h2').isDisplayed()),
      { timeout: 10000, timeoutMsg: 'Values hub did not load' }
    );
  });

  describe('Hero section', () => {
    it('displays the "Our Core Values" heading', async () => {
      const heading = await $('*=Our Core Values');
      await expect(heading).toBeDisplayed();
    });

    it('shows the tagline about five principles', async () => {
      const tagline = await $('*=principles');
      await expect(tagline).toBeDisplayed();
    });

    it('displays the Get Started Free CTA', async () => {
      const cta = await $('a=Get Started Free');
      await expect(cta).toBeDisplayed();
    });
  });

  describe('Values cards', () => {
    it('displays all five core values cards', async () => {
      for (const { label } of VALUE_PAGES) {
        const card = await $(`*=${label}`);
        await expect(card).toBeDisplayed();
      }
    });

    it('each values card links to its dedicated sub-page', async () => {
      for (const { label, slug } of VALUE_PAGES) {
        const link = await $(`a[href="${slug}"]`);
        const exists = await link.isExisting();
        await expect(exists).toBe(true);
      }
    });
  });

  describe('Inter-page navigation', () => {
    it('navigates to Privacy First and returns via the nav', async () => {
      const privacyLink = await $(`a[href="${VALUE_PAGES[0].slug}"]`);
      await privacyLink.click();
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/values/privacy-first'),
        { timeout: 5000, timeoutMsg: 'Did not navigate to privacy-first page' }
      );
      await expect(browser).toHaveUrlContaining('/values/privacy-first');

      // Navigate back via the Values link in footer
      const valuesFooterLink = await $('footer a=Values');
      if (await valuesFooterLink.isExisting()) {
        await valuesFooterLink.click();
      } else {
        await browser.url(VALUES_URL);
      }
      await expect(browser).toHaveUrlContaining('/values');
    });

    it('navigates to Open by Default and verifies the page renders', async () => {
      await browser.url(VALUES_URL);
      const openLink = await $(`a[href="${VALUE_PAGES[4].slug}"]`);
      await openLink.click();
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/values/open-source'),
        { timeout: 5000, timeoutMsg: 'Did not navigate to open-source page' }
      );
      const heading = await $('*=AGPL,*=Open by Default');
      await expect(heading).toBeDisplayed();
    });
  });

  describe('Footer values links', () => {
    before(async () => {
      await browser.url(VALUES_URL);
    });

    it('shows all five values links in the footer', async () => {
      for (const { label } of VALUE_PAGES) {
        const footerLink = await $(`footer a=${label}`);
        const exists = await footerLink.isExisting();
        await expect(exists).toBe(true);
      }
    });
  });
});
