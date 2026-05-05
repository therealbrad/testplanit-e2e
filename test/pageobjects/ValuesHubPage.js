const Page = require('./Page');
const { VALUE_PAGES } = require('../data/pages');

class ValuesHubPage extends Page {
  get heroHeading()    { return $('*=Our Core Values'); }
  get tagline()        { return $('*=principles'); }
  get getStartedCta()  { return $('a=Get Started Free'); }

  card(label)     { return $(`*=${label}`); }
  cardLink(slug)  { return $(`a[href="${slug}"]`); }
  footerLink(label) { return $(`footer a=${label}`); }

  async open() {
    await super.open('/values');
    await this.heroHeading.waitForDisplayed({ timeout: 10000 });
  }

  async navigateTo(slug) {
    await this.cardLink(slug).click();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(slug),
      { timeout: 8000, timeoutMsg: `Did not navigate to ${slug}` }
    );
  }

  valuePages() { return VALUE_PAGES; }
}

module.exports = new ValuesHubPage();
