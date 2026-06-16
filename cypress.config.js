import { defineConfig } from "cypress";
import registerCodeCoverageTasks from '@cypress/code-coverage/task';

export default defineConfig({
  allowCypressEnv: false, // Keeping your setting from the second block

  e2e: {
    pageLoadTimeout: 100000, // Now Cypress will actually see this!
    chromeWebSecurity: false, // Added this just in case a security block is causing the infinite hang

    setupNodeEvents(on, config) {
      // implement node event listeners here
        registerCodeCoverageTasks(on, config);
        return config;
    },
  },
});
