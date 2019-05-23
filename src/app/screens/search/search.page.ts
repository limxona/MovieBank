/* Core */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

/* Servies */
import { MovieService } from 'src/app/services/movie/movie.service';
import { GenreService } from 'src/app/services/genre/genre.service';

/* Models */
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchText: string = '';
  //movieList: Observable<Array<Movie>>;
  movieList: Array<Movie> = [];
  private isDataLoaded: boolean = true;
  @ViewChild('searchbar') searchbar:IonSearchbar;

  constructor(
    private movieService: MovieService, 
    private genreService: GenreService,
    private keyboard: Keyboard) { }

  ngOnInit() {
    this.getAllGenders();
    //this.searchbar.setFocus();
    //this.keyboard.show();
  }

  getAllGenders() {
    this.genreService.getAllGenders().subscribe(d => {
      
    });
  }

  searchMovie(word: string){
    let search = word.trim();
    this.isDataLoaded = false;
    this.movieService.searchMovie(search).subscribe(d => {
      this.movieList = d;
      this.isDataLoaded = true;
    }, (error: any) => {
      this.movieList = [];
      this.isDataLoaded = true;
    });
  }

}
 