const VALID_CONTACT = {
  name: 'Ana Villa Caballero',
  email: 'ana.villa@bbva.com',
  company: 'BBVA',
  subject: 'Sales Inquiry',
  message: 'We are evaluating TestPlanIt for our QA organisation and would love to discuss enterprise options.',
};

const MISSING_NAME = {
  email: 'ana.villa@bbva.com',
  company: 'BBVA',
  subject: 'Sales Inquiry',
  message: 'Submission without name to verify required field validation.',
};

const INVALID_EMAIL = {
  name: 'Alfonso Presa Ruiz',
  email: 'not-a-valid-email',
  company: 'BBVA',
  subject: 'Support',
  message: 'Submission with malformed email address.',
};

const LONG_MESSAGE = {
  name: 'Carlos Moreno Sanz',
  email: 'c.moreno@bbva.com',
  company: 'BBVA',
  subject: 'General Inquiry',
  message: 'A'.repeat(1100),
};

module.exports = { VALID_CONTACT, MISSING_NAME, INVALID_EMAIL, LONG_MESSAGE };
