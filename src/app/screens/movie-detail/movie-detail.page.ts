import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Cast } from 'src/app/models/cast';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movieID: string = "";
  movie: Movie;
  castList: Cast[] = [];
  similarMovies: Movie[] = [];

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.movieID = this.activatedRoute.snapshot.paramMap.get('movieID');
    setTimeout(() => {
      this.getMovieDetail();
      this.getMovieCast();
      this.getSimilarMovies();
    }, 500);
    
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  addMovieToList(){
    console.log("Add to list");
  }

  likeMovie() {
    console.log("Like Movie");
  }

  addMovieToWatchList() {
    console.log("Watch List");
  }

  rateMovie() {
    console.log("Rate List");
  }

  getMovieDetail() {
    this.movieService.getMovieDetail(this.movieID).subscribe(d => {
      console.log(d);
      this.movie = d;
    })

  }

  getMovieCast() {
    this.movieService.getMovieCast(this.movieID).subscribe(d => {
      let tmpCastList = d.cast as Cast[];
      this.castList = tmpCastList.length > 10 ? tmpCastList.slice(0,10) : tmpCastList;

      console.log(this.castList);
    });
  }


  getSimilarMovies() {
    this.movieService.getSimilarMovies(this.movieID).subscribe(d => {
      this.similarMovies = d;
    });
  }

}
