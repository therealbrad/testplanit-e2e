const { expect, browser, $ } = require('@wdio/globals');
const contactFormPage = require('../pageobjects/ContactFormPage');
const { VALID_CONTACT, MISSING_NAME, INVALID_EMAIL, LONG_MESSAGE } = require('../data/contacts');

describe('Contact Form', () => {
  beforeEach(async () => {
    await contactFormPage.open();
  });

  it('submits successfully and shows success message', async () => {
    await contactFormPage.fillAndSubmit(VALID_CONTACT);
    await contactFormPage.successMessage.waitForDisplayed({ timeout: 20000 });
    await expect(contactFormPage.successMessage).toBeDisplayed();
  });

  it('shows error when submitted with missing required field', async () => {
    await contactFormPage.fillAndSubmit(MISSING_NAME);
    await expect(browser).toHaveUrlContaining('/contact');
    // Browser native validation marks the field as :invalid
    const invalidField = await $('[name="name"]:invalid');
    await expect(invalidField).toExist();
  });

  it('email field validates format before submission', async () => {
    await contactFormPage.fillAndSubmit(INVALID_EMAIL);
    await expect(browser).toHaveUrlContaining('/contact');
    const invalidEmail = await $('[name="email"]:invalid');
    await expect(invalidEmail).toExist();
  });

  it('character limit enforced on the message field', async () => {
    await contactFormPage.fill(LONG_MESSAGE);
    const actualValue = await contactFormPage.messageInput.getValue();
    const errorShown = await contactFormPage.errorBanner.isExisting().catch(() => false);
    await expect(actualValue.length <= 1000 || errorShown).toBe(true);
  });
});
