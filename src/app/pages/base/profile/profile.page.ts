import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ELanguages } from 'src/app/_enum/elanguages.enum';
import { IOdooHttpResponse } from 'src/app/_interface/iodoo-http-response';
import { IRestParam } from 'src/app/_interface/irest-param';
import { AuthService } from 'src/app/_service/auth.service';
import { FireUser } from 'src/app/_model/model.fire.user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  languages = [];
  langCompare: any;

  uid: string;
  email: string;
  displayName: string;
  alias: string;

  constructor(
    private users: FireUser,
    private auth: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router) {
      Object.values(ELanguages).forEach(x => {
        this.languages.push(x);
      });
      this.langCompare = this.compareWithFn;
      this.setUser();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  }

  setUser() {
    this.users.get().then(res => {
      this.uid = res.uid;
      this.email = res.email;
      this.displayName = res.displatName;
      this.alias = res.alias;
    });
  }

  logout() {
    this.auth.logout();
    return this.router.navigate(['/login']);
  }
}
