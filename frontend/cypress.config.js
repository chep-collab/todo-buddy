const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5182', // Updated to avoid port conflict (5174 was in use)
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Log browser connection issues
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    // Increase timeouts for stability
    defaultCommandTimeout: 10000, // 10 seconds
    pageLoadTimeout: 60000, // 60 seconds
    requestTimeout: 10000, // 10 seconds
    responseTimeout: 30000, // 30 seconds
    browserLaunchTimeout: 60000, // Added to prevent Chrome connection retries
  },
  env: {
    apiUrl: 'http://localhost:5000', // API URL for backend tests
  },
  retries: {
    runMode: 2, // Retry failed tests in headless mode
    openMode: 0, // No retries in interactive mode
  },
  video: false, // Disable video to save resources
  screenshotOnRunFailure: true,
  chromeWebSecurity: false, // Disable for Vite compatibility
  numTestsKeptInMemory: 10, // Reduce memory usage
});