import { Component, OnInit } from '@angular/core';
import { GenderService } from 'src/app/services/gender/gender.service';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/models/gender';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  genderList: Observable<Gender[]>; 
  constructor(private genderService: GenderService) { }

  ngOnInit() {
    this.getAllGenders();
  }


  getAllGenders() {
    this.genderList = this.genderService.getAllGenders();

  }

}
