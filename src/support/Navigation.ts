import { SalesForceClient } from 'src/api/SalesForceClient';
import { Page } from '@playwright/test';
import { LoginDataProvider } from 'src/support/LoginDataProvider';

export default class Navigation {
  salesForceClient?: SalesForceClient;
  accountId: string;
  contactId: string;
  caseId: string;

  constructor(public page: Page, salesforceClient?: SalesForceClient) {
    this.page = page;
    if(salesforceClient) this.salesForceClient = salesforceClient;
    this.accountId = process.env.accountId as string;
    this.contactId = process.env.contactId as string;
    this.caseId = process.env.caseId as string;
  }

  async navigateToCase(
    caseId: string,
  ) {
    await this.page.goto(
      `${LoginDataProvider.getBaseURL()}/lightning/r/Case/${caseId}/view`
    );
  }
  async navigateToAccount(
    AccountId: string,
  ) {
    await this.page.goto(
      `${LoginDataProvider.getBaseURL()}/lightning/r/Account/${AccountId}/view`
    );
  }

  async navigateToAccountListPage() {
    await this.page.goto(
      `${LoginDataProvider.getBaseURL()}/lightning/o/Account/list?filterName=Recent`
    );
  }
}
