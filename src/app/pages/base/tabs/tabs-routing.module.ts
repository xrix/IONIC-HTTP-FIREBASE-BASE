import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'login-fire',
        loadChildren: () => import('../login-fire/login-fire.module').then(m => m.LoginFirePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../../addons/home/home.module').then(m => m.HomePageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
