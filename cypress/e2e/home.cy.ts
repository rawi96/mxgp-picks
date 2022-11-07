import { LAYOUT_SELECTOR } from '../selectors';

describe('/home opens properly', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays layout', () => {
    cy.get(LAYOUT_SELECTOR).should('not.exist');
  });
});
