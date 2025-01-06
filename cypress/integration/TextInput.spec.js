describe("TextInputComponent", () => {

  it('should be visible', () => {
    cy.visit('iframe.html?id=components-inputs-textinput--form');
    cy.get("#root").get('[id="username"]').should("be.visible");
    cy.get("#root").get('[id="password"]').should("be.visible");
    cy.get("#root").get('.submit').should("be.visible");
  });

  it('should error on required', () => {
    cy.visit('iframe.html?id=components-inputs-textinput--form');
    cy.get("#root").get('[id="username"]').should("be.visible").click();
    cy.get("#root").get('[id="password"]').should("be.visible").click();
    cy.get("#root").get('.submit').should("be.visible").click();


    cy.get("#root")
      .get('[id="username"')
      .shadow()
      .find('.message')
      .contains("Required");

    cy.get("#root")
      .get('[id="password"')
      .shadow()
      .find('.message')
      .contains("Required");
  });

  it('should error on too short', () => {
    cy.visit('iframe.html?id=components-inputs-textinput--form');

    cy.get("#root")
      .get('[id="password"')
      .shadow()
      .find('input')
      .type('123') // set value

    cy.get("#root").get('.submit').click();

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .contains('Too short')
  });


  it('should show no errors on valid', () => {
    cy.visit('iframe.html?id=components-inputs-textinput--form');

    cy.get('#root')
      .get('[id="username"]')
      .shadow()
      .find('input')
      .type('valid_username');

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('input')
      .type('ValiDPassWord1231!!');

    cy.get("#root").get('.submit').should("be.visible").click();

    cy.get("#root")
      .get('[id="username"')
      .shadow()
      .find('.message')
      .should("include.text", "");

    cy.get("#root")
      .get('[id="password"')
      .shadow()
      .find('.message')
      .should("include.text", "");
  });
})