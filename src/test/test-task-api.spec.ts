import { test, expect } from '@playwright/test';
import {
  AllProductsResponse,
  AllBrandsResponse,
  RegisterUserAccountResponse,
} from 'src/types/typesAPI';
import { faker } from '@faker-js/faker';

test.describe('Feature: Test task API', () => {
  test('API 1: should return Products List', async ({ request }) => {
    const res = await request.get('api/productsList');
    const body = (await res.json()) as AllProductsResponse;
    expect(body.responseCode).toEqual(200);
    expect(body.products.length).toEqual(34);
    expect(body.products[0].name).toEqual('Blue Top');
    expect(body.products[0].price).toEqual('Rs. 500');
    expect(body.products[0].brand).toEqual('Polo');
  });

  test('API 3: should return Brands List', async ({ request }) => {
    const res = await request.get('api/brandsList');
    const body = (await res.json()) as AllBrandsResponse;
    expect(body.responseCode).toEqual(200);
    expect(body.brands.length).toEqual(34);
    expect(body.brands[0].brand).toEqual('Polo');
  });

  test('API 11: should Register User Account', async ({ request }) => {
    const payload = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      title: 'Mr',
      birth_date: '29',
      birth_month: '02',
      birth_year: '1999',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      company: faker.lorem.sentence(2),
      address1: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      country: faker.address.country(),
      zipcode: faker.address.zipCode(),
      state: faker.address.state(),
      city: faker.address.city(),
      mobile_number: faker.phone.number(),
    };

    const res = await request.post('api/createAccount', { data: payload });
    const body = (await res.json()) as RegisterUserAccountResponse;

    expect(body.responseCode).toEqual(201);
    expect(body.message).toEqual('User created!');
  });
});
