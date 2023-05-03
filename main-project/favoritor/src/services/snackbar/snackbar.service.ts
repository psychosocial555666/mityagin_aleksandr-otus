import { Injectable } from '@angular/core';

type SnackbarTypesType = 'error' | 'success' | 'warning';
type SnackbarType = {
  message: string;
  type: SnackbarTypesType;
};

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackbars: SnackbarType[] = [];
  constructor() {}

  public showSnackBar(type: SnackbarTypesType = 'error', message: string = '') {
    this.snackbars.push({ type, message });
    setTimeout(() => {
      this.snackbars.shift();
    }, 3000);
  }

  closeHandler() {
    this.snackbars = [];
  }
}
