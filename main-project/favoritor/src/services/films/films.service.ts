import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SnackbarService } from '../snackbar/snackbar.service';
import { CREATE_FILM, DELETE_FILM, GET_FILMS, GET_FILM_BY_ID, UPDATE_FILM } from './films.queries';

export type ShortFilmType = {
  id: string;
  name: string;
  logo: string | null;
  rating: number;
  country: string;
  genre: string;
  createdAt: string;
};

export type FilmInputType = {
  name?: string | null;
  id?: string | null;
  type?: string | null;
  logo?: string | null;
  rating?: number | null;
  country?: string | null;
  genre?: string | null;
  createdAt?: string | null;
  director?: string | null;
  artists?: string[] | null;
  description?: string | null;
  impressions?: string | null;
};

export type FilmType = {
  id: string;
  name: string;
  logo: string;
  type?: string;
  rating: number;
  country: string;
  genre: string;
  createdAt: string;
  director: string;
  artists: string[];
  description: string;
  impressions: string;
};

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private films: ShortFilmType[] = [];
  private currentFilm: FilmType | null = null;
  constructor(
    private apollo: Apollo,
    private snackbarService: SnackbarService
  ) {
    this.requestFilms = this.requestFilms.bind(this);
    this.setCurrentFilm = this.setCurrentFilm.bind(this);
  }

  setFilms(films: ShortFilmType[]): void {
    this.films = films;
  }

  getFilms(): ShortFilmType[] {
    return this.films;
  }

  setCurrentFilm(film: FilmType | null): void {
    this.currentFilm = film;
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
    this.setFilms(this.films.filter(film => film.id !== id));
  }
  
  updateFilmsWithFilm(film: FilmType): void {
    const index = this.films.findIndex(f => f.id === film.id);
    const result = [...this.films]
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
}
