import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, shareReplay, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoviesStaffApiService } from '../../services/api/movies-staff-api.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonPageComponent {
  public readonly moviesPerPage = Math.round((window.innerWidth - 130) / 300);

  public readonly personId$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('id')),
    shareReplay({bufferSize: 1, refCount: true})
  );
  public readonly personInfo$ = this.personId$.pipe(
    switchMap(id => id ? this.staffApiService.getPersonInfo(id) : of(null)),
    shareReplay({bufferSize: 1, refCount: true})
  );

  public readonly loading$ = new BehaviorSubject<boolean>(true);
  public readonly moviesPart$ = new BehaviorSubject<number>(1);

  constructor(private readonly route: ActivatedRoute,
              private readonly staffApiService: MoviesStaffApiService) {}

  public prevMoviesPart(): void {
    const currentPart = this.moviesPart$.getValue();
    if (currentPart > 1) {
      this.moviesPart$.next(currentPart - 1);
    }
  }

  public nextMoviesPart(moviesCount: number): void {
    const currentPart = this.moviesPart$.getValue();
    if (currentPart * this.moviesPerPage < moviesCount) {
      this.moviesPart$.next(currentPart + 1);
    }
  }
}
