import {
  APIResponse,
  APIRequestContext,
  request as playwrightRequest,
} from '@playwright/test';

export default class APIController {
  private request!: APIRequestContext;
  /**
   * Initializes the request context
   */
  private async init() {
    this.request = await playwrightRequest.newContext();
  }

  /**
   * Sends a GET request to a given URL
   * @param { string } slug - sends GET request to given URL
   * */
  async getData<T>(slug: string): Promise<T> {
    if (!this.request) await this.init();
    const response: APIResponse = await this.request.get(slug);
    const data: T = (await response.json()) as T;
    return data;
  }

  /**
   * Sends a POST request to a given URL
   *
   * @param { string } slug - sends GET request to given URL
   * @param { URLSearchParams } data - data in URLSearchParams format
   * */
  async postData<T>(slug: string, data: URLSearchParams): Promise<T> {
    if (!this.request) await this.init();
    const res = await this.request.post(slug, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data.toString(),
    });
    const body: T = (await res.json()) as T;
    return body;
  }
}
