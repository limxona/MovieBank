import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  movieList: Observable<Array<Movie>>;
  selectedCategory: string = 'popular';
  constructor(private movieService: MovieService) {


  }

  ngOnInit(): void {
    this.getMovies('popular');

  }



  private getMovies(category) {
    switch (category) {
      case 'latest':
      this.selectedCategory = 'latest';
        this.movieList = this.movieService.getLatestMovies();
        break;
      case 'popular':
      this.selectedCategory = 'popular';
      this.movieList = this.movieService.getPopularMovies();
        break;
      case 'nowPlaying':
      this.selectedCategory = 'nowPlaying';
      this.movieList = this.movieService.getTopNowPlayingMovies();
        break;
      case 'topRated':
      this.selectedCategory = 'topRated';
      this.movieList = this.movieService.getTopRatedMovies();
        break;
      case 'upComing':
      this.selectedCategory = 'upComing';
      this.movieList = this.movieService.getTopUpcomingMovies();
        break;
      default:
        break;
    }

  }


}
