const { expect, browser, $, $$ } = require('@wdio/globals');

const PAGE_URL = '/values/open-source';

const AGPL_GUARANTEES = ['read', 'modify', 'network', 'commercial'];

describe('Open by Default Value Page', () => {
  before(async () => {
    await browser.url(PAGE_URL);
    await browser.waitUntil(
      async () => (await $('h1,h2').isDisplayed()),
      { timeout: 10000, timeoutMsg: 'Open by Default page did not load' }
    );
  });

  describe('Hero section', () => {
    it('displays the AGPL-3.0 commitment headline', async () => {
      const heading = await $('*=AGPL');
      await expect(heading).toBeDisplayed();
    });

    it('shows the View on GitHub CTA', async () => {
      const cta = await $('a=View on GitHub');
      await expect(cta).toBeDisplayed();
    });

    it('View on GitHub links to the correct GitHub repository', async () => {
      const cta = await $('a=View on GitHub');
      const href = await cta.getAttribute('href');
      await expect(href).toContain('github.com');
      await expect(href).toContain('testplanit');
    });

    it('shows the Licensing Details CTA', async () => {
      const cta = await $('a=Licensing Details');
      await expect(cta).toBeDisplayed();
    });
  });

  describe('Three Pillars section', () => {
    it('displays the AGPL-3.0 License pillar', async () => {
      const pillar = await $('*=AGPL-3.0 License');
      await expect(pillar).toBeDisplayed();
    });

    it('displays the Public Codebase pillar', async () => {
      const pillar = await $('*=Public Codebase');
      await expect(pillar).toBeDisplayed();
    });

    it('displays the Community Contributions pillar', async () => {
      const pillar = await $('*=Community Contributions');
      await expect(pillar).toBeDisplayed();
    });
  });

  describe('Why AGPL-3.0 section', () => {
    it('lists the right to read the source code', async () => {
      const guarantee = await $('*=read');
      await expect(guarantee).toBeDisplayed();
    });

    it('lists the right to modify the source code', async () => {
      const guarantee = await $('*=modify');
      await expect(guarantee).toBeDisplayed();
    });

    it('lists network-use rights', async () => {
      const guarantee = await $('*=network');
      await expect(guarantee).toBeDisplayed();
    });

    it('lists commercial use rights', async () => {
      const guarantee = await $('*=commercial');
      await expect(guarantee).toBeDisplayed();
    });
  });

  describe('Stats bar', () => {
    const stats = [
      'AGPL-3.0 Licensed',
      '100% Public Source',
      'Open Issue Tracker',
      'Fork Friendly',
    ];

    for (const stat of stats) {
      it(`displays the "${stat}" stat`, async () => {
        const el = await $(`*=${stat}`);
        await expect(el).toBeDisplayed();
      });
    }
  });

  describe('Comparison table', () => {
    it('renders a comparison of TestPlanIt vs. proprietary tools', async () => {
      const testplanitCol = await $('*=TestPlanIt');
      await expect(testplanitCol).toBeDisplayed();
    });

    it('covers the source code row', async () => {
      const row = await $('*=Source');
      await expect(row).toBeDisplayed();
    });

    it('covers the forking row', async () => {
      const row = await $('*=Fork');
      await expect(row).toBeDisplayed();
    });
  });

  describe('Responsive layout', () => {
    it('stats bar is visible at 375px viewport', async () => {
      await browser.setWindowSize(375, 812);
      await browser.url(PAGE_URL);
      const stat = await $('*=AGPL-3.0 Licensed');
      await expect(stat).toBeDisplayed();
      await browser.setWindowSize(1280, 900);
    });
  });
});
