import { Component } from '@angular/core';
import { FilmsService } from 'src/services/films/films.service';
import { MainService } from 'src/services/main/main.service';
import {
  MODAL_TITLES,
  SidebarModalService,
} from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent {
  constructor(
    public sidebarModalService: SidebarModalService,
    public filmsService: FilmsService,
    public mainService: MainService
  ) {}

  openFilmCardHandler(id: string | undefined): void {
    if (!id) return;
    this.filmsService.requestFilmById(id);
    this.sidebarModalService.setOpened();
    this.sidebarModalService.setTitle(MODAL_TITLES.ABOUT_FILM);
  }
}
