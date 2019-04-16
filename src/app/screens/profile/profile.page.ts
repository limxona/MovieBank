import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/account/account.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedMenu: string = "list";
  loggedUser: User;
  isSessionExist: boolean = true;
  constructor(private authService: AuthService, private accountService: AccountService) { }

  ngOnInit() {
    this.getAccountDetails();    
  }

  getAccountDetails() {
    this.accountService.getAccountDetails().subscribe(d => {
      console.log("Account Detail: ", d);
      this.loggedUser = d;
      this.getAccountWatchList();
      this.getAccountLists();
      this.getAccountFavoriteMovies();
    });
  }

  getAccountWatchList() {
    this.accountService.getMovieWatchList().subscribe(d => {

    });
  }

  getAccountLists() {
    this.accountService.getCreatedLists().subscribe(d => {}); 
  }

  getAccountFavoriteMovies() {
    this.accountService.getFavoriteMovies().subscribe(d => {});
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
