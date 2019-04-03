import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';
import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private accountService: AccountService
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      //this.statusBar.backgroundColorByName("blue")
      //this.statusBar.backgroundColorByHexString("1573c1");
      this.splashScreen.hide();
      this.checkSession();
    });
  }

  checkSession() {
    let isSessionExist = this.authService.isSessionExist();
    if(!isSessionExist) {
      //this.requestToken()
      this.authService.createGuestSession().subscribe(d => {
        console.log(d);
      });
    }
  }
  
  requestToken() {
    this.authService.createRequestToken().subscribe(response => {
      if(response.success) {
        this.createSession(response.request_token);
      }
    });
  }

  createSession(requestToken: string) {
    this.authService.createSession(requestToken).subscribe(response => {
      console.log("CreateSession: ", response);
    });
  }
}
