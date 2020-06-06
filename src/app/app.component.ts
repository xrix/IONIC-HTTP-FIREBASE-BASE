import { User } from 'src/app/_model/model.user';
import { Router } from '@angular/router';
import { OdooService } from 'src/app/_service/odoo.service';
import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabsService } from './_service/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tabs: TabsService,
    private menu: MenuController,
    private odoo: OdooService,
    private router: Router,
    private user: User
    ) {
    this.initializeApp();
  }
  ngOnInit() {
    this.cekLoginStatus();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(true);
    });
  }

  cekLoginStatus() {
    this.user.isLoggedIn().then(access => {
      setTimeout(() => {
        console.log('loged In, menu enabled', access);
        this.router.navigateByUrl('/tabs/home', {replaceUrl: true});
      }, 100);
    })
    .catch((e) => {
      console.log('not logged in, menu disabled', e);
      this.router.navigateByUrl('/tabs/login', {replaceUrl: true});
    });
  }

  logout() {
    this.odoo.logout()
      .then(() => {
        this.menu.enable(false);
        this.router.navigateByUrl('/tabs/login', {replaceUrl: true});
      });
  }
}
