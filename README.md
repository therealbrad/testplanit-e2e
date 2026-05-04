# testplanit-e2e

WebdriverIO end-to-end test suite for [testplanit.com](https://testplanit.com).

## Test Coverage

| Spec | Cases |
|---|---|
| `landing-page.spec.js` | Hero headline, nav links, nav routing, feature highlights |
| `pricing.spec.js` | All 5 tiers visible, Most Popular badge, monthly/annual toggle, CTAs, FAQ |
| `contact-form.spec.js` | Successful submission, missing required field, invalid email format, message character limit |

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
