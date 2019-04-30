import { Injectable } from '@angular/core';
import { AccountService } from '../account/account.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserListResponse, ListDetail } from 'src/app/models/user-list';
import { AuthService } from '../auth/auth.service';
import { CoreService } from '../core/core.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient ,private accountService: AccountService, private authService: AuthService, private coreService: CoreService) { }

  getCreatedLists() {
    let accountID = this.accountService.getUser().id;
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

  getListsDetail(listID: Number | String): Observable<ListDetail> {
    let isSessionExist = this.authService.checkUserSession();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for add item to your lists!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let url = `list/${listID}`;

      return this.http.get(url).pipe(
        map((response: ListDetail) => {
          console.log("ListDetail : ", response);
          return response;
        })
      );
    }
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
    }
  }

  removeMovieFromList(movieID: Number | String, listID: Number | String) {

    let isSessionExist = this.authService.checkUserSession();
    if (!isSessionExist) {
      this.coreService.showAlertMessage('You should login to app for add item to your lists!');
      return Observable.create((o: any) => { o.next(false); o.complete(); });
    }
    else {
      let url = `list/${listID}/remove_item`;
      let params = { media_id: movieID };
      let queryParams: any = { session_id: this.authService.getSessionID() }
      return this.http.post(url, params, {params: queryParams}).pipe(
        map((response: any) => {
          console.log("RemoveList : ", response);
          if (response.status_code == 13) {
            return true;
          }
          else if (response.status_code == 21) {
            return false;
          }
          else { return false; }
        })
      );
    }


  }

  createList(name: String, description: String) {
    let queryParams: any = {
      session_id: this.authService.getSessionID()
    }
    let requestBody = {
      name: name,
      description: description
    }
    return this.http.post('list', requestBody, {params: queryParams}).pipe(
      map((response: any) => {
        return true;
      })
    );
  }

  deleteList() {

  }

  clearList() {
    //TODO sonra yapılacak.
  }





}
