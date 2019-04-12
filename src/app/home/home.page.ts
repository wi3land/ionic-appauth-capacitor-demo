import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { IUserInfo } from '../models/user-info.model';
import { IAuthAction, AuthActions } from 'ionic-appauth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userInfo : IUserInfo;
  action : IAuthAction;

  constructor(
    private auth : AuthService,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    this.auth.authObservable.subscribe((action) => {
      this.action = action
      if(action.action == AuthActions.SignOutSuccess){
        this.navCtrl.navigateRoot('landing');
      }
    });
  }

  signOut(){
    this.auth.signOut();
  }

  public async getUserInfo() : Promise<void> {
    this.userInfo = await this.auth.getUserInfo<IUserInfo>();
  }

}
