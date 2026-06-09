// Test suite for authentication flow (Login, Signup, Logout)

describe('JokiSure Authentication Flow', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

    describe('Signup Page', () => {
        it('should display signup form with all required fields & OTP verification', () => {
            cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/signup');
            cy.get('input[name="username"]').type('testuser');
            cy.get('input[name="email"]').type('test@example.com');
            cy.get('input[name="password"]').type('password123');
            cy.get('input[name="password_confirmation"]').type('password123');
            cy.get('input[name="phone"]').type('081234567890');
            cy.get('#signUpButton').should('be.visible');

            cy.contains('Verify Phone Number').should('be.visible');
            cy.get('#verifyPhoneLink').click();
            cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/otp');
            cy.get('#verifyCode').click();
            cy.get('#demoOTP').click();
            cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/signup');

            cy.get('input[name="password"]').type('password123');
            cy.get('input[name="password_confirmation"]').type('password123');
            cy.get('#signUpButtonVerified', { timeout: 80000 }).should('be.visible');
    });
  });

  describe('Login Page', () => {
    it('should display login page with all required fields', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
      cy.get('input[name="identity"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
      cy.contains('Sign Up').should('be.visible');
    });

    it('should show error with invalid credentials', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
      cy.get('input[name="identity"]').type('nonexistent@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      // Wait for error message to appear
      cy.get('#loginErrors', { pageLoadTimeout: 900000 }).should('be.visible');
    });

    it('should login successfully with valid credentials', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
      cy.get('input[name="identity"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      // Wait for redirect
      cy.url({ pageLoadTimeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/home');
    });

    it('should validate empty email field', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
      cy.get('input[name="identity"]').should('have.attr', 'required');
    });

    it('should validate empty password field', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
      cy.get('input[name="password"]').should('have.attr', 'required');
    });
  });

  describe('Logout', () => {
    it('should logout when logout button exists', () => {
        // First login
        cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
        cy.get('input[name="identity"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url({ pageLoadTimeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/home');

        cy.get('#menuToggleBtn').click({force: true});
        // Test Logout
        cy.get('#logout').click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/login');
    });

    it('should redirect to login when accessing protected routes without auth', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/home');
      cy.url({ pageLoadTimeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/login');
    });
  });

  describe('Session Management', () => {
    it('should maintain session after page refresh', () => {
        cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/login');
        cy.get('input[name="identity"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url({ pageLoadTimeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/home');

      // Refresh page
        cy.reload();
        cy.url({ pageLoadTimeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/home');
    });

    it('should redirect to login when accessing protected routes without auth', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/home');
      cy.url({ pageLoadTimeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/login');
    });
  });
});
