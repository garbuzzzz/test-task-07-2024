import { faker } from '@faker-js/faker';

export default class APIHelper {
  /**
   * Generates random data for user registration in URLSearchParams format
   * */
  static generateDataForUserRegistration() {
    const formData = new URLSearchParams();
    formData.append('name', faker.internet.userName());
    formData.append('email', faker.internet.email());
    formData.append('password', faker.internet.password());
    formData.append('title', 'Mr');
    formData.append('birth_day', '29');
    formData.append('birth_month', '02');
    formData.append('birth_year', '1999');
    formData.append('firstname', faker.name.firstName());
    formData.append('lastname', faker.name.lastName());
    formData.append('company', faker.lorem.sentence(2));
    formData.append('address1', faker.address.streetAddress());
    formData.append('address2', '');
    formData.append('country', faker.address.country());
    formData.append('state', faker.address.state());
    formData.append('city', faker.address.city());
    formData.append('zipcode', faker.address.zipCode());
    formData.append('mobile_number', faker.phone.number());

    return formData;
  }
}
