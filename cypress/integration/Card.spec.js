describe("Card Component", () => {
  it("Should have slots", () => {
    cy.visit('iframe.html?id=components-card--image-card');
    cy.get('in-card').shadow().find('slot[name="header"]').should("exist");
    cy.get('in-card').shadow().find('slot[name="content"]').should("exist");
    cy.get('in-card').shadow().find('slot[name="footer"]').should("exist");
  });

  it('should find the card slot content in the Light DOM', () => {
    cy.visit('iframe.html?id=components-card--image-card');
    cy.get('#root').find('[slot="header"]').get('img').should('exist');
    cy.get('#root').find('[slot="content"]').contains('Lorem');
    cy.get('#root').find('[slot="footer"]').contains('Read');
  });
})