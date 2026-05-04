const { expect, browser, $ } = require('@wdio/globals');

describe('Landing Page', () => {
  before(async () => {
    await browser.url('/');
    await browser.waitUntil(
      async () => (await $('nav').isDisplayed()),
      { timeout: 10000, timeoutMsg: 'Navigation did not load' }
    );
  });

  describe('Hero section', () => {
    it('displays the main headline', async () => {
      const heading = await $('h1');
      await expect(heading).toBeDisplayed();
      await expect(heading).toHaveTextContaining('Test Management');
    });

    it('shows the primary Get Started CTA', async () => {
      const cta = await $('a=Get Started Free');
      await expect(cta).toBeDisplayed();
      await expect(cta).toHaveAttribute('href', expect.stringContaining('/'));
    });

    it('shows the Try a Demo link in navigation', async () => {
      const demoLink = await $('a=Try a Demo');
      await expect(demoLink).toBeDisplayed();
    });
  });

  describe('Navigation', () => {
    it('renders all primary nav links', async () => {
      const navLinks = ['Features', 'Compare', 'Pricing', 'Docs', 'Contact'];
      for (const label of navLinks) {
        const link = await $(`nav a=${label}`);
        await expect(link).toBeDisplayed();
      }
    });

    it('navigates to Pricing page when Pricing link is clicked', async () => {
      const pricingLink = await $('nav a=Pricing');
      await pricingLink.click();
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/pricing'),
        { timeout: 5000, timeoutMsg: 'Did not navigate to /pricing' }
      );
      await expect(browser).toHaveUrlContaining('/pricing');
    });

    it('navigates back to Home', async () => {
      await browser.url('/');
    });
  });

  describe('Feature highlights', () => {
    it('shows the QuickScript feature announcement', async () => {
      const quickscript = await $('*=QuickScript');
      await expect(quickscript).toBeDisplayed();
    });

    it('shows the Open Source & Self-Hosted value proposition', async () => {
      const prop = await $('*=Open Source & Self-Hosted');
      await expect(prop).toBeDisplayed();
    });

    it('shows the No Per-Seat Pricing value proposition', async () => {
      const prop = await $('*=No Per-Seat Pricing');
      await expect(prop).toBeDisplayed();
    });
  });
});
