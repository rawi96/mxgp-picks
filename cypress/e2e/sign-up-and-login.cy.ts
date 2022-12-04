import { v4 as uuidv4 } from 'uuid';
import { LAYOUT_SELECTOR, LOGIN_SELECTOR, SIGN_UP_SELECTOR, TYPE_SUBMIT_SELECTOR } from '../support/selectors';

const randomId = uuidv4();

describe('/sign up and login properly', () => {
  it('should sign up and login a user', () => {
    cy.visit(`${Cypress.env('baseUrl')}`);
    cy.get(LAYOUT_SELECTOR).should('exist');
    cy.get(LAYOUT_SELECTOR).contains('Sign up').should('exist');
    cy.get(SIGN_UP_SELECTOR).should('not.exist');
    cy.get(LAYOUT_SELECTOR).contains('Sign up').click();
    cy.get(SIGN_UP_SELECTOR).should('exist');
    cy.get(SIGN_UP_SELECTOR).contains('Email').type(`${randomId}@email.com`);
    cy.get(SIGN_UP_SELECTOR).contains('Username').type(`user#${randomId}`);
    cy.get(SIGN_UP_SELECTOR).contains('Password').type('98t3q89eGEargRREGQ*ç');
    cy.get('#confirmPassword').type('98t3q89eGEargRREGQ*ç');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.get(SIGN_UP_SELECTOR).should('not.exist');
    cy.get(LOGIN_SELECTOR).should('exist');
    cy.get(LOGIN_SELECTOR).contains('Email').type(`${randomId}@email.com`);
    cy.get(LOGIN_SELECTOR).contains('Password').type('98t3q89eGEargRREGQ*ç');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.get(LOGIN_SELECTOR).should('not.exist');
    cy.get(LAYOUT_SELECTOR).contains('Unverified Account!').should('exist');
  });
});
