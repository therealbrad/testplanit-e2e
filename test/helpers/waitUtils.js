async function waitForUrl(substring, timeout = 8000) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(substring),
    { timeout, timeoutMsg: `URL did not contain "${substring}" within ${timeout}ms` }
  );
}

async function waitForPageReady(timeout = 10000) {
  await browser.waitUntil(
    () => browser.execute(() => document.readyState === 'complete'),
    { timeout, timeoutMsg: 'Page did not reach ready state' }
  );
}

async function waitForHeading(timeout = 10000) {
  await browser.waitUntil(
    async () => (await $('h1,h2').isDisplayed()),
    { timeout, timeoutMsg: 'No heading visible on page' }
  );
}

async function setMobileViewport() {
  await browser.setWindowSize(375, 812);
}

async function setDesktopViewport() {
  await browser.setWindowSize(1280, 900);
}

module.exports = {
  waitForUrl,
  waitForPageReady,
  waitForHeading,
  setMobileViewport,
  setDesktopViewport,
};
