import { request, APIRequestContext, test as baseTest } from '@playwright/test';
import { SalesForceClient } from 'src/api/SalesForceClient';
type salesForceClientType = {
  salesForceClient: SalesForceClient;
};

let salesForceClient: SalesForceClient;
let authClient: SalesForceClient;
let isSalesForceClientAuthenticated = false;

const getAuthenticatedSalesforceClient = async function () {
  const apiRequestContext: APIRequestContext = await request.newContext();
  salesForceClient = new SalesForceClient(apiRequestContext);
  await salesForceClient.authorize();
  return salesForceClient;
};

const fixture = baseTest.extend<salesForceClientType>({
  salesForceClient: async ({}, use) => {
    if (!isSalesForceClientAuthenticated) {
      authClient = await getAuthenticatedSalesforceClient();
      isSalesForceClientAuthenticated = true;
    }
    await use(authClient);
  },
});

export const test = fixture;
export const expect = fixture.expect;
