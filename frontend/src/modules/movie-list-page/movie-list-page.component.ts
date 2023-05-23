import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, startWith, Subject, switchMap, tap } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Movie, MovieType } from '../../models/movies.models';
import { MoviesApiService } from '../../services/api/movies-api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListPageComponent {
  public readonly user$ = this.userService.user$;
  public readonly favoriteMovies$ = this.userService.favoriteMovies$;
  public readonly favoriteFilmsLoading$ = this.userService.favoriteFilmsLoading$;

  public readonly type$ = this.route.queryParamMap.pipe(
    map((paramMap) => paramMap.get('type') as MovieType)
  );
  public readonly keyword$ = this.route.queryParamMap.pipe(
    map((paramMap) => paramMap.get('keyword'))
  );

  public maxPagesCount = 1;
  public prevParams: ParamMap | null = null;
  public page = 1;

  public readonly movies$ = new BehaviorSubject<Movie[]>([]);
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly update$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly userService: UserService,
              private readonly route: ActivatedRoute,
              private readonly moviesApiService: MoviesApiService) {}

  public getTitleByType(type: MovieType): string {
    switch (type) {
      case MovieType.TV_SERIES:
        return 'Serials';
      case MovieType.FILM:
        return 'Movies';
      case MovieType.TV_SHOW:
        return 'TV Shows';
      case MovieType.ALL:
        return 'All Types';
      case MovieType.MINI_SERIES:
        return 'Mini Serials';
      case MovieType.VIDEO:
        return 'Video';
    }
  }

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(
      tap(() => {
        this.movies$.next([]);
        this.page = 1;
      }),
      switchMap((paramMap) => this.update$.pipe(
        startWith(0),
        map(() => paramMap)
      )),
      tap(() => this.loading$.next(true)),
      switchMap((paramMap) => this.moviesApiService.getMovieList({
        countries: paramMap.get('country') !== null ? [`${paramMap.get('country')}`] : undefined,
        genres: paramMap.get('genre') !== null ? [`${paramMap.get('genre')}`] : undefined,
        type: paramMap.get('type') as MovieType,
        ratingFrom: paramMap.get('ratingFrom') || undefined,
        ratingTo: paramMap.get('ratingTo') || undefined,
        yearFrom: paramMap.get('yearFrom') || undefined,
        yearTo: paramMap.get('yearTo') || undefined,
        keyword: paramMap.get('keyword') || undefined,
        page: this.page,
      })),
      takeUntil(this.destroy$)
    ).subscribe((result) => {
      const prevLoadedMovies = this.movies$.getValue();
      this.movies$.next([...prevLoadedMovies, ...result.items.filter((movie) =>
        !!movie && (movie.nameEn || movie.nameRu || movie.nameOriginal))]
      );
      this.maxPagesCount = result.totalPages;
      this.loading$.next(false);
    });
  }

  public nextPart(): void {
    if (this.page < this.maxPagesCount) {
      this.page += 1;
      this.update$.next();
    }
  }

  public checkIsMovieFavorite(movieId: string): boolean {
    return this.userService.checkIsMovieFavorite(movieId);
  }

  public changeFavoriteStatus(movieId: string): void {
    if (this.checkIsMovieFavorite(movieId)) {
      this.userService.removeFromFavorites(movieId);
    } else {
      this.userService.addToFavorites(movieId);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
