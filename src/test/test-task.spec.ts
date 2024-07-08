import { test } from 'src/support/fixtures/fixture';
import AccountListPage from 'src/pages/AccountListPage';
import AccountEditPage from 'src/pages/AccountEditPage';
import Navigation from 'src/support/Navigation';
import randomstring from 'randomstring';
import AccountPage from 'src/pages/AccountPage';
import ToastMessage from 'src/pages/components/ToastMessage';
const prefix = process.env.PREFIX as string;

let navigation: Navigation;
let accountListPage: AccountListPage;
let accountEditPage: AccountEditPage;
let accountPage: AccountPage;
let toastMessage: ToastMessage;

test.setTimeout(120000);

test.describe('Feature: Test task', () => {
  test.beforeEach(({ page, salesForceClient }) => {
    accountListPage = new AccountListPage(page);
    navigation = new Navigation(page, salesForceClient);
    accountEditPage = new AccountEditPage(page);
    accountPage = new AccountPage(page);
    toastMessage = new ToastMessage(page);
  });

  test('Create a new account', async () => {
    await navigation.navigateToAccountListPage();
    await accountListPage.createNewAccount(prefix + '_' + randomstring.generate(10));
  });

  test('Verify account name is required while creating account', async () => {
    await navigation.navigateToAccountListPage();
    await accountListPage.openNewAccountForm();
    await accountEditPage.save();
    await accountEditPage.verifyValidationErrorDisplays('We hit a snag.');
  });

  test('Update account name from account record page', async ({ salesForceClient }) => {
    const accountId = await salesForceClient.seedAccount();
    await navigation.navigateToAccount(accountId);
    await accountPage.openEditMode();
    await accountEditPage.populateAccountName(prefix + '_' + randomstring.generate(10));
    await accountEditPage.save();
    await toastMessage.verifySuccessfulToastMessage('was saved.');
  });

  test('Create a new contact record from an account record', async ({ salesForceClient }) => {
    const accountId = await salesForceClient.seedAccount();
    await navigation.navigateToAccount(accountId);
    await accountPage.createNewContact(prefix + '_' + randomstring.generate(10));
  });

  test.afterEach(async ({ context }) => {
    await context.close();
  });
  test.afterAll(async ({ browser, request }) => {
    await request.dispose();
    await browser.close();
  });

});
