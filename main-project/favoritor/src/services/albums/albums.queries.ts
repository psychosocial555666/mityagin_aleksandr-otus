import { gql } from 'apollo-angular';

export const GET_ALBUMS = gql`
  query GetAlbums {
    getAlbums {
      id
      name
      logo
      rating
      genre
      author
      description
      impressions
      createdAt
    }
  }
`;

export const GET_ALBUM_BY_ID = gql`
  query GetAlbumById($albumId: ID) {
    getAlbumById(id: $albumId) {
      id
      name
      logo
      rating
      genre
      author
      year
      songs
      impressions
      createdAt
    }
  }
`;

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($albumData: NewAlbumInput) {
    createAlbum(albumData: $albumData) {
      album {
        id
        name
        logo
        rating
        genre
        author
        year
        songs
        impressions
        createdAt
      }
      error
    }
  }
`;

export const UPDATE_ALBUM = gql`
  mutation UpdateAlbum($albumData: AlbumInput) {
    updateAlbum(albumData: $albumData) {
      album {
        id
        name
        logo
        rating
        genre
        author
        year
        songs
        impressions
        createdAt
      }
      error
    }
  }
`;

export const DELETE_ALBUM = gql`
  mutation DeleteAlbum($deleteAlbumId: ID!) {
    deleteAlbum(id: $deleteAlbumId) {
      deleted
      error
    }
  }
`;
