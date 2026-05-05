const Page = require('./Page');

const NAV_LINKS = ['Features', 'Pricing', 'Values', 'Docs', 'Blog'];

class LandingPage extends Page {
  get heroHeading()       { return $('h1'); }
  get getStartedCta()     { return $('a=Get Started Free'); }
  get tryDemoLink()       { return $('a=Try a Demo'); }
  get quickScriptBadge()  { return $('*=QuickScript'); }
  get noPerSeatProp()     { return $('*=No Per-Seat Pricing'); }

  nav(label) { return $(`nav a=${label}`); }

  async open() {
    await super.open('/');
    await this.heroHeading.waitForDisplayed({ timeout: 10000 });
  }

  async navLinks() {
    return NAV_LINKS;
  }

  async clickNav(label) {
    await this.nav(label).click();
    await browser.waitUntil(
      async () => (await $('h1,h2').isDisplayed()),
      { timeout: 8000, timeoutMsg: `${label} page did not load` }
    );
  }
}

module.exports = new LandingPage();
