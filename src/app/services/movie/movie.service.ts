import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  
  constructor(private http: HttpClient) { 
  }


  getLatestMovies(pageNumber: number) {
    return this.http.get("movie/latest").pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }


  getPopularMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }
    return this.http.get("movie/popular", {params: data}).pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  getTopRatedMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("movie/top_rated", {params: data}).pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  getTopUpcomingMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("movie/upcoming", {params: data}).pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  getTopNowPlayingMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("movie/now_playing", {params: data}).pipe(
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
        return response as Movie; 
      })
    );
  }

  getMovieCast(movieID: string) {
    let url = 'movie/'+movieID+'/credits';
    return this.http.get(url).pipe(
      map((response: any) => {
        return response; 
      })
    );
  }

  getSimilarMovies(movieID: string) {
    let url = 'movie/'+movieID+'/similar';
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }

  getCategoryMovies(genderID: string) {
    var data = {
      with_genres: genderID
    }
    let url = 'discover/movie';
    return this.http.get(url, {params: data}).pipe(
      map((response: any) => {
        return response.results as Array<Movie>; 
      })
    );
  }
  
}
