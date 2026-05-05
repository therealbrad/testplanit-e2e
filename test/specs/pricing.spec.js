const { expect, browser, $$ } = require('@wdio/globals');
const pricingPage = require('../pageobjects/PricingPage');

const TIERS = ['Open Source', 'Essentials', 'Team', 'Professional', 'Dedicated'];

describe('Pricing Page', () => {
  before(async () => {
    await pricingPage.open();
  });

  describe('Page structure', () => {
    it('displays the Unlimited Users heading', async () => {
      const heading = await $('h1=Unlimited Users');
      await expect(heading).toBeDisplayed();
    });

    it('shows all five pricing tiers', async () => {
      for (const tier of TIERS) {
        await expect(pricingPage.tier(tier)).toBeDisplayed();
      }
    });

    it('highlights a plan as the Most Popular', async () => {
      await expect(pricingPage.mostPopularBadge).toBeDisplayed();
    });
  });

  describe('Pricing toggle', () => {
    it('shows the Save 15% annual badge', async () => {
      await expect(pricingPage.save15Badge).toBeDisplayed();
    });

    it('toggles to annual pricing when the switch is clicked', async () => {
      await pricingPage.toggleAnnual();
      await browser.pause(400);
      await expect(pricingPage.save15Badge).toBeDisplayed();
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
      await pricingPage.stopPerSeatSection.scrollIntoView();
      await expect(pricingPage.stopPerSeatSection).toBeDisplayed();
    });

    it('renders the Compare Plans feature matrix', async () => {
      await pricingPage.comparisonSection.scrollIntoView();
      await expect(pricingPage.comparisonSection).toBeDisplayed();
    });
  });

  describe('FAQ', () => {
    it('shows the Frequently Asked Questions section', async () => {
      await pricingPage.faqSection.scrollIntoView();
      await expect(pricingPage.faqSection).toBeDisplayed();
    });
  });
});
