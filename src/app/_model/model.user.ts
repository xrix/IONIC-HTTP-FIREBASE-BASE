import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class User {
  private odooData = 'Users';
  logedIn = false;
  uid: number;
  username: string;
  user_context: {
    uid: number;
    lang: string;
    tz: string;
    [key: string]: any;
  };
  company_id: number;
  access_token: string;
  expires_in: number;

  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.isLoggedIn().then(l => this.logedIn = l);
  }

  set(value, settingName?: string){
    const fld = settingName ? `setting:${ settingName }` : this.odooData;
    return this.storage.set(fld, value);
  }
  async get(settingName?: string){
    const fld = settingName ? `setting:${ settingName }` : this.odooData;
    return await this.storage.get(fld);
  }
  async remove(settingName?: string){
    const fld = settingName ? `setting:${ settingName }` : this.odooData;
    return await this.storage.remove(fld);
  }

  clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  setData(v: any) {
    this.set(v);
  }

  getData() {
    return this.get().then(result => result);
  }

  getAccess() {
    return this.get()
      .then(result => result.access_token);
      // .catch(e => console.log('access denied'));
  }

  isLoggedIn(): Promise<boolean> {
    return this.getAccess().then(d => {
      if (d.access_token !== undefined) {
        return true;
      } else {
        return false;
      }
    }).catch(() => false);
  }

  logout() {
    this.clear();
  }

  relogin() {
    this.router.navigateByUrl('/tabs-nav/login', {replaceUrl: true});
  }

}
