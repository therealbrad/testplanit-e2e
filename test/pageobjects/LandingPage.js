const Page = require('./Page');

class LandingPage extends Page {
  get heroHeading()       { return $('h1'); }
  get getStartedCta()     { return $('a=Get Started Free'); }
  get tryDemoLink()       { return $('a=Try a Demo'); }
  // span=QuickScript: exact text on span — won't match __NEXT_DATA__ script (its text is the full JSON)
  get quickScriptBadge()  { return $('span=QuickScript'); }
  // h3 exact text match — script elements are not h3
  get noPerSeatProp()     { return $('h3=No Per-Seat Pricing'); }

  nav(label) { return $('nav').$(`a=${label}`); }

  async open() {
    await super.open('/');
    await this.heroHeading.waitForDisplayed({ timeout: 10000 });
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
