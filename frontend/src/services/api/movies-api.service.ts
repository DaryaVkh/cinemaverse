import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateReviewDto,
  Movie,
  MovieFilters,
  MovieImage,
  MovieImageType,
  MoviesTopType,
  MovieVideo,
  FilterValues,
  ItemsPage,
  Month,
  PremierMovie,
  Review,
  SearchMoviesResult,
  SeriesSeason,
  SimilarMovie,
  TopResult
} from '../../models/movies.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  private readonly requestUrlPrefix = '/films';

  constructor(private readonly apiService: ApiService) {}

  public getMovieList(movieFilters?: MovieFilters): Observable<ItemsPage<Movie>> {
    const requestUrl = Object.entries(movieFilters ?? {}).reduce(
      (url, [filterName, filterValue]) => {
        if (filterValue !== undefined && filterValue !== null) {
          if (url[url.length - 1] !== '?') {
            return url + `&${filterName}=${filterValue}`;
          }
          return url + `${filterName}=${filterValue}`;
        }
        return url;
      },
      `${this.requestUrlPrefix}?`,
    );
    return this.apiService.get<ItemsPage<Movie>>(
      requestUrl[requestUrl.length - 1] === '?'
        ? requestUrl.slice(0, -1)
        : requestUrl
    );
  }

  public getMovie(movieId: string): Observable<Movie> {
    return this.apiService.get<Movie>(`${this.requestUrlPrefix}/${movieId}`);
  }

  public getPremieres(
    year: number,
    month: Month,
  ): Observable<SearchMoviesResult<PremierMovie>> {
    return this.apiService.get<SearchMoviesResult<PremierMovie>>(`${this.requestUrlPrefix}/premieres?year=${year}&month=${month}`);
  }

  public getFilterValues(): Observable<FilterValues> {
    return this.apiService.get<FilterValues>(`${this.requestUrlPrefix}/filters`);
  }

  public getTop(
    type: MoviesTopType = MoviesTopType.TOP_250_BEST_FILMS,
    page = 1,
  ): Observable<TopResult> {
    return this.apiService.get<TopResult>(`${this.requestUrlPrefix}/top?page=${page}&type=${type}`);
  }

  public getSimilars(
    id: string,
  ): Observable<SearchMoviesResult<SimilarMovie>> {
    return this.apiService.get<SearchMoviesResult<SimilarMovie>>(`${this.requestUrlPrefix}/${id}/similars`);
  }

  public getMovieVideos(
    id: string,
  ): Observable<SearchMoviesResult<MovieVideo>> {
    return this.apiService.get<SearchMoviesResult<MovieVideo>>(`${this.requestUrlPrefix}/${id}/videos`);
  }

  public getMovieImages(
    id: string,
    type: MovieImageType,
  ): Observable<SearchMoviesResult<MovieImage>> {
    return this.apiService.get<SearchMoviesResult<MovieImage>>(`${this.requestUrlPrefix}/${id}/images?type=${type}`);
  }

  public getSeriesSeasons(
    id: string,
  ): Observable<SearchMoviesResult<SeriesSeason>> {
    return this.apiService.get<SearchMoviesResult<SeriesSeason>>(`${this.requestUrlPrefix}/${id}/seasons`);
  }

  public getReviews(id: string, page = 1): Observable<ItemsPage<Review>> {
    return this.apiService.get<ItemsPage<Review>>(`${this.requestUrlPrefix}/${id}/reviews?page=${page}`);
  }

  public createReview(id: string, newReview: CreateReviewDto): Observable<Review> {
    return this.apiService.post<Review>(`${this.requestUrlPrefix}/${id}/reviews`, newReview);
  }
}
