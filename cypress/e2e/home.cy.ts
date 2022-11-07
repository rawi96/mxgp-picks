import { LAYOUT_SELECTOR } from '../selectors';

describe('/home opens properly', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}`);
  });

  it('displays layout', () => {
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
