import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie, MovieStates, MovieResponse } from 'src/app/models/movie';
import { TrailerResponse } from 'src/app/models/trailer';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient, private authService: AuthService) {
  }


  getLatestMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("/movie/latest", { params: data }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }


  getPopularMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }
    return this.http.get("/movie/popular", { params: data }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getTopRatedMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("/movie/top_rated", { params: data }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getTopUpcomingMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("/movie/upcoming", { params: data }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getTopNowPlayingMovies(pageNumber: number) {
    var data = {
      page: pageNumber.toString()
    }

    return this.http.get("/movie/now_playing", { params: data }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  searchMovie(searchText: string) {
    var data = {
      query: searchText
    }

    return this.http.get("/search/movie", { params: data }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getMovieDetail(movieID: string) {
    return this.http.get("/movie/" + movieID).pipe(
      map((response: Movie) => {
        return response;
      })
    );
  }

  getMovieCast(movieID: string) {
    let url = '/movie/' + movieID + '/credits';
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getSimilarMovies(movieID: string) {
    let url = '/movie/' + movieID + '/similar';
    return this.http.get(url).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getCategoryMovies(genderID: string) {
    var data = {
      with_genres: genderID
    }
    let url = '/discover/movie';
    return this.http.get(url, { params: data }).pipe(
      map((response: MovieResponse) => {
        return response.results;
      })
    );
  }

  getMovieTrailerURL(movieID: string) {
    //_IqFJLdV13o
    let url = '/movie/' + movieID + '/videos';
    return this.http.get(url).pipe(
      map((response: TrailerResponse) => {
        let trailerList = response.results.filter(x => { return x.site == "YouTube" });
        if (trailerList.length != 0) {
          let trailer = trailerList[0];
          let youtubeURL = 'https://www.youtube.com/watch?v=' + trailer.key;
          return youtubeURL;
        } else {
          return null;
        }

      })
    );
  }

  getAccountStateForMovie(movieID: string) {

    let url = '/movie/' + movieID + '/account_states';
    let sessionID = this.authService.getSessionID();

    let queryString: any = {
      session_id: sessionID
    }
    return this.http.get(url, { params: queryString }).pipe(
      map((response: MovieStates) => {
        return response;
      })
    );
  }

























}
