import { SalesForceClient } from 'src/api/SalesForceClient';
import { request, APIRequestContext } from '@playwright/test';

async function globalSetup() {
  const getAuthenticatedSalesforceClient = async function () {
    const apiRequestContext: APIRequestContext = await request.newContext();
    const salesForceClient = new SalesForceClient(apiRequestContext);
    await salesForceClient.authorize();
    return salesForceClient;
  };

  const salesAppId = await (
    await getAuthenticatedSalesforceClient()
  ).getAppIdByDeveloperName('LightningSales');
  process.env.salesAppId = salesAppId;
}

export default globalSetup;
