import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.page.html',
  styleUrls: ['./search-list.page.scss'],
})
export class SearchListPage implements OnInit {

  genderID: string = '';
  genderName: string = '';
  movieList: Movie[] = [];
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.genderID = this.activatedRoute.snapshot.paramMap.get('genderID');
    this.genderName = this.activatedRoute.snapshot.paramMap.get('genderName');
    this.getMovies();
  }

  getMovies() {
    this.movieService.getCategoryMovies(this.genderID).subscribe(d => {
      console.log("Category Movies: ", d);
      this.movieList = d;
    });
  }

}
