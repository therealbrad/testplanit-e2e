const Page = require('./Page');

const TIERS = ['Free', 'Starter', 'Team', 'Business', 'Enterprise'];

class PricingPage extends Page {
  get monthlyToggle()    { return $('*=Monthly,button=Monthly,label=Monthly'); }
  get annualToggle()     { return $('*=Annual,button=Annual,label=Annual'); }
  get mostPopularBadge() { return $('*=Most Popular'); }
  get faqSection()       { return $('*=FAQ,*=Frequently Asked'); }
  get comparisonSection(){ return $('*=Compare,table'); }

  tier(name) { return $(`*=${name}`); }
  ctaFor(name) { return $(`*=${name} ~ * a,*=${name} + * a`); }

  async open() {
    await super.open('/pricing');
    await this.waitForHeading();
  }

  async toggleAnnual() {
    await this.annualToggle.click();
  }

  async toggleMonthly() {
    await this.monthlyToggle.click();
  }

  tiers() { return TIERS; }
}

module.exports = new PricingPage();
