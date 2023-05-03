import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export enum MODAL_TITLES {
  NEW_FILM = 'Новый фильм',
  EDIT_FILM = 'Редактирование фильма',
  ABOUT_FILM = 'О Фильме',
}

@Injectable({
  providedIn: 'root',
})
export class SidebarModalService {
  public isOpened = false;
  public isEditing = false;
  public title: MODAL_TITLES = MODAL_TITLES.ABOUT_FILM;
  constructor(public router: Router) {
  }

  setOpened() {
    this.isOpened = true;
  }

  setTitle(title: MODAL_TITLES) {
    this.title = title;
  }

  setClosed() {
    this.isOpened = false;
    this.isEditing = false;
    this.router.navigateByUrl('/main/films');
  }

  enableEditing() {
    this.isEditing = true;
  }

  disableEditing() {
    this.isEditing = false;
  }
}
