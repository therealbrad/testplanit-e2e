const Page = require('./Page');

// XPath helper: find visible text in headings/body elements, excluding script/style
function noScript(tag, text) {
  return `//${tag}[contains(normalize-space(),"${text}")]`;
}
function noScriptExact(text) {
  return `//*[not(self::script) and not(self::style) and normalize-space()="${text}"]`;
}

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

  // heading-specific: h1/h2/h3 won't match script elements
  pillar(text) {
    return $(`${noScript('h1', text)} | ${noScript('h2', text)} | ${noScript('h3', text)}`);
  }

  // table th/td cells
  tableCell(text) {
    return $(`${noScript('th', text)} | ${noScript('td', text)}`);
  }

  // span or p with exact text for stat-style callouts
  stat(text) {
    return $(`${noScript('span', text)} | ${noScript('p', text)} | ${noScript('h3', text)}`);
  }

  // paragraph partial match — won't match script since tag is p
  audience(text) { return $(`p*=${text}`); }

  // h3 partial match for deployment scenario headings
  deployment(text) { return $(`h3*=${text}`); }

  async open() {
    await super.open(this.slug);
    await this.heroHeading.waitForDisplayed({ timeout: 10000 });
  }
}

module.exports = ValuePage;
