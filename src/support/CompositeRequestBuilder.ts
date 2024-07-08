import { CompositeRequestBody, CompositeSubrequestMethod, BaseCompositeRequestItem } from 'src/types/types.data';

export class CompositeRequestBuilder {
  private composite: CompositeRequestBody = {
    allOrNone: true,
    collateSubrequests: true,
    compositeRequest: [],
  };

  setDefaults() {
    this.composite = {
      allOrNone: true,
      collateSubrequests: false,
      compositeRequest: [],
    };
    return this;
  }

  addSubrequest<
    M extends CompositeSubrequestMethod,
    T extends BaseCompositeRequestItem<M>
  >(method: M, subrequestBody: T) {
    subrequestBody.method = method;
    this.composite.compositeRequest.push({
      ...subrequestBody,
    });
    return this;
  }

  build() {
    const dataToBuild = this.composite;
    this.setDefaults();
    return dataToBuild;
  }
}
