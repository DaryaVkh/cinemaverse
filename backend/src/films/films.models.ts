export const FILMS_API_URL =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films';

export interface Film {
  kinopoiskId: string;
  nameRu?: string;
  nameEn?: string;
  nameOriginal?: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl?: string;
  reviewsCount: number;
  ratingKinopoisk?: number;
  webUrl: string;
  year?: number;
  filmLength?: number;
  description?: string;
  shortDescription?: string;
  type: FilmType;
  countries: Country[];
  genres: Genre[];
  serial: boolean;
  startYear?: number;
  endYear?: number;
  ratingAgeLimits: string;
}

export interface FilmPreview {
  filmId: number;
  nameRu?: string;
  nameEn?: string;
  year?: string;
  filmLength?: string;
  countries: Country[];
  genres: Genre[];
  rating?: string;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface ItemsPage<Item> {
  total: number;
  totalPages: number;
  items: Item[];
}

export interface SearchFilmsResult<ItemType> {
  total: number;
  items: ItemType[];
}

export interface CreateReviewDto {
  text: string;
  rating: number;
}

export interface Review {
  kinopoiskId: string;
  author: string;
  type: ReviewType;
  description: string;
  positiveRating: number;
  negativeRating: number;
}

export interface ApiReview {
  kinopoiskId: string;
  type: ReviewType;
  date: string;
  positiveRating: number;
  negativeRating: number;
  author: string;
  description: string;
}

export interface PremierFilm {
  kinopoiskId: number;
  nameRu?: string;
  nameEn?: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: Country[];
  genres: Genre[];
  duration?: number;
}

export interface SimilarFilm {
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface FilmVideo {
  name: string;
  url: string;
  site: FilmVideoSite;
}

export interface FilmImage {
  imageUrl: string;
  previewUrl: string;
}

export interface SeriesSeason {
  number: number;
  episodes: Episode[];
}

export interface Episode {
  seasonNumber: number;
  episodeNumber: number;
  nameRu: string;
  nameEn: string;
  synopsis: string;
  releaseDate: string;
}

export interface TopResult {
  pagesCount: number;
  films: FilmPreview[];
}

export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}

export interface FilmFilters {
  countries?: string[];
  genres?: string[];
  order?: FilmSortingOrder;
  type?: FilmType;
  ratingFrom?: number;
  ratingTo?: number;
  yearFrom?: number;
  yearTo?: number;
  keyword?: string;
  page?: number;
}

export interface GenreFilter {
  id: number;
  genre: string;
}

export interface CountryFilter {
  id: number;
  country: string;
}

export interface FilterValues {
  genres: GenreFilter[];
  countries: CountryFilter[];
}

export enum FilmType {
  FILM = 'FILM',
  VIDEO = 'VIDEO',
  TV_SERIES = 'TV_SERIES',
  MINI_SERIES = 'MINI_SERIES',
  TV_SHOW = 'TV_SHOW',
  ALL = 'ALL',
}

export enum FilmSortingOrder {
  RATING = 'RATING',
  NUM_VOTE = 'NUM_VOTE',
  YEAR = 'YEAR',
}

export enum Month {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export enum FilmsTopType {
  TOP_250_BEST_FILMS = 'TOP_250_BEST_FILMS',
  TOP_100_POPULAR_FILMS = 'TOP_100_POPULAR_FILMS',
  TOP_AWAIT_FILMS = 'TOP_AWAIT_FILMS',
}

export enum FilmImageType {
  STILL = 'STILL',
  SHOOTING = 'SHOOTING',
  POSTER = 'POSTER',
  FAN_ART = 'FAN_ART',
  PROMO = 'PROMO',
  CONCEPT = 'CONCEPT',
  WALLPAPER = 'WALLPAPER',
  COVER = 'COVER',
  SCREENSHOT = 'SCREENSHOT',
}

export enum ReviewType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  UNKNOWN = 'UNKNOWN',
}

export enum FilmVideoSite {
  YOUTUBE = 'YOUTUBE',
  KINOPOISK_WIDGET = 'KINOPOISK_WIDGET',
  UNKNOWN = 'UNKNOWN',
}
