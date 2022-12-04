import Login from '../../src/components/Login';
import { LOGIN_SELECTOR, TYPE_SUBMIT_SELECTOR } from '../support/selectors';

describe('Login', () => {
  it('should render login properly', () => {
    cy.mount(<Login />);
    cy.get(LOGIN_SELECTOR).should('exist');
    cy.get(TYPE_SUBMIT_SELECTOR).should('exist');
  });

  it('should check if the fields are filled out', () => {
    cy.mount(<Login />);
    cy.get(LOGIN_SELECTOR).should('exist');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.get(LOGIN_SELECTOR).contains('Email is required!');
    cy.get(LOGIN_SELECTOR).contains('Password is required!');
  });

  it('should do a get request when submit', () => {
    cy.intercept('GET', '*', {}).as('login');
    cy.mount(<Login />);
    cy.get(LOGIN_SELECTOR).should('exist');
    cy.get(LOGIN_SELECTOR).contains('Email').type('myEmail');
    cy.get(LOGIN_SELECTOR).contains('Password').type('myPassword');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.wait('@login');
  });
});
