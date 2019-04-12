import { take, map, skipWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { IAuthAction, AuthActions } from 'ionic-appauth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService : AuthService,
    private navCtrl: NavController,
    ) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let authenticated : boolean  = await this.authService.authObservable.pipe(skipWhile(action => action.action == AuthActions.Default),
                                                                              take(1), 
                                                                              map((action : IAuthAction) => action.tokenResponse != undefined)).toPromise();
    
    if(!authenticated)
      this.navCtrl.navigateRoot('landing');
    
    return authenticated;
  }
}
