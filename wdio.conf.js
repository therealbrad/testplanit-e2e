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
        args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
      },
    },
  ],

  logLevel: 'warn',

  bail: 0,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['chromedriver'],

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
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
  },
};
