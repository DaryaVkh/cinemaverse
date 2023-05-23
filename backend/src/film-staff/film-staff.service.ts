import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FILMS_STAFF_API_URL, Person, Staff } from './film-staff.models';

@Injectable()
export class FilmStaffService {
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.defaults.headers.common['X-API-KEY'] =
      process.env.FILMS_API_KEY;
    this.httpService.axiosRef.defaults.headers.common['Content-Type'] =
      'application/json';
  }

  public async getFilmStaff(filmId: string): Promise<Staff[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Staff[]>(`${FILMS_STAFF_API_URL}?filmId=${filmId}`),
    );
    return data;
  }

  public async getPersonInfo(id: string): Promise<Person> {
    const { data } = await firstValueFrom(
      this.httpService.get<Person>(`${FILMS_STAFF_API_URL}/${id}`),
    );
    return data;
  }
}
