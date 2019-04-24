import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie, MovieStates } from 'src/app/models/movie';
import { TrailerResponse } from 'src/app/models/trailer';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient, private authService: AuthService) {
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
    return this.http.get("movie/popular", { params: data }).pipe(
      map((response: any) => {
        return response.results as Array<Movie>;
      })
    );
  }

  getTopRatedMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("movie/top_rated", { params: data }).pipe(
      map((response: any) => {
        return response.results as Array<Movie>;
      })
    );
  }

  getTopUpcomingMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("movie/upcoming", { params: data }).pipe(
      map((response: any) => {
        return response.results as Array<Movie>;
      })
    );
  }

  getTopNowPlayingMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("movie/now_playing", { params: data }).pipe(
      map((response: any) => {
        return response.results as Array<Movie>;
      })
    );
  }

  searchMovie(searchText: string) {

    var data = {
      query: searchText
    }

    return this.http.get("search/movie", { params: data }).pipe(
      map((response: any) => {
        return response.results as Array<Movie>;
      })
    );

  }

  getMovieDetail(movieID: string) {
    return this.http.get("movie/" + movieID).pipe(
      map((response: any) => {
        return response as Movie;
      })
    );
  }

  getMovieCast(movieID: string) {
    let url = 'movie/' + movieID + '/credits';
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getSimilarMovies(movieID: string) {
    let url = 'movie/' + movieID + '/similar';
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
    return this.http.get(url, { params: data }).pipe(
      map((response: any) => {
        return response.results as Array<Movie>;
      })
    );
  }

  getMovieTrailerURL(movieID: string) {
    //_IqFJLdV13o
    let url = 'movie/' + movieID + '/videos';
    return this.http.get(url).pipe(
      map((response: TrailerResponse) => {
        let trailerList = response.results.filter(x => {return x.site == "YouTube"});
        if(trailerList.length != 0){
          let trailer = trailerList[0];
          let youtubeURL = 'https://www.youtube.com/watch?v='+trailer.key;
          return youtubeURL;
        }else {
          return null;    
        }
        
      })
    );
  }

  getAccountStateForMovie(movieID: String) {

    let url = 'movie/'+movieID+'/account_states';
    let sessionID = this.authService.getSessionID();

    let queryString: any = {
      session_id: sessionID
    }
    return this.http.get(url, {params: queryString}).pipe(
      map((response: MovieStates) => {
       console.log('Account State For Move: ', response);
       return response; 
      })
    );
  }

























}
