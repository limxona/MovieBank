/* Core */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

/* Services */
import { MovieService } from 'src/app/services/movie/movie.service';

/* Models */
import { Movie } from 'src/app/models/movie';

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
  private isDataLoaded: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.genderID = this.activatedRoute.snapshot.paramMap.get('genderID');
    this.genderName = this.activatedRoute.snapshot.paramMap.get('genderName');
    this.getMovies();
  }

  getMovies() {
    this.movieService.getCategoryMovies(this.genderID, this.pageCount).subscribe(movieResponse => {
      this.movieList = this.movieList.concat(movieResponse);
      this.infiniteScroll.complete();
      this.isDataLoaded = true;
    });
  }

  loadMoreMovies() {
    this.pageCount = this.pageCount + 1;
    this.getMovies();
  }

}
