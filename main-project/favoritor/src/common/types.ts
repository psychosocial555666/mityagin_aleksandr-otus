export type ShortFilmType = {
  id: string;
  name: string;
  logo: string | null;
  rating: number;
  country: string;
  genre: string;
  createdAt: string;
};

export type ExternalFilmType = {
  filmId: number;
  name: string;
  logo: string | null;
  year: string;
};

export type ExternalAlbumType = {
  albumId: number;
  name: string;
  logo: string | null;
  author: string;
};

export type ExternalBookType = {
  bookId: number;
  name: string;
  logo: string | null;
  author: string;
  description: string,
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
  director?: string[] | null;
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
  director: string[];
  artists: string[];
  description: string;
  impressions: string;
};

export type ShortBookType = {
  id: string;
  name: string;
  logo: string | null;
  rating: number;
  author: string;
  genre: string;
  createdAt: string;
};

export type BookInputType = {
  id?: string | null;
  name?: string | null;
  logo?: string | null;
  rating?: number | null;
  author?: string | null;
  genre?: string | null;
  createdAt?: string | null;
  description?: string | null;
  impressions?: string | null;
};

export type BookType = {
  id?: string | null;
  name?: string | null;
  logo?: string | null;
  rating?: number | null;
  author?: string | null;
  genre?: string | null;
  createdAt?: string | null;
  description?: string | null;
  impressions?: string | null;
};

export type ShortAlbumType = {
  id?: string | null;
  name?: string | null;
  logo?: string | null;
  rating?: number | null;
  genre?: string | null;
  author?: string | null;
  year?: string | null;
  createdAt?: string | null;
};

export type AlbumInputType = {
  id?: string | null;
  name?: string | null;
  logo?: string | null;
  rating?: number | null;
  genre?: string | null;
  author?: string | null;
  year?: string | null;
  songs?: string[] | null;
  impressions?: string | null;
  createdAt?: string | null;
};

export type AlbumType = {
  id?: string | null;
  name?: string | null;
  logo?: string | null;
  rating?: number | null;
  genre?: string | null;
  author?: string | null;
  year?: string | null;
  songs?: string[] | null;
  impressions?: string | null;
  createdAt?: string | null;
};