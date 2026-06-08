// ***********************************************
// Custom commands for JokiSure E2E testing
// ***********************************************

// Login command
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://127.0.0.1:8000/login');
  cy.get('input[name="identity"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/home');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('button[form="logoutForm"]').click();
  cy.url().should('include', 'http://127.0.0.1:8000/login');
});

// Fill boost request form
Cypress.Commands.add('fillBoostRequest', (data = {}) => {
  const defaultData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '081234567890',
    gameUsername: 'TestGamer123',
    gamePassword: 'Password123',
    priority: 'VIP+ (>6 hours)',
    ...data
  };

  cy.get('input[name="name"]').clear().type(defaultData.name);
  cy.get('input[name="email"]').clear().type(defaultData.email);
  cy.get('input[name="phone"]').clear().type(defaultData.phone);
  cy.get('input[name="username"]').clear().type(defaultData.gameUsername);
  cy.get('input[name="password"]').clear().type(defaultData.gamePassword);

  // Select priority
  cy.get(`input[value="${defaultData.priority}"]`).check();
});

// Select payment method
Cypress.Commands.add('selectPaymentMethod', (method = 'GoPay') => {
  cy.get('select[name="payment_method_id"]').should('exist');
  cy.get('select[name="payment_method_id"]').select(method);
});

// Apply voucher
Cypress.Commands.add('applyVoucher', (voucherName) => {
  cy.get('[data-bs-target="#voucherModal"]').click();
  cy.get('[data-bs-toggle="modal"]').should('be.visible');
  cy.contains('button', voucherName).click();
  cy.get('[data-bs-target="#voucherModal"]').should('not.be.visible');
});

// Wait for element to be visible
Cypress.Commands.add('waitForElement', (selector) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible');
});
