import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabsService } from './_service/tabs.service';
import { FireUser } from './_model/model.fire.user';

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
    private router: Router,
    private user: FireUser
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
      this.router.navigateByUrl('/login', {replaceUrl: true});
    });
  }

  logout() {
    this.user.logout();
    this.menu.enable(false);
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }
}
