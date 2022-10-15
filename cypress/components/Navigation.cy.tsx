import Nav from '../../components/Nav';
import { NAVIGATION_SELECTOR } from '../selectors';

describe('Navigation', () => {
  it('should render navigation properly', () => {
    cy.mount(<Nav />);
    cy.get(NAVIGATION_SELECTOR).should('exist');
  });
});
