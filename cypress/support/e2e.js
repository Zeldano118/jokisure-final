// ***********************************************************
// This support/e2e.js file is processed and loaded
// automatically before your test files.
// ***********************************************************

// Import commands.js
import './commands'

import '@cypress/code-coverage/support';

// Ensure coverage data is available after each test
Cypress.on('window:load', (win) => {
  if (!win.__coverage__) {
    console.warn('Warning: window.__coverage__ not found. Code may not be instrumented.');
  }
});

// Disable uncaught exception handling for 404s
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  if (err.status === 404) {
    return false
  }
  // Let other errors fail the test
  return true
})

// Set up before/after hooks
beforeEach(() => {
  // Optional: Add any global setup here
})

afterEach(() => {
  // Optional: Add any global cleanup here
})
