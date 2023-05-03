import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmsService } from 'src/services/films/films.service';
import { MODAL_TITLES, SidebarModalService } from 'src/services/sidebar-modal/sidebar-modal.service';
import { SnackbarService } from 'src/services/snackbar/snackbar.service';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.scss'],
})
export class FilmFormComponent {
  filmEditForm;
  constructor(
    private formBuilder: FormBuilder,
    public filmsService: FilmsService,
    private http: HttpClient,
    public router: Router,
    public sidebarModalService: SidebarModalService,
    private snackbarService: SnackbarService
  ) {
    const film = filmsService.getCurrentFilm();
    this.filmEditForm = this.formBuilder.group({
      name: new FormControl(film?.name || '', [Validators.required]),
      type: new FormControl(film?.type || ''),
      country: new FormControl(film?.country || ''),
      genre: new FormControl(film?.genre || ''),
      director: new FormControl(film?.director || ''),
      artists: new FormControl(film?.artists?.join(', ') || ''),
      description: new FormControl(film?.description || ''),
      impressions: new FormControl(film?.impressions || ''),
    });
  }

  onLogoUpload(target: EventTarget | null) {
    const tar = target as HTMLInputElement;
    const file: File | undefined = tar?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('logo', file);
      const upload$ = this.http.post('http://localhost:4000/films', formData);
      upload$.subscribe({
        next: (data: any) => {
          const url = 'http://localhost:4000/' + data.url;
          this.filmsService.updateCurrentFilm({ logo: url });
          this.snackbarService.showSnackBar('success', 'Загружено');
        },
        error: (error) => this.snackbarService.showSnackBar('error', error),
      });
    }
  }

  onSubmit(): void {
    let currentFilm = this.filmsService.getCurrentFilm();
    let filmData = {
      ...this.filmEditForm.value,
      logo: currentFilm?.logo,
      rating: Number(currentFilm?.rating),
      artists: this.filmEditForm.value.artists?.split(', '),
    };
    if (currentFilm?.id !== '-1') {
      this.filmsService.updateFilm({...filmData, id: currentFilm?.id });
    } else {
      this.filmsService.createFilm(filmData);
    }
    this.sidebarModalService.disableEditing();
    this.router.navigate([{ outlets: { modal: ['film', currentFilm?.id] } }]);
  }

  onDelete(): void {
    let currentFilm = this.filmsService.getCurrentFilm();
    if (currentFilm?.id) {
      this.filmsService.deleteFilm(currentFilm?.id);
    }
    this.sidebarModalService.setClosed();
  }

  public updateRating(rating: number) {
    this.filmsService.updateCurrentFilm({ rating });
  }

  public editClickHandler() {
    this.router.navigate([{ outlets: { modal: ['film', 'edit', this.filmsService.getCurrentFilm()?.id ] }}]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_FILM);
  }
}
