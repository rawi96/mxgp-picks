import { NAVIGATION_SELECTOR } from '../cypress/selectors';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('should render navigation properly', () => {
    cy.mount(<Navigation />);
    cy.get(NAVIGATION_SELECTOR).should('exist');
  });
});
