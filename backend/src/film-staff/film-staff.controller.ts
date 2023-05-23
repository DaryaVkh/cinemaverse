import { Controller, Get, Param, Query } from '@nestjs/common';
import { Person, Staff } from './film-staff.models';
import { FilmStaffService } from './film-staff.service';

@Controller('staff')
export class FilmStaffController {
  constructor(private readonly filmStaffService: FilmStaffService) {}

  @Get()
  public async getFilmStaff(@Query('filmId') filmId: string): Promise<Staff[]> {
    return this.filmStaffService.getFilmStaff(filmId);
  }

  @Get(':id')
  public async getPersonInfo(@Param('id') id: string): Promise<Person> {
    return this.filmStaffService.getPersonInfo(id);
  }
}
