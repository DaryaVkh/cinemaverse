import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoviesTopType, MovieType } from '../../models/movies.models';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public visiblePremierIndex = 0;
  public filmsTypeEnum = MovieType;
  public filmsTopTypeEnum = MoviesTopType;

  public readonly premieres$ = this.moviesService.premieres$.pipe(
    map((premieres) => premieres.items.slice(0, 10)),
    tap(() => this.loading$.next(false)),
  );

  public readonly loading$ = new BehaviorSubject<boolean>(true);

  constructor(private readonly moviesService: MoviesService) {}

  public navigate(delta: number): void {
    this.visiblePremierIndex = (this.visiblePremierIndex + 10 + delta) % 10;
  }
}
