import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from 'src/app/_service/auth.service';
import { Router } from '@angular/router';
import { IFireUserCredential } from 'src/app/_interface/ifire-user-credential';

@Component({
  selector: 'app-login-fire',
  templateUrl: './login-fire.page.html',
  styleUrls: ['./login-fire.page.scss'],
})
export class LoginFirePage implements OnInit {
  @ViewChild(AuthFormComponent) loginForm: AuthFormComponent;
  // login: UserCredential; // = { email: '', password: '' };
  // submitted = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async loginUser(credentials: IFireUserCredential): Promise<void> {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.login(
        credentials.email,
        credentials.password
      );
      this.authService.userId = userCredential.user.uid;
      await this.loginForm.hideLoading();
      this.router.navigateByUrl('home');
    } catch (error) {
      await this.loginForm.hideLoading();
      this.loginForm.handleError(error);
    }
  }

  // onLogin(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {
  //     this.userData.login(this.login.email);
  //     this.router.navigateByUrl('/home');
  //   }
  // }
}
