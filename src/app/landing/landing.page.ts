import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAuthAction, AuthActions, AuthObserver, AuthService } from 'ionic-appauth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, OnDestroy {
  action: IAuthAction;
  observer: AuthObserver;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.auth.loadTokenFromStorage();
    this.observer = this.auth.addActionListener((action) => this.onSignInSuccess(action));
  }

  ngOnDestroy() {
    this.auth.removeActionObserver(this.observer);
  }

  private onSignInSuccess(action: IAuthAction) {
    this.action = action;
    if (action.action === AuthActions.SignInSuccess ||
      action.action === AuthActions.LoadTokenFromStorageSuccess) {
      this.navCtrl.navigateRoot('home');
    }
  }

  public signIn() {
    this.auth.signIn();
  }
}
