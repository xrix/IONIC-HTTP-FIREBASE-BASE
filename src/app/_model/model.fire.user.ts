import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class FireUser {
    private model = 'fireUser';
    uid: string;
    email: string;
    displayName: string;
    alias: string;

    constructor(
    private storage: Storage) {}

    set(value, settingName?: string){
      const fld = settingName || this.model;
      console.log('user set', fld, value);
      return this.storage.set(fld, value);
    }
    async get(settingName?: string){
      const fld = settingName || this.model;
      return await this.storage.get(fld);
    }
    async remove(settingName?: string){
      const fld = settingName || this.model;
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
    }

    isLoggedIn(): Promise<boolean> {
      return this.getAccess().then(d => !!d.uid);
    }

    logout() {
      this.clear();
    }
}
