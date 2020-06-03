import { Component, OnInit } from '@angular/core';
import { IUserCredential } from 'src/app/_interface/iuser-credential';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { OdooService } from 'src/app/_service/odoo.service';
import { NgForm } from '@angular/forms';
import { IOdooHttpResponse } from 'src/app/_interface/iodoo-http-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: IUserCredential = { login: '', password: '' };
  submitted = false;
  loading: HTMLIonLoadingElement;
  // tabElem: any;
  deviceInfo: any;

  constructor(
    // private device: Device,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private odoo: OdooService) {
      // this.tabElem = document.getElementById('mainTabBar');
    }

  ngOnInit() {
  }

  // ionViewDidEnter() {
  //  if (this.tabElem.style.display !== 'none') { this.tabElem.style.display = 'none'; }
  // }

  // ionViewDidLeave() {
  //  if (this.tabElem.style.display !== 'flex') { this.tabElem.style.display = 'flex'; }
  // }

  async onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      await this.showLoading();
      let result: IOdooHttpResponse;
      try {
        await this.odoo.login(this.user).then(res => {
          console.log('res', res);
          result = res;
        });
        await this.hideLoading();
        await this.handleLog(result);
        if (result.status === 200) {
          this.router.navigateByUrl('/tabs/home', {replaceUrl: true});
        }
      } catch (error) {
        result = error;
        await this.hideLoading();
        await this.handleError(error);
      }
    }
  }

  async showLoading(): Promise<void> {
    try {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    } catch (error) {
      this.handleError(error);
    }
  }

  hideLoading(): Promise<boolean> {
    return this.loading.dismiss();
  }

  async handleError(error): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{ text: 'Ok', role: 'cancel' }],
    });
    await alert.present();
  }

  async handleLog(result: IOdooHttpResponse): Promise<void> {
    let msg = '';
    let header = '';
    let subHeader = '';
    const status = result.status;
    if (status === 200) {
      header = 'Hi, ' + JSON.parse(result.data).username;
      subHeader = 'You have successfully login';
      msg = 'Lets continue..';
    } else if (status === -1) {
      header = 'Ouch!';
      msg = 'No connection to server!';
    } else {
      header = 'Ouch!';
      msg = 'Incorrect username or password.';
      subHeader = 'Try again..';
    }
    let alert;
    if (status === 200) {
      alert = await this.alertCtrl.create({
        message: msg,
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('/tabs/dashboard', {replaceUrl: true});
          },
        }],
        header,
        subHeader,
      });
    } else {
      alert = await this.alertCtrl.create({
        message: msg,
        buttons: [{ text: 'Ok', role: 'cancel' }],
        header,
        subHeader,
      });
    }
    await alert.present();
  }

  reset() {
    console.log('reset');
  }

  getDeviceInfo() {
    try {
      const di = {
        // cordova: this.device.cordova,
        // manufacturer: this.device.manufacturer,
        // model: this.device.model,
        // platform: this.device.platform,
        // version: this.device.version,
        // uuid: this.device.uuid,
        // serial: this.device.serial,
      };
      this.deviceInfo = di;
      console.log('Device info: ' + JSON.stringify(di));
    } catch (error) {
      console.log(error);
    }
  }

}
