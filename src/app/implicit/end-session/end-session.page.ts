import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  template: '<p>Signing Out...</p>'
})
export class EndSessionPage implements OnInit {

  constructor(
    private authService : AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.authService.EndSessionCallBack();
    this.navCtrl.navigateRoot('landing');
  }

}
