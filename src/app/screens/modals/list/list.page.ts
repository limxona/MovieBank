import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account/account.service';
import { UserList } from 'src/app/models/user-list';
import { ListService } from 'src/app/services/list/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private userLists: UserList[] = [];
  private selectedListID: number;
  @Input() movieID: string;

  constructor(
    private modalController: ModalController,
    private listService: ListService
    ) { }

  ngOnInit() {
    console.log(this.movieID);

    this.getUserLists();
  }

  getUserLists() {
    this.listService.getCreatedLists().subscribe(d => {
      console.log(d);
      this.userLists = d;
    });
  }

  private selectList(item: UserList) {
    this.selectedListID = item.id;
  }

  private saveMovie() {
    this.listService.addMovieToList(this.selectedListID, this.movieID).subscribe(result => {
      if(result) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
