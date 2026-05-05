const Page = require('./Page');

// Actual tiers from DOM: "Open Source" is a span badge, others are h3 headings
const TIERS = ['Open Source', 'Essentials', 'Team', 'Professional', 'Dedicated'];

class PricingPage extends Page {
  // role=switch is the billing toggle
  get billingToggle()    { return $('[role="switch"]'); }
  get annualLabel()      { return $('span*=Annual'); }
  get save15Badge()      { return $('span=Save 15%'); }
  // Most Popular and Open Source are span badges above the plan cards
  get mostPopularBadge() { return $('span=Most Popular'); }
  get faqSection()       { return $('h2=Frequently Asked Questions'); }
  get comparisonSection(){ return $('h2=Compare Plans'); }
  get stopPerSeatSection(){ return $('h2=Stop Paying Per Seat'); }

  // "Open Source" is a span badge; Essentials/Team/Professional/Dedicated are h3 headings
  tier(name) {
    if (name === 'Open Source') return $('span=Open Source');
    return $(`h3=${name}`);
  }

  async open() {
    await super.open('/pricing');
    await this.waitForHeading();
  }

  async toggleAnnual() {
    await this.billingToggle.click();
  }

  async toggleMonthly() {
    await this.billingToggle.click();
  }

  tiers() { return TIERS; }
}

module.exports = new PricingPage();
