// Test suite for boost request and payment flow

describe('JokiSure Boost Request & Payment Flow', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    // Login before each test
    cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
    cy.get('input[name="identity"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/home');
  });

  describe('Boost Request Form', () => {
    it('should load boost request page and input successfully', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/boost/request');
      cy.url().should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/boost/request');

      // Normal input
      cy.get('input[name="name"]').should('have.value', 'testuser');
      cy.get('input[name="email"]').should('have.value', 'testuser@example.com');
      cy.get('input[name="phone"]').should('have.value', '081234567890');

      // Edit pre-filled info
      cy.get('input[name="name"]').clear({ force: true }).type('Updated Name');
      cy.get('input[name="name"]').should('have.value', 'Updated Name');

      // Email validation
      cy.get('input[name="email"]').clear({ force: true }).type('invalidemail');
      // Should show validation error
      cy.get('#emailError').should('exist');

      // Username and Password required
      cy.get('input[name="username"]').should('have.attr', 'required');
      cy.get('input[name="password"]').should('have.attr', 'required');

      // Radio buttons checking
      cy.get('input[value="VIP+ (>6 hours)"]').check();
      cy.get('input[value="VIP (<6 hours)"]').check();
      cy.get('input[value="Same Day (1 day)"]').check();
      cy.get('input[value="Regular (1 - 2 day)"]').check();
    });
  });

  describe('Payment Page', () => {
    beforeEach(() => {
      // Navigate to payment page by completing boost request
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/boost/request');
      // Propper filling
      cy.get('input[name="name"]').clear({ force: true }).type('Test Gamer');
      cy.get('input[name="email"]').clear({ force: true }).type('testuser@example.com');
      cy.get('input[name="phone"]').clear({ force: true }).type('081234567890');
      cy.get('input[name="username"]').clear({ force: true }).type('GameID123');
      cy.get('input[name="password"]').clear({ force: true }).type('GamePass123');
      cy.get('#p1').check();
      cy.get('#consent').check();
      cy.get('#submitBtn').click({ force: true });

      // Should redirect to payment page
      cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/payment');
    });

    it('should display payment options', () => {
      cy.get('.order-card, [class*="order"]').should('exist');
      cy.get('#paymentMethodSelect').should('be.visible');
      cy.get('[data-bs-target="#voucherModal"]').should('exist');

      // Payment method test
      cy.get('#paymentMethodSelect').select('GoPay');
      cy.get('#paymentMethodSelect').select('Credit Card');
      cy.get('#paymentMethodSelect').select('ShopeePay');
      cy.get('#paymentMethodSelect').select('OVO');
      cy.get('#paymentMethodSelect').select('DANA');

      cy.get('#paymentMethodSelect').select('GoPay');
      cy.get('#paymentMethodSelect').should('have.value', 'd9d6bf97-1f22-47ae-8865-36bb7de0e302'); // GoPay UUID

      // Admin fees
      cy.get('#paymentMethodSelect').select('GoPay');

      // Fee should update
      cy.get('[role="main"]').should('contain', 'Rp');

      // Voucher modal
      cy.get('[data-bs-target="#voucherModal"]', { timeout: 900000 }).click();
      cy.get('#voucher_633a99dc-e388-434d-9a4e-2183e5b7ce78', { timeout: 900000 }).click(); // Voucher_(Flash Sale 20% UUI)
      cy.get('#applyVoucher', { timeout: 900000 }).click();
      // Discount should be applied
      cy.get('[role="main"]').should('contain', 'Rp');

      cy.get('#paymentMethodSelect').select('GoPay');
      // Verify total calculation is visible
      cy.get('[role="main"]').should('contain', 'Rp');

      cy.get('#payButton').should('be.visible');
    });
  });
});
