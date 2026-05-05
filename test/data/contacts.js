const VALID_CONTACT = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  company: 'Acme Corp',
  subject: 'Sales Inquiry',
  message: 'We are evaluating TestPlanIt for our QA team and would love to discuss enterprise options.',
};

const MISSING_NAME = {
  email: 'alex.johnson@example.com',
  company: 'Acme Corp',
  subject: 'Sales Inquiry',
  message: 'Submission without name to verify required field validation.',
};

const INVALID_EMAIL = {
  name: 'Sam Rivera',
  email: 'not-a-valid-email',
  company: 'Acme Corp',
  subject: 'Technical Support',
  message: 'Submission with malformed email address.',
};

const LONG_MESSAGE = {
  name: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  company: 'Acme Corp',
  subject: 'Feature Request',
  message: 'A'.repeat(1100),
};

module.exports = { VALID_CONTACT, MISSING_NAME, INVALID_EMAIL, LONG_MESSAGE };
