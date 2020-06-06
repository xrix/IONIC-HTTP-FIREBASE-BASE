import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class User {
  private odooData = 'res.users';
  logedIn = false;
  // odoouser: {
  //   uid: number;
  //   username: string;
  //   user_context: {
  //     uid: number;
  //     lang: string;
  //     tz: string;
  //     [key: string]: any;
  //   };
  //   company_id: number;
  //   access_token: string;
  //   expires_in: number;
  // };
  // fireuser: {
  //   displayName: string;
  //   email: string;
  //   emailVerified: string;
  //   phoneNumber: string;
  //   photoURL: any;
  //   refreshToken: string;
  // };

  constructor(
    private storage: Storage,
  ) {
    this.isLoggedIn().then(l => this.logedIn = l);
  }

  set(value, settingName?: string){
    const fld = settingName || this.odooData;
    console.log('user set', fld, value);
    return this.storage.set(fld, value);
  }
  async get(settingName?: string){
    const fld = settingName || this.odooData;
    return await this.storage.get(fld);
  }
  async remove(settingName?: string){
    const fld = settingName || this.odooData;
    return await this.storage.remove(fld);
  }
  clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  getAccess() {
    return this.get()
      .then(result => result.access_token);
      // .catch(e => console.log('access denied'));
  }

  isLoggedIn(): Promise<boolean> {
    return this.getAccess().then(d => !!d.access_token);
  }

  logout() {
    this.clear();
  }

}
