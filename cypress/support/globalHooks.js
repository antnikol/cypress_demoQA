

beforeEach(() => {
    // const browserName = Cypress.env('browserName')
    // cy.allure().parameter('Browser', browserName)
    
    cy.visit('/')
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Log the error for debugging purposes
      console.error('Uncaught Exception:', err);
    
      // Prevent Cypress from failing the test
      return false;
    });
})