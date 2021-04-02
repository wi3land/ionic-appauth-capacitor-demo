// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Capacitor } from '@capacitor/core';

const isIOS = Capacitor.getPlatform() === 'ios';
const PROTOCOL = isIOS ? 'capacitor://localhost/' : 'com.appauth.demo://';

export const environment = {
  production: false,
  auth_config: {
    client_id: 'appauth',
    server_host: 'http://localhost:5200',
    redirect_url: PROTOCOL + 'auth/callback',
    end_session_redirect_url: PROTOCOL + 'endsession',
    scopes: 'openid offline_access',
    pkce: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
