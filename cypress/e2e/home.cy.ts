import { LAYOUT_SELECTOR } from '../selectors';

describe(
  '/home opens properly',
  {
    env: {
      baseUrl: 'http://localhost:3000/',
    },
  },
  () => {
    beforeEach(() => {
      cy.visit(`${Cypress.env('baseUrl')}`);
    });

    it('displays layout', () => {
      cy.get(LAYOUT_SELECTOR).should('exist');
    });
  }
);
