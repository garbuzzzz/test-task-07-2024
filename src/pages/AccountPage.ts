/* eslint-disable max-len */
import { Page, Locator } from '@playwright/test';
import Navigation from 'src/support/Navigation';
import { EnvPropsProvider } from 'src/support/EnvPropsProvider';
import AccountEditPage from './AccountEditPage';
import ContactEditPage from './ContactEditPage';
import ToastMessage from './components/ToastMessage';

export default class AccountPage {
  editButton: Locator;
  navigation: Navigation;
  accountEditPage: AccountEditPage;
  contactEditPage: ContactEditPage;
  newContactButton: Locator;
  toastMessage: ToastMessage;

  constructor(public page: Page) {
    this.page = page;
    this.navigation = new Navigation(page);
    this.accountEditPage = new AccountEditPage(page);
    this.contactEditPage = new ContactEditPage(page);
    this.toastMessage = new ToastMessage(page);
    this.editButton = page.getByRole('button', { name: 'Edit', exact: true });
    this.newContactButton = page.getByLabel('Contacts').getByRole('button', { name: 'New' });
  }

  async openEditMode() {
    await this.editButton.click();
    await this.accountEditPage.accountNameInput.waitFor({
      state: 'visible',
      timeout: EnvPropsProvider.getDefaultTimeouts()._15sec,
    });
  }

  async openNewContactModal() {
    await this.newContactButton.click();
    await this.contactEditPage.contactLastNameInput.waitFor({
      state: 'visible',
      timeout: EnvPropsProvider.getDefaultTimeouts()._15sec,
    });
  }
  async createNewContact(contactLastName: string) {
    await this.openNewContactModal();
    await this.contactEditPage.populateContactLastName(contactLastName);
    await this.contactEditPage.save();
    await this.toastMessage.verifySuccessfulToastMessage('was created.');
  }
}
