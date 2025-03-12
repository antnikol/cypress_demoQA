class FormsPage {
  visit() {
    cy.visit('https://demoqa.com/automation-practice-form');
  }

  getFirstNameInput = () => cy.get('#firstName');
  getLastNameInput = () => cy.get('#lastName');
  getEmailInput = () => cy.get('#userEmail');
  getGenderOption = (gender) => cy.contains('.custom-control-label', gender);
  getMobileNumberInput = () => cy.get('#userNumber');
  getDateOfBirthInput = () => cy.get('#dateOfBirthInput');
  getSubjectsInput = () => cy.get('.subjects-auto-complete__input input');
  getHobbiesOption = (hobby) => cy.contains('.custom-control-label', hobby);
  getUploadPictureInput = () => cy.get('input[type="file"]');
  getCurrentAddressInput = () => cy.get('#currentAddress');
  getStateDropdown = () => cy.get('#state');
  getCityDropdown = () => cy.get('#city');
  getSubmitButton = () => cy.get('#submit');
  getSuccessMessage = () => cy.get('.modal-content');

  fillFirstName(firstName) {
    this.getFirstNameInput().type(firstName);
  }

  fillLastName(lastName) {
    this.getLastNameInput().type(lastName);
  }

  fillEmail(email) {
    this.getEmailInput().type(email);
  }

  selectGender(gender) {
    this.getGenderOption(gender).click();
  }

  fillMobileNumber(mobileNumber) {
    this.getMobileNumberInput().type(mobileNumber);
  }

  selectDateOfBirth(date) {
    const [day, month, year] = date.split(' ');
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const fullMonth = months.find(m => m.startsWith(month));
    if (!fullMonth) {
      throw new Error(`Month ${month} is invalid`);
    }
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select(year);
    cy.get('.react-datepicker__month-select').select(fullMonth);
    const formattedDay = day.padStart(3, '0');  
    
    cy.get(`.react-datepicker__day--${formattedDay}`)
      .not('.react-datepicker__day--outside-month')
      .should('be.visible')  
      .click();
  }
  

  fillSubjects(subject) {
    this.getSubjectsInput().type(subject).type('{enter}');
  }

  selectHobby(hobby) {
    this.getHobbiesOption(hobby).click({force: true});
  }

  uploadPicture(filePath) {
    this.getUploadPictureInput().selectFile(filePath);
  }

  fillCurrentAddress(address) {
    this.getCurrentAddressInput().type(address);
  }

  selectStateAndCity(state, city) {
    this.getStateDropdown().click();
    cy.get('#react-select-3-input') 
      .type(state) 
      .wait(500) 
      .type('{enter}'); 
  
    // Вибір міста
    this.getCityDropdown().click(); 
    cy.get('#react-select-4-input')
      .type(city) 
      .wait(500) 
      .type('{enter}'); 
  }

  submitForm() {
    this.getSubmitButton().click();
  }

  checkSuccessMessage() {
    this.getSuccessMessage().should('be.visible');
  }
}

export default FormsPage;
