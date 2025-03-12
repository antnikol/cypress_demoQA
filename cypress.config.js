import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
// import { allureCypress } from "allure-cypress";

import * as os from "node:os";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      on('before:browser:launch', (browser = {}, launchOptions) => {
        config.env.browserName = browser.name;
        return launchOptions;
      });
      return config;
    },
    env: {
      allure: true,
      EXTRA_BASE_URL: process.env.CI ? 'http://localhost:3000' : 'http://127.0.0.1:5500',
    },
    baseUrl: 'https://demoqa.com/automation-practice-form',
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    requestTimeout: 7000,
    defaultCommandTimeout: 7000,
    specPattern: [
      'cypress/api/',
      'cypress/e2e/'
    ],
    retries: {
      runMode: 15,  
      openMode: 0, 
    },
  },
});
