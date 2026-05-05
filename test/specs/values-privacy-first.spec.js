const { expect, browser } = require('@wdio/globals');
const ValuePage = require('../pageobjects/ValuePage');
const { URLS } = require('../data/pages');
const { setMobileViewport, setDesktopViewport } = require('../helpers/waitUtils');

const privacyFirstPage = new ValuePage(URLS.privacyFirst);

const TARGET_AUDIENCES = [
  'Regulated industries',
  'Security-conscious',
  'Air-gapped',
  'Data sovereignty',
];

describe('Privacy First Value Page', () => {
  before(async () => {
    await privacyFirstPage.open();
  });

  describe('Hero section', () => {
    it('displays the Privacy First headline', async () => {
      await expect(privacyFirstPage.pillar('Privacy First')).toBeDisplayed();
    });

    it('shows the Get Started Free CTA', async () => {
      await expect(privacyFirstPage.getStartedCta).toBeDisplayed();
    });

    it('shows the View Source Code CTA linking to GitHub', async () => {
      await expect(privacyFirstPage.viewSourceCta).toBeDisplayed();
      const href = await privacyFirstPage.viewSourceCta.getAttribute('href');
      await expect(href).toContain('github.com');
    });
  });

  describe('Three Pillars section', () => {
    it('displays the Self-Host Everything pillar', async () => {
      await expect(privacyFirstPage.pillar('Self-Host Everything')).toBeDisplayed();
    });

    it('displays the Bring Your Own LLM pillar', async () => {
      await expect(privacyFirstPage.pillar('Bring Your Own LLM')).toBeDisplayed();
    });

    it('displays the Self-Hosted Git Repos pillar', async () => {
      await expect(privacyFirstPage.pillar('Self-Hosted Git Repos')).toBeDisplayed();
    });
  });

  describe('Comparison table', () => {
    it('renders the Cloud-Only Tools column header', async () => {
      await expect(privacyFirstPage.tableCell('Cloud-Only Tools')).toBeDisplayed();
    });

    it('renders the Self-Hosted TestPlanIt column header', async () => {
      await expect(privacyFirstPage.tableCell('Self-Hosted TestPlanIt')).toBeDisplayed();
    });

    it('covers the compliance control row', async () => {
      await expect(privacyFirstPage.tableCell('Compliance')).toBeDisplayed();
    });

    it('covers the audit capabilities row', async () => {
      await expect(privacyFirstPage.tableCell('Audit')).toBeDisplayed();
    });
  });

  describe('Deployment Options section', () => {
    it('shows the Fully Air-Gapped deployment scenario', async () => {
      await expect(privacyFirstPage.deployment('Air-Gapped')).toBeDisplayed();
    });

    it('shows the Hybrid Deployment scenario', async () => {
      await expect(privacyFirstPage.deployment('Hybrid')).toBeDisplayed();
    });

    it('shows the Managed + Private AI scenario', async () => {
      await expect(privacyFirstPage.deployment('Private AI')).toBeDisplayed();
    });
  });

  describe('Target Audience section', () => {
    for (const audience of TARGET_AUDIENCES) {
      it(`shows the "${audience}" use case`, async () => {
        await expect(privacyFirstPage.audience(audience)).toBeDisplayed();
      });
    }
  });

  describe('Responsive layout', () => {
    it('comparison table is accessible at 375px viewport', async () => {
      await setMobileViewport();
      await browser.url(URLS.privacyFirst);
      const table = await $('table,*=Cloud-Only Tools');
      await expect(table).toBeDisplayed();
      await setDesktopViewport();
    });
  });
});
