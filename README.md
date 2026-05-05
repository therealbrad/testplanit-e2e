# testplanit-e2e

WebdriverIO end-to-end test suite for [testplanit.com](https://testplanit.com).

## Test Coverage

| Spec | Cases |
| --- | --- |
| `landing-page.spec.js` | Hero headline, nav links, nav routing, feature highlights |
| `pricing.spec.js` | All tiers visible, Most Popular badge, monthly/annual toggle, CTAs, FAQ |
| `contact-form.spec.js` | Successful submission, missing required field, invalid email format, message character limit |
| `values-hub.spec.js` | All 5 value cards, card routing, footer links, inter-page navigation |
| `values-privacy-first.spec.js` | Hero, pillars, comparison table, deployment options, target audiences, responsive |
| `values-open-by-default.spec.js` | Hero, AGPL-3.0 commitments, stats bar, comparison table, responsive |

## Project Structure

```
test/
├── pageobjects/
│   ├── Page.js               # Base page class
│   ├── ContactFormPage.js    # /contact form interactions
│   ├── LandingPage.js        # Home page elements
│   ├── PricingPage.js        # /pricing elements and toggle
│   ├── ValuesHubPage.js      # /values hub page
│   └── ValuePage.js          # Generic value sub-page (Privacy First, Open by Default, etc.)
├── data/
│   ├── contacts.js           # Named test contacts (VALID_CONTACT, MISSING_NAME, INVALID_EMAIL, LONG_MESSAGE)
│   └── pages.js              # URL constants and VALUE_PAGES array
├── helpers/
│   └── waitUtils.js          # waitForUrl, waitForPageReady, viewport helpers
└── specs/
    ├── landing-page.spec.js
    ├── pricing.spec.js
    ├── contact-form.spec.js
    ├── values-hub.spec.js
    ├── values-privacy-first.spec.js
    └── values-open-by-default.spec.js
```

## Requirements

- Node.js ≥ 18
- Google Chrome installed

## Setup

```bash
npm install
```

## Running Tests

```bash
# All tests
npm test

# Single spec
npm run test:contact
npm run test:landing
npm run test:pricing
```

JUnit XML reports are written to `./reports/` for CI ingestion (Jenkins, GitHub Actions, etc.).

## CI Integration (Jenkins example)

```groovy
stage('E2E Tests') {
  steps {
    sh 'npm ci'
    sh 'npm test'
    junit 'reports/*.xml'
  }
}
```

Import the JUnit report into TestPlanIt via:

```bash
tpi results import --project <id> --run <run-id> --format junit reports/*.xml
```
