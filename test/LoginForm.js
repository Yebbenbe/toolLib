describe('LoginForm Component', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('Allows the user to type and submit the form', () => {
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('password123{enter}');
      cy.url().should('include', '/dashboard');
    });
  
    it('Shows an error message on failed login', () => {
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('wrongpassword{enter}');
      cy.get('.error').should('contain', 'Login failed');
    });
  });
  