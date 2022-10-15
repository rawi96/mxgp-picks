import { Navigation } from '../../components/Navigation';
import { NAVIGATION_SELECTOR } from '../selectors';

describe('Navigation', () => {
  it('should render navigation properly', () => {
    cy.mount(<Navigation />);
    cy.get(NAVIGATION_SELECTOR).should('exist');
  });
});
