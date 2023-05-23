import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movies.models';
import { CreateUserDto, LoggedUserDto, LoginUserDto, User } from '../../models/users.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly requestUrlPrefix = '/users';

  constructor(private readonly apiService: ApiService) {}

  public register(createUserDto: CreateUserDto): Observable<User> {
    return this.apiService.post<User>(`${this.requestUrlPrefix}`, createUserDto);
  }

  public getUserInfo(): Observable<User> {
    return this.apiService.get<User>(`${this.requestUrlPrefix}/login`);
  }

  public login(credentials: LoginUserDto): Observable<LoggedUserDto> {
    return this.apiService.post<LoggedUserDto>(`${this.requestUrlPrefix}/login`, credentials);
  }

  public getFavoriteMovies(): Observable<Movie[]> {
    return this.apiService.get<Movie[]>(`${this.requestUrlPrefix}/favorites`);
  }

  public addFavoriteMovie(movieId: string): Observable<void> {
    return this.apiService.post(`${this.requestUrlPrefix}/favorites`, { filmId: movieId });
  }

  public removeFromFavorites(movieId: string): Observable<void> {
    return this.apiService.delete(`${this.requestUrlPrefix}/favorites`, { filmId: movieId });
  }
}
