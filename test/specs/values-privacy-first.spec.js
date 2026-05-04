const { expect, browser, $, $$ } = require('@wdio/globals');

const PAGE_URL = '/values/privacy-first';

describe('Privacy First Value Page', () => {
  before(async () => {
    await browser.url(PAGE_URL);
    await browser.waitUntil(
      async () => (await $('h1,h2').isDisplayed()),
      { timeout: 10000, timeoutMsg: 'Privacy First page did not load' }
    );
  });

  describe('Hero section', () => {
    it('displays the Privacy First headline', async () => {
      const heading = await $('*=Privacy First');
      await expect(heading).toBeDisplayed();
    });

    it('shows the Get Started Free CTA', async () => {
      const cta = await $('a=Get Started Free');
      await expect(cta).toBeDisplayed();
    });

    it('shows the View Source Code CTA linking to GitHub', async () => {
      const cta = await $('a=View Source Code');
      await expect(cta).toBeDisplayed();
      const href = await cta.getAttribute('href');
      await expect(href).toContain('github.com');
    });
  });

  describe('Three Pillars section', () => {
    it('displays the Self-Host Everything pillar', async () => {
      const pillar = await $('*=Self-Host Everything');
      await expect(pillar).toBeDisplayed();
    });

    it('displays the Bring Your Own LLM pillar', async () => {
      const pillar = await $('*=Bring Your Own LLM');
      await expect(pillar).toBeDisplayed();
    });

    it('displays the Self-Hosted Git Repos pillar', async () => {
      const pillar = await $('*=Self-Hosted Git Repos');
      await expect(pillar).toBeDisplayed();
    });
  });

  describe('Comparison table', () => {
    it('renders the Cloud-Only Tools column header', async () => {
      const header = await $('*=Cloud-Only Tools');
      await expect(header).toBeDisplayed();
    });

    it('renders the Self-Hosted TestPlanIt column header', async () => {
      const header = await $('*=Self-Hosted TestPlanIt');
      await expect(header).toBeDisplayed();
    });

    it('covers the compliance control row', async () => {
      const row = await $('*=Compliance');
      await expect(row).toBeDisplayed();
    });

    it('covers the audit capabilities row', async () => {
      const row = await $('*=Audit');
      await expect(row).toBeDisplayed();
    });
  });

  describe('Deployment Options section', () => {
    it('shows the Fully Air-Gapped deployment scenario', async () => {
      const option = await $('*=Air-Gapped');
      await expect(option).toBeDisplayed();
    });

    it('shows the Hybrid Deployment scenario', async () => {
      const option = await $('*=Hybrid');
      await expect(option).toBeDisplayed();
    });

    it('shows the Managed + Private AI scenario', async () => {
      const option = await $('*=Private AI');
      await expect(option).toBeDisplayed();
    });
  });

  describe('Target Audience section', () => {
    const audiences = [
      'Regulated industries',
      'Security-conscious',
      'Air-gapped',
      'Data sovereignty',
    ];

    for (const audience of audiences) {
      it(`shows the "${audience}" use case`, async () => {
        const el = await $(`*=${audience}`);
        await expect(el).toBeDisplayed();
      });
    }
  });

  describe('Responsive layout', () => {
    it('comparison table is accessible at 375px viewport', async () => {
      await browser.setWindowSize(375, 812);
      await browser.url(PAGE_URL);
      const table = await $('table,*=Cloud-Only Tools');
      await expect(table).toBeDisplayed();
      // Reset to desktop
      await browser.setWindowSize(1280, 900);
    });
  });
});
