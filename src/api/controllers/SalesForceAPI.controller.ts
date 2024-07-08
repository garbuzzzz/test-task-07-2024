import { Controller } from './Controller';
import { APIRequestContext } from '@playwright/test';
import { SalesForceOAuth2Response } from '../../types/types.auth';
import {
  IdStringResponse,
  SOQLResponse,
  SOSLResponse,
  CompositeResponse,
  DefaultBody,
  SObjectType
} from '../../types/types.data';
import { LoginDataProvider } from 'src/support/LoginDataProvider';

/**
 * Class responsible for the operations with SalesForce API
 * */
export class SalesForceAPIController extends Controller {
  constructor(context: APIRequestContext) {
    const url = LoginDataProvider.getBaseURL();
    super(context, `${url}/services`);
  }
  public async authorize() {
    const apiCredentials = LoginDataProvider.getApiCredentials();
    const formData = {
      username: apiCredentials.username,
      password: apiCredentials.password,
      grant_type: apiCredentials.grantType,
      client_id: apiCredentials.clientId,
      client_secret: apiCredentials.clientSecret,
    };
    const body = await this.context
      .post(`${this.baseUrl}/oauth2/token`, {
        headers: {
          cookie:
            'BrowserId=gClRHRzQEe2SFqtNvci-rg; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1; BrowserId=ccB8mB46Ee26xWMSIPgIhw; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
        },
        form: formData,
      })
      .then(async responce => {
        return (await responce.json()) as SalesForceOAuth2Response;
      });
    return body.access_token;
  }

  /**
   * Sends a POST request to create a SalesForce Record
   *
   * @param authToken - authorization token.
   * @param recordType - type of the record to create (i.e. Case, Call_Log__c, Member_Document__c etc.)
   * @param bodyData - body with the record's necessary fields and values to create it.
   * */
  public async createRecord(
    authToken: string,
    recordType: string,
    bodyData: DefaultBody
  ) {
    return await this.context
      .post(`${this.baseUrl}/data/v55.0/sobjects/${recordType}`, {
        headers: {
          Authorization: 'Bearer ' + authToken,
          'Content-Type': 'application/json',
        },
        data: bodyData,
      })
      .then(async responce => {
        return (await responce.json()) as IdStringResponse;
      });
  }

  /**
   * Sends a DELETE request to delete a SalesForce Record
   *
   * @param authToken - authorization token.
   * @param recordType - type of the record to create (i.e. Case, Call_Log__c, Member_Document__c etc.)
   * @param recordId - internal SalesForce ID of the record to delete.
   * */
  public async deleteRecord(
    authToken: string,
    recordType: string,
    recordId: string
  ) {
    const body = await this.context.delete(
      `${this.baseUrl}/data/v55.0/sobjects/${recordType}/` + recordId,
      {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      }
    );
    return body.ok();
  }

  /**
   * Sends a GET request to org to retrieve all records to retrieve all records that match the SOQL query criteria
   * https://developer.salesforce.com/docs/atlas.en-us.244.0.apexcode.meta/apexcode/langCon_apex_SOQL.htm
   *
   * @param authToken - authorization token.
   * @param query - SOQL query. Example: "SELECT Id, Name FROM Opportunity order by lastmodifieddate DESC"
   * */
  public async getRecordBySOQL(authToken: string, query: string) {
    query = query.replace(' ', '+');
    const body = await this.context
      .get(`${this.baseUrl}/data/v55.0/query/?q=${query}`, {
        headers: {
          Authorization: 'Bearer ' + authToken,
          'Content-Type': 'application/json',
        },
      })
      .then(async responce => {
        return (await responce.json()) as SOQLResponse;
      });
    return body;
  }

  /**
   * Sends a GET request to org to retrieve all records to retrieve all records that match the SOQL query criteria
   * https://developer.salesforce.com/docs/atlas.en-us.244.0.apexcode.meta/apexcode/langCon_apex_SOQL.htm
   * https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_sosl
   *
   * @param authToken - authorization token.
   * @param query - SOSL query. Example: "FIND {Test Automation 323} IN ALL FIELDS RETURNING Account, Contact, Opportunity (Id, Type, StageName), Lead"
   * */
  public async getRecordBySOSL(authToken: string, query: string) {
    query = query.replace(' ', '+');
    const body = await this.context
      .get(`${this.baseUrl}/data/v55.0/search/?q=${query}`, {
        headers: {
          Authorization: 'Bearer ' + authToken,
          'Content-Type': 'application/json',
        },
      })
      .then(async responce => {
        return (await responce.json()) as SOSLResponse;
      });
    return body;
  }

  async updateSObject<Body extends Partial<SObjectType>>(
    authToken: string,
    sObjectType: SObjectType,
    sObjectId: string,
    body: Body
  ) {
    try {
      return await this.context.patch(
        `${this.baseUrl}/data/v55.0/sobjects/${sObjectType}/${sObjectId}`,
        {
          headers: {
            Authorization: 'Bearer ' + authToken,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(body),
        }
      );
    } catch (e) {
      throw e;
    }
  }

  public async makeCompositeRequest(authToken: string, bodyData: string) {
    return await this.context
      .post(`${this.baseUrl}/data/v55.0/composite`, {
        headers: {
          Authorization: 'Bearer ' + authToken,
          'Content-Type': 'application/json',
        },
        data: bodyData,
      })
      .then(async responce => {
        return (await responce.json()) as CompositeResponse;
      })
      .catch(() => {
        throw new Error(
          'Something went wrong, please check the data of request'
        );
      });
  }
}
