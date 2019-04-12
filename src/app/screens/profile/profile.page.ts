import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedMenu: string = "watchlist";
  isSessionExist: boolean = false;
  constructor(private authService: AuthService, private accountService: AccountService) { }

  ngOnInit() {
    this.getAccountDetails();    
  }

  getAccountDetails() {
    this.accountService.getAccountDetails().subscribe(d => {
      console.log("Account Detail: ", d);
    });
  }

  login() {
    /* this.authService.createRequestToken().subscribe(d => {
      console.log('Request Token: ', d);
      localStorage.setItem('requestToken', d.request_token);
    }); */
    
    let requestToken = localStorage.getItem('requestToken');
    this.authService.createSession(requestToken).subscribe(d => {
      console.log(d);
      localStorage.setItem('sessionID', d.session_id);
    });

  }

  checkSession() {

  }

}
