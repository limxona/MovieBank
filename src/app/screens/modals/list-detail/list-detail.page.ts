/* Core */
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

/* Services */
import { ListService } from 'src/app/services/list/list.service';

/* Models */
import { Movie } from 'src/app/models/movie';
import { UserList, ListDetail } from 'src/app/models/user-list';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {

  @Input() userList: UserList;
  private listDetail: ListDetail;
  private isDataLoaded: boolean = true;
  constructor(private modalController: ModalController, private listService: ListService) { }

  ngOnInit() {
    this.getMovies();
  }

  private getMovies() {
    this.isDataLoaded = false;
    this.listService.getListsDetail(this.userList.id).subscribe(result => {
      this.listDetail = result;
      this.isDataLoaded = true;
    });
  }

  private removeMovieFromList(movie: Movie) {
    console.log(movie);
    this.listService.removeMovieFromList(movie.id, this.userList.id).subscribe(result => {
      console.log(result);
      if(result) {
        this.getMovies();
      }
    });
  }

  private closeModal() {
    this.modalController.dismiss();
  }

}
