/* Core */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* Models */
import { User } from 'src/app/models/user';
import { MovieResponse } from 'src/app/models/movie';

/* Services */
import { AuthService } from '../auth/auth.service';
import { CoreService } from '../core/core.service';


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
    return this.http.get('/account', { params: params }).pipe(
      map((response: any) => {
        this.user = response;
        localStorage.setItem('userSession', JSON.stringify(response));
        return response as User;
      })
    );
  }

  getUser() {
    if (this.user) {
      return this.user;
    }
    else {
      this.user = JSON.parse(localStorage.getItem('userSession')) as User;
      return this.user
    }
  }

  getFavoriteMovies() {
    let accountID = this.getUser().id;
    let url = '/account/' + accountID + '/favorite/movies';

    var queryParams = {
      session_id: localStorage.getItem('sessionID')
    }

    return this.http.get(url, { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getRatedMovies() { }

  getMovieWatchList() {

    let accountID = this.getUser().id;
    let url = '/account/' + accountID + '/watchlist/movies';

    var queryParams = {
      session_id: localStorage.getItem('sessionID')
    }
    return this.http.get(url, { params: queryParams }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );

  }

  addToWatchList(mediaID: number, mediaType: string, actionType: boolean): Observable<boolean> {

    let isSessionExist = this.authService.checkUserSession();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for adding to watchlist!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let accountID = this.getUser().id;
      let url = '/account/' + accountID + '/watchlist';
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

  markAsFavorite(mediaID: number, mediaType: string, actionType: boolean): Observable<boolean> {

    let isSessionExist = this.authService.checkUserSession();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for mark as favorite!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let accountID = this.getUser().id;
      let url = '/account/' + accountID + '/favorite';
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
    let url = '/movie/' + movieID + '/rating';
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
    let url = '/movie/' + movieID + '/rating';
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
