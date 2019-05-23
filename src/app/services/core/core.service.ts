/* Core */
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

/* Plugins */
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

  showLoadingIcon() {

    if(!this.loadingIcon) {
      this.loadingIcon = this.loadingCtrl.create({
        translucent: true
      }).then((res) => {
        res.present().then((r) => {
          console.log("Present Then: ", r);
        });

        console.log("Present Before: ", res);

      });
    }
    
    
    //await this.loadingIcon.present();
  }

  hideLoadingIcon() {
    console.log("Hide Before");
    if(this.loadingIcon) {
      this.loadingIcon.dismiss();
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
