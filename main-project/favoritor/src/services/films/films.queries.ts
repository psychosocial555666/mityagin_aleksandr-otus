import { gql } from 'apollo-angular';

export const GET_FILMS = gql`
  query getFilms {
    getFilms {
      name
      id
      logo
      country
      createdAt
      genre
      rating
    }
  }
`;

export const GET_FILM_BY_ID = gql`
  query GetFilmById($filmId: ID) {
    getFilmById(id: $filmId) {
      artists
      country
      createdAt
      description
      director
      genre
      id
      impressions
      logo
      name
      rating
      type
    }
  }
`;

export const CREATE_FILM = gql`
  mutation CreateFilm($filmData: NewFilmInput) {
    createFilm(filmData: $filmData) {
      film {
        id
        name
        type
        logo
        rating
        country
        genre
        director
        artists
        description
        impressions
        createdAt
      }
      error
    }
  }
`;

export const UPDATE_FILM = gql`
  mutation UpdateFilm($filmData: FilmInput) {
    updateFilm(filmData: $filmData) {
      film {
        id
        name
        type
        logo
        rating
        country
        genre
        director
        artists
        description
        impressions
        createdAt
      }
      error
    }
  }
`;

export const DELETE_FILM = gql`
  mutation DeleteFilm($deleteFilmId: ID!) {
    deleteFilm(id: $deleteFilmId) {
      deleted
      error
    }
  }
`;
