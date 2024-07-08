export type SObjectType = 'Account' | 'Contact' | 'Case'

export interface IdStringResponse {
  id: string;
}

export interface SOQLResponse {
  totalSize: number;
  done: boolean;
  records: QueryResponseRecordAttributes[];
}

export interface SOSLResponse {
  searchRecords: QueryResponseRecordAttributes[];
}

export interface DefaultBody {
  Name?: string
}
export interface QueryResponseRecordAttributes {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  DurableId?: string;
}

export type CompositeSubrequestMethod =
  | 'GET'
  | 'POST'
  | 'PATCH'
  | 'PUT'
  | 'DELETE';

export interface CompositeRequestBody {
  allOrNone: boolean;
  collateSubrequests: boolean;
  compositeRequest: Array<BaseCompositeRequestItem<CompositeSubrequestMethod>>;
}

export interface BaseCompositeRequestItem<T extends CompositeSubrequestMethod> {
  method: T;
  url: string;
  referenceId: string;
}

export interface CompositeResponse {
  compositeResponse: Array<CompositeResponseItem>;
}

export interface CompositeResponseItem {
  body: CompositeItemBodyResponse;
  httpHeaders: string;
  httpStatusCode: number;
  referenceId: string;
}

export interface CompositeItemBodyResponse {
  id: string;
  records: Array<Record>;
}

export interface Record {
  Id: string;
}
