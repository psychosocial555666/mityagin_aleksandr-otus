import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';
import { CREATE_USER, LOGIN, UPDATE_USER } from './user.queries';

type UserType = {
  userName?: string;
  login?: string;
  password?: string;
  about?: string;
  avatar?: string | null;
} | null;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: UserType = null;
  private token: string | null = null;
  constructor(
    private apollo: Apollo,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  setUser(value: UserType) {
    this.user = value;
  }

  patchUser(value: UserType) {
    this.user = { ...this.user, ...value };
  }

  getUser(): UserType {
    return this.user;
  }

  setToken(value: string | null) {
    this.token = value;
  }

  getToken(): string | null {
    return this.token;
  }

  createUser(user: UserType) {
    this.apollo
      .mutate({
        mutation: CREATE_USER,
        variables: {
          userData: user,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { createUser } = value.data;
          const { user, error } = createUser;
          if (user) {
            this.setUser(user);
            this.router.navigateByUrl('/');
            this.snackbarService.showSnackBar('success', 'Готово!');
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  login(login: string, password: string) {
    this.apollo
      .mutate({
        mutation: LOGIN,
        variables: {
          login,
          password,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { login } = value.data;
          const { user, token, error } = login;
          if (user && token) {
            localStorage.setItem('token', token);
            this.setUser(user);
            this.router.navigateByUrl('/main/films');
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }
  logout() {
    this.setUser(null);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  updateUser(userData: UserType) {
    this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          userData,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { updateUser } = value.data;
          const { user, error } = updateUser;
          if (user) {
            this.snackbarService.showSnackBar('success', 'Готово!');
            this.setUser(user);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }
}
