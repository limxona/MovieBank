import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre/genre.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  genderList: Observable<Genre[]>; 
  constructor(private genreService: GenreService) { }

  ngOnInit() {
    this.getAllGenders(); 
  }


  getAllGenders() {
    this.genderList = this.genreService.getAllGenders();

  }

}
