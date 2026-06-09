// Test suite for order management and tracking

describe('JokiSure Order Management & Tracking', () => {

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

    describe('My Orders Page', () => {
        it('should load my orders page successfully', () => {
            cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/orders');
            cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/orders');

            // Check for tab buttons
            cy.get('#tab-btn-all').click({ force: true });
            cy.get('#tab-btn-waitlisted').click({ force: true });
            cy.get('#tab-btn-pending').click({ force: true });
            cy.get('#tab-btn-on-progress').click({ force: true });
            cy.get('#tab-btn-completed').click({ force: true });

            cy.get('#tab-btn-all').click();
            // Click on an order to view details
            cy.get('.order-card-new', { timeout: 90000 }).first().click({ force: true });
            cy.go('back');
        });
    });

    describe('Order Detail Page', () => {
        it('should load order detail page successfully', () => {
            cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/orders');
            cy.get('.order-card-new', { timeout: 90000 }).first().click({ force: true });
            cy.get("#trackOrder", { timeout: 90000 }).should('exist').scrollIntoView();
            cy.get("#completeOrder", { timeout: 90000 }).should('exist').scrollIntoView();

            // Test copy order ID functionality
            cy.get('#copyIcon').click({ force: true });
            cy.get('#chatIcon').click({ force: true });
            cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/chat');
            cy.go('back');
        });

  });

    describe('Track Orders', () => {
        it('should load tracking page successfully', () => {
            cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/orders');
            cy.get('#trackButton', { timeout: 90000 }).first().click({ force: true });
            cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/track');

            // Test copy order ID functionality
            cy.get('#copyIcon').click({ force: true });
            cy.get('#chatIcon', { timeout: 90000 }).click({ force: true });
            cy.go('back');
        });
    });

    describe('Reviews Page', () => {
        it('should load reviews page successfully', () => {
            cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/reviews');
            cy.get('#writeReviewButton', { timeout: 90000 }).first().click({ force: true });

            // Test star ratings
            cy.get('#star-1', { timeout: 90000 }).click({ force: true });
            cy.get('#star-2', { timeout: 90000 }).click({ force: true });
            cy.get('#star-3', { timeout: 90000 }).click({ force: true });
            cy.get('#star-4', { timeout: 90000 }).click({ force: true });
            cy.get('#star-5', { timeout: 90000 }).click({ force: true });

            cy.get('#userReview', { timeout: 90000 }).type('This is a sample review.');

            cy.get('#submitReview', { timeout: 90000 }).should('be.visible');
        });
    });
});



