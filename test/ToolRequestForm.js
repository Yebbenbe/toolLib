describe('ToolRequestForm Component', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/tool/1/request');
    });
  
    it('Allows the user to fill out and submit a borrow request', () => {
      cy.get('input[name="duration"]').type('3');
      cy.get('button[type="submit"]').click();
      cy.get('.confirmation').should('contain', 'Request submitted');
    });
  });
  