export const environment = {
  production: true,
  auth_config: {
    identity_client: 'examplemobile',
    identity_server: 'http://localhost:52652',
    redirect_url: 'com.appauth.demo://callback',
    end_session_redirect_url: 'com.appauth.demo://endSession',
    scopes: 'openid offline_access',
    usePkce: true
  }
};
