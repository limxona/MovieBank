import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  
  constructor(private http: HttpClient) { 
    console.log("MovieService is actived!");
    this.getMovies();
  }


  getMovies() {
    this.http.get("popular").subscribe(d => {
      console.log(d);
    }); 
  }


  getPopularMovies() {
    return this.http.get("popular").pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );

  }

}
