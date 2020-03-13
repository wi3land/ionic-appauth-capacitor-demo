import { Requestor, StorageBackend } from '@openid/appauth';
import { Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';
import { IonicAuth, Browser } from 'ionic-appauth';
import { Plugins, AppLaunchUrl } from '@capacitor/core';
import { environment } from 'src/environments/environment';

const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService extends IonicAuth  {

  constructor(
    requestor: Requestor,
    storage: StorageBackend,
    browser: Browser,
    private platform: Platform,
    private ngZone: NgZone,
  ) {
    super(browser, storage, requestor);

    this.addConfig();
  }

  public async startUpAsync() {
    if (this.platform.is('capacitor')) {
      App.addListener('appUrlOpen', (data: any) => {
        if (data.url !== undefined) {
          this.ngZone.run(() => {
            this.handleCallback(data.url);
          });
        }
      });
    }

    super.startUpAsync();
  }

  private addConfig() {
    this.authConfig = environment.auth_config;

    if (!this.platform.is('capacitor')) {
      this.authConfig.redirect_url = window.location.origin + '/implicit/authcallback';
      this.authConfig.end_session_redirect_url = window.location.origin + '/implicit/endsession';
    }
  }

  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0) {
      this.AuthorizationCallBack(callbackUrl);
    }

    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0) {
      this.EndSessionCallBack();
    }
  }
}
