import SignUp from '../../src/components/SignUp';
import { SIGN_UP_SELECTOR, TYPE_SUBMIT_SELECTOR } from '../support/selectors';

describe('Sign Up', () => {
  it('should render sign up form properly', () => {
    cy.mount(<SignUp />);
    cy.get(SIGN_UP_SELECTOR).should('exist');
    cy.get(TYPE_SUBMIT_SELECTOR).should('exist');
  });

  it('should check if the fields are filled out', () => {
    cy.mount(<SignUp />);
    cy.get(SIGN_UP_SELECTOR).should('exist');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.get(SIGN_UP_SELECTOR).contains('Email is required!');
    cy.get(SIGN_UP_SELECTOR).contains('Username is required!');
    cy.get(SIGN_UP_SELECTOR).contains('Password is required!');
    cy.get(SIGN_UP_SELECTOR).contains('Password confirmation is required!');
  });

  it('should check if the email is valid', () => {
    cy.mount(<SignUp />);
    cy.get(SIGN_UP_SELECTOR).should('exist');
    cy.get(SIGN_UP_SELECTOR).contains('Email').type('myEmail');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.get(SIGN_UP_SELECTOR).contains('Email has invalid format!');
  });

  it('should check if the password is valid', () => {
    cy.mount(<SignUp />);
    cy.get(SIGN_UP_SELECTOR).should('exist');
    cy.get(SIGN_UP_SELECTOR).contains('Password').type('myPassword');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.get(SIGN_UP_SELECTOR).contains(
      'Password must contain minimum 6 and at least one numeric digit, one uppercase and one lowercase letter!'
    );
  });

  it('should check if the password confirmation is valid', () => {
    cy.mount(<SignUp />);
    cy.get(SIGN_UP_SELECTOR).should('exist');
    cy.get(SIGN_UP_SELECTOR).contains('Password').type('myPassword');
    cy.get('#confirmPassword').type('myOtherPassword');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.get(SIGN_UP_SELECTOR).contains('Passwords should match!');
  });

  it('should do a post request when submit', () => {
    cy.intercept('POST', '*', {}).as('signUp');
    cy.mount(<SignUp />);
    cy.get(SIGN_UP_SELECTOR).should('exist');
    cy.get(SIGN_UP_SELECTOR).contains('Email').type('test@email.com');
    cy.get(SIGN_UP_SELECTOR).contains('Username').type('myUsername');
    cy.get(SIGN_UP_SELECTOR).contains('Password').type('98t3q89eGEargRREGQ*ç');
    cy.get('#confirmPassword').type('98t3q89eGEargRREGQ*ç');
    cy.get(TYPE_SUBMIT_SELECTOR).click();
    cy.wait('@signUp');
  });
});
