import { faker } from "@faker-js/faker";

module.exports = {
  userTestData: function () {
    let User = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      incorrectPassword: faker.internet.password(),
      title: ['Mr'][faker.number.int({ min: 0, max: 0 })],
      birth_date: faker.number.int({ min: 1, max: 31 }).toString(),
      birth_month: faker.date.month(),
      birth_year: faker.number.int({ min: 1900, max: 2024 }).toString(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      subject: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country:['Canada', 'United States', 'Israel', 'India', 'Australia', 'New Zealand', 'Singapore'][faker.number.int({ min: 0, max: 6 })],
      zipcode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.phone.number({ style: 'international' })
    }
    return User
  }
}