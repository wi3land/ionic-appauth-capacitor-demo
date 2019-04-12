import { CordovaSecureStorage } from 'ionic-appauth/lib/cordova';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService extends CordovaSecureStorage {

}
