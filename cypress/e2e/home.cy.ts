import { LAYOUT_SELECTOR } from '../selectors';

describe('/home opens properly', () => {
  beforeEach(() => {
    console.log('test');
    console.log(Cypress.env('CYPRESS_BASE_URL'));
    cy.visit(Cypress.env('CYPRESS_BASE_URL'));
  });

  it('displays layout', () => {
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
