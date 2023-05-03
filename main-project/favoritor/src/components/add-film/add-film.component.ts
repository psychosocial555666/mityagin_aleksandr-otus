import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/services/films/films.service';
import { MODAL_TITLES, SidebarModalService } from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent {
  constructor(
    public sidebarModalService: SidebarModalService,
    public router: Router,
    public filmsService: FilmsService
  ) {}

  public addClickHandler() {
    this.filmsService.setCurrentFilm({
      id: '-1',
      name: '',
      description: '',
      rating: 0,
      logo: '',
      artists: [],
      director: '',
      country: '',
      impressions: '',
      genre: '',
      createdAt: new Date().toLocaleString(),
    });
    this.router.navigate([{ outlets: { modal: ['film', 'edit', '-1'] } }]);
    this.sidebarModalService.setOpened();
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.NEW_FILM);
  }
}
