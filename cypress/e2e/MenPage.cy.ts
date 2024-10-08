// cypress/e2e/menPage.spec.js

describe("Men's Socks Page", () => {
  beforeEach(() => {
    cy.visit('/men'); // Adjust the route as necessary
  });

  it("should display the correct page title", () => {
    cy.title().should('include', "Men's Socks");
  });

  it("should display the page description", () => {
    cy.get('h1').should('contain', "Men's Socks");
  });

  it("should load the product filter component", () => {
    // cy.get('aside').contains('Loading filters...').should('exist');
    cy.get('#product-filter').should('exist'); // Adjust based on your filter implementation
  });

  it("should display product cards", () => {
    // You can use mock data if you have an API to return products
    // cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts');
    
    // cy.wait('@getProducts');

    // Check if the product cards are displayed
    cy.get('#animated-product-card').should('have.length.greaterThan', 0);
  });

  it("should filter products based on selected filters", () => {
    // Assuming you have a filter to select sizes, colors, etc.
    cy.get('#product-filter').should('exist');
    // wait for the products to load
    cy.wait(1000); // Adjust the wait time based on your API response time
    cy.contains("Size").click(); // Adjust the selector based on your implementation
    cy.get('#size-M').click(); // Adjust selectors as necessary

    // Check if filtered products are displayed
    cy.get('#animated-product-card').should('have.length', 1); // Adjust the expected length based on your mock data
  });

  it("should handle no products gracefully", () => {
    cy.get('#product-filter').should('exist');
    // wait for the products to load
    cy.wait(1000); // Adjust the wait time based on your API response time
    cy.contains("Size").click(); // Adjust the selector based on your implementation
    cy.get('#size-L').click(); // Adjust selectors as necessary

    cy.get('#animated-product-card').should('not.exist'); // Or whatever your fallback is
    // cy.contains('No products found').should('be.visible'); // Adjust based on your UI feedback
  });
});
