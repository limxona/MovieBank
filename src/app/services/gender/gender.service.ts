import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Gender } from 'src/app/models/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }


  getAllGenders() {
    console.log("All genders...");

    return this.http.get("genre/movie/list").pipe(
      map((response: any) => {
        console.log(response);
        return response.genres as Array<Gender>;
      })
    );
  }
}
