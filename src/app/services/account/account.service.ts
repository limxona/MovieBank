import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Observable, observable } from 'rxjs';
import { CoreService } from '../core/core.service';
import { User } from 'src/app/models/user';
import { UserListResponse } from 'src/app/models/user-list';
import { MovieResponse } from 'src/app/models/movie';

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private user: User;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private coreService: CoreService) {
  }

  getAccountDetails() {
    var params = { 'session_id': localStorage.getItem('sessionID') };
    return this.http.get('account', { params: params }).pipe(
      map((response: any) => {
        this.user = response;
        return response as User;
      })
    );

  }

  getCreatedLists() {
    let accountID = this.user.id;
    let url = 'account/' + accountID + '/lists';

    var queryParams = {
      session_id: localStorage.getItem('sessionID')
    }

    return this.http.get(url, {params: queryParams}).pipe(
      map((response: UserListResponse) => {
        return response.results;
      })
    );

  }

  getFavoriteMovies() { 
    let accountID = this.user.id;
    let url = 'account/'+accountID+'/favorite/movies';

    var queryParams = {
      session_id: localStorage.getItem('sessionID')
    }

    return this.http.get(url, {params: queryParams}).pipe(
      map((response: MovieResponse) => {
        console.log("Favorite Movies: ", response);
        return response.results;
      })
    );
  }

  getRatedMovies() { }

  getMovieWatchList() { 
    
    let accountID = this.user.id;
    let url = 'account/'+accountID+'/watchlist/movies';

    var queryParams = {
      session_id: localStorage.getItem('sessionID')
    }
    return this.http.get(url, { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        console.log("User's WatchList : ", response);
        return response.results;
      })
    );

  }

  addMovieToList(): Observable<boolean> {
    let isSessionExist = this.authService.isSessionExist();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for add item to your lists!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      return new Observable<true>();
    }
  }

  addToWatchList(mediaID: number, mediaType: string, actionType: boolean): Observable<boolean> {

    let isSessionExist = this.authService.isSessionExist();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for adding to watchlist!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let accountID = this.user.id;
      let url = 'account/' + accountID + '/watchlist';
      var params = {
        "media_type": "movie",
        "media_id": mediaID,
        "watchlist": actionType
      }
      var queryParams = {
        session_id: this.authService.getSessionID()
      }
      return this.http.post(url, params, { params: queryParams }).pipe(
        map((response: any) => {
          console.log("Add To WatchList : ", response);
          return true;
        })
      );
    }
  }

  markAsFavorite(mediaID: number, mediaType: string, actionType: boolean): Observable<boolean> {

    let isSessionExist = this.authService.isSessionExist();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for mark as favorite!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let accountID = this.user.id;
      let url = 'account/' + accountID + '/favorite';
      var params = {
        "media_type": "movie",
        "media_id": mediaID,
        "favorite": actionType
      }
      var queryParams = {
        session_id: this.authService.getSessionID()
      }
      return this.http.post(url, params, { params: queryParams }).pipe(
        map((response: any) => {
          console.log("Mark Favorite : ", response);
          return true;
        })
      );
    }

  }

  rateMovie(movieID: string, rate: number) {
    let url = 'movie/'+movieID+'/rating';
    let guestSessionID = localStorage.getItem('guestSessionID');
    let params = {
      value: rate
    }
    let queryString = {
      guest_session_id: guestSessionID,
      session_id: ""
    }

    return this.http.post(url, params, {params: queryString}).pipe(
      map((response: any) => {
        console.log("Rate Response : ", response);
        return true;
      })
    );
  }

  deleteRate(movieID: string) {
    let url = 'movie/'+movieID+'/rating';
    let guestSessionID = localStorage.getItem('guestSessionID');

    let queryString = {
      guest_session_id: guestSessionID,
      session_id: ""
    }

    return this.http.delete(url, {params: queryString}).pipe(
      map((response: any) => {
        console.log("Dete Rate Response : ", response);
        return true;
      })
    );
  }

  

  /* 
    Get Created Lists
    Get Favorite Movies
    Get Favorite TV Shows
    Mark as Favorite
    Get Rated Movies
    Get Rated TV Shows
    Get Rated TV Episodes
    Get Movie Watchlist
    Get TV Show Watchlist
    Add to Watchlist
  */
}
