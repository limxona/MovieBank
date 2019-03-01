import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchText: string = '';
  movieList: Observable<Array<Movie>>;
  movieListTmp: Array<Movie> = [];
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    //this.movieList = this.movieService.getTopNowPlayingMovies();
    this.movieService.getTopNowPlayingMovies().subscribe(d => {
      this.movieListTmp = d;
      console.log(d);
    });
  }


  searchMovie(search: string){
    console.log(search);
    //this.movieList = this.movieService.searchMovie(search);

    this.movieService.searchMovie(search).subscribe(d => {
      this.movieListTmp = d;
    });

  }

}
 