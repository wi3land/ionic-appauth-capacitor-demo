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
      (platform.is('mobile') && !platform.is('mobileweb')) ? new IonicAuthorizationRequestHandler(browser, secureStorage) : new IonicImplicitRequestHandler(browser, storage)
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

  private addConfig(){
    if(this.platform.is('mobile') && !this.platform.is('mobileweb')){
      this.authConfig = { 
        identity_client: 'appAuthCode', 
        identity_server: 'https://192.68.0.1/', 
        redirect_url: 'com.appauth.demo://callback', 
        scopes: 'openid profile offline_access',
        usePkce: true, 
        end_session_redirect_url: 'com.appauth.demo://endSession', 
      }
    }else{
      this.authConfig = { 
        identity_client: 'appAuthImplicit', 
        identity_server: 'https://192.68.0.1/', 
        redirect_url: 'http://localhost:8100/implicit/authcallback', 
        scopes: 'openid profile offline_access',
        usePkce: false,
        end_session_redirect_url: 'http://localhost:8100/implicit/endsession', 
      }
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

