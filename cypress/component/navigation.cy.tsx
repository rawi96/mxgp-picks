import { Navigation } from '../../components/navigation';
import { NAVIGATION_SELECTOR } from '../testUtils';

describe('Navigation', () => {
  it('should render navigation properly', () => {
    cy.mount(<Navigation />);
    cy.get(NAVIGATION_SELECTOR).should('exist');
  });
});
