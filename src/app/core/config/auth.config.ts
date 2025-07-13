import { AuthConfig } from "angular-oauth2-oidc";

const authConfig: AuthConfig = {
  scope: 'openid profile email offline_access',
  responseType: 'code',
  oidc: true,
  clientId: '328730579669468378',
  issuer: 'https://instance1-ta4cpi.us1.zitadel.cloud', // eg. https://acme-jdo9fs.zitadel.cloud
  redirectUri: 'http://localhost:4200/auth/callback',
  postLogoutRedirectUri: 'http://localhost:4200',
  requireHttps: false, // required for running locally
};

export { authConfig };