import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GuestSession, RequestToken } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { 
  }

  isSessionExist(): boolean {
    let user = localStorage.getItem('userCredentials');
    if(user){
      return true;
    }
    else {
      return false;
    }
  }

  getSessionID() {
    let user = localStorage.getItem('userCredentials');
    let guestSessionID = localStorage.getItem('guestSessionID');

    return user ? user : guestSessionID; 
  }

  createGuestSession() {
    return this.http.get("/authentication/guest_session/new").pipe(
      map((response: GuestSession) => {
        localStorage.setItem('guestSessionID', response.guest_session_id);
        return response;
      })
    );
  }

  createRequestToken() {
    return this.http.get("/authentication/token/new").pipe(
      map((response: RequestToken) => {
        localStorage.setItem('requestToken', response.request_token);
        return response;
      })
    );
  }

  createSession(requestToken: string) {
    let params = {
      "request_token": requestToken
    }
    return this.http.post("/authentication/session/new", params).pipe(
      map((response: any) => {
        return response;
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
    return this.http.delete("/authentication/session", {params: param}).pipe(
      map((response: any) => {
        return response;
      })
    );

  }

}
