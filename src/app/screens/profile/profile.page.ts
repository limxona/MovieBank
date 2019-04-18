import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/account/account.service';
import { User } from 'src/app/models/user';
import { UserList } from 'src/app/models/user-list';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedMenu: string = "list";
  loggedUser: User;
  isSessionExist: boolean = false;
  userLists: UserList[] = [];
  userWatchList: Movie[] = [];
  userFavoriteList: Movie[] = [];
  constructor(private authService: AuthService, private accountService: AccountService) { }

  ngOnInit() {
    if(this.checkSession()){
      this.getAccountDetails();
    }
  }

  getAccountDetails() {
    this.accountService.getAccountDetails().subscribe(d => {
      console.log("Account Detail: ", d);
      this.loggedUser = d;
      this.getAccountLists(); 
    });
  }

  changeTab(selectedTab: string) {
    console.log(selectedTab);
    this.selectedMenu = selectedTab;
    if(selectedTab == 'list') {
      this.getAccountLists();
    }
    else if(selectedTab == 'watchlist') {
      this.getAccountWatchList();
    }
    else if(selectedTab == 'favorite') {
      this.getAccountFavoriteMovies();
    }
    else {}
  }

  private getAccountWatchList() {
    this.accountService.getMovieWatchList().subscribe(movieList => {
      this.userWatchList = movieList;
    });
  }

  private getAccountLists() {
    this.accountService.getCreatedLists().subscribe(list => {
      this.userLists = list;
    }); 
  }

  private getAccountFavoriteMovies() {
    this.accountService.getFavoriteMovies().subscribe(list => {
      this.userFavoriteList = list;
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
    this.isSessionExist = this.authService.checkUserSession();
    return this.isSessionExist;
  }

}
