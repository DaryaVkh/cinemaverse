import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Comment } from './comment.entity';
import {
  Film,
  FilmFilters,
  FilmImage,
  FilmImageType,
  ItemsPage,
  FILMS_API_URL,
  FilmsTopType,
  FilmVideo,
  FilterValues,
  Month,
  PremierFilm,
  SearchFilmsResult,
  SeriesSeason,
  SimilarFilm,
  TopResult,
  ApiReview,
  Review,
} from './films.models';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly httpService: HttpService,
  ) {
    this.httpService.axiosRef.defaults.headers.common['X-API-KEY'] =
      process.env.FILMS_API_KEY;
    this.httpService.axiosRef.defaults.headers.common['Content-Type'] =
      'application/json';
  }

  public async getFilms(filmFilters: FilmFilters): Promise<ItemsPage<Film>> {
    const requestUrl = Object.entries(filmFilters).reduce(
      (url, [filterName, filterValue]) => {
        if (filterValue !== undefined) {
          if (url[url.length - 1] !== '?') {
            return url + `&${filterName}=${filterValue}`;
          }
          return url + `${filterName}=${filterValue}`;
        }
        return url;
      },
      `${FILMS_API_URL}?`,
    );
    const { data } = await firstValueFrom(
      this.httpService.get<ItemsPage<Film>>(
        requestUrl[requestUrl.length - 1] === '?'
          ? requestUrl.slice(0, -1)
          : requestUrl,
      ),
    );
    return data;
  }

  public async getFilm(filmId: string): Promise<Film> {
    const { data } = await firstValueFrom(
      this.httpService.get<Film>(`${FILMS_API_URL}/${filmId}`),
    );
    return data;
  }

  public async getPremieres(
    year: number,
    month: Month,
  ): Promise<SearchFilmsResult<PremierFilm>> {
    const { data } = await firstValueFrom(
      this.httpService.get<SearchFilmsResult<PremierFilm>>(
        `${FILMS_API_URL}/premieres?year=${year}&month=${month}`,
      ),
    );
    return data;
  }

  public async getFilterValues(): Promise<FilterValues> {
    const { data } = await firstValueFrom(
      this.httpService.get<FilterValues>(`${FILMS_API_URL}/filters`),
    );
    return data;
  }

  public async getTop(
    page: number,
    type: FilmsTopType = FilmsTopType.TOP_250_BEST_FILMS,
  ): Promise<TopResult> {
    const { data } = await firstValueFrom(
      this.httpService.get<TopResult>(
        `${FILMS_API_URL}/top?page=${page}&type=${type}`,
      ),
    );
    return data;
  }

  public async getSimilars(
    id: string,
  ): Promise<SearchFilmsResult<SimilarFilm>> {
    const { data } = await firstValueFrom(
      this.httpService.get<SearchFilmsResult<SimilarFilm>>(
        `${FILMS_API_URL}/${id}/similars`,
      ),
    );
    return data;
  }

  public async getFilmVideos(
    id: string,
  ): Promise<SearchFilmsResult<FilmVideo>> {
    const { data } = await firstValueFrom(
      this.httpService.get<SearchFilmsResult<FilmVideo>>(
        `${FILMS_API_URL}/${id}/videos`,
      ),
    );
    return data;
  }

  public async getFilmImages(
    id: string,
    type: FilmImageType,
  ): Promise<SearchFilmsResult<FilmImage>> {
    const { data } = await firstValueFrom(
      this.httpService.get<SearchFilmsResult<FilmImage>>(
        `${FILMS_API_URL}/${id}/images?type=${type}`,
      ),
    );
    return data;
  }

  public async getSeriesSeasons(
    id: string,
  ): Promise<SearchFilmsResult<SeriesSeason>> {
    const { data } = await firstValueFrom(
      this.httpService.get<SearchFilmsResult<SeriesSeason>>(
        `${FILMS_API_URL}/${id}/seasons`,
      ),
    );
    return data;
  }

  public async getReviews(
    id: string,
    page: number,
  ): Promise<ItemsPage<Review>> {
    const { data } = await firstValueFrom(
      this.httpService.get<ItemsPage<ApiReview>>(
        `${FILMS_API_URL}/${id}/reviews?page=${page}`,
      ),
    );
    const result: ItemsPage<Review> = {
      ...data,
      items: [
        ...data.items.map((item) => ({
          ...item,
          createdAt: item.date,
        })),
      ],
    };
    const commentsFromDB: Comment[] = await this.commentModel
      .find({ kinopoiskId: `${id}` })
      .exec();
    result.total = data.total + commentsFromDB.length;
    if (+page === 1) {
      result.items = [...commentsFromDB, ...result.items];
    }
    return result;
  }

  public async createReview(comment: Review): Promise<Comment> {
    const createdComment = new this.commentModel(comment);
    return createdComment.save();
  }
}
