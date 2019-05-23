/* Core */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* Models */
import { GuestSession, RequestToken, UserSession } from 'src/app/models/auth';

/* Services */
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private guestUserSession: GuestSession;
  private userSession: UserSession;
  private sessionID: string;

  constructor(private http: HttpClient, private coreService: CoreService) {
  }

  checkSession() {
    if (this.getUserSessionResponse()) {
      let isUserSessionExpired = this.checkExpireDate(this.userSession.expires_at);
      if (isUserSessionExpired) {
        localStorage.removeItem('userSession');
      }
    }
    else {
      if (this.getGuestSessionResponse()) {
        let isGuestSessionExpired = this.checkExpireDate(this.guestUserSession.expires_at);
        if (isGuestSessionExpired) {
          this.createGuestSession();
        }
      }
      else {
        this.createGuestSession();
      }
    }
  }

  checkUserSession(): boolean {
    return this.getUserSessionResponse() ? true : false;
  }

  isSessionExist(): boolean {
    let user = localStorage.getItem('userSession');
    if (user) {
      return true;
    }
    else {
      return false;
    }
  }

  getSessionID(): string {
    if(this.sessionID) {
      return this.sessionID;
    }
    else {
      this.sessionID = localStorage.getItem('sessionID');
      return this.sessionID;
    }
  }

  createGuestSession() {
    this.http.get("/authentication/guest_session/new").subscribe((guest: GuestSession) => {
      let guestStr = JSON.stringify(guest);
      localStorage.setItem('guestUserSession', guestStr);
    });
  }

  createRequestToken(): Observable<string | boolean> {
    return this.http.get("/authentication/token/new").pipe(
      map((response: RequestToken) => {
        if (response.success) {
           return response.request_token;
        }
        else {
          return false;
        }
      })
    );
  }

  createSession(requestToken: string) {
    let params = {
      "request_token": requestToken
    }
    return this.http.post("/authentication/session/new", params).pipe(
      map((response: UserSession) => {
        localStorage.setItem('sessionID', response.session_id);
        return response.session_id;
      })
    );
  }

  createSessionWithLogin() {
    let params = {
      "username": "johnny_appleseed",
      "password": "test123",
      "request_token": "1531f1a558c8357ce8990cf887ff196e8f5402ec"
    }
    return this.http.post("/authentication/token/validate_with_login", params).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteSession() {
    let param = {
      "session_id": "2629f70fb498edc263a0adb99118ac41f0053e8c"
    }
    return this.http.delete("/authentication/session", { params: param }).pipe(
      map((response: any) => {
        return response;
      })
    );

  }

  private checkExpireDate(expireDate: string) {
    let expDate = new Date(expireDate);
    let now = new Date();

    return now > expDate;
  }

  private getGuestSessionResponse() {
    if (!this.guestUserSession) {
      let session = JSON.parse(localStorage.getItem('guestUserSession')) as GuestSession;
      this.guestUserSession = session;
    }
    return this.guestUserSession;
  }

  private getUserSessionResponse() {
    if (!this.userSession) {
      let session = JSON.parse(localStorage.getItem('userSession')) as UserSession;
      this.userSession = session;
    }
    return this.userSession;
  }

  logout() {
    localStorage.clear();
    this.guestUserSession = null;
    this.userSession = null;
    this.sessionID = null;
  }


}
