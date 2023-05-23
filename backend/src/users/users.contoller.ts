import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Film } from '../films/films.models';
import { createJWT } from '../helpers/functions';
import { AuthorizationMiddleware } from '../middlewares/authorization/authorization.middleware';
import { User } from './user.entity';
import {
  CreateUserDto,
  JWT_ALGORITHM,
  LoggedUserDto,
  LoginUserDto,
} from './users.models';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(
      createUserDto,
      this.configService.get<string>('SALT'),
    );
  }

  @Get('login')
  @UseGuards(AuthorizationMiddleware)
  public async getUserData(@Request() req): Promise<User> {
    return this.usersService.findById(req.user.id);
  }

  @Post('login')
  public async login(
    @Body() { email, password }: LoginUserDto,
  ): Promise<LoggedUserDto> {
    const user = await this.usersService.verifyUser(
      email,
      password,
      this.configService.get('SALT'),
    );

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Неправильный логин или пароль',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await createJWT(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      { name: user.name, id: user.id },
    );

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      favoriteFilms: user.favoriteFilms,
      token,
    };
  }

  @Get('favorites')
  public async getFavoriteFilms(@Request() req): Promise<Film[]> {
    return this.usersService.findFavoriteFilms(req.user.id);
  }

  @Post('favorites')
  public async addFilmToFavorites(
    @Request() req,
    @Body() { filmId }: { filmId: string },
  ): Promise<string[]> {
    return this.usersService.addFavoriteFilm(req.user.id, filmId);
  }

  @Delete('favorites')
  public async removeFromFavorites(
    @Request() req,
    @Body() body: { filmId: string },
  ): Promise<string[]> {
    return this.usersService.removeFromFavorites(req.user.id, body.filmId);
  }
}
