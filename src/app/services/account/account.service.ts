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
        localStorage.setItem('userSession', JSON.stringify(response));
        console.log(this.user);
        return response as User;
      })
    );

  }

  private getUser() {
    if (this.user) {
      return this.user;
    }
    else {
      this.user = JSON.parse(localStorage.getItem('userSession')) as User;
      return this.user
    }
  }

  getCreatedLists() {
    let accountID = this.getUser().id;
    let url = 'account/' + accountID + '/lists';

    var queryParams = {
      session_id: localStorage.getItem('sessionID')
    }

    return this.http.get(url, { params: queryParams }).pipe(
      map((response: UserListResponse) => {
        return response.results;
      })
    );

  }

  getFavoriteMovies() {
    let accountID = this.getUser().id;
    let url = 'account/' + accountID + '/favorite/movies';

    var queryParams = {
      session_id: localStorage.getItem('sessionID')
    }

    return this.http.get(url, { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        console.log("Favorite Movies: ", response);
        return response.results;
      })
    );
  }

  getRatedMovies() { }

  getMovieWatchList() {

    let accountID = this.getUser().id;
    let url = 'account/' + accountID + '/watchlist/movies';

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

  addMovieToList(listID: String | Number, movieID: String | Number): Observable<boolean> {

    let isSessionExist = this.authService.checkUserSession();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for add item to your lists!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let url = `list/${listID}/add_item`;
      let params = { media_id: movieID };
      let queryParams: any = { session_id: this.authService.getSessionID() }
      return this.http.post(url, params, {params: queryParams}).pipe(
        map((response: any) => {
          console.log("Add To list : ", response);
          if (response.status_code == 12) {
            return true;
          }
          else if (response.status_code == 13) {
            return false;
          }
        })
      );
      //return new Observable<true>();
    }
  }

  addToWatchList(mediaID: Number, mediaType: String, actionType: Boolean): Observable<Boolean> {

    let isSessionExist = this.authService.checkUserSession();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for adding to watchlist!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let accountID = this.getUser().id;
      let url = 'account/' + accountID + '/watchlist';
      var params = {
        "media_type": "movie",
        "media_id": mediaID,
        "watchlist": actionType
      }
      var queryParams: any = {
        session_id: this.authService.getSessionID()
      }
      return this.http.post(url, params, { params: queryParams }).pipe(
        map((response: any) => {
          console.log("Add To WatchList : ", response);
          if (response.status_code == 1) {
            return true;
          }
          else if (response.status_code == 13) {
            return false;
          }
        })
      );
    }
  }

  markAsFavorite(mediaID: Number, mediaType: String, actionType: Boolean): Observable<Boolean> {

    let isSessionExist = this.authService.checkUserSession();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for mark as favorite!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let accountID = this.getUser().id;
      let url = 'account/' + accountID + '/favorite';
      var params = {
        "media_type": "movie",
        "media_id": mediaID,
        "favorite": actionType
      }
      var queryParams: any = {
        session_id: this.authService.getSessionID()
      }
      return this.http.post(url, params, { params: queryParams }).pipe(
        map((response: any) => {
          console.log("Mark Favorite : ", response);
          if (response.status_code == 1) {
            return true;
          }
          else if (response.status_code == 13) {
            return false;
          }
        })
      );
    }

  }

  rateMovie(movieID: string, rate: number) {
    let url = 'movie/' + movieID + '/rating';
    let sessionID = this.authService.getSessionID();
    let params = {
      value: rate * 2
    }
    let queryString: any = {
      guest_session_id: null,
      session_id: sessionID
    }

    return this.http.post(url, params, { params: queryString }).pipe(
      map((response: any) => {
        console.log("Rate Response : ", response);
        return true;
      })
    );
  }

  deleteRate(movieID: string) {
    let url = 'movie/' + movieID + '/rating';
    let sessionID = this.authService.getSessionID();

    let queryString: any = {
      guest_session_id: null,
      session_id: sessionID
    }

    return this.http.delete(url, { params: queryString }).pipe(
      map((response: any) => {
        console.log("Dete Rate Response : ", response);
        return true;
      })
    );
  }



}
