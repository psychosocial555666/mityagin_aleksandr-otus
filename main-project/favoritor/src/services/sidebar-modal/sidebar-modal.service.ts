import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export enum MODAL_TITLES {
  NEW_FILM = 'Новый фильм',
  EDIT_FILM = 'Редактирование фильма',
  ABOUT_FILM = 'О фильме',
  NEW_BOOK = 'Новая книга',
  EDIT_BOOK = 'Редактирование книги',
  ABOUT_BOOK = 'О книге',
  NEW_ALBUM = 'Новый альбом',
  EDIT_ALBUM = 'Редактирование альбома',
  ABOUT_ALBUM = 'Об альбоме',
}

@Injectable({
  providedIn: 'root',
})
export class SidebarModalService {
  public isOpened = false;
  public isEditing = false;
  public title: MODAL_TITLES = MODAL_TITLES.ABOUT_FILM;
  constructor(public router: Router, private location: Location) {
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
    this.location.back();
  }
  
  setEditClosed() {
    this.isOpened = false;
    this.isEditing = false;
    this.location.back();
    this.location.back();
  }

  enableEditing() {
    this.isEditing = true;
  }

  disableEditing() {
    this.isEditing = false;
  }
}
