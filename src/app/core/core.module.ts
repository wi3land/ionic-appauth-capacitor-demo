import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureStorageService } from './cordova/secure-storage.service';
import { CapacitorBrowserService } from './capacitor/browser.service';
import { AuthService } from './auth.service';
import { AuthHttpService } from './auth-http.service';
import { AuthGuardService } from './auth-guard.service';
import { RequestorService } from './angular/requestor.service';
import { CapacitorStorageService } from './capacitor/storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CapacitorBrowserService,
    CapacitorStorageService,
    RequestorService,
    SecureStorageService,
    AuthGuardService,
    AuthHttpService,
    AuthService
  ]
})
export class CoreModule { }
