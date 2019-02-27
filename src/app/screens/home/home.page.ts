import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  private movieList: Array<Movie> = [];
  constructor(private movieService: MovieService) {


  }

  ngOnInit(): void {
    this.getPopularMovies();
    
  }


  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe(movieList => {
      this.movieList = movieList;
      console.log(this.movieList);
    })
  } 
 

}
