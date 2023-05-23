import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MoviePreview, MoviesTopType } from '../../models/movies.models';
import { MoviesApiService } from '../../services/api/movies-api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movie-list-preview',
  templateUrl: './movie-list-preview.component.html',
  styleUrls: ['./movie-list-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListPreviewComponent implements OnInit, OnDestroy {
  @Input() public moviesType: MoviesTopType = MoviesTopType.TOP_250_BEST_FILMS;

  public maxPagesCount = 1;

  public readonly user$ = this.userService.user$;
  public readonly favoriteMovies$ = this.userService.favoriteMovies$;
  public readonly favoriteFilmsLoading$ = this.userService.favoriteFilmsLoading$;

  public readonly movies$ = new BehaviorSubject<MoviePreview[]>([]);
  public readonly moviesPart$ = new BehaviorSubject<number>(1);
  public readonly page$ = new BehaviorSubject<number>(1);
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly moviesApiService: MoviesApiService,
              private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.page$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap((page) => this.moviesApiService.getTop(this.moviesType, page)),
      takeUntil(this.destroy$)
    ).subscribe((result) => {
      const prevLoadedMovies = this.movies$.getValue();
      this.movies$.next([...prevLoadedMovies, ...result.films]);
      this.maxPagesCount = result.pagesCount;
      this.loading$.next(false);
    });
  }

  public nextPart(): void {
    const currentPage = this.page$.getValue();
    const currentPart = this.moviesPart$.getValue();
    if (!(currentPart % 2) && currentPage < this.maxPagesCount) {
      this.page$.next(currentPage + 1);
    }
    this.moviesPart$.next(currentPart + 1);
  }

  public prevPart(): void {
    const currentPart = this.moviesPart$.getValue();
    if (currentPart > 1) {
      this.moviesPart$.next(currentPart - 1);
    }
  }

  public checkIsMovieFavorite(movieId: string): boolean {
    return this.userService.checkIsMovieFavorite(movieId);
  }

  public changeFavoriteStatus(movieId: string) {
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
