describe('Navbar Component', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Displays the correct links when the user is logged out', () => {
      cy.get('.navbar').should('contain', 'Login').and('contain', 'Help');
    });
  
    it('Displays user-specific links when the user is logged in', () => {
      // Assuming a command to login has been defined
      cy.login(); 
      cy.get('.navbar').should('contain', 'My Account').and('contain', 'Log Out');
    });
  });
  