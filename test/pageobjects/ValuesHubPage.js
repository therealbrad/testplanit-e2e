const Page = require('./Page');
const { VALUE_PAGES } = require('../data/pages');

class ValuesHubPage extends Page {
  // h1 won't match script; p*= partial match on p won't match script
  get heroHeading()    { return $('h1=Our Core Values'); }
  get tagline()        { return $('p*=principles'); }
  get getStartedCta()  { return $('a=Get Started Free'); }

  // card labels are h2 headings on the values hub page
  card(label)       { return $(`h2=${label}`); }
  cardLink(slug)    { return $(`a[href="${slug}"]`); }
  // scoped to footer element then link text
  footerLink(label) { return $('footer').$(`a=${label}`); }

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
