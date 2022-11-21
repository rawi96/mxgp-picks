import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Layout from '../../src/components/Layout';
import { LAYOUT_SELECTOR } from '../selectors';

const SESSION: Session = {
  user: {
    id: '1',
    email: 'john@doe.com',
    username: 'john',
    isAdmin: false,
    isVerified: true,
    score: 0,
  },
  expires: '',
};

describe('Layout', () => {
  it('should render navigation properly', () => {
    cy.mount(
      <SessionProvider session={SESSION}>
        <Layout>
          <></>
        </Layout>
      </SessionProvider>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
  });
});
