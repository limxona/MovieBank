import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private loadingIcon: any;
  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private safariViewController: SafariViewController
  ) { }

  async showAlertMessage(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showLoadingIcon() {

    if(!this.loadingIcon) {
      this.loadingIcon = await this.loadingCtrl.create({
        translucent: true
      });
    }
    
    
    await this.loadingIcon.present();
  }

  async hideLoadingIcon() {
    if(this.loadingIcon) {
      await this.loadingIcon.dismiss();
    }
  }


  showBrowser(url: string) {

    return this.safariViewController.show({
      url: url,
      hidden: false,
      animated: false,
      transition: 'slide',
      enterReaderModeIfAvailable: true,
      tintColor: '#ff0000'
    });

  }

}
