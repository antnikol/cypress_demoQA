/// <reference types="cypress" />

import FormsPage from '../pageObjects/FormsPage';
import text from "../fixtures/text.json"
import genUser from "../fixtures/genUser"

const formsPage = new FormsPage()

const browserName = Cypress.browser.name
const browserVersion = Cypress.browser.version

const user = genUser.userTestData()


describe(`${browserName}. Tests for the sections: Sign Up, Login`, ()=> {

  it('TC_001: Successful Registration with Valid Data', () => {
    const birthDate = `${user.birth_date} ${user.birth_month} ${user.birth_year}`
    const formattedBirthDate = `${user.birth_date.padStart(2, '0')} ${user.birth_month},${user.birth_year}`

    formsPage.fillFirstName(user.firstname);
    formsPage.fillLastName(user.lastname);
    formsPage.fillEmail(user.email);
    formsPage.selectGender(text.Gender[0]);
    formsPage.fillMobileNumber(text.MobilePhone[0]);
    formsPage.selectDateOfBirth(birthDate);
    formsPage.fillSubjects(text.Subjects[0]);
    formsPage.selectHobby(text.Hobbies[0]);
    formsPage.uploadPicture('cypress/fixtures/profile.jpg');
    formsPage.fillCurrentAddress(user.address1);
    formsPage.selectStateAndCity(text.State[0], text.City[0]);
    formsPage.submitForm();
    formsPage.checkSuccessMessage();

    cy.get('.modal-body').within(() => {
      cy.contains('td', 'Student Name').next().should('have.text', user.firstname + ' ' + user.lastname);
      cy.contains('td', 'Student Email').next().should('have.text', user.email);
      cy.contains('td', 'Gender').next().should('have.text', text.Gender[0]);
      cy.contains('td', 'Mobile').next().should('have.text', text.MobilePhone[0]);
      cy.contains('td', 'Date of Birth').next().should('have.text', formattedBirthDate);
      cy.contains('td', 'Subjects').next().should('have.text', text.Subjects[0]);
      cy.contains('td', 'Hobbies').next().should('have.text', text.Hobbies[0]);
      cy.contains('td', 'Picture').next().should('have.text', 'profile.jpg');
      cy.contains('td', 'Address').next().should('have.text', user.address1);
      cy.contains('td', 'State and City').next().should('have.text', text.State[0] +" " + text.City[0]);
    });
  });

  it('TC_002: Submission with Minimum Valid Input Values', () => {
    formsPage.fillFirstName(user.firstname);
    formsPage.fillLastName(user.lastname);
    formsPage.selectGender(text.Gender[1]);
    formsPage.fillMobileNumber(text.MobilePhone[0]);
    formsPage.submitForm();
    formsPage.checkSuccessMessage();

    cy.get('.modal-body').within(() => {
      cy.contains('td', 'Student Name').next().should('have.text', user.firstname + ' ' + user.lastname);
      cy.contains('td', 'Gender').next().should('have.text', text.Gender[1]);
      cy.contains('td', 'Mobile').next().should('have.text', text.MobilePhone[0]);
    })
  });

})