import { defineConfig } from "cypress";
import registerCodeCoverageTasks from '@cypress/code-coverage/task';

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    pageLoadTimeout: 100000,
    chromeWebSecurity: false,
    baseUrl: 'http://127.0.0.1:8000',

    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);

      // Log coverage data collection events
      on('after:screenshot', () => {
        console.log('After screenshot - coverage data should be available');
      });

      return config;
    },
  },
});
