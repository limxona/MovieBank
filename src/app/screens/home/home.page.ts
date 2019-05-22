import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { MovieService } from "src/app/services/movie/movie.service";
import { Movie } from "src/app/models/movie";
import { Observable } from "rxjs";
import { CoreService } from 'src/app/services/core/core.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  //movieList: Observable<Array<Movie>>;
  movieList: Movie[] = [];
  pageCount: number = 1;
  selectedCategory: string = "popular";
  isDataLoaded: boolean = false;
  constructor(private movieService: MovieService, private coreService: CoreService) {}

  ngOnInit(): void {
    this.getMovies("popular", 1);
  }

  private changeCategory(category: string) {
    this.movieList = [];
    this.pageCount = 1;
    this.getMovies(category, 1);
  }

  private getMovies(category: string, pageNumber: number) {
    this.isDataLoaded = false;
    switch (category) {
      case "upcoming":
        this.selectedCategory = "upcoming";
        this.movieService.getTopUpcomingMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      case "popular":
        this.selectedCategory = "popular";
        this.movieService.getPopularMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          this.coreService.hideLoadingIcon();
          this.isDataLoaded = true;
        });
        break;
      case "nowPlaying":
        this.selectedCategory = "nowPlaying";
        this.movieService.getTopNowPlayingMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      case "topRated":
        this.selectedCategory = "topRated";
        this.movieService.getTopRatedMovies(pageNumber).subscribe(movieResponse => {
          this.movieList = this.movieList.concat(movieResponse);
          this.infiniteScroll.complete();
          this.isDataLoaded = true;
        });
        break;
      default:
        break;
    }
  }

  loadMoreMovies() {
    this.pageCount = this.pageCount + 1;
    this.getMovies(this.selectedCategory, this.pageCount);
  }
}
