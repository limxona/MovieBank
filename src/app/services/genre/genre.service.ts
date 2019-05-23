/* Core */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* Models */
import { Genre, GenreResponse } from 'src/app/models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }


  getAllGenders(): Observable<Genre[]> {
    return this.http.get("/genre/movie/list").pipe(
      map((response: GenreResponse) => {
        console.log(response);
        return response.genres;
      })
    );
  }
}
