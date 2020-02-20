import { Platform } from '@ionic/angular';
import { Requestor, StorageBackend } from '@openid/appauth';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Browser } from 'ionic-appauth';
import { CapacitorBrowser } from 'ionic-appauth/lib/capacitor';

import { storageFactory } from './factories';
import { NgHttpService } from './ng-http.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: StorageBackend,
      useFactory: storageFactory,
      deps: [Platform]
    },
    {
      provide: Requestor,
      useClass: NgHttpService
    },
    {
      provide: Browser,
      useClass: CapacitorBrowser
    }
  ]
})
export class CoreModule { }
