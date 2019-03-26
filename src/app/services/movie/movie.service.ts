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
  }


  getLatestMovies() {
    return this.http.get("movie/latest").pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }


  getPopularMovies() {
    return this.http.get("movie/popular").pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  getTopRatedMovies() {
    return this.http.get("movie/top_rated").pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  getTopUpcomingMovies() {
    return this.http.get("movie/upcoming").pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  getTopNowPlayingMovies() {
    return this.http.get("movie/now_playing").pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  searchMovie(searchText: string) {

    var data = {
      query: searchText
    }

    return this.http.get("search/movie", {params: data}).pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );

  }

  getMovieDetail(movieID: string) {
    return this.http.get("movie/"+movieID).pipe(
      map((response: any) => {
        console.log(response);
        return response as Movie; 
      })
    );
  }

  getMovieCast(movieID: string) {
    let url = 'movie/'+movieID+'/credits';
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        return response; 
      })
    );
  }

  getSimilarMovies(movieID: string) {
    let url = 'movie/'+movieID+'/similar';
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        return response.results as Array<Movie>; 
      })
    );
  }
  
}
