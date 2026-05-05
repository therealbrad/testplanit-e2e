class Page {
  async open(path = '/') {
    await browser.url(path);
    await browser.waitUntil(
      () => browser.execute(() => document.readyState === 'complete'),
      { timeout: 10000, timeoutMsg: 'Page did not reach ready state' }
    );
  }

  async waitForHeading() {
    await browser.waitUntil(
      async () => (await $('h1,h2').isDisplayed()),
      { timeout: 10000, timeoutMsg: 'No heading found on page' }
    );
  }
}

module.exports = Page;
