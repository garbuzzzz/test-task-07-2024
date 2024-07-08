import { CompositeRequestBuilder } from './CompositeRequestBuilder';
import { SalesForceAPIController } from 'src/api/controllers/SalesForceAPI.controller';
import { APIRequestContext } from '@playwright/test';
import {
  CompositeResponse,
  SObjectType,
  DefaultBody
} from 'src/types/types.data';

export class CompositeRequestHandler {
  private compositeRequestBuilder: CompositeRequestBuilder;
  private salesForceAPIController: SalesForceAPIController;
  private authToken: string;
  constructor(context: APIRequestContext) {
    this.salesForceAPIController = new SalesForceAPIController(context);
    this.compositeRequestBuilder = new CompositeRequestBuilder().setDefaults();
    this.authToken = '';
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }
  async sendCompositeRequest() {
    const data = JSON.stringify(this.compositeRequestBuilder.build());
    try {
      return await this.salesForceAPIController.makeCompositeRequest(
        this.authToken,
        data
      );
    } catch (error) {
      throw error;
    }
  }
  addPOSTSubrequest(
    recordType: SObjectType,
    body: DefaultBody,
    refId: string
  ) {
    this.compositeRequestBuilder.addSubrequest('POST', {
      method: 'POST',
      url: `${'/services/data/v55.0/sobjects/'}${recordType}`,
      referenceId: refId,
      body: body,
    });
    return this;
  }

  addPATCHSubrequest(
    recordType: SObjectType,
    recordId: string,
    body: DefaultBody,
    refId: string
  ) {
    this.compositeRequestBuilder.addSubrequest('PATCH', {
      method: 'PATCH',
      url: `${'/services/data/v55.0/sobjects/'}${recordType}/${recordId}`,
      referenceId: refId,
      body: body,
    });
    return this;
  }

  addPUTSubrequest(
    recordType: SObjectType,
    body: DefaultBody,
    refId: string
  ) {
    this.compositeRequestBuilder.addSubrequest('PUT', {
      method: 'PUT',
      url: `${'/services/data/v55.0/sobjects/'}${recordType}`,
      referenceId: refId,
      body: body,
    });
    return this;
  }

  addGETByIdSubrequest(
    recordType: SObjectType,
    recordId: string,
    refId: string
  ) {
    this.compositeRequestBuilder.addSubrequest('GET', {
      method: 'GET',
      url: `${'/services/data/v55.0/sobjects/'}${recordType}/${recordId}`,
      referenceId: refId,
    });
    return this;
  }

  addGETBySOQLSubrequest(soqlQuery: string, refId: string) {
    soqlQuery = soqlQuery.replaceAll(' ', '+');
    this.compositeRequestBuilder.addSubrequest('GET', {
      method: 'GET',
      url: `/services/data/v55.0/query/?q=${soqlQuery}`,
      referenceId: refId,
    });
    return this;
  }

  getNonNullRecordIdByReference(
    response: CompositeResponse,
    referenceId: string
  ) {
    const value = response.compositeResponse.find(item => {
      return item.referenceId.includes(referenceId);
    });

    if (!value)
      throw new Error(
        `Sorry. Seems like record with RefId "${referenceId}" doesn't have an Id in response.`
      );
    if (value.body.id === undefined) {
      return value.body.records[0].Id;
    }
    return value.body.id;
  }
}
