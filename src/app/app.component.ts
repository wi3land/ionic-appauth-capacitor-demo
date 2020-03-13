import { AuthService } from './core/auth.service';
import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private auth: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.startUpAsync();
      SplashScreen.hide();
    });
  }
}
