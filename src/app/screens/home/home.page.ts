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

  private movieList: Observable<Array<Movie>>;
  selectedSegment: string = "latest";
  constructor(private movieService: MovieService) {


  }

  ngOnInit(): void {
    this.getMovies();

  }



  private getMovies() {
    switch (this.selectedSegment) {
      case 'latest':
        this.movieList = this.movieService.getTopRatedMovies();
        break;
      case 'popular':
      this.movieList = this.movieService.getPopularMovies();
        break;
      case 'nowPlaying':
      this.movieList = this.movieService.getTopNowPlayingMovies();
        break;
      case 'topRated':
      this.movieList = this.movieService.getTopRatedMovies();
        break;
      case 'upcoming':
      this.movieList = this.movieService.getTopUpcomingMovies();
        break;
      default:
        break;
    }

  }


}
