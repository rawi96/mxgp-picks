import { LAYOUT_SELECTOR } from '../selectors';

describe('/home opens properly', () => {
  beforeEach(() => {
    console.log('test');
    console.log('/');
    cy.visit('/');
  });

  it('displays layout', () => {
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
