import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private alertController: AlertController,
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

  showBrowser(url: string) {


    /* const browser = this.inAppBrowser.create(url, '_blank');

    try {
      browser.on('exit').subscribe(event => {
        console.log(event);
        alert(event);
      });
    } catch (e) {
      console.log(e);
      //alert('heyyo');
    }
    

    //browser.close(); */


    this.safariViewController.isAvailable()
      .then((available: boolean) => {
          if (available) {

            this.safariViewController.show({
              url: url,
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#ff0000'
            })
            .subscribe((result: any) => {
                if(result.event === 'opened') console.log('Opened');
                else if(result.event === 'loaded') console.log('Loaded');
                else if(result.event === 'closed') console.log('Closed');
              },
              (error: any) => console.error(error)
            );

          } else {
            // use fallback browser, example InAppBrowser
          }
        });


   
  }

}
