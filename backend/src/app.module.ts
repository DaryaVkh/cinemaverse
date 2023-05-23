import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../db/db.module';
import { FilmStaffModule } from './film-staff/film-staff.module';
import { FilmsModule } from './films/films.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    FilmsModule,
    FilmStaffModule,
    UsersModule,
  ],
})
export class AppModule {}
