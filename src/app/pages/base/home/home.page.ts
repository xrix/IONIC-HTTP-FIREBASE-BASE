import { Component } from '@angular/core';
import { IUserFire } from 'src/app/_interface/iuser-fire';
import { FireUser } from 'src/app/_model/model.fire.user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fireUser: IUserFire;
  constructor(
    private user: FireUser
  ) {}

  ionViewWillEnter(){
   this.user.get().then(res => this.fireUser = res);
  }

  reload() {
    window.location.reload();
  }

}
