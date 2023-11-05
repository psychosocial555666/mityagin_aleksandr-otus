import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { reg } from 'src/common/const';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  newUserForm;
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {
    this.newUserForm = this.formBuilder.group({
      login: new FormControl('', [
        Validators.pattern(reg),
        Validators.required,
      ]),
      userName: new FormControl('', [Validators.minLength(2), Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
      passwordRepeat: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    const newUser = this.newUserForm.value;
    const { userName, login, password, passwordRepeat } = newUser;
    if (password === passwordRepeat && userName && login && password) {
      this.userService.createUser({ userName, login, password });
    }
  }
}
