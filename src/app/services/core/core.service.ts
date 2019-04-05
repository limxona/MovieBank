import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private alertController: AlertController) { }

  async showAlertMessage(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
 
}
