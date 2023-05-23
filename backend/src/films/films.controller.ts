import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationMiddleware } from '../middlewares/authorization/authorization.middleware';
import { Comment } from './comment.entity';
import { getReviewType } from './films.helpers';
import {
  CreateReviewDto,
  Film,
  FilmImage,
  FilmImageType,
  FilmSortingOrder,
  FilmsTopType,
  FilmType,
  FilmVideo,
  FilterValues,
  ItemsPage,
  Month,
  PremierFilm,
  Review,
  SearchFilmsResult,
  SeriesSeason,
  SimilarFilm,
  TopResult,
} from './films.models';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  public async getFilms(
    @Query('countries') countries?: string[],
    @Query('genres') genres?: string[],
    @Query('order') order?: FilmSortingOrder,
    @Query('type') type?: FilmType,
    @Query('ratingFrom') ratingFrom?: number,
    @Query('ratingTo') ratingTo?: number,
    @Query('yearFrom') yearFrom?: number,
    @Query('yearTo') yearTo?: number,
    @Query('keyword') keyword?: string,
    @Query('page') page = 1,
  ): Promise<ItemsPage<Film>> {
    return this.filmsService.getFilms({
      countries,
      genres,
      order,
      type,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
      keyword,
      page,
    });
  }

  @Get('premieres')
  public async getPremieres(
    @Query('year') year: number,
    @Query('month') month: Month,
  ): Promise<SearchFilmsResult<PremierFilm>> {
    return this.filmsService.getPremieres(year, month);
  }

  @Get('filters')
  public async getFilters(): Promise<FilterValues> {
    return this.filmsService.getFilterValues();
  }

  @Get('top')
  public async getTop(
    @Query('type') type?: FilmsTopType,
    @Query('page') page = 1,
  ): Promise<TopResult> {
    return this.filmsService.getTop(page, type);
  }

  @Get(':id/similars')
  public async getSimilars(
    @Param('id') id: string,
  ): Promise<SearchFilmsResult<SimilarFilm>> {
    return this.filmsService.getSimilars(id);
  }

  @Get(':id/videos')
  public async getFilmVideos(
    @Param('id') id: string,
  ): Promise<SearchFilmsResult<FilmVideo>> {
    return this.filmsService.getFilmVideos(id);
  }

  @Get(':id/images')
  public async getFilmImages(
    @Param('id') id: string,
    @Query('type') type: FilmImageType = FilmImageType.STILL,
  ): Promise<SearchFilmsResult<FilmImage>> {
    return this.filmsService.getFilmImages(id, type);
  }

  @Get(':id/seasons')
  public async getSeriesSeasons(
    @Param('id') id: string,
  ): Promise<SearchFilmsResult<SeriesSeason>> {
    return this.filmsService.getSeriesSeasons(id);
  }

  @Get(':id/reviews')
  public async getFilmReviews(
    @Param('id') id: string,
    @Query('page') page = 1,
  ): Promise<ItemsPage<Review>> {
    return this.filmsService.getReviews(id, page);
  }

  @Post(':id/reviews')
  @UseGuards(AuthorizationMiddleware)
  public async createNewReview(
    @Request() req,
    @Param('id') id: string,
    @Body() newReview: CreateReviewDto,
  ): Promise<Comment> {
    return this.filmsService.createReview({
      kinopoiskId: id,
      type: getReviewType(newReview.rating),
      author: req.user.name,
      description: newReview.text,
      positiveRating: 0,
      negativeRating: 0,
    });
  }

  @Get(':id')
  public async getFilm(@Param('id') id: string): Promise<Film> {
    return this.filmsService.getFilm(id);
  }
}
