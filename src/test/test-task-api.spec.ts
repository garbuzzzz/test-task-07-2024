import { test, expect } from '@playwright/test';
import {
  AllProductsResponse,
  AllBrandsResponse,
  RegisterUserAccountResponse,
} from 'src/types/typesAPI';

import APIController from 'src/utils/APIController';
import APIHelper from 'src/utils/APIHelper';

test.describe('Feature: Test task API', () => {
  const apiController = new APIController();
  test('API 1: should return Products List', async () => {
    const res = await apiController.getData<AllProductsResponse>(
      'api/productsList'
    );
    expect(res.responseCode).toEqual(200);
    expect(res.products.length).toEqual(34);
    expect(res.products[0].name).toEqual('Blue Top');
    expect(res.products[0].price).toEqual('Rs. 500');
    expect(res.products[0].brand).toEqual('Polo');
  });

  test('API 3: should return Brands List', async () => {
    const res = await apiController.getData<AllBrandsResponse>(
      'api/brandsList'
    );
    expect(res.responseCode).toEqual(200);
    expect(res.brands.length).toEqual(34);
    expect(res.brands[0].brand).toEqual('Polo');
  });

  test('API 11: should Register User Account', async () => {
    const formData = APIHelper.generateDataForUserRegistration();
    const res = await apiController.postData<RegisterUserAccountResponse>(
      'api/createAccount',
      formData
    );
    expect(res.responseCode).toEqual(201);
    expect(res.message).toEqual('User created!');
  });
});
