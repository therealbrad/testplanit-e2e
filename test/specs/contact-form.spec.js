const { expect, browser, $ } = require('@wdio/globals');

const CONTACT_URL = '/contact';
const MAX_MESSAGE_CHARS = 1000;

async function fillContactForm({ name, email, company, subject, message }) {
  if (name !== undefined) await $('[name="name"]').setValue(name);
  if (email !== undefined) await $('[name="email"]').setValue(email);
  if (company !== undefined) await $('[name="company"]').setValue(company);
  if (subject !== undefined) await $('select[name="subject"]').selectByVisibleText(subject);
  if (message !== undefined) await $('[name="message"]').setValue(message);
}

describe('Contact Form', () => {
  beforeEach(async () => {
    await browser.url(CONTACT_URL);
    await browser.waitUntil(
      async () => (await $('[name="name"]').isDisplayed()),
      { timeout: 10000, timeoutMsg: 'Contact form did not render' }
    );
  });

  it('submits successfully and shows success message', async () => {
    await fillContactForm({
      name: 'Ana Villa Caballero',
      email: 'ana.villa@bbva.com',
      company: 'BBVA',
      subject: 'Sales Inquiry',
      message: 'We are evaluating TestPlanIt for our 16,000-user QA organisation.',
    });

    await $('button[type="submit"]').click();

    const successMessage = await $('*=message sent,*=thank you,*=we will be in touch');
    await browser.waitUntil(
      async () => {
        try {
          return await successMessage.isDisplayed();
        } catch {
          return false;
        }
      },
      { timeout: 10000, timeoutMsg: 'Success message did not appear after submission' }
    );
    await expect(successMessage).toBeDisplayed();
  });

  it('shows error when submitted with missing required field', async () => {
    // Submit without filling in the Name field (required)
    await fillContactForm({
      email: 'ana.villa@bbva.com',
      subject: 'Sales Inquiry',
      message: 'Missing name field — should trigger validation.',
    });

    await $('button[type="submit"]').click();

    // The form should not navigate away; a validation error should be visible
    await expect(browser).toHaveUrlContaining('/contact');

    const errorIndicator = await $('[name="name"]:invalid,[name="name"][aria-invalid="true"],.error,[data-error]');
    const isError = await errorIndicator.isExisting();
    await expect(isError).toBe(true);
  });

  it('email field validates format before submission', async () => {
    await fillContactForm({
      name: 'Alfonso Presa Ruiz',
      email: 'not-a-valid-email',
      subject: 'Technical Support',
      message: 'Testing email validation on the contact form.',
    });

    await $('button[type="submit"]').click();

    // Browser-native email validation should block submission and keep us on the contact page
    await expect(browser).toHaveUrlContaining('/contact');

    const emailInput = await $('[name="email"]');
    const validityState = await browser.execute(
      (el) => el.validity.valid,
      await emailInput.getElement()
    );
    await expect(validityState).toBe(false);
  });

  it('character limit enforced on the message field', async () => {
    const overLimitMessage = 'A'.repeat(MAX_MESSAGE_CHARS + 1);

    await fillContactForm({
      name: 'David Bolaños Calderon',
      email: 'david.bolanos@bbva.com',
      subject: 'Feature Request',
      message: overLimitMessage,
    });

    const messageField = await $('[name="message"]');
    const actualValue = await messageField.getValue();

    // Either the field truncates to the max or an error is shown
    const isTruncated = actualValue.length <= MAX_MESSAGE_CHARS;
    const errorShown = await $('*=character,*=limit,*=maximum').isExisting().catch(() => false);

    await expect(isTruncated || errorShown).toBe(true);
  });
});
