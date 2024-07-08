import { Page, Locator } from '@playwright/test';
import Navigation from 'src/support/Navigation';
import { EnvPropsProvider } from 'src/support/EnvPropsProvider';
import ToastMessage from './components/ToastMessage';
import AccountEditPage from './AccountEditPage';

export default class AccountListPage {
  newButton: Locator;
  navigation: Navigation;
  toastMessage: ToastMessage;
  accountEditPage: AccountEditPage;

  constructor(public page: Page) {
    this.page = page;
    this.navigation = new Navigation(page);
    this.newButton = page.getByRole('button', { name: 'New' });
    this.toastMessage = new ToastMessage(page);
    this.accountEditPage = new AccountEditPage(page);
  }

  async createNewAccount(accountName: string) {
    await this.openNewAccountForm();
    await this.accountEditPage.populateAccountName(accountName);
    await this.accountEditPage.save();
    await this.toastMessage.verifySuccessfulToastMessage('was created.');
  }

  async openNewAccountForm() {
    await this.newButton.waitFor({
      state: 'visible',
      timeout: EnvPropsProvider.getDefaultTimeouts()._15sec,
    });
    await this.newButton.click();
    await this.accountEditPage.accountNameInput.waitFor({
      state: 'visible',
      timeout: EnvPropsProvider.getDefaultTimeouts()._15sec,
    });
  }
}
