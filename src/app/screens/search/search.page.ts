import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { GenderService } from 'src/app/services/gender/gender.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchText: string = '';
  //movieList: Observable<Array<Movie>>;
  movieList: Array<Movie> = [];
  constructor(private movieService: MovieService, private genderService: GenderService) { }

  ngOnInit() {
    this.getAllGenders();
    this.searchMovie('test');
  }

  getAllGenders() {
    this.genderService.getAllGenders().subscribe(d => {
      console.log(d);
    });

  }

  searchMovie(search: string){
    console.log(search);
    //this.movieList = this.movieService.searchMovie(search);

    this.movieService.searchMovie(search).subscribe(d => {
      this.movieList = d;
      console.log(d);
    });

  }

}
 