describe('ToolCard Component', () => {
    beforeEach(() => {
      cy.visit('/tools');
    });
  
    it('Displays tool information correctly', () => {
      cy.get('.tool-card').first().should('contain', 'Hammer').and('contain', '$5');
    });
  
    it('Opens tool details modal on click', () => {
      cy.get('.tool-card').first().click();
      cy.get('.tool-modal').should('be.visible').and('contain', 'Hammer Details');
    });
  });
  