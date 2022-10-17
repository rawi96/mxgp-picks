import { LAYOUT_SELECTOR } from '../cypress/selectors';
import Layout from './Layout';

describe('Layout', () => {
  it('should render navigation properly', () => {
    cy.mount(
      <Layout pathname="/">
        <></>
      </Layout>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
