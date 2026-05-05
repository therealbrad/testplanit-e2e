const Page = require('./Page');

class ContactFormPage extends Page {
  get nameInput()      { return $('[name="name"]'); }
  get emailInput()     { return $('[name="email"]'); }
  get companyInput()   { return $('[name="company"]'); }
  get subjectSelect()  { return $('select[name="subject"]'); }
  get messageInput()   { return $('[name="message"]'); }
  get submitButton()   { return $('button[type="submit"]'); }
  get successMessage() { return $('h2=Message Sent!'); }
  get errorBanner()    { return $('[role="alert"],.error-message,.form-error'); }

  async open() {
    await super.open('/contact');
    await this.nameInput.waitForDisplayed({ timeout: 8000 });
  }

  async fill({ name, email, company, subject, message } = {}) {
    if (name !== undefined)    await this.nameInput.setValue(name);
    if (email !== undefined)   await this.emailInput.setValue(email);
    if (company !== undefined) await this.companyInput.setValue(company);
    if (subject !== undefined) await this.subjectSelect.selectByVisibleText(subject);
    if (message !== undefined) await this.messageInput.setValue(message);
  }

  async submit() {
    await this.submitButton.click();
  }

  async fillAndSubmit(data) {
    await this.fill(data);
    await this.submit();
  }
}

module.exports = new ContactFormPage();
