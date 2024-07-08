import { EnvPropsProvider } from './EnvPropsProvider';
import { UserCredentials, ApiUserCredentials } from 'src/types/types.auth';

export class LoginDataProvider {
  static getBaseURL() {
    const passedOrg = EnvPropsProvider.getEnvProp('org');
    const baseUrlEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_BASE_URL`
    );
    if (passedOrg && baseUrlEnvVariable) {
      return baseUrlEnvVariable;
    } else {
      throw new Error(`Can't find URL for Org with name ${passedOrg}
      Suitable app names are:
      - QA
      `);
    }
  }

  static getCredentials(): UserCredentials {
    const passedOrg = EnvPropsProvider.getEnvProp('org');
    const usernameEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_USERNAME`
    );
    const passwordEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_PASSWORD`
    );
    if (usernameEnvVariable && passwordEnvVariable) {
      return {
        username: usernameEnvVariable,
        password: passwordEnvVariable,
      };
    } else {
      throw new Error(`Can't find ${usernameEnvVariable} or ${passwordEnvVariable} for Org with name ${passedOrg}
        Suitable app names are:
        - QA
        `);
    }
  }

  static getApiCredentials(): ApiUserCredentials {
    const passedOrg = EnvPropsProvider.getEnvProp('org');
    const apiUsernameEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_API_USERNAME`
    );
    const apiPasswordEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_API_PASSWORD`
    );
    const apiGrantTypeEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_API_GRANT_TYPE`
    );
    const apiClientIdEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_API_CLIENT_ID`
    );
    const apiClientSecretEnvVariable = EnvPropsProvider.getEnvProp(
      `${passedOrg}_API_CLIENT_SECRET`
    );
    if (
      apiUsernameEnvVariable &&
      apiPasswordEnvVariable &&
      apiGrantTypeEnvVariable &&
      apiClientIdEnvVariable &&
      apiClientSecretEnvVariable
    ) {
      return {
        username: apiUsernameEnvVariable,
        password: apiPasswordEnvVariable,
        grantType: apiGrantTypeEnvVariable,
        clientId: apiClientIdEnvVariable,
        clientSecret: apiClientSecretEnvVariable,
      };
    } else {
      throw new Error(`Can't find API credentials for Org with name ${passedOrg}
        Suitable app names are:
        - QA
        `);
    }
  }
}
