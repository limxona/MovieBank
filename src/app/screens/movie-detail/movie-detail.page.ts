import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Cast } from 'src/app/models/cast';
import { NavController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movieID: string = "";
  private trailerURL: any = null;
  movie: Movie;
  castList: Cast[] = [];
  similarMovies: Movie[] = [];
  rate: number = 0;

  constructor(private navCtrl: NavController,
     private activatedRoute: ActivatedRoute, 
     private movieService: MovieService,
     private accountService: AccountService,
     private modalController: ModalController) { }


  ngOnInit() {
    this.movieID = this.activatedRoute.snapshot.paramMap.get('movieID');
    setTimeout(() => {
      this.getMovieDetail();
      this.getMovieCast();
      this.getSimilarMovies();
      this.getMovieTrailer();
      this.getAccountStateForMovie();
      
    }, 500);
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  addMovieToList(){
    this.accountService.addMovieToList().subscribe(d => {
      console.log("AddMovie: ", d);
    });
  }

  likeMovie() {
    this.accountService.markAsFavorite(Number(this.movieID), 'movie', true).subscribe(d => {
      console.log("Favorite Result: ", d);
    });
  }

  addMovieToWatchList() {
    console.log("Watch List");
    this.accountService.addToWatchList(Number(this.movieID), 'movie', true).subscribe(d => {
      console.log(d);
    });
  }

  rateMovie(i: any) {
    if(i == this.rate) {
      this.rate = 0;
      this.accountService.deleteRate(this.movieID).subscribe(d => { console.log(d); });
    }
    else {
      this.rate = i;
      this.accountService.rateMovie(this.movieID, this.rate).subscribe(d => {

      });
    }
    console.log("Rate List :", i);
  }

  showMovieTrailer() {
    console.log("Trailer URL :", this.trailerURL);
  }

  shareMovie() {
    console.log("share Movie");
  }

  getMovieDetail() {
    this.movieService.getMovieDetail(this.movieID).subscribe(d => {
      console.log(d);
      this.movie = d;
    })

  }

  getAccountStateForMovie() {
    this.movieService.getAccountStateForMovie(this.movieID).subscribe(d => {});
  }

  getMovieCast() {
    this.movieService.getMovieCast(this.movieID).subscribe(d => {
      let tmpCastList = d.cast as Cast[];
      this.castList = tmpCastList.length > 10 ? tmpCastList.slice(0,10) : tmpCastList;

      console.log(this.castList);
    });
  }

  getMovieTrailer() {
    this.movieService.getMovieTrailerURL(this.movieID).subscribe(d => {
      this.trailerURL = d;
    });
  }


  getSimilarMovies() {
    this.movieService.getSimilarMovies(this.movieID).subscribe(d => {
      this.similarMovies = d;
    });
  }

}
