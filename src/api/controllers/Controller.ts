import { APIRequestContext } from '@playwright/test';

export abstract class Controller {
  protected context: APIRequestContext;
  protected baseUrl: string;

  protected constructor(context: APIRequestContext, baseUrl: string) {
    this.context = context;
    this.baseUrl = baseUrl;
  }
}
