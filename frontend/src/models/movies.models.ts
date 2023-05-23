export interface Movie {
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
  type: MovieType;
  countries: Country[];
  genres: Genre[];
  serial: boolean;
  startYear?: number;
  endYear?: number;
  ratingAgeLimits: string;
}

export interface MoviePreview {
  filmId: string;
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

export interface SearchMoviesResult<ItemType> {
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
  createdAt: string;
}

export interface PremierMovie {
  kinopoiskId: string;
  nameRu?: string;
  nameEn?: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: Country[];
  genres: Genre[];
  duration?: number;
}

export interface SimilarMovie {
  filmId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface MovieVideo {
  name: string;
  url: string;
  site: MovieVideoSite;
}

export interface MovieImage {
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
  films: MoviePreview[];
}

export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}

export interface MovieFilters {
  countries?: string[];
  genres?: string[];
  order?: MoviesSortingOrder;
  type?: MovieType;
  ratingFrom?: string;
  ratingTo?: string;
  yearFrom?: string;
  yearTo?: string;
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

export enum MovieType {
  FILM = 'FILM',
  VIDEO = 'VIDEO',
  TV_SERIES = 'TV_SERIES',
  MINI_SERIES = 'MINI_SERIES',
  TV_SHOW = 'TV_SHOW',
  ALL = 'ALL',
}

export enum MoviesSortingOrder {
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

export enum MoviesTopType {
  TOP_250_BEST_FILMS = 'TOP_250_BEST_FILMS',
  TOP_100_POPULAR_FILMS = 'TOP_100_POPULAR_FILMS',
  TOP_AWAIT_FILMS = 'TOP_AWAIT_FILMS',
}

export enum MovieImageType {
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

export enum MovieVideoSite {
  YOUTUBE = 'YOUTUBE',
  KINOPOISK_WIDGET = 'KINOPOISK_WIDGET',
  UNKNOWN = 'UNKNOWN'
}
