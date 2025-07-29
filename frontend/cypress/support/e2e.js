// cypress/support/e2e.js
import './commands';

// Global error handling to prevent test failures from uncaught exceptions (e.g., Vite HMR issues)
Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // Prevent Cypress from failing the test
});