import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthorizationRequestHandler } from 'ionic-appauth';
import { IonicImplicitRequestHandler } from 'ionic-appauth/lib/implicit-request-handler';
import { Plugins, AppLaunchUrl } from '@capacitor/core';

import { SecureStorageService } from './cordova/secure-storage.service';
import { RequestorService } from './angular/requestor.service';
import { CapacitorStorageService } from './capacitor/storage.service';
import { CapacitorBrowserService } from './capacitor/browser.service';

const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService extends IonicAuth  {

  constructor(
    requestor : RequestorService,
    storage : CapacitorStorageService,
    secureStorage : SecureStorageService,
    browser : CapacitorBrowserService,
    private platform : Platform
  ){
    super(
      (platform.is('mobile') && !platform.is('mobileweb')) ? browser : undefined,
      (platform.is('mobile') && !platform.is('mobileweb')) ? secureStorage : storage,
      requestor, undefined, undefined,
      (platform.is('mobile') && !platform.is('mobileweb')) ? new IonicAuthorizationRequestHandler(browser, secureStorage) : new IonicAuthorizationRequestHandler(browser, storage)
    );

    this.addConfig();
  }

  public async startUpAsync() {
    if(this.platform.is('mobile') && !this.platform.is('mobileweb')){
      let appLaunchUrl : AppLaunchUrl = await App.getLaunchUrl();
      if(appLaunchUrl.url != undefined)
        this.handleCallback(appLaunchUrl.url);
    }

    super.startUpAsync();
  }

  private addConfig() {
    const clientId = '0oak8qpmhim2MmwF20h7';
    const issuer = 'https://dev-737523.oktapreview.com/oauth2/default';
    const scopes = 'openid profile offline_access';

    if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
      this.authConfig = {
        identity_client: clientId,
        identity_server: issuer,
        redirect_url: 'com.oktapreview.dev-737523:/callback',
        scopes: scopes,
        usePkce: true,
        end_session_redirect_url: 'com.oktapreview.dev-737523:/logout',
      };
    } else {
      this.authConfig = {
        identity_client: clientId,
        identity_server: issuer,
        redirect_url: 'http://localhost:8100/implicit/callback',
        scopes: scopes,
        usePkce: true,
        response_type: 'code',
        end_session_redirect_url: 'http://localhost:8100/implicit/logout',
      };
    }
  }

  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0){
      this.AuthorizationCallBack(callbackUrl);
    }

    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0){
      this.EndSessionCallBack();
    }
  }
}

