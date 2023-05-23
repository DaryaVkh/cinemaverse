import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, shareReplay, skip, tap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-favorite-movies',
  templateUrl: './user-favorite-movies.component.html',
  styleUrls: ['./user-favorite-movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFavoriteMoviesComponent {
  public readonly movies$ = this.userService.favoriteMovies$.pipe(
    shareReplay({bufferSize: 1, refCount: true})
  );

  public readonly loading$ = this.userService.favoriteFilmsLoading$;

  constructor(private readonly userService: UserService) {}

  public removeFromFavorites(movieId: string): void {
    this.userService.removeFromFavorites(movieId);
  }
}
