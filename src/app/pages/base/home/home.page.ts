import { Component } from '@angular/core';
import { User } from 'src/app/_model/model.user';
import { IUserRestData } from 'src/app/_interface/iuser-rest-data';
import { IUserFire } from 'src/app/_interface/iuser-fire';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  odooUser: IUserRestData;
  fireUser: IUserFire;
  constructor(
    private user: User
  ) {}

  ionViewWillEnter(){
   this.user.get('res.users').then(res => this.odooUser = res);
   this.user.get('fireUser').then(res2 => this.fireUser = res2);
  }

  reload() {
    window.location.reload();
  }

}
