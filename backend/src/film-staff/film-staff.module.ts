import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilmStaffController } from './film-staff.controller';
import { FilmStaffService } from './film-staff.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [FilmStaffController],
  providers: [FilmStaffService],
})
export class FilmStaffModule {}
