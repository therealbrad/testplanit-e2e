const { expect, browser, $ } = require('@wdio/globals');
const ValuePage = require('../pageobjects/ValuePage');
const { URLS } = require('../data/pages');
const { setMobileViewport, setDesktopViewport } = require('../helpers/waitUtils');

const openByDefaultPage = new ValuePage(URLS.openSource);

// Actual span text from the "What AGPL-3.0 guarantees" section
const AGPL_GUARANTEES = [
  'Anyone can read',
  'Modifications must stay open',
  'Network users also get source',
  'Commercial use is allowed',
];

describe('Open by Default Value Page', () => {
  before(async () => {
    await openByDefaultPage.open();
  });

  describe('Hero section', () => {
    it('displays the Open by Default headline', async () => {
      await expect(openByDefaultPage.pillar('Open by Default')).toBeDisplayed();
    });

    it('shows the View on GitHub CTA', async () => {
      await expect(openByDefaultPage.viewGithubCta).toBeDisplayed();
    });

    it('View on GitHub links to the correct GitHub repository', async () => {
      const href = await openByDefaultPage.viewGithubCta.getAttribute('href');
      await expect(href).toContain('github.com');
      await expect(href).toContain('testplanit');
    });

    it('shows the Licensing Details CTA', async () => {
      await expect(openByDefaultPage.licensingCta).toBeDisplayed();
    });
  });

  describe('Three Pillars section', () => {
    it('displays the AGPL-3.0 License pillar', async () => {
      await expect(openByDefaultPage.pillar('AGPL-3.0 License')).toBeDisplayed();
    });

    it('displays the Public Codebase pillar', async () => {
      await expect(openByDefaultPage.pillar('Public Codebase')).toBeDisplayed();
    });

    it('displays the Community Contributions pillar', async () => {
      await expect(openByDefaultPage.pillar('Community Contributions')).toBeDisplayed();
    });
  });

  describe('Why AGPL-3.0 section', () => {
    before(async () => {
      const section = await $('h2*=AGPL-3.0');
      await section.scrollIntoView();
    });

    for (const snippet of AGPL_GUARANTEES) {
      it(`lists the guarantee: "${snippet}"`, async () => {
        const el = await $(`span*=${snippet}`);
        await expect(el).toBeDisplayed();
      });
    }
  });

  describe('Why it matters section', () => {
    it('mentions Healthier Ecosystems', async () => {
      await expect(openByDefaultPage.pillar('Healthier Ecosystems')).toBeDisplayed();
    });

    it('mentions Fork-Friendly', async () => {
      await expect(openByDefaultPage.pillar('Fork-Friendly')).toBeDisplayed();
    });

    it('mentions Global Collaboration', async () => {
      await expect(openByDefaultPage.pillar('Global Collaboration')).toBeDisplayed();
    });
  });

  describe('Comparison table', () => {
    it('renders a comparison of TestPlanIt vs. proprietary tools', async () => {
      await expect(openByDefaultPage.tableCell('TestPlanIt')).toBeDisplayed();
    });

    it('covers the source code row', async () => {
      await expect(openByDefaultPage.tableCell('Source')).toBeDisplayed();
    });

    it('covers the forking row', async () => {
      await expect(openByDefaultPage.tableCell('Fork')).toBeDisplayed();
    });
  });

  describe('Responsive layout', () => {
    it('page is accessible at 375px viewport', async () => {
      await setMobileViewport();
      await browser.url(URLS.openSource);
      const heading = await $('h1*=Open by Default');
      await expect(heading).toBeDisplayed();
      await setDesktopViewport();
    });
  });
});
