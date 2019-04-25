import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie';
import { GenderService } from 'src/app/services/gender/gender.service';
import { IonSearchbar } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchText: string = '';
  //movieList: Observable<Array<Movie>>;
  movieList: Array<Movie> = [];
  @ViewChild('searchbar') searchbar:IonSearchbar;

  constructor(
    private movieService: MovieService, 
    private genderService: GenderService,
    private keyboard: Keyboard) { }

  ngOnInit() {
    this.getAllGenders();
    this.searchbar.setFocus();
    this.keyboard.show();
  }

  getAllGenders() {
    this.genderService.getAllGenders().subscribe(d => {
      console.log(d);
    });
  }

  searchMovie(word: string){
    let search = word.trim();

    this.movieService.searchMovie(search).subscribe(d => {
      this.movieList = d;
      console.log(d);
    });
  }

}
 