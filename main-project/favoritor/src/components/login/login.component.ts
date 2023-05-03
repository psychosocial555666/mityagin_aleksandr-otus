import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/services/snackbar/snackbar.service';
import { UserService } from 'src/services/user/user.service';
import { reg } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm;
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public snackbarService: SnackbarService,
  ) {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', [
        Validators.pattern(reg),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    const user = this.loginForm.value;
    if (user && this.loginForm.valid) {
      const { login, password } = user;
      if (login && password) {
        this.userService.login(login, password);
      }
    } else {
      this.snackbarService.showSnackBar('error', 'Заполните все обязательные поля')
    }
  }
}
