import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/model.user';
import { OdooService } from 'src/app/_service/odoo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ELanguages } from 'src/app/_enum/elanguages.enum';
import { IOdooHttpResponse } from 'src/app/_interface/iodoo-http-response';
import { IRestParam } from 'src/app/_interface/irest-param';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  languages = [];
  langCompare: any;
  usrlang = '';
  partner: any;
  partnerId: number;
  currentUser: any;
  imageSmall: any;

  constructor(
    private users: User,
    private odoo: OdooService,
    private auth: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router) {
      Object.values(ELanguages).forEach(x => {
        this.languages.push(x);
      });
      this.langCompare = this.compareWithFn;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPartner();
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  }

  async getDataByModelFieldsId(model: string, fields: Array<string> | 'default', id: number) {
    let results: IOdooHttpResponse;
    const params: IRestParam = {
      model, id, fields };
    await this.odoo.read(params)
        .then(res => results = res )
        .catch (error => results = error);
    return results;
  }

  async getUserPartner(): Promise<number> {
    this.currentUser = await this.users.get().then(v => {
      console.log('currentUser', v);
      return v;
    });
    const uid = this.currentUser.uid ? this.currentUser.uid : this.actRoute.snapshot.paramMap.get('id');
    const pId = await this.getDataByModelFieldsId('res.users', ['partner_id'], uid)
      .then(u => {
        return JSON.parse(u.data).data[0].partner_id[0];
      });
    return pId;
  }

  async getPartner() {
    const upId = await this.getUserPartner().then(m => m);
    this.partnerId = upId;
    this.partner = await this.getDataByModelFieldsId('res.partner', 'default', upId)
    .then(p => JSON.parse(p.data).data[0]);
  }

  showUser() {
    alert(JSON.stringify(this.currentUser));
  }

  showPartner() {
    alert(JSON.stringify(this.partner));
  }

  update() {
    this.getPartner();
  }

  logout() {
    this.logoutOdoo();
    this.logoutFire();
    return this.router.navigate(['']);
  }

  logoutOdoo() {
    return this.auth.logout();
  }

  logoutFire() {
    return this.odoo.logout();
  }

}
