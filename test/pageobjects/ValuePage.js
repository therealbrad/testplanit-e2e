const Page = require('./Page');

class ValuePage extends Page {
  constructor(slug) {
    super();
    this.slug = slug;
  }

  get heroHeading()     { return $('h1,h2'); }
  get getStartedCta()   { return $('a=Get Started Free'); }
  get viewSourceCta()   { return $('a=View Source Code'); }
  get viewGithubCta()   { return $('a=View on GitHub'); }
  get licensingCta()    { return $('a=Licensing Details'); }

  pillar(text)     { return $(`*=${text}`); }
  tableCell(text)  { return $(`*=${text}`); }
  stat(text)       { return $(`*=${text}`); }
  audience(text)   { return $(`*=${text}`); }
  deployment(text) { return $(`*=${text}`); }

  async open() {
    await super.open(this.slug);
    await this.heroHeading.waitForDisplayed({ timeout: 10000 });
  }
}

module.exports = ValuePage;
