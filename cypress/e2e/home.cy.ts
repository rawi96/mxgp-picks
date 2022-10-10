import { NAVIGATION_SELECTOR } from '../testUtils';

describe('/home opens properly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays navigation', () => {
    cy.get(NAVIGATION_SELECTOR).should('exist');
  });
});
