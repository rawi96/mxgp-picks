import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { LAYOUT_SELECTOR } from '../cypress/selectors';
import Layout from './Layout';

const MOCK_SESSION: Session = {
  user: {
    name: 'John Doe',
    email: '',
  },
  expires: '',
};

describe('Layout', () => {
  it('should render navigation properly', () => {
    cy.mount(
      <SessionProvider session={MOCK_SESSION}>
        <Layout pathname="/">
          <></>
        </Layout>
      </SessionProvider>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
