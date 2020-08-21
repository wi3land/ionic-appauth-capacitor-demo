import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAuthAction, AuthActions, AuthObserver, AuthService } from 'ionic-appauth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  userInfo = this.auth.session.user;
  action: IAuthAction;
  observer: AuthObserver;
  userObserver: AuthObserver;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.observer = this.auth.addActionListener((action) => this.onSignOutSuccess(action));
    this.userObserver = this.auth.addActionListener((action) => this.onUserInfoSucces(action));
  }

  ngOnDestroy() {
    this.auth.removeActionObserver(this.observer);
    this.auth.removeActionObserver(this.userObserver);
  }

  private onUserInfoSucces(action: IAuthAction): void {
    if (action.action === AuthActions.LoadUserInfoSuccess) {
      this.userInfo = action.user;
    }
  }

  private onSignOutSuccess(action: IAuthAction) {
    this.action = action;

    if (action.action === AuthActions.SignOutSuccess) {
      this.navCtrl.navigateRoot('landing');
    }
  }

  public signOut() {
    this.auth.signOut();
  }

  public async getUserInfo(): Promise<void> {
    this.auth.loadUserInfo();
  }

  public async refreshToken(): Promise<void> {
    this.auth.refreshToken();
  }

}