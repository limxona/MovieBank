/* Core */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/account/account.service';
import { CoreService } from 'src/app/services/core/core.service';
import { ListService } from 'src/app/services/list/list.service';

/* Models */
import { User } from 'src/app/models/user';
import { UserList, ListDetail } from 'src/app/models/user-list';
import { Movie } from 'src/app/models/movie';

/* Components */
import { ListDetailPage } from '../modals/list-detail/list-detail.page';
import { AddListPage } from '../modals/add-list/add-list.page';


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
  private requestToken: string;
  private isDataLoaded: boolean = true;
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private listService: ListService,
    private coreService: CoreService,
    private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {
    if (this.checkSession()) {
      this.getAccountDetails();
    }
  }

  ionViewWillEnter(){
    if (this.checkSession()) {
      this.getAccountLists();
    }
  }

  getAccountDetails() {
    this.accountService.getAccountDetails().subscribe(d => {
      console.log("Account Detail: ", d);
      this.loggedUser = d;
      this.isSessionExist = true;
      this.getAccountLists();
    });
  }

  private changeTab(selectedTab: string) {
    console.log(selectedTab);
    this.selectedMenu = selectedTab;
    if (selectedTab == 'list') {
      this.getAccountLists();
    }
    else if (selectedTab == 'watchlist') {
      this.getAccountWatchList();
    }
    else if (selectedTab == 'favorite') {
      this.getAccountFavoriteMovies();
    }
    else { }
  }

  private getAccountWatchList() {
    this.isDataLoaded = false;
    this.accountService.getMovieWatchList().subscribe(movieList => {
      this.userWatchList = movieList;
      this.isDataLoaded = true;
    });
  }

  private getAccountLists() {
    this.isDataLoaded = false;
    this.listService.getCreatedLists().subscribe(list => {
      this.userLists = list;
      this.isDataLoaded = true;
    });
  }

  private getAccountFavoriteMovies() {
    this.isDataLoaded = false;
    this.accountService.getFavoriteMovies().subscribe(list => {
      this.userFavoriteList = list;
      this.isDataLoaded = true;
    });
  }

  private async addNewList() {
    const modal = await this.modalController.create({
      component: AddListPage,

    });

    modal.present();
    
    modal.onDidDismiss().then(d => {
      this.getAccountLists();
    }).catch(err => { });
  }

  private async showListDetail(list: UserList) {
    const modal = await this.modalController.create({
      component: ListDetailPage,
      componentProps: {
        userList: list
      }
    });

    modal.present();
  }

  private removeFromFavoriteList(movie: Movie) {
    console.log(movie);
    this.accountService.markAsFavorite(Number(movie.id), 'movie', false).subscribe(d => {
      if (!d) {
        this.getAccountFavoriteMovies();
      }
    });
  }

  private removeFromWatchList(movie: Movie) {
    this.accountService.addToWatchList(Number(movie.id), 'movie', false).subscribe(d => {
      if (!d) {
        this.getAccountWatchList();
      }
    });
  }

  private deleteList(list: ListDetail) {
    console.log(list);
    this.listService.deleteList(list).subscribe(result => {
      console.log(result);
      
    });
  } 

  login() {

    //this.createSession("31adfdea8606f4232209bd4a99f2cf438b368f93");

    this.authService.createRequestToken().subscribe((d: any) => {
      console.log('Request Token: ', d);
      if (d != false) {
        this.requestToken = d;
        let url = 'https://www.themoviedb.org/authenticate/' + d;
        this.coreService.showBrowser(url).subscribe((result: any) => {
          if(result.event === 'closed') {
            console.log("Token: ", this.requestToken);
            setTimeout(() => {
              this.createSession(this.requestToken);
            }, 1000);
          }

        },
        (error: any) => console.error(error)
      );

      }
      else {
        //alert("1");
      }
    });

  }

  logout() {
    this.authService.logout();
    if (this.checkSession()) {
      this.getAccountLists();
    }
  }

  createSession(requestToken: string) {
    return this.authService.createSession(requestToken).subscribe(result => {
      console.log("Session: ", result);
      if(result) {
        setTimeout(() => {
          this.getAccountDetails();
          this.checkSession();
        }, 1000);
        
      }
    });
  }

  checkSession() {
    this.isSessionExist = this.authService.checkUserSession();
    console.log(this.isSessionExist);
    return this.isSessionExist;
  }

}
