import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor(private http: HttpClient, private authService: AuthService) { 
  }

  getAccountDetails() {
    var params = { 'session_id': this.authService.getSessionID() };
    return this.http.get('/account', {params: params}).pipe(
      map((response: any) => {
        console.log("Account: ", response);
      })
    ); 

  }

  getCreatedLists() {
    let accountID = '';
    let url = 'account/'+accountID+'/lists';

    return this.http.get(url).pipe(
      map((response: any) => {
        console.log("Account: ", response);
      })
    ); 

  }

  getFavoriteMovies() {}

  getRatedMovies() {}

  getMovieWatchList() {}

  addToWatchList(mediaID: number, mediaType: string, actionType: boolean) {
    let accountID = '';
    let url = 'account/'+accountID+'/watchlist';
    var params = {
        "media_type": "movie",
        "media_id": mediaID,
        "watchlist": actionType
    }
    var queryParams = {
      session_id: this.authService.getSessionID()
    }
    return this.http.post(url, params, {params: queryParams}).pipe(
      map((response: any) => {
        console.log("Add To WatchList : ", response);
      })
    ); 

  }

  markAsFavorite(mediaID: number, mediaType: string, actionType: boolean) {
    ///account/{account_id}/favorite
    let accountID = '';
    let url = 'account/'+accountID+'/favorite';
    var params = {
        "media_type": "movie",
        "media_id": mediaID,
        "favorite": actionType
    }
    var queryParams = {
      session_id: this.authService.getSessionID()
    }
    return this.http.post(url, params, {params: queryParams}).pipe(
      map((response: any) => {
        console.log("Mark Favorite : ", response);
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
