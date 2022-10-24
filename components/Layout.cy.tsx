import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { LAYOUT_SELECTOR } from '../cypress/selectors';
import Layout from './Layout';

const MOCK_SESSION: Session = {
  user: {
    id: '1',
    email: 'john@doe.com',
    username: 'john',
    isAdmin: false,
  },
  expires: '',
};

describe('Layout', () => {
  it('should render navigation properly', () => {
    cy.mount(
      <SessionProvider session={MOCK_SESSION}>
        <Layout>
          <></>
        </Layout>
      </SessionProvider>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
