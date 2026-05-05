const { expect, browser } = require('@wdio/globals');
const landingPage = require('../pageobjects/LandingPage');
const { NAV_LINKS, URLS } = require('../data/pages');

describe('Landing Page', () => {
  before(async () => {
    await landingPage.open();
  });

  describe('Hero section', () => {
    it('[2] displays the main headline', async () => {
      await expect(landingPage.heroHeading).toBeDisplayed();
      await expect(landingPage.heroHeading).toHaveTextContaining('Test Management');
    });

    it('[29] shows the primary Get Started CTA', async () => {
      await expect(landingPage.getStartedCta).toBeDisplayed();
    });

    it('[7] shows the Try a Demo link in navigation', async () => {
      await expect(landingPage.tryDemoLink).toBeDisplayed();
    });
  });

  describe('Navigation', () => {
    it('[1] renders all primary nav links', async () => {
      for (const label of NAV_LINKS) {
        const link = landingPage.nav(label);
        await expect(link).toBeDisplayed();
      }
    });

    it('[61] navigates to Pricing page when Pricing link is clicked', async () => {
      const pricingLink = landingPage.nav('Pricing');
      await pricingLink.click();
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes(URLS.pricing),
        { timeout: 5000, timeoutMsg: 'Did not navigate to /pricing' }
      );
      await expect(browser).toHaveUrlContaining(URLS.pricing);
      await browser.url(URLS.home);
    });
  });

  describe('Feature highlights', () => {
    before(async () => {
      await landingPage.open();
    });

    it('[3] shows the QuickScript feature announcement', async () => {
      await landingPage.quickScriptBadge.scrollIntoView();
      await expect(landingPage.quickScriptBadge).toBeDisplayed();
    });

    it('[6] shows the No Per-Seat Pricing value proposition', async () => {
      await landingPage.noPerSeatProp.scrollIntoView();
      await expect(landingPage.noPerSeatProp).toBeDisplayed();
    });
  });
});
