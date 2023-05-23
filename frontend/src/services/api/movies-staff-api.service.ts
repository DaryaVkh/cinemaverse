import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, Staff } from '../../models/movie-staff.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesStaffApiService {
  private readonly requestUrlPrefix = '/staff';

  constructor(private readonly apiService: ApiService) {}

  public getMovieStaff(movieId: string): Observable<Staff[]> {
    return this.apiService.get<Staff[]>(`${this.requestUrlPrefix}?filmId=${movieId}`);
  }

  public getPersonInfo(id: string): Observable<Person> {
    return this.apiService.get<Person>(`${this.requestUrlPrefix}/${id}`);
  }
}
