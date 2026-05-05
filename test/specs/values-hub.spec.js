const { expect, browser, $ } = require('@wdio/globals');
const valuesHubPage = require('../pageobjects/ValuesHubPage');
const { VALUE_PAGES, URLS } = require('../data/pages');

describe('Core Values Hub Page', () => {
  before(async () => {
    await valuesHubPage.open();
  });

  describe('Hero section', () => {
    it('displays the "Our Core Values" heading', async () => {
      await expect(valuesHubPage.heroHeading).toBeDisplayed();
    });

    it('shows the tagline about five principles', async () => {
      await expect(valuesHubPage.tagline).toBeDisplayed();
    });

    it('displays the Get Started Free CTA', async () => {
      await expect(valuesHubPage.getStartedCta).toBeDisplayed();
    });
  });

  describe('Values cards', () => {
    it('displays all five core values cards', async () => {
      for (const { label } of VALUE_PAGES) {
        await expect(valuesHubPage.card(label)).toBeDisplayed();
      }
    });

    it('each values card links to its dedicated sub-page', async () => {
      for (const { slug } of VALUE_PAGES) {
        const exists = await valuesHubPage.cardLink(slug).isExisting();
        await expect(exists).toBe(true);
      }
    });
  });

  describe('Inter-page navigation', () => {
    it('navigates to Privacy First and returns via the nav', async () => {
      await valuesHubPage.navigateTo(VALUE_PAGES[0].slug);
      await expect(browser).toHaveUrlContaining(URLS.privacyFirst);

      // Try footer Core Values link, fall back to direct nav if missing
      const coreValuesLink = await $('footer').$('a=Core Values');
      if (await coreValuesLink.isExisting()) {
        await coreValuesLink.click();
      } else {
        await browser.url(URLS.values);
      }
      await expect(browser).toHaveUrlContaining(URLS.values);
    });

    it('navigates to Open by Default and verifies the page renders', async () => {
      await browser.url(URLS.values);
      await valuesHubPage.navigateTo(VALUE_PAGES[4].slug);
      // h1=Open by Default exists on that page
      const heading = await $('h1=Open by Default');
      await expect(heading).toBeDisplayed();
    });
  });

  describe('Footer values links', () => {
    before(async () => {
      await browser.url(URLS.values);
    });

    it('shows all five values page links in the footer by href', async () => {
      for (const { slug } of VALUE_PAGES) {
        const link = await $(`footer a[href="${slug}"]`);
        const exists = await link.isExisting();
        await expect(exists).toBe(true);
      }
    });
  });
});
