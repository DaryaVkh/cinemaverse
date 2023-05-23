import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Params, Router } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiPrimitiveTextfieldModule,
  TuiRootModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputYearModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import { shareReplay, Subject, take } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MovieType } from '../../models/movies.models';
import { MoviesService } from '../../services/movies.service';
import { SearchableSelectComponent } from '../searchable-select/searchable-select.component';

@Component({
  selector: 'app-filters-sidebar',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, ReactiveFormsModule, TuiPrimitiveTextfieldModule, TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule, TuiDataListWrapperModule, SearchableSelectComponent, TuiInputNumberModule, TuiInputYearModule, TuiRootModule, TuiDataListModule],
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersSidebarComponent implements OnInit, OnDestroy {
  @Output() public readonly close = new EventEmitter<void>();

  public readonly filtersForm = this.fb.group({
    country: null,
    genre: null,
    type: null,
    ratingFrom: null,
    ratingTo: null,
    yearFrom: null,
    yearTo: null
  });
  public readonly types = Object.values(MovieType).map(type => {
    const word = type.split('_').join(' ').toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  public countryFilterIdByNames: Record<string, string> = {};
  public genreFilterIdByNames: Record<string, string> = {};

  public readonly movieFilters$ = this.moviesService.movieFilters$.pipe(
    map(filters => ({
      genres: filters.genres.map(genre => ({
        id: genre.id,
        name: genre.genre
      })),
      countries: filters.countries.map(country => ({
        id: country.id,
        name: country.country
      }))
    })),
    shareReplay(1)
  );
  public readonly genreFilterValues$ = this.movieFilters$.pipe(
    map(movieFilters => movieFilters.genres.map(genre => genre.name))
  );
  public readonly countryFilterValues$ = this.movieFilters$.pipe(
    map(movieFilters => movieFilters.countries.map(country => country.name))
  );

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly moviesService: MoviesService) {}

  public ngOnInit(): void {
    this.movieFilters$.pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe((movieFilters) => {
      this.countryFilterIdByNames = movieFilters.countries.reduce<Record<string, string>>((filters, country) => {
        filters[country.name] = `${country.id}`;
        return filters;
      }, {});
      this.genreFilterIdByNames = movieFilters.genres.reduce<Record<string, string>>((filters, genre) => {
        filters[genre.name] = `${genre.id}`;
        return filters;
      }, {});
    });
  }

  public applyFilters(): void {
    const queryParams: Params = {};
    const {type, country, genre, ratingFrom, ratingTo, yearFrom, yearTo} = this.filtersForm.value;
    if (type) {
      queryParams['type'] = `${type}`.split(' ').join('_').toUpperCase();
    }
    if (country) {
      queryParams['country'] = this.countryFilterIdByNames[country];
    }
    if (genre) {
      queryParams['genre'] = this.genreFilterIdByNames[genre];
    }
    if (ratingFrom !== null && ratingFrom !== undefined) {
      queryParams['ratingFrom'] = ratingFrom;
    }
    if (ratingTo !== null && ratingTo !== undefined) {
      queryParams['ratingTo'] = ratingTo;
    }
    if (yearFrom) {
      queryParams['yearFrom'] = yearFrom;
    }
    if (yearTo) {
      queryParams['yearTo'] = yearTo;
    }
    this.filtersForm.reset();
    this.close.emit();
    this.router.navigate(['/', 'movie-list'], {queryParams}).then();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
