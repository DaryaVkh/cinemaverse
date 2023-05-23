import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, shareReplay, Subject, switchMap } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Staff, StaffRole } from '../../models/movie-staff.models';
import { MovieVideoSite } from '../../models/movies.models';
import { MoviesApiService } from '../../services/api/movies-api.service';
import { MoviesStaffApiService } from '../../services/api/movies-staff-api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviePageComponent implements OnInit, OnDestroy {
  public readonly user$ = this.userService.user$;
  public readonly favoriteMovies$ = this.userService.favoriteMovies$;
  public readonly favoriteFilmsLoading$ = this.userService.favoriteFilmsLoading$;

  public readonly movieId$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('id')),
    shareReplay({bufferSize: 1, refCount: true})
  );
  public readonly movie$ = this.movieId$.pipe(
    switchMap(id => id ? this.moviesApiService.getMovie(id) : of(null)),
    shareReplay({bufferSize: 1, refCount: true})
  );

  public readonly movieTrailer$ = this.movieId$.pipe(
    switchMap(id => id ? this.moviesApiService.getMovieVideos(id) : of(null)),
    map((videosResult) => {
      if (videosResult) {
        const youtubeTrailers = videosResult.items.filter(videoInfo =>
          videoInfo.site === MovieVideoSite.YOUTUBE
          && videoInfo.name.toLowerCase().includes('трейлер')
        ).map(trailer => {
          const urlParts = trailer.url.replace('watch?v=', '').replace('v/', '').split('/');
          return {url: `https://youtube.com/embed/${urlParts[urlParts.length - 1]}`, name: trailer.name};
        });
        const russianOrEnglishTrailer = youtubeTrailers.find(trailer => {
          const name = trailer.name.toLowerCase();
          return name.includes('дублированный') || name.includes('международный');
        })?.url;
        if (russianOrEnglishTrailer) {
          return this.sanitizer.bypassSecurityTrustResourceUrl(russianOrEnglishTrailer);
        }
        if (youtubeTrailers[0]) {
          return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeTrailers[0].url);
        }
      }
      return null;
    })
  );

  public readonly actors$: Observable<Staff[]> = this.movieId$.pipe(
    switchMap(id => id ? this.staffApiService.getMovieStaff(id) : of(null)),
    map(staff => (staff || []).filter((person: Staff) => person.professionKey === StaffRole.ACTOR)),
    shareReplay({bufferSize: 1, refCount: true})
  );
  public readonly similarMovies$ = this.movieId$.pipe(
    switchMap(id => id ? this.moviesApiService.getSimilars(id) : of(null)),
    map(moviesResult => moviesResult?.items || []),
    shareReplay({bufferSize: 1, refCount: true})
  );

  public readonly loading$ = new BehaviorSubject<boolean>(true);
  public readonly actorsPart$ = new BehaviorSubject<number>(1);
  public readonly similarMoviesPart$ = new BehaviorSubject<number>(1);
  public readonly reviewsUpdateTrigger$ = new Subject<void>();

  public readonly actorsPerPage = Math.round((window.innerWidth - 144) / 146);
  public readonly similarMoviesPerPage = Math.round((window.innerWidth - 110) / 300);

  public reviewFormOpen = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute,
              private readonly sanitizer: DomSanitizer,
              private readonly userService: UserService,
              private readonly staffApiService: MoviesStaffApiService,
              private readonly moviesApiService: MoviesApiService) {}

  public ngOnInit(): void {
    combineLatest([this.movie$, this.movieTrailer$, this.actors$, this.similarMovies$, this.favoriteMovies$]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.loading$.next(false));
  }

  public prevActorsPart(): void {
    const currentActorsPart = this.actorsPart$.getValue();
    if (currentActorsPart > 1) {
      this.actorsPart$.next(currentActorsPart - 1);
    }
  }

  public nextActorsPart(actorsCount: number): void {
    const currentActorsPart = this.actorsPart$.getValue();
    if (currentActorsPart * this.actorsPerPage < actorsCount) {
      this.actorsPart$.next(currentActorsPart + 1);
    }
  }

  public prevSimilarPart(): void {
    const currentPart = this.similarMoviesPart$.getValue();
    if (currentPart > 1) {
      this.similarMoviesPart$.next(currentPart - 1);
    }
  }

  public nextSimilarPart(moviesCount: number): void {
    const currentPart = this.similarMoviesPart$.getValue();
    if (currentPart * this.similarMoviesPerPage < moviesCount) {
      this.similarMoviesPart$.next(currentPart + 1);
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
