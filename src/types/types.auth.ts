export interface UserCredentials {
  username: string;
  password: string;
}
export interface ApiUserCredentials {
  username: string;
  password: string;
  grantType: string;
  clientId: string;
  clientSecret: string;
}
export interface SalesForceOAuth2Response {
  access_token: string;
}
