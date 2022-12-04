import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Layout from '../../src/components/Layout';
import { LAYOUT_SELECTOR } from '../support/selectors';

const SESSION: Session = {
  user: {
    id: '1',
    email: 'john@doe.com',
    username: 'john',
    isAdmin: true,
    isVerified: true,
    score: 0,
    scorePerRace: null,
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

  it('should render navigation items for a verified admin properly', () => {
    cy.mount(
      <SessionProvider session={SESSION}>
        <Layout>
          <></>
        </Layout>
      </SessionProvider>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Home').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Rules').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Ranking').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Admin').should('exist');
  });

  it('should render navigation items for a verified (non admin) user properly', () => {
    cy.mount(
      <SessionProvider session={{ ...SESSION, user: { ...SESSION.user, isAdmin: false } }}>
        <Layout>
          <></>
        </Layout>
      </SessionProvider>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Home').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Rules').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Ranking').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Admin').should('not.exist');
  });

  it('should render navigation items for an unverified user properly', () => {
    cy.mount(
      <SessionProvider session={{ ...SESSION, user: { ...SESSION.user, isVerified: false } }}>
        <Layout>
          <></>
        </Layout>
      </SessionProvider>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Home').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Rules').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Ranking').should('exist');

    cy.get(LAYOUT_SELECTOR).contains('Unverified Account!').should('exist');
  });

  it('should render navigation items for an unauthenticated user properly', () => {
    cy.mount(
      <SessionProvider session={null}>
        <Layout>
          <></>
        </Layout>
      </SessionProvider>
    );
    cy.get(LAYOUT_SELECTOR).should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Home').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Rules').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Ranking').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Login').should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Sign up').should('exist');
  });
});
