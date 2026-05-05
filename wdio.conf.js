require('dotenv').config();
const { TestPlanItService } = require('@testplanit/wdio-reporter');

exports.config = {
  runner: 'local',
  baseUrl: 'https://testplanit.com',

  specs: ['./test/specs/**/*.spec.js'],
  exclude: [],

  maxInstances: 3,

  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
      },
    },
  ],

  logLevel: 'warn',

  bail: 0,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    'chromedriver',
    [
      TestPlanItService,
      {
        domain: process.env.TESTPLANIT_DOMAIN,
        apiToken: process.env.TESTPLANIT_API_TOKEN,
        projectId: parseInt(process.env.TESTPLANIT_PROJECT_ID || '0', 10),
        runName: 'E2E Suite - {date} {time}',
        milestoneId: process.env.TESTPLANIT_MILESTONE || 'v1.0 Release',
        stateId: 'In Progress',
        tagIds: ['automated', 'e2e'],
        captureScreenshots: true,
      },
    ],
  ],

  framework: 'mocha',
  reporters: [
    'spec',
    [
      'junit',
      {
        outputDir: './reports',
        outputFileFormat(options) {
          return `results-${options.cid}.xml`;
        },
      },
    ],
    [
      '@testplanit/wdio-reporter',
      {
        domain: process.env.TESTPLANIT_DOMAIN,
        apiToken: process.env.TESTPLANIT_API_TOKEN,
        projectId: parseInt(process.env.TESTPLANIT_PROJECT_ID || '0', 10),
        autoCreateTestCases: true,
        createFolderHierarchy: true,
        parentFolderId: 'E2E Tests',
        uploadScreenshots: true,
        verbose: true,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
  },
};
