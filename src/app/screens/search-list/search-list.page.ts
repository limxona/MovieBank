import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.page.html',
  styleUrls: ['./search-list.page.scss'],
})
export class SearchListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  genderID: string = '';
  genderName: string = '';
  movieList: Movie[] = [];
  private pageCount: number = 1;
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.genderID = this.activatedRoute.snapshot.paramMap.get('genderID');
    this.genderName = this.activatedRoute.snapshot.paramMap.get('genderName');
    this.getMovies();
  }

  getMovies() {
    this.movieService.getCategoryMovies(this.genderID, this.pageCount).subscribe(movieResponse => {
      console.log("Category Movies: ", movieResponse);
      this.movieList = this.movieList.concat(movieResponse);
      this.infiniteScroll.complete();
    });
  }

  loadMoreMovies() {
    this.pageCount = this.pageCount + 1;
    this.getMovies();
  }

}
