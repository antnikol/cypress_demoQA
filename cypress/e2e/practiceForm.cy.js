/// <reference types="cypress" />

import FormsPage from '../pageObjects/FormsPage';
import text from "../fixtures/text.json"
import genUser from "../fixtures/genUser"

const formsPage = new FormsPage()

const browserName = Cypress.browser.name
const browserVersion = Cypress.browser.version

const user = genUser.userTestData()


describe(`${browserName}. Tests for the sections: Sign Up, Login`, ()=> {

  it.only('TC_001: Successful Registration with Valid Data', () => {
    formsPage.fillFirstName(user.name);
    formsPage.fillLastName(user.lastname);
    formsPage.fillEmail(user.email);
    formsPage.selectGender('Male');
    formsPage.fillMobileNumber('0987654321');
    formsPage.selectDateOfBirth('10 Mar 2025');
    formsPage.fillSubjects('Mathematics');
    formsPage.selectHobby('Reading');
    formsPage.uploadPicture('cypress/fixtures/profile.jpg');
    formsPage.fillCurrentAddress('Kyiv, Shevchenka St., 12');
    formsPage.selectStateAndCity('NCR', 'Delhi');
    formsPage.submitForm();
    formsPage.checkSuccessMessage();

    cy.get('.modal-body').within(() => {
      cy.contains('td', 'Student Name').next().should('have.text', 'Ivan Petrenko');
      cy.contains('td', 'Student Email').next().should('have.text', 'ivan.petrenko@example.com');
      cy.contains('td', 'Gender').next().should('have.text', 'Male');
      cy.contains('td', 'Mobile').next().should('have.text', '0987654321');
      cy.contains('td', 'Date of Birth').next().should('have.text', '10 March,2025');
      cy.contains('td', 'Subjects').next().should('have.text', 'Mathematics');
      cy.contains('td', 'Hobbies').next().should('have.text', 'Reading');
      cy.contains('td', 'Picture').next().should('have.text', 'profile.jpg');
      cy.contains('td', 'Address').next().should('have.text', 'Kyiv, Shevchenka St., 12');
      cy.contains('td', 'State and City').next().should('have.text', 'NCR Delhi');
    });
  });

  it('TC_002: Submission with Minimum Valid Input Values', () => {
    formsPage.fillFirstName('J');
    formsPage.fillLastName('D');
    formsPage.selectGender('Female');
    formsPage.fillMobileNumber('1234567890');
    formsPage.submitForm();
    formsPage.checkSuccessMessage();

    cy.get('.modal-body').within(() => {
      cy.contains('td', 'Student Name').next().should('have.text', 'J D');
      cy.contains('td', 'Gender').next().should('have.text', 'Female');
      cy.contains('td', 'Mobile').next().should('have.text', '1234567890');
    })
  });

})