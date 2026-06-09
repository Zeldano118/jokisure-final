// Test suite for homepage and marketplace navigation

describe('JokiSure Homepage & Marketplace', () => {

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

  describe('Homepage', () => {
    it('should allow navigation to games/booster/navbar page', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/home', { timeout: 900000 });
      cy.get('#game').first().click();
      cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/games');

      cy.go('back');

      cy.get('#boosters').first().click({force: true});
      cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/boosters');

      cy.go('back');

      // Navbar Tabs
      cy.get("#chatTab").click({force: true});
      cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/chat');

      cy.go('back');

      cy.get("#profileTab").click({force:true});
      cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/profile');

      cy.go('back');

      cy.get("#cartTab").click({force:true});
      cy.url({ timeout: 90000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/cart');

      cy.go('back');

      cy.get("#notificationsTab").click({force: true});
      cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/notifications');
    });
  });

/////

  describe('Games Page', () => {
    it('should allow filtering or searching games and view details', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/games', { timeout: 900000 });
      // Check if search/filter functionality exists
      cy.get('input[placeholder*="search"], input[placeholder*="Search"]').should('exist');

      cy.go('back');

      cy.get('a[href*="/games/"]', { timeout: 5000 }).should('exist');
    });
  });

  describe('Boosters Page', () => {
    it('should allow viewing booster profiles', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/boosters', { timeout: 900000 });
      // Check for booster profile links
      cy.get('a[href*="/booster/profile"]', { timeout: 5000 }).should('exist');
    });
  });

  describe('Service Detail Page', () => {
    it('should be able to view service details', () => {
      cy.get('#foryou', { timeout: 5000 }).first().click();
    });

    it('should allow adding service to cart', () => {
      cy.get('#foryou', { timeout: 5000 }).first().click();
      // Look for add to cart button
      cy.get('#sheetBackdrop', { timeout: 5000 }).click({force: true});
      cy.get('#closeRules', { timeout: 5000 }).click({force: true});
      cy.get('#sheetBackdrop', { timeout: 5000 }).click({force: true});
      cy.get('#acceptRules', { timeout: 5000 }).click({force: true});
      cy.get('#approveBtn', { timeout: 5000 }).click({force: true});

      cy.get('#addToCart', { timeout: 50000 }).should('exist').scrollIntoView();
    });
  });

  describe('Cart Navigation', () => {
    it('should load cart page successfully', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/cart');
      cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/cart');
    });

    it('should show remove button', () => {
      cy.visit('https://jokisure-34050340438.asia-southeast2.run.app/cart', { timeout: 900000 });
      cy.get('#removeBtn', { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Sidebar', () => {
    it('should display sidebar successfully', () => {
        cy.get('#menuToggleBtn').click({force: true});
        cy.get('#accountMenu', { timeout: 90000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/profile');
        cy.go('back');

        cy.get('#menuToggleBtn', { timeout: 90000 }).click({force: true});
        cy.get('#boostersMenu', { timeout: 9000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/boosters');
        cy.go('back');

        cy.get('#menuToggleBtn', { timeout: 90000 }).click({force: true});
        cy.get('#ordersMenu', { timeout: 5000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/orders');
        cy.go('back');

        cy.get('#menuToggleBtn', { timeout: 90000 }).click({force: true});
        cy.get('#reviewsMenu', { timeout: 90000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/reviews');
        cy.go('back');

        cy.get('#menuToggleBtn', { timeout: 90000 }).click({force: true});
        cy.get('#settingsMenu', { timeout: 90000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/profile/edit');
        cy.go('back');

        cy.get('#menuToggleBtn', { timeout: 90000 }).click({force: true});
        cy.get('#termsMenu', { timeout: 90000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/legal/terms');
        cy.go('back');

        cy.get('#menuToggleBtn', { timeout: 90000 }).click({force: true});
        cy.get('#contactMenu', { timeout: 90000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/legal/contact');
        cy.go('back');
    });
  });

  describe('Contact Menu', () => {
    it('should display contact menu successfully', () => {
        cy.get('#menuToggleBtn', { timeout: 90000 }).click({force: true});
        cy.get('#contactMenu', { timeout: 90000 }).click({force: true});
        cy.url({ timeout: 900000 }).should('include', 'https://jokisure-34050340438.asia-southeast2.run.app/legal/contact');
        cy.go('back');

        cy.get('#name').type('Test User');
        cy.get('#email').type('testuser@example.com');
        cy.get('#subject').type('Test Subject');
        cy.get('#message').type('Test Message');
        cy.get('#submitBtn').should('be.visible');
    });
  });
});
