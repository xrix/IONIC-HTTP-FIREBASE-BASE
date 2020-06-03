import { AuthFormComponent } from './../../components/auth-form/auth-form.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginFirePage } from './login-fire.page';

const routes: Routes = [
  {
    path: '',
    component: LoginFirePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginFirePage, AuthFormComponent]
})
export class LoginFirePageModule {}
