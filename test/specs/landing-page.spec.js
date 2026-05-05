const { expect, browser } = require('@wdio/globals');
const landingPage = require('../pageobjects/LandingPage');
const { NAV_LINKS, URLS } = require('../data/pages');

describe('Landing Page', () => {
  before(async () => {
    await landingPage.open();
  });

  describe('Hero section', () => {
    it('displays the main headline', async () => {
      await expect(landingPage.heroHeading).toBeDisplayed();
      await expect(landingPage.heroHeading).toHaveTextContaining('Test Management');
    });

    it('shows the primary Get Started CTA', async () => {
      await expect(landingPage.getStartedCta).toBeDisplayed();
    });

    it('shows the Try a Demo link in navigation', async () => {
      await expect(landingPage.tryDemoLink).toBeDisplayed();
    });
  });

  describe('Navigation', () => {
    it('renders all primary nav links', async () => {
      for (const label of NAV_LINKS) {
        const link = landingPage.nav(label);
        await expect(link).toBeDisplayed();
      }
    });

    it('navigates to Pricing page when Pricing link is clicked', async () => {
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

    it('shows the QuickScript feature announcement', async () => {
      await landingPage.quickScriptBadge.scrollIntoView();
      await expect(landingPage.quickScriptBadge).toBeDisplayed();
    });

    it('shows the No Per-Seat Pricing value proposition', async () => {
      await landingPage.noPerSeatProp.scrollIntoView();
      await expect(landingPage.noPerSeatProp).toBeDisplayed();
    });
  });
});
