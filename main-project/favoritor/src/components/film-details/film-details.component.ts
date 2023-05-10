import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmType } from 'src/common/types';
import { FilmsService} from 'src/services/films/films.service';
import {
  SidebarModalService,
  MODAL_TITLES,
} from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent {
  film: FilmType | null = null;
  constructor(
    public sidebarModalService: SidebarModalService,
    public filmsService: FilmsService,
    public router: Router
  ) {
    this.film = this.filmsService.getCurrentFilm();
  }

  public editClickHandler() {
    this.router.navigate([
      {
        outlets: {
          modal: ['film', 'edit', this.filmsService.getCurrentFilm()?.id],
        },
      },
    ]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_FILM);
  }

  public linkClickHandler() {
    this.filmsService.getKinopoiskListByName();
  }
}
