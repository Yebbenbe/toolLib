describe('AccountProfile Component', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/profile');
    });
  
    it('Displays user profile information', () => {
      cy.get('.profile').should('contain', 'Username').and('contain', 'Email');
    });
  
    it('Allows the user to edit their profile', () => {
      cy.get('button.edit-profile').click();
      cy.get('input[name="username"]').clear().type('NewUsername');
      cy.get('form').submit();
      cy.get('.profile').should('contain', 'NewUsername');
    });
  });
  