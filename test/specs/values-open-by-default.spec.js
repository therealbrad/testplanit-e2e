const { expect, browser } = require('@wdio/globals');
const ValuePage = require('../pageobjects/ValuePage');
const { URLS } = require('../data/pages');
const { setMobileViewport, setDesktopViewport } = require('../helpers/waitUtils');

const openByDefaultPage = new ValuePage(URLS.openSource);

const AGPL_GUARANTEES = ['read', 'modify', 'network', 'commercial'];

const STATS = [
  'AGPL-3.0 Licensed',
  '100% Public Source',
  'Open Issue Tracker',
  'Fork Friendly',
];

describe('Open by Default Value Page', () => {
  before(async () => {
    await openByDefaultPage.open();
  });

  describe('Hero section', () => {
    it('displays the AGPL-3.0 commitment headline', async () => {
      await expect(openByDefaultPage.pillar('AGPL')).toBeDisplayed();
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
    for (const guarantee of AGPL_GUARANTEES) {
      it(`lists the right to ${guarantee}`, async () => {
        await expect(openByDefaultPage.pillar(guarantee)).toBeDisplayed();
      });
    }
  });

  describe('Stats bar', () => {
    for (const stat of STATS) {
      it(`displays the "${stat}" stat`, async () => {
        await expect(openByDefaultPage.stat(stat)).toBeDisplayed();
      });
    }
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
    it('stats bar is visible at 375px viewport', async () => {
      await setMobileViewport();
      await browser.url(URLS.openSource);
      await expect(openByDefaultPage.stat('AGPL-3.0 Licensed')).toBeDisplayed();
      await setDesktopViewport();
    });
  });
});
