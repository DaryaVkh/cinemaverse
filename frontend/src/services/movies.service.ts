import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { getCurrentMonth, getCurrentYear } from '../common/helpers';
import { MoviesApiService } from './api/movies-api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public readonly premieres$ = this.moviesApiService.getPremieres(getCurrentYear(), getCurrentMonth()).pipe(
    shareReplay({bufferSize: 1, refCount: true})
  );
  public readonly movieFilters$ = this.moviesApiService.getFilterValues().pipe(
    shareReplay({bufferSize: 1, refCount: true})
  );

  constructor(private readonly moviesApiService: MoviesApiService) {}
}
