import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { IAuthAction, AuthActions } from 'ionic-appauth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  action : IAuthAction;

  constructor(
    private auth : AuthService,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    this.auth.authObservable.subscribe((action) => {
      this.action = action
      if(action.action == AuthActions.SignInSuccess){
        this.navCtrl.navigateRoot('home');
      }
    });
  }

  signIn(){
    this.auth.signIn();
  }
}
