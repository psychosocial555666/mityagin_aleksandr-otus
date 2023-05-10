import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ShortFilmType, FilmType, FilmInputType } from 'src/common/types';
import { filterBySearch } from 'src/common/utils';
import { MainService } from '../main/main.service';
import { MODAL_TITLES, SidebarModalService } from '../sidebar-modal/sidebar-modal.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import {
  CREATE_FILM,
  DELETE_FILM,
  GET_FILMS,
  GET_FILM_BY_ID,
  UPDATE_FILM,
} from './films.queries';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private films: ShortFilmType[] = [];
  private filteredFilms: ShortFilmType[] = [];
  private currentFilm: FilmType | null = null;
  public isDataLoading: boolean = false;
  public isPersonsLoading: boolean = false;
  constructor(
    private apollo: Apollo,
    private sidebarModalService: SidebarModalService,
    private snackbarService: SnackbarService,
    private mainService: MainService,
    public router: Router
  ) {
    this.requestFilms = this.requestFilms.bind(this);
    this.setCurrentFilm = this.setCurrentFilm.bind(this);
  }

  setFilms(films: ShortFilmType[]): void {
    this.films = films;
    this.filterFilms();
  }

  setFiltered(films: ShortFilmType[]) {
    this.filteredFilms = films;
  }

  getFilms(): ShortFilmType[] {
    return this.films;
  }

  getFiltered(): ShortFilmType[] {
    return this.filteredFilms;
  }

  setCurrentFilm(film: FilmType | null): void {
    this.currentFilm = film;
    console.log(this.currentFilm);
  }

  getCurrentFilm() {
    return this.currentFilm;
  }

  updateCurrentFilm(input: FilmInputType): void {
    const result = { ...this.currentFilm, ...input } as FilmType;
    this.setCurrentFilm(result);
  }

  includeFilm(film: FilmType): void {
    const result = [...this.films];
    result.push(film);
    this.setFilms(result);
  }

  excludeFilm(id: string): void {
    this.setFilms(this.films.filter((film) => film.id !== id));
  }

  updateFilmsWithFilm(film: FilmType): void {
    const index = this.films.findIndex((f) => f.id === film.id);
    const result = [...this.films];
    result.splice(index, 1, film);
    this.setFilms(result);
  }

  requestFilms() {
    this.apollo
      .query({
        query: GET_FILMS,
      })
      .subscribe({
        next: (value: any) => {
          const { getFilms } = value.data;
          this.setFilms(getFilms);
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  filterFilms() {
    const filtered = this.films.filter((film) =>
      filterBySearch(film, this.mainService.search)
    );
    this.setFiltered(filtered);
  }

  requestFilmBhyId(id: string) {
    this.apollo
      .query({
        query: GET_FILM_BY_ID,
        variables: {
          filmId: id,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { getFilmById } = value.data;
          this.setCurrentFilm(getFilmById);
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  createFilm(filmData: FilmInputType) {
    this.apollo
      .mutate({
        mutation: CREATE_FILM,
        variables: {
          filmData,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { createFilm, error } = value.data;
          if (createFilm) {
            this.snackbarService.showSnackBar('success', 'Готово!');
            this.setCurrentFilm(createFilm);
            this.includeFilm(createFilm);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  updateFilm(filmData: FilmInputType) {
    this.apollo
      .mutate({
        mutation: UPDATE_FILM,
        variables: {
          filmData,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { updateFilm, error } = value.data;
          if (updateFilm) {
            this.snackbarService.showSnackBar('success', 'Изменено');
            this.setCurrentFilm(updateFilm);
            this.updateFilmsWithFilm(updateFilm);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  deleteFilm(deleteFilmId: string) {
    this.apollo
      .mutate({
        mutation: DELETE_FILM,
        variables: {
          deleteFilmId,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { deleted, error } = value.data?.deleteFilm;
          if (deleted) {
            this.snackbarService.showSnackBar('success', 'Удалено');
            this.setCurrentFilm(null);
            this.excludeFilm(deleteFilmId);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  getKinopoiskListByName() {
    this.isDataLoading = true;
    this.isPersonsLoading = true;
    fetch(
      ` https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${
        this.getCurrentFilm()?.name || ''
      }&page=1`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': '9506826a-ba69-4576-b1ae-c26f9992c8b4',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        const { filmId } = json.films[0];
        this.getKinopoiskData(filmId);
        this.getKinopoiskPersons(filmId);
      })
      .catch((err) => console.log(err));
  }

  getKinopoiskData(id: number) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': '9506826a-ba69-4576-b1ae-c26f9992c8b4',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.isDataLoading = false;
        let filmFromData = {
          name: data.nameRu,
          logo: data.posterUrlPreview,
          country: data.countries
            .map((country: { country: string }) => country.country)
            .join(', '),
          genre: data.genres
            .map((genre: { genre: string }) => genre.genre)
            .join(', '),
          description: data.description,
          type: data.type === 'FILM' ? 'Фильм' : 'Сериал',
        };
        this.updateCurrentFilm(filmFromData);
        if(!this.isPersonsLoading) {
          this.enableEdit();
        }
      })
      .catch((err) => console.log(err));
  }

  getKinopoiskPersons(id: number) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': '9506826a-ba69-4576-b1ae-c26f9992c8b4',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.isPersonsLoading = false;
        let filmFromData = {
          director: data
            .filter(
              (item: { professionKey: string }) =>
                item.professionKey === 'DIRECTOR'
            )
            .map((item: { nameRu: string }) => item.nameRu)
            .slice(0, 10)
            .join(', '),
          artists: data
            .filter(
              (item: { professionKey: string }) =>
                item.professionKey === 'ACTOR'
            )
            .map((item: { nameRu: string }) => item.nameRu)
            .slice(0, 10),
        };
        this.updateCurrentFilm(filmFromData);
        if(!this.isDataLoading) {
          this.enableEdit();
        }
      })
      .catch((err) => console.log(err));
  }

  enableEdit() {
    this.router.navigate([
      {
        outlets: {
          modal: ['film', 'edit', this.getCurrentFilm()?.id],
        },
      },
    ]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_FILM);
  }
}
