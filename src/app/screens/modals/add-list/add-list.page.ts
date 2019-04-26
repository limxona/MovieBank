import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  createNewList() {

  }

  closeModal() {
    this.modalController.dismiss();
  }

}
