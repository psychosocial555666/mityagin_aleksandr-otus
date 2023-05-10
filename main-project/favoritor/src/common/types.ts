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