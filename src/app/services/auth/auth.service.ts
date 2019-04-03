import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { 
  }

  isSessionExist(): boolean {
    let user = localStorage.getItem('userCredentials');
    return user ? true : false;
  }

  createGuestSession() {
    return this.http.get("movie/latest").pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
