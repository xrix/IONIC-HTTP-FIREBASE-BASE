import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from 'src/app/_service/auth.service';
import { Router } from '@angular/router';
import { IFireUserCredential } from 'src/app/_interface/ifire-user-credential';
import { User } from 'src/app/_model/model.user';

@Component({
  selector: 'app-login-fire',
  templateUrl: './login-fire.page.html',
  styleUrls: ['./login-fire.page.scss'],
})
export class LoginFirePage implements OnInit {
  @ViewChild(AuthFormComponent) loginForm: AuthFormComponent;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {}

  async loginUser(credentials: IFireUserCredential): Promise<void> {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.login(
        credentials.email,
        credentials.password
      );
      this.authService.userId = userCredential.user.uid;
      await this.loginForm.hideLoading();
      console.log('userCredential', userCredential);
      this.router.navigateByUrl('/tabs/home');
    } catch (error) {
      await this.loginForm.hideLoading();
      this.loginForm.handleError(error);
    }
  }

}
