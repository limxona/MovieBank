import { Genre } from "./genre";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any;
  production_countries: any;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieStates {
  favorite: boolean,
  id: Number,
  rated: any,
  watchlist: boolean
} 
