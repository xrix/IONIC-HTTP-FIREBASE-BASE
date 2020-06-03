import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private hideTabBarPages: string[] = [
    'login', 'login-fire'
  ];
  routeParamPages: string[] = [
    'partner-detail', 'profile'
  ];
  constructor(
    private router: Router,
    private menu: MenuController,
    private platform: Platform) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  public hideTabs() {
    const tabBar = document.getElementById('mainTabBar');
    if (tabBar.style.display !== 'none') { tabBar.style.display = 'none'; }
    this.menu.isEnabled('first').then(v => {
      if (v) { this.menu.enable(false); }
    });
  }

  public showTabs() {
    const tabBar = document.getElementById('mainTabBar');
    if (tabBar.style.display !== 'flex') { tabBar.style.display = 'flex'; }
    this.menu.isEnabled('first').then(v => {
      if (!v) { this.menu.enable(true); }
    });
  }

  // A simple subscription that tells us what page we're currently navigating to.
  private navEvents() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.showHideTabs(e);
    });
  }

  private showHideTabs(e: any) {
    // Result:  e.url: "/tabs/groups/new-group?type=group"

    // Split the URL up into an array.
    const urlArray = e.url.split('/');
    // Result: urlArray: ["", "tabs", "groups", "new-group?type=group"]
    // Grab the parentUrl
    const pageUrlParent = urlArray[urlArray.length - 2];
    // Grab the last page url.
    const pageUrl = urlArray[urlArray.length - 1];
    // Result: new-group?type=group

    const page = pageUrl.split('?')[0];
    // Result: new-group
    // Check if it's a routeParamPage that we need to hide on
    const hideParamPage = this.routeParamPages.indexOf(pageUrlParent) > -1 && !isNaN(Number(page));
    // Check if we should hide or show tabs.
    const shouldHide = this.hideTabBarPages.indexOf(page) > -1 || hideParamPage;
    // Result: true

    // Not ideal to set the timeout, but I haven't figured out a better method to wait until the page is in transition...
    try {
      setTimeout(() => shouldHide ? this.hideTabs() : this.showTabs(), 100);
    } catch (err) {
    }
  }
}
