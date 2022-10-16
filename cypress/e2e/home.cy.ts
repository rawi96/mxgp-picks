import { LAYOUT_SELECTOR } from '../selectors';

describe('/home opens properly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays layout', () => {
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
