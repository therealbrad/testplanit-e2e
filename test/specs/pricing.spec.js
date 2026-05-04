const { expect, browser, $, $$ } = require('@wdio/globals');

describe('Pricing Page', () => {
  before(async () => {
    await browser.url('/pricing');
    await browser.waitUntil(
      async () => (await $('h1,h2').isDisplayed()),
      { timeout: 10000, timeoutMsg: 'Pricing page did not load' }
    );
  });

  describe('Page structure', () => {
    it('displays the Unlimited Users heading', async () => {
      const heading = await $('*=Unlimited Users');
      await expect(heading).toBeDisplayed();
    });

    it('shows all five pricing tiers', async () => {
      const tiers = ['Open Source', 'Essentials', 'Team', 'Professional', 'Dedicated'];
      for (const tier of tiers) {
        const el = await $(`*=${tier}`);
        await expect(el).toBeDisplayed();
      }
    });

    it('highlights Team as the most popular plan', async () => {
      const badge = await $('*=Most Popular');
      await expect(badge).toBeDisplayed();
    });
  });

  describe('Pricing toggle', () => {
    it('shows the monthly/annual billing toggle', async () => {
      const toggle = await $('*=Save 15%');
      await expect(toggle).toBeDisplayed();
    });

    it('switches to annual pricing when the toggle is clicked', async () => {
      const toggle = await $('*=Save 15%');
      await toggle.click();
      await browser.pause(500);
      const annualBadge = await $('*=Save 15%');
      await expect(annualBadge).toBeDisplayed();
    });
  });

  describe('Call to action buttons', () => {
    it('shows Start 30 day Trial buttons for paid tiers', async () => {
      const trialButtons = await $$('a=Start 30 day Trial');
      await expect(trialButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('shows a Contact Sales button for the Dedicated tier', async () => {
      const contactSalesBtn = await $('a=Contact Sales');
      await expect(contactSalesBtn).toBeDisplayed();
    });

    it('shows a Get Started link for the Open Source tier', async () => {
      const getStartedBtn = await $('a=Get Started');
      await expect(getStartedBtn).toBeDisplayed();
    });
  });

  describe('Comparison section', () => {
    it('shows the Stop Paying Per Seat section', async () => {
      const section = await $('*=Stop Paying Per Seat');
      await expect(section).toBeDisplayed();
    });

    it('renders the Compare Plans feature matrix', async () => {
      const compareSection = await $('*=Compare Plans');
      await expect(compareSection).toBeDisplayed();
    });
  });

  describe('FAQ', () => {
    it('shows the FAQ section', async () => {
      const faq = await $('*=Frequently Asked Questions');
      await expect(faq).toBeDisplayed();
    });
  });
});
