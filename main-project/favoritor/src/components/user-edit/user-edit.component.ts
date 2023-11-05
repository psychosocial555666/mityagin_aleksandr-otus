import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';
import { SnackbarService } from 'src/services/snackbar/snackbar.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  userEditForm;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.userEditForm = this.formBuilder.group({
      userName: new FormControl(userService.getUser()?.userName || '', [
        Validators.minLength(2),
        Validators.required,
      ]),
      password: new FormControl('', [Validators.minLength(8)]),
      passwordRepeat: new FormControl('', [Validators.minLength(8)]),
      about: new FormControl(userService.getUser()?.about || ''),
    });
  }

  onAvatarUpload(target: EventTarget | null) {
    const tar = target as HTMLInputElement;
    const file: File | undefined = tar?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      const upload$ = this.http.post('http://localhost:4000/avatar', formData);
      upload$.subscribe({
        next: (data: any) => {
          const url = 'http://localhost:4000/' + data.url;
          this.userService.patchUser({ avatar: url });
          this.snackbarService.showSnackBar('success', 'Загружено');
        },
        error: (error) => this.snackbarService.showSnackBar('error', error),
      });
    }
  }

  onSubmit() {
    const userData = this.userEditForm.value;
    const { password, passwordRepeat, userName, about } = userData;
    let user = {};
    if (!!password) {
      if (password === passwordRepeat) {
        user = { ...user, password };
      } else {
        this.snackbarService.showSnackBar('error', 'Пароли не совпадают');
        return;
      }
    }
    user = {
      ...user,
      userName: userName || '',
      about: about || '',
      avatar: this.userService.getUser()?.avatar,
    };
    this.userService.updateUser(user);
  }
}
