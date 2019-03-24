import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Cast } from 'src/app/models/cast';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movieID: string = "";
  movie: Movie;
  castList: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.movieID = this.activatedRoute.snapshot.paramMap.get('movieID');
    this.getMovieDetail();
    this.getMovieCast();
  }

  getMovieDetail() {
    
    /* this.movieService.getMovieDetail(this.movieID).subscribe(d => {
      console.log(d);
    }); */
    //this.movieService.getMovieDetail(this.movieID);
    this.movieService.getMovieDetail(this.movieID).subscribe(d => {
      console.log(d);
      this.movie = d;
    })

  }

  getMovieCast() {
    this.movieService.getMovieCast(this.movieID).subscribe(d => {
      this.castList = d.cast as Cast[];
      console.log(this.castList);
    });
  }

}
