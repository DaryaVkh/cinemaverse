import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, of, startWith, Subject, switchMap, take, tap } from 'rxjs';
import { ACCESS_TOKEN_COOKIE_NAME } from '../common/constants';
import { Movie } from '../models/movies.models';
import { User } from '../models/users.models';
import { UserApiService } from './api/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly user$ = new BehaviorSubject<User | null>(null);
  public readonly favoriteMovies$ = new BehaviorSubject<Movie[] | null>(null);
  public readonly favoriteFilmsLoading$ = new BehaviorSubject<boolean>(false);

  public readonly updateFavoriteMovies$ = new Subject<void>();

  constructor(private readonly router: Router,
              private readonly userApiService: UserApiService,
              private readonly cookieService: CookieService) {
    this.initialize();
  }

  public logout(): void {
    this.cookieService.delete(ACCESS_TOKEN_COOKIE_NAME);
    this.user$.next(null);
    this.router.navigate(['/']).then();
  }

  public addToFavorites(movieId: string): void {
    this.userApiService.addFavoriteMovie(movieId).pipe(
      take(1)
    ).subscribe(() => this.updateFavoriteMovies$.next());
  }

  public removeFromFavorites(movieId: string): void {
    this.userApiService.removeFromFavorites(movieId).pipe(
      take(1)
    ).subscribe(() => this.updateFavoriteMovies$.next());
  }

  public checkIsMovieFavorite(movieId: string): boolean {
    const favorites = this.favoriteMovies$.getValue();
    const index = favorites?.findIndex(movie => movie.kinopoiskId === movieId);
    return index !== -1;
  }

  private initialize(): void {
    const accessToken = this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);
    if (accessToken) {
      this.userApiService.getUserInfo().pipe(
        take(1)
      ).subscribe((user) => {
        this.user$.next(user);
        this.updateFavoriteMovies$.next();
      });
    }
    this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.updateFavoriteMovies$.pipe(
            startWith(0),
            tap(() => this.favoriteFilmsLoading$.next(true)),
            switchMap(() => this.userApiService.getFavoriteMovies()),
          );
        }
        return of(null);
      }),
      catchError(() => of(null)),
    ).subscribe((favoriteMovies) => {
      if (favoriteMovies) {
        this.favoriteMovies$.next(favoriteMovies);
      }
      this.favoriteFilmsLoading$.next(false);
    });
  }
}
